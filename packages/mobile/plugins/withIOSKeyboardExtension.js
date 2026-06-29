const {
  withXcodeProject,
  withEntitlementsPlist,
  withDangerousMod,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const APP_GROUP = 'group.com.moji.keyboard';
const EXTENSION_NAME = 'MojiKeyboard';
const EXTENSION_BUNDLE_SUFFIX = 'MojiKeyboard';

/**
 * Adds the App Groups entitlement to the main app target so it can share
 * UserDefaults with the keyboard extension.
 */
const withMainAppGroup = (config) =>
  withEntitlementsPlist(config, (mod) => {
    const entitlements = mod.modResults;
    const groups = entitlements['com.apple.security.application-groups'] || [];
    if (!groups.includes(APP_GROUP)) {
      entitlements['com.apple.security.application-groups'] = [...groups, APP_GROUP];
    }
    return mod;
  });

/**
 * Copies Swift source files and plists into the Xcode project directory,
 * then wires the extension target into the .xcodeproj via xcode package.
 */
const withKeyboardExtensionTarget = (config) =>
  withXcodeProject(config, (mod) => {
    const project = mod.modResults;
    const pbxProject = project.pbxProject || project;

    // Source directory for the extension files (tracked in the repo)
    const extensionSrc = path.join(__dirname, '..', 'ios', EXTENSION_NAME);

    // Destination inside the generated Xcode project
    const platformRoot = mod.modRequest.platformProjectRoot;
    const extensionDst = path.join(platformRoot, EXTENSION_NAME);

    // 1. Copy extension sources
    if (fs.existsSync(extensionSrc)) {
      if (!fs.existsSync(extensionDst)) fs.mkdirSync(extensionDst, { recursive: true });
      fs.readdirSync(extensionSrc).forEach((file) => {
        fs.copyFileSync(path.join(extensionSrc, file), path.join(extensionDst, file));
      });
    }

    // 2. Determine bundle identifier for the extension
    const mainBundleId = mod.ios?.bundleIdentifier || 'com.moji.app';
    const extBundleId = `${mainBundleId}.${EXTENSION_BUNDLE_SUFFIX}`;

    // 3. Guard: only add the target once
    const existingTargets = pbxProject.pbxNativeTargetSection
      ? Object.values(pbxProject.pbxNativeTargetSection())
      : [];
    const alreadyAdded = existingTargets.some(
      (t) => t && t.name === EXTENSION_NAME
    );
    if (alreadyAdded) return mod;

    // 4. Add the extension target using xcode helpers
    const fileOpts = { lastKnownFileType: 'sourcecode.swift', sourceTree: '<group>' };

    const swiftFiles = fs.existsSync(extensionDst)
      ? fs.readdirSync(extensionDst).filter((f) => f.endsWith('.swift'))
      : [];

    const target = project.addTarget(
      EXTENSION_NAME,
      'app_extension',
      EXTENSION_NAME,
      extBundleId
    );

    // 5. Create a group for the extension sources
    const groupKey = project.findPBXGroupKey({ name: EXTENSION_NAME }) ||
      project.addPbxGroup([], EXTENSION_NAME, EXTENSION_NAME).uuid;

    // 6. Add Swift source files and Info.plist to the group & build phase
    swiftFiles.forEach((file) => {
      project.addSourceFile(
        path.join(EXTENSION_NAME, file),
        { target: target.uuid },
        groupKey
      );
    });

    const plistPath = path.join(EXTENSION_NAME, 'Info.plist');
    project.addResourceFile(plistPath, { target: target.uuid }, groupKey);

    // 7. Build settings for the extension target
    const buildSettings = {
      ALWAYS_SEARCH_USER_PATHS: 'NO',
      CLANG_ENABLE_MODULES: 'YES',
      CODE_SIGN_ENTITLEMENTS: `${EXTENSION_NAME}/MojiKeyboard.entitlements`,
      INFOPLIST_FILE: `${EXTENSION_NAME}/Info.plist`,
      LD_RUNPATH_SEARCH_PATHS: '$(inherited) @executable_path/../../Frameworks',
      PRODUCT_BUNDLE_IDENTIFIER: extBundleId,
      PRODUCT_NAME: '$(TARGET_NAME)',
      SKIP_INSTALL: 'YES',
      SWIFT_VERSION: '5.0',
      TARGETED_DEVICE_FAMILY: '1,2',
    };

    project.addBuildProperty('ALWAYS_SEARCH_USER_PATHS', 'NO', 'Debug', EXTENSION_NAME);
    Object.entries(buildSettings).forEach(([key, value]) => {
      project.addBuildProperty(key, value, 'Release', EXTENSION_NAME);
      project.addBuildProperty(key, value, 'Debug', EXTENSION_NAME);
    });

    return mod;
  });

/**
 * Writes the extension entitlements file into the generated project directory.
 */
const withExtensionEntitlements = (config) =>
  withDangerousMod(config, [
    'ios',
    (mod) => {
      const platformRoot = mod.modRequest.platformProjectRoot;
      const extensionDst = path.join(platformRoot, EXTENSION_NAME);
      if (!fs.existsSync(extensionDst)) fs.mkdirSync(extensionDst, { recursive: true });

      const entitlementsSrc = path.join(
        __dirname, '..', 'ios', EXTENSION_NAME, 'MojiKeyboard.entitlements'
      );
      const entitlementsDst = path.join(extensionDst, 'MojiKeyboard.entitlements');

      if (fs.existsSync(entitlementsSrc)) {
        fs.copyFileSync(entitlementsSrc, entitlementsDst);
      } else {
        // Generate it from scratch if source doesn't exist yet
        const content = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.application-groups</key>
    <array>
        <string>${APP_GROUP}</string>
    </array>
</dict>
</plist>`;
        fs.writeFileSync(entitlementsDst, content, 'utf8');
      }

      return mod;
    },
  ]);

const withIOSKeyboardExtension = (config) => {
  config = withMainAppGroup(config);
  config = withExtensionEntitlements(config);
  config = withKeyboardExtensionTarget(config);
  return config;
};

module.exports = withIOSKeyboardExtension;

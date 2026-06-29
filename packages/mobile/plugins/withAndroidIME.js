const { withAndroidManifest, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * Expo config plugin that registers the MojiIMEService as an Android
 * InputMethodService. Run automatically during `expo prebuild`.
 */
const withAndroidIME = (config) => {
  // 1. Inject the <service> block into AndroidManifest.xml
  config = withAndroidManifest(config, (mod) => {
    const manifest = mod.modResults;
    const app = manifest.manifest.application[0];

    if (!app.service) app.service = [];

    const imeServiceExists = app.service.some(
      (s) => s.$?.['android:name'] === 'com.moji.keyboard.MojiIMEService'
    );

    if (!imeServiceExists) {
      app.service.push({
        $: {
          'android:name': 'com.moji.keyboard.MojiIMEService',
          'android:label': 'Moji Emoji Keyboard',
          'android:permission': 'android.permission.BIND_INPUT_METHOD',
          'android:exported': 'true',
        },
        'intent-filter': [
          {
            action: [{ $: { 'android:name': 'android.view.InputMethod' } }],
          },
        ],
        'meta-data': [
          {
            $: {
              'android:name': 'android.view.im',
              'android:resource': '@xml/method',
            },
          },
        ],
      });
    }

    return mod;
  });

  // 2. Copy method.xml to res/xml/ during prebuild
  config = withDangerousMod(config, [
    'android',
    (mod) => {
      const xmlDir = path.join(mod.modRequest.platformProjectRoot, 'app', 'src', 'main', 'res', 'xml');
      if (!fs.existsSync(xmlDir)) fs.mkdirSync(xmlDir, { recursive: true });

      const src = path.join(__dirname, '..', 'android', 'src', 'main', 'res', 'xml', 'method.xml');
      const dst = path.join(xmlDir, 'method.xml');
      if (fs.existsSync(src)) fs.copyFileSync(src, dst);

      // Copy Kotlin source files
      const kotlinSrc = path.join(__dirname, '..', 'android', 'src', 'main', 'kotlin', 'com', 'moji', 'keyboard');
      const packageId = mod.android?.package || 'com.moji.keyboard';
      const parts = packageId.split('.');
      const kotlinDst = path.join(
        mod.modRequest.platformProjectRoot,
        'app', 'src', 'main', 'kotlin',
        ...parts
      );
      if (!fs.existsSync(kotlinDst)) fs.mkdirSync(kotlinDst, { recursive: true });

      if (fs.existsSync(kotlinSrc)) {
        fs.readdirSync(kotlinSrc).forEach((file) => {
          if (file.endsWith('.kt')) {
            let content = fs.readFileSync(path.join(kotlinSrc, file), 'utf8');
            // Update package name to match app
            content = content.replace(/^package com\.moji\.keyboard$/m, `package ${packageId}`);
            fs.writeFileSync(path.join(kotlinDst, file), content);
          }
        });
      }

      return mod;
    },
  ]);

  return config;
};

module.exports = withAndroidIME;

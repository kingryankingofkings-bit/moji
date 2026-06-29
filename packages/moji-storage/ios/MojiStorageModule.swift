import ExpoModulesCore

public class MojiStorageModule: Module {

    private var defaults: UserDefaults {
        // Shares storage with the MojiKeyboard extension via App Groups
        return UserDefaults(suiteName: "group.com.moji.keyboard") ?? .standard
    }

    public func definition() -> ModuleDefinition {
        Name("MojiStorage")

        AsyncFunction("getItem") { (key: String) -> String? in
            return self.defaults.string(forKey: key)
        }

        AsyncFunction("setItem") { (key: String, value: String) in
            self.defaults.set(value, forKey: key)
        }

        AsyncFunction("removeItem") { (key: String) in
            self.defaults.removeObject(forKey: key)
        }
    }
}

package expo.modules.mojistorage

import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MojiStorageModule : Module() {

    private val prefs
        get() = appContext.reactContext!!.getSharedPreferences("moji_data", Context.MODE_PRIVATE)

    override fun definition() = ModuleDefinition {
        Name("MojiStorage")

        AsyncFunction("getItem") { key: String ->
            prefs.getString(key, null)
        }

        AsyncFunction("setItem") { key: String, value: String ->
            prefs.edit().putString(key, value).apply()
        }

        AsyncFunction("removeItem") { key: String ->
            prefs.edit().remove(key).apply()
        }
    }
}

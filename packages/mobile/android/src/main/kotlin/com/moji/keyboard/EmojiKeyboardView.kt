package com.moji.keyboard

import android.content.Context
import android.content.SharedPreferences
import android.graphics.Color
import android.text.Editable
import android.text.TextWatcher
import android.util.TypedValue
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.core.content.ContextCompat
import org.json.JSONArray
import org.json.JSONObject

class EmojiKeyboardView(context: Context) : LinearLayout(context) {

    var onEmojiSelected: ((String) -> Unit)? = null
    var onDeletePressed: (() -> Unit)? = null
    var onSwitchKeyboard: (() -> Unit)? = null

    private val prefs: SharedPreferences =
        context.getSharedPreferences("moji_data", Context.MODE_PRIVATE)

    private var selectedCategory = EmojiCategory.RECENT
    private var searchQuery = ""
    private var showSkinTonePicker = false
    private var skinToneTarget: EmojiItem? = null

    private lateinit var searchInput: EditText
    private lateinit var categoryBar: LinearLayout
    private lateinit var emojiGrid: GridView
    private lateinit var skinTonePanel: LinearLayout
    private lateinit var statusBar: LinearLayout

    private val allEmojis get() = when {
        searchQuery.isNotEmpty() -> EmojiDatabase.search(searchQuery)
        selectedCategory == EmojiCategory.RECENT -> getRecentEmojis().map {
            EmojiItem(it, it, it, EmojiCategory.RECENT, emptyList())
        }
        else -> EmojiDatabase.byCategory(selectedCategory)
    }

    init {
        orientation = VERTICAL
        setBackgroundColor(Color.parseColor("#F9F9F9"))
        buildUI()
    }

    private fun dp(value: Int) =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value.toFloat(), resources.displayMetrics).toInt()

    private fun buildUI() {
        buildStatusBar()
        buildSearchBar()
        buildCategoryBar()
        buildSkinTonePanel()
        buildGrid()
        refresh()
    }

    private fun buildStatusBar() {
        statusBar = LinearLayout(context).apply {
            orientation = HORIZONTAL
            setBackgroundColor(Color.parseColor("#EEEEEE"))
            gravity = Gravity.CENTER_VERTICAL
            setPadding(dp(8), dp(4), dp(8), dp(4))
        }

        val switchBtn = TextView(context).apply {
            text = "⌨️"
            textSize = 18f
            gravity = Gravity.CENTER
            setOnClickListener { onSwitchKeyboard?.invoke() }
            setPadding(dp(8), dp(4), dp(8), dp(4))
        }

        val deleteBtn = TextView(context).apply {
            text = "⌫"
            textSize = 18f
            gravity = Gravity.CENTER_VERTICAL or Gravity.END
            setOnClickListener { onDeletePressed?.invoke() }
            setPadding(dp(8), dp(4), dp(8), dp(4))
        }

        val spacer = View(context)
        val spacerParams = LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f)

        statusBar.addView(switchBtn)
        statusBar.addView(spacer, spacerParams)
        statusBar.addView(deleteBtn)
        addView(statusBar)
    }

    private fun buildSearchBar() {
        val container = LinearLayout(context).apply {
            orientation = HORIZONTAL
            setPadding(dp(8), dp(6), dp(8), dp(6))
            setBackgroundColor(Color.WHITE)
        }

        searchInput = EditText(context).apply {
            hint = "Search emojis..."
            setHintTextColor(Color.parseColor("#999999"))
            setTextColor(Color.BLACK)
            textSize = 15f
            background = null
            setPadding(dp(12), dp(8), dp(12), dp(8))
            background = context.getDrawable(android.R.drawable.edit_text)?.mutate()?.apply {
                setTint(Color.parseColor("#DDDDDD"))
            }
            addTextChangedListener(object : TextWatcher {
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                override fun afterTextChanged(s: Editable?) {
                    searchQuery = s?.toString() ?: ""
                    refreshGrid()
                }
            })
        }

        container.addView(searchInput, LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f))
        addView(container)
    }

    private fun buildCategoryBar() {
        categoryBar = LinearLayout(context).apply {
            orientation = HORIZONTAL
            setBackgroundColor(Color.WHITE)
        }

        val categories = listOf(EmojiCategory.RECENT) + EmojiCategory.values().filter { it != EmojiCategory.RECENT }

        for (category in categories) {
            val btn = TextView(context).apply {
                text = category.icon
                textSize = 22f
                gravity = Gravity.CENTER
                setPadding(dp(4), dp(10), dp(4), dp(10))
                isClickable = true
                isFocusable = true
                setOnClickListener {
                    selectedCategory = category
                    searchInput.setText("")
                    searchQuery = ""
                    updateCategoryHighlight()
                    refreshGrid()
                }
            }
            categoryBar.addView(btn, LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f))
        }

        addView(categoryBar)

        // Divider
        addView(View(context).apply {
            setBackgroundColor(Color.parseColor("#EEEEEE"))
        }, LayoutParams(LayoutParams.MATCH_PARENT, dp(1)))
    }

    private fun buildSkinTonePanel() {
        skinTonePanel = LinearLayout(context).apply {
            orientation = HORIZONTAL
            setBackgroundColor(Color.parseColor("#F0F0F0"))
            setPadding(dp(8), dp(4), dp(8), dp(4))
            visibility = GONE
            gravity = Gravity.CENTER
        }

        val tones = listOf("🏻", "🏼", "🏽", "🏾", "🏿")
        for (tone in tones) {
            val btn = TextView(context).apply {
                text = tone
                textSize = 26f
                gravity = Gravity.CENTER
                setPadding(dp(8), dp(4), dp(8), dp(4))
                setOnClickListener {
                    skinToneTarget?.let { item ->
                        val baseEmoji = item.emoji.replace(Regex("[🏻🏼🏽🏾🏿]"), "")
                        onEmojiSelected?.invoke("$baseEmoji$tone")
                        addToRecent("$baseEmoji$tone")
                        refreshGrid()
                    }
                    skinTonePanel.visibility = GONE
                    skinToneTarget = null
                }
            }
            skinTonePanel.addView(btn)
        }

        // Default (no tone) button
        val defaultBtn = TextView(context).apply {
            text = "✋"
            textSize = 26f
            gravity = Gravity.CENTER
            setPadding(dp(8), dp(4), dp(8), dp(4))
            setOnClickListener {
                skinToneTarget?.let { item ->
                    val baseEmoji = item.emoji.replace(Regex("[🏻🏼🏽🏾🏿]"), "")
                    onEmojiSelected?.invoke(baseEmoji)
                    addToRecent(baseEmoji)
                    refreshGrid()
                }
                skinTonePanel.visibility = GONE
                skinToneTarget = null
            }
        }
        skinTonePanel.addView(defaultBtn, 0)

        addView(skinTonePanel)
    }

    private fun buildGrid() {
        emojiGrid = GridView(context).apply {
            numColumns = 8
            columnWidth = dp(44)
            stretchMode = GridView.STRETCH_COLUMN_WIDTH
            setPadding(dp(4), dp(4), dp(4), dp(4))
            verticalSpacing = dp(2)
            horizontalSpacing = dp(2)
            clipToPadding = false
        }
        addView(emojiGrid, LayoutParams(LayoutParams.MATCH_PARENT, dp(220)))
    }

    fun refresh() {
        updateCategoryHighlight()
        refreshGrid()
    }

    private fun updateCategoryHighlight() {
        val categories = listOf(EmojiCategory.RECENT) + EmojiCategory.values().filter { it != EmojiCategory.RECENT }
        for (i in 0 until categoryBar.childCount) {
            val btn = categoryBar.getChildAt(i) as? TextView ?: continue
            val category = categories.getOrNull(i) ?: continue
            btn.setBackgroundColor(
                if (category == selectedCategory) Color.parseColor("#E8F0FE")
                else Color.TRANSPARENT
            )
        }
    }

    private fun refreshGrid() {
        val emojis = allEmojis
        val favorites = getFavorites()

        emojiGrid.adapter = object : BaseAdapter() {
            override fun getCount() = emojis.size
            override fun getItem(position: Int) = emojis[position]
            override fun getItemId(position: Int) = position.toLong()

            override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
                val item = emojis[position]
                val container = FrameLayout(context).apply {
                    setPadding(dp(2), dp(2), dp(2), dp(2))
                }

                val tv = TextView(context).apply {
                    text = item.emoji
                    textSize = 26f
                    gravity = Gravity.CENTER
                    setBackgroundColor(Color.parseColor("#F5F5F5"))
                    setPadding(dp(4), dp(4), dp(4), dp(4))
                }

                tv.setOnClickListener {
                    if (item.hasSkinTones && item.skinToneVariants.isNotEmpty()) {
                        skinToneTarget = item
                        skinTonePanel.visibility = VISIBLE
                    } else {
                        onEmojiSelected?.invoke(item.emoji)
                        addToRecent(item.emoji)
                        skinTonePanel.visibility = GONE
                    }
                }

                tv.setOnLongClickListener {
                    toggleFavorite(item.emoji)
                    refreshGrid()
                    true
                }

                container.addView(tv, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, dp(44)))

                if (favorites.contains(item.emoji)) {
                    val dot = View(context).apply {
                        setBackgroundColor(Color.RED)
                    }
                    val dotParams = FrameLayout.LayoutParams(dp(6), dp(6)).apply {
                        gravity = Gravity.TOP or Gravity.END
                        topMargin = dp(2)
                        rightMargin = dp(2)
                    }
                    dot.layoutParams = dotParams
                    (dot.background as? android.graphics.drawable.ShapeDrawable)?.shape = android.graphics.drawable.shapes.OvalShape()
                    container.addView(dot)
                }

                return container
            }
        }
    }

    // --- Storage ---

    private fun getRecentEmojis(): List<String> {
        val json = prefs.getString("moji_recent", null) ?: return emptyList()
        return try {
            val arr = JSONArray(json)
            (0 until arr.length()).map { arr.getJSONObject(it).getString("emoji") }
        } catch (e: Exception) { emptyList() }
    }

    private fun addToRecent(emoji: String) {
        val recent = getRecentEmojis().toMutableList()
        recent.remove(emoji)
        recent.add(0, emoji)
        if (recent.size > 25) recent.removeLast()
        val arr = JSONArray()
        recent.forEach {
            arr.put(JSONObject().apply {
                put("emoji", it)
                put("timestamp", System.currentTimeMillis())
            })
        }
        prefs.edit().putString("moji_recent", arr.toString()).apply()
    }

    private fun getFavorites(): Set<String> {
        val json = prefs.getString("moji_favorites", null) ?: return emptySet()
        return try {
            val arr = JSONArray(json)
            (0 until arr.length()).map { arr.getJSONObject(it).getString("emoji") }.toSet()
        } catch (e: Exception) { emptySet() }
    }

    private fun toggleFavorite(emoji: String) {
        val json = prefs.getString("moji_favorites", null)
        val arr = if (json != null) JSONArray(json) else JSONArray()
        val existing = (0 until arr.length()).indexOfFirst {
            arr.getJSONObject(it).getString("emoji") == emoji
        }
        if (existing >= 0) {
            arr.remove(existing)
        } else {
            val newEntry = JSONObject().apply {
                put("emojiId", emoji)
                put("emoji", emoji)
                put("timestamp", System.currentTimeMillis())
            }
            // Insert at beginning by rebuilding array
            val newArr = JSONArray()
            newArr.put(newEntry)
            for (i in 0 until arr.length()) newArr.put(arr.getJSONObject(i))
            prefs.edit().putString("moji_favorites", newArr.toString()).apply()
            return
        }
        prefs.edit().putString("moji_favorites", arr.toString()).apply()
    }
}

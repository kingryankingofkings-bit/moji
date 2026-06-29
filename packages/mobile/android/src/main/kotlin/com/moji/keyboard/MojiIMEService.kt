package com.moji.keyboard

import android.content.Context
import android.inputmethodservice.InputMethodService
import android.view.View
import android.view.inputmethod.EditorInfo

class MojiIMEService : InputMethodService() {

    private lateinit var keyboardView: EmojiKeyboardView

    override fun onCreateInputView(): View {
        keyboardView = EmojiKeyboardView(this)
        keyboardView.onEmojiSelected = { emoji ->
            currentInputConnection?.commitText(emoji, 1)
        }
        keyboardView.onDeletePressed = {
            currentInputConnection?.deleteSurroundingText(1, 0)
        }
        keyboardView.onSwitchKeyboard = {
            switchToNextInputMethod(false)
        }
        return keyboardView
    }

    override fun onStartInputView(info: EditorInfo?, restarting: Boolean) {
        super.onStartInputView(info, restarting)
        keyboardView.refresh()
    }
}

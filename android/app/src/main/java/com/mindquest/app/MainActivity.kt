package com.mindquest.app

import android.app.Activity
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.WindowInsets
import android.view.View
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.window.OnBackInvokedCallback

class MainActivity : Activity() {
    private lateinit var gameView: WebView
    // Keep API 33 callback instances as Object/Any in this API 23-loadable class.
    private var backCallback: Any? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        // Replace the launch-only theme before creating the game view.
        setTheme(R.style.AppTheme)
        super.onCreate(savedInstanceState)

        // The game is a bundled offline asset; remote WebView debugging is never needed.
        WebView.setWebContentsDebuggingEnabled(false)
        gameView = WebView(this)
        gameView.settings.apply {
            javaScriptEnabled = true // Required by the bundled game only.
            domStorageEnabled = true // Local preferences and best score.
            allowFileAccess = true // Required to load bundled APK assets.
            allowContentAccess = false
            allowFileAccessFromFileURLs = false
            allowUniversalAccessFromFileURLs = false
            javaScriptCanOpenWindowsAutomatically = false
            setSupportMultipleWindows(false)
            mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_NEVER_ALLOW
        }
        gameView.webViewClient = object : WebViewClient() {
            private fun isAllowedEntryPoint(uri: Uri): Boolean {
                // Permit only the bundled document; allow its fragment for in-app state.
                return uri.scheme == "file" &&
                    uri.host == null &&
                    uri.path == "/android_asset/index.html" &&
                    uri.query == null
            }

            @Deprecated("Deprecated by Android; retained for API 23 compatibility.")
            override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                // API 23 does not provide WebResourceRequest or an isForMainFrame flag.
                return !isAllowedEntryPoint(Uri.parse(url))
            }

            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean {
                return !request.isForMainFrame || !isAllowedEntryPoint(request.url)
            }
        }
        setContentView(gameView)

        // Android 15 enforces edge-to-edge for apps targeting API 35.
        // Keep API 30 inset APIs outside this API 23-loadable class.
        if (Build.VERSION.SDK_INT >= 35) {
            gameView.setOnApplyWindowInsetsListener { view, insets ->
                Api30WindowInsetsHandler.apply(view, insets)
            }
            gameView.requestApplyInsets()
        }

        gameView.loadUrl("file:///android_asset/index.html")

        // Android 13+ predictive-back types are isolated in an API-specific helper.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            val callback = Api33BackHandler.createCallback {
                if (gameView.canGoBack()) {
                    gameView.goBack()
                } else {
                    finish()
                }
            }
            backCallback = callback
            Api33BackHandler.register(this, callback)
        }
    }

    override fun onResume() {
        super.onResume()
        if (::gameView.isInitialized) {
            gameView.onResume()
            gameView.resumeTimers()
        }
    }

    override fun onPause() {
        if (::gameView.isInitialized) {
            gameView.onPause()
            gameView.pauseTimers()
        }
        super.onPause()
    }

    @Deprecated("Deprecated by Android; retained for Android 6.0–12 compatibility.")
    override fun onBackPressed() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            if (::gameView.isInitialized && gameView.canGoBack()) {
                gameView.goBack()
            } else {
                super.onBackPressed()
            }
        }
    }

    override fun onDestroy() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            backCallback?.let { callback ->
                Api33BackHandler.unregister(this, callback)
            }
            backCallback = null
        }
        if (::gameView.isInitialized) {
            gameView.apply {
                stopLoading()
                onPause()
                removeAllViews()
                destroy()
            }
        }
        super.onDestroy()
    }
}

// API 30 introduced typed window-inset APIs. Keep all references in a separate class
// that is reached only from an API 35+ guarded call site.
@android.annotation.TargetApi(30)
private object Api30WindowInsetsHandler {
    fun apply(view: View, insets: WindowInsets): WindowInsets {
        val safeInsets = insets.getInsets(
            WindowInsets.Type.systemBars() or
                WindowInsets.Type.displayCutout() or
                WindowInsets.Type.ime()
        )
        view.setPadding(
            safeInsets.left,
            safeInsets.top,
            safeInsets.right,
            safeInsets.bottom
        )
        return insets
    }
}

// API 33 introduced the predictive-back dispatcher/callback classes. Keep those
// types out of MainActivity fields and method signatures to preserve API 23 loading.
@android.annotation.TargetApi(33)
private object Api33BackHandler {
    fun createCallback(onBack: () -> Unit): Any =
        OnBackInvokedCallback { onBack() }

    fun register(activity: Activity, callback: Any) {
        activity.onBackInvokedDispatcher.registerOnBackInvokedCallback(
            android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT,
            callback as OnBackInvokedCallback
        )
    }

    fun unregister(activity: Activity, callback: Any) {
        activity.onBackInvokedDispatcher.unregisterOnBackInvokedCallback(
            callback as OnBackInvokedCallback
        )
    }
}

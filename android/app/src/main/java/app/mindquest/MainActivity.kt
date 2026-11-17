package app.mindquest

import android.app.Activity
import android.os.Build
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.view.WindowInsets
import android.window.OnBackInvokedCallback

class MainActivity : Activity() {
    private lateinit var gameView: WebView
    private var backCallback: OnBackInvokedCallback? = null

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
            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean {
                // Permit only the single bundled app document as a top-level destination.
                // Hash-based in-app state remains valid because it does not change the path.
                val uri = request.url
                val isBundledEntryPoint =
                    uri.scheme == "file" &&
                    uri.host == null &&
                    uri.path == "/android_asset/index.html"
                return !request.isForMainFrame || !isBundledEntryPoint
            }
        }
        setContentView(gameView)

        // Android 15 enforces edge-to-edge for apps targeting API 35.
        // Keep the local game content clear of system bars and display cutouts.
        if (Build.VERSION.SDK_INT >= 35) {
            gameView.setOnApplyWindowInsetsListener { view, insets ->
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
                insets
            }
            gameView.requestApplyInsets()
        }

        gameView.loadUrl("file:///android_asset/index.html")

        // Android 13+ uses the platform predictive-back dispatcher.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            backCallback = OnBackInvokedCallback {
                if (gameView.canGoBack()) {
                    gameView.goBack()
                } else {
                    finish()
                }
            }
            onBackInvokedDispatcher.registerOnBackInvokedCallback(
                android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                backCallback!!
            )
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
                onBackInvokedDispatcher.unregisterOnBackInvokedCallback(callback)
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

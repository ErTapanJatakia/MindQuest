package app.mindquest

import android.app.Activity
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : Activity() {
    private lateinit var gameView: WebView

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
        gameView.loadUrl("file:///android_asset/index.html")
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

    @Deprecated("Deprecated by Android; retained for compatibility with the minimum SDK.")
    override fun onBackPressed() {
        if (::gameView.isInitialized && gameView.canGoBack()) {
            gameView.goBack()
        } else {
            super.onBackPressed()
        }
    }

    override fun onDestroy() {
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

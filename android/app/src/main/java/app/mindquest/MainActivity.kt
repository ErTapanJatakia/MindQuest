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
                // The game is fully bundled. Do not navigate to external or remote pages.
                return request.url.scheme != "file" ||
                    request.url.host != null ||
                    !request.url.path.orEmpty().startsWith("/android_asset/")
            }
        }
        setContentView(gameView)
        gameView.loadUrl("file:///android_asset/index.html")
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
                loadUrl("about:blank")
                removeAllViews()
                destroy()
            }
        }
        super.onDestroy()
    }
}

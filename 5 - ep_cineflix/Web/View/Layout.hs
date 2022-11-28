module Web.View.Layout (defaultLayout, Html) where

import IHP.ViewPrelude
import IHP.Environment
import qualified Text.Blaze.Html5            as H
import qualified Text.Blaze.Html5.Attributes as A
import Generated.Types
import IHP.Controller.RequestContext
import Web.Types
import Web.Routes
import Application.Helper.View

defaultLayout :: Html -> Html
defaultLayout inner = H.docTypeHtml ! A.lang "en" $ [hsx|
<head>
    {metaTags}

    {stylesheets}

    <title>{pageTitleOrDefault "Cineflix - Seu portal de cinema online!"}</title>
</head>
<body>
    {inner}
    {scripts}
</body>
|]

-- The 'assetPath' function used below appends a `?v=SOME_VERSION` to the static assets in production
-- This is useful to avoid users having old CSS and JS files in their browser cache once a new version is deployed
-- See https://ihp.digitallyinduced.com/Guide/assets.html for more details

stylesheets :: Html
stylesheets = [hsx|
        <link rel="icon" href={assetPath "/img/logo.png"}/>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&display=swap">

        <link rel="stylesheet" href={assetPath "/css/bootstrap.min.css"}/>
        <link rel="stylesheet" href={assetPath "/css/font-awesome.min.css"}/>
        <link rel="stylesheet" href={assetPath "/css/elegant-icons.css"}/>
        <link rel="stylesheet" href={assetPath "/css/plyr.css"}/>
        <link rel="stylesheet" href={assetPath "/css/nice-select.css"}/>
        <link rel="stylesheet" href={assetPath "/css/owl.carousel.min.css"}/>
        <link rel="stylesheet" href={assetPath "/css/slicknav.min.css"}/>
        <link rel="stylesheet" href={assetPath "/css/style.css"}/>
    |]

scripts :: Html
scripts = [hsx|
        {when isDevelopment devScripts}
        <script src={assetPath "/js/jquery-3.3.1.min.js"}></script>
        <script src={assetPath "/js/bootstrap.min.js"}></script>
        <script src={assetPath "/js/player.js"}></script>
        <script src={assetPath "/js/jquery.nice-select.min.js"}></script>
        <script src={assetPath "/js/mixitup.min.js"}></script>
        <script src={assetPath "/js/jquery.slicknav.js"}></script>
        <script src={assetPath "/js/owl.carousel.min.js"}></script>
        <script src={assetPath "/js/main.js"}></script>
    |]

devScripts :: Html
devScripts = [hsx|
        <script id="livereload-script" src={assetPath "/livereload.js"} data-ws={liveReloadWebsocketUrl}></script>
    |]

metaTags :: Html
metaTags = [hsx|
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta property="og:title" content="App"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="TODO"/>
    <meta property="og:description" content="TODO"/>
    {autoRefreshMeta}
|]

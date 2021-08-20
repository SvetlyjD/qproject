require('node-env-file')('.env');
var fs = require('fs');
var dirDownload = './download';
const appConfig = require('../src/configs/app.json');

const { DOWNLOADPATH, IPABUNDLEID } = process.env;

fs.readdir(dirDownload, {}, (err, files) => {
  if (err) console.log('err', err)
  else {
    if (files.indexOf(appConfig.name + ".apk") === -1 || files.indexOf(appConfig.name + ".ipa") === -1) {
      console.log('Apk or ipa file does not exist');
      return;
    }

    fs.writeFileSync(dirDownload + '/index.html', indexHtml());
    fs.writeFileSync(dirDownload + '/app.plist', applist());
  }
})

const indexHtml = () => {
  return `
  <!DOCTYPE html>
  <html lang="en" class="ios device-pixel-ratio-1 device-desktop device-windows support-position-sticky">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <link rel="stylesheet" href="./css/framework7.ios.min.css">
    <link rel="stylesheet" href="./css/common.css">
    <link rel="stylesheet" href="./css/install.css" id="install-css">
    <link rel="stylesheet" href="./css/css/font-awesome.min.css">
    <title>Download app</title>
    <style>
        .ios .navbar-inner {
            justify-content: center;
        }
    </style>
  </head>

  <body>
      <div id="app" class="framework7-root">
          <div class="views">
              <div class="view view-main">
                  <div class="navbar">
                      <div class="navbar-inner">
                          <div class="title sliding" style="left: 0px;">${appConfig.name}</div>
                      </div>
                  </div>
                  <div class="page page-current" data-name="install">
                      <div class="page-content">
                          <div class="block-title">Download APK</div>
                          <div class="list tablet-inset">
                              <ul>
                                  <li>
                                      <a class="item-link item-content external"
                                          href="${DOWNLOADPATH}/${appConfig.name}.apk">
                                          <div class="item-media"><i class="fa fa-android" aria-hidden="true"></i></div>
                                          <div class="item-inner">
                                              <div class="item-title">Download application</div>
                                          </div>
                                      </a>
                                  </li>
                              </ul>
                              <div class="block-footer">Open this page in Browser on your Android device to be able to
                                  download the app</div>
                          </div>
                          <div class="block-title">Install IPA</div>
                          <div class="list tablet-inset">
                              <ul>
                                  <li>
                                      <a class="item-link item-content external"
                                          href="itms-services://?action=download-manifest&url=${DOWNLOADPATH}/app.plist">
                                          <div class="item-media"><i class="fa fa-apple" aria-hidden="true"></i></div>
                                          <div class="item-inner">
                                              <div class="item-title">Install application</div>
                                          </div>
                                      </a>
                                  </li>
                              </ul>
                              <div class="block-footer">Open this page in Safari on your iOS device to be able to
                                  install the app</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </body>
  </html>`
}

const applist = () => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>items</key>
        <array>
            <dict>
                <key>assets</key>
                <array>
                    <dict>
                        <key>kind</key>
                        <string>software-package</string>
                        <key>url</key>
                        <string>${DOWNLOADPATH}/${appConfig.name}.ipa</string>
                    </dict>
                </array>
                <key>metadata</key>
                <dict>
                    <key>bundle-identifier</key>
                    <string>${IPABUNDLEID}</string>
                    <key>bundle-version</key>
                    <string>1.0</string>
                    <key>kind</key>
                    <string>software</string>
                    <key>title</key>
                    <string>${appConfig.name}</string>
                </dict>
            </dict>
        </array>
    </dict>
    </plist>`
}


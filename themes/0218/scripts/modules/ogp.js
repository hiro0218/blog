const nodeHtmlToImage = require('node-html-to-image');
const fontData = require('./fontdata');

module.exports = async function (content) {
  nodeHtmlToImage({
    html: `<html lang="ja">
    <head>
      <style>
        @font-face {
          font-family: 'NotoSansJP';
          src: url("data:font/woff;base64,${fontData}");
        }
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1em 2em;
          font-family: 'NotoSansJP', sans-serif;
        }
        .title {
          margin: 0;
          color: #212529;
          font-size: 1.85em;
          line-height: 1.75;
        }
        .url {
          position: absolute;
          right: 1em;
          bottom: 1em;
          z-index: 1;
          color: #343a40;
          font-size: 1em;
        }
      </style>
    </head>
    <body>
      <h1 class="title">{{title}}</h1>
      <div class="url">b.0218.jp</div>
    </body>
  </html>
  `,
    content: content,
    puppeteerArgs: {
      defaultViewport: {
        width: 600,
        height: 315,
      },
    },
  }).then(() => console.log('OGP Image Generated.'));
};

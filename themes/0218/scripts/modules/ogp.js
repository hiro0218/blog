const nodeHtmlToImage = require('node-html-to-image');
const font2base64 = require('node-font2base64');
const fontData = font2base64.encodeToDataUrlSync('./font/NotoSansCJKjp-Black.min.woff2');

const html = () => {
  return `<html lang="ja">
    <head>
      <style>
        @font-face {
          font-family: 'NotoSansJP';
          src: url(${fontData}) format('woff2');
        }
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1em 8vw;
          font-family: "NotoSansJP", sans-serif;
          font-feature-settings: "palt" 1;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .title {
          margin: 0;
          color: #212529;
          font-size: 5vw;
          line-height: 1.5;
          text-align: center;
        }
        .url {
          position: absolute;
          right: auto;
          left: auto;
          bottom: 1em;
          z-index: 1;
          color: #868e96;
          font-family: sans-serif;
          font-size: 2.5vw;
        }
      </style>
    </head>
    <body>
      <h1 class="title">{{title}}</h1>
      <div class="url">b.0218.jp</div>
    </body>
  </html>`;
};

module.exports = function (content) {
  let numberOfExecutions = 0;
  const contentLength = content.length;

  nodeHtmlToImage({
    html: html(),
    content: content,
    puppeteerArgs: {
      defaultViewport: {
        width: 1200,
        height: 630,
      },
      devtools: false,
    },
    beforeScreenshot: () => {
      console.log(
        'OGP Image Generated:',
        content[numberOfExecutions].output.replace('./public/images/ogp/', ''),
        `(${++numberOfExecutions}/${contentLength})`,
      );
    },
  }).then(() => console.log('OGP Image Generated.'));
};

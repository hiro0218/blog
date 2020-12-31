const nodeHtmlToImage = require('node-html-to-image');
const fontData = require('./fontdata');

const html = () => {
  return `<html lang="ja">
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
          padding: 1em 8vw;
          font-family: 'NotoSansJP', sans-serif;
          background: #fff;
        }
        .title {
          margin: 0;
          color: #212529;
          font-size: 5vw;
          line-height: 1.75;
          text-align: center;
          word-break: break-word;
        }
        .url {
          position: absolute;
          right: auto;
          left: auto;
          bottom: 1em;
          z-index: 1;
          color: #343a40;
          font-size: 2.5vw;
          font-family: sans-serif;
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

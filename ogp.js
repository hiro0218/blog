const fs = require('fs-extra');
const nodeHtmlToImage = require('node-html-to-image');

const ogpImages = [];
const ogpDirectoryPath = './public/images/ogp';

const html = () => {
  return `<html lang="ja">
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&display=swap');
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1em 8vw;
          font-family: 'Noto Sans JP', sans-serif;
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

const generateOgpImage = (content) => {
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
    waitUntil: 'networkidle0',
    beforeScreenshot: () => {
      console.log(
        'OGP Image Generated:',
        content[numberOfExecutions].output.replace(ogpDirectoryPath, ''),
        `(${++numberOfExecutions}/${contentLength})`,
      );
    },
  }).then(() => console.log('OGP Image Generated.'));
};

(async () => {
  fs.ensureDirSync(ogpDirectoryPath);

  fs.readJson('./public/archives.json')
    .then((archives) => {
      archives.forEach((post) => {
        ogpImages.push({
          title: post.title,
          output: `${ogpDirectoryPath}/${post.path.replace('.html', '')}.png`,
        });
      });
    })
    .then(() => {
      // OGP image を生成
      generateOgpImage(ogpImages);
    })
    .catch((err) => {
      console.error(err);
    });
})();

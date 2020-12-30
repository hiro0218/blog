const fs = require('fs-extra');
const path = require('path');
const generateOgpImage = require('./themes/0218/scripts/modules/ogp');

const ogpImages = [];
const ogpDirectoryPath = './public/images/ogp';

const makeOgpDir = () => {
  try {
    // 対象のディレクトリが存在するか
    fs.statSync(ogpDirectoryPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // ディレクトリを作成
      fs.mkdirsSync(path.resolve(ogpDirectoryPath));
    }
  }
};

(async () => {
  makeOgpDir();

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

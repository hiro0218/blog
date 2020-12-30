const fs = require('fs-extra');
const generateOgpImage = require('./themes/0218/scripts/modules/ogp');

const ogpImages = [];
const ogpDirectoryPath = './public/images/ogp';

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

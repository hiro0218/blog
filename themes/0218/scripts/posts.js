const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const utils = require('./modules/utils');
const generateOgpImage = require('./modules/ogp');

const getTerms = (terms) => {
  const data = [];

  terms.forEach((term) => {
    data.push({
      name: term.name,
      slug: term.slug,
      path: encodeURI(term.path),
    });
  });

  return data;
};

const getConduitLinks = (conduit) => {
  if (!conduit) return {};

  return {
    title: conduit.title,
    path: conduit.path,
  };
};

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

hexo.extend.generator.register('posts', (locals) => {
  const posts = locals.posts;
  const data = [];
  const ogpImages = [];

  makeOgpDir();

  posts.forEach((post) => {
    ogpImages.push({
      title: post.title,
      output: `${ogpDirectoryPath}/${post.slug}.png`,
    });

    // 記事内容をパースする
    const $ = cheerio.load(post.content);

    data.push({
      title: post.title,
      path: post.path,
      permalink: encodeURI(post.permalink),
      date: post.date.toDate().toISOString(),
      updated: post.updated.toDate().toISOString(),
      thumbnail: utils.getThumbnail(post.content),
      content: $('body').html(),
      excerpt: utils.getHeadings(post.content),
      categories: getTerms(post.categories.data),
      tags: getTerms(post.tags.data),
      prev: getConduitLinks(post.prev),
      next: getConduitLinks(post.next),
    });
  });

  // OGP image を生成
  generateOgpImage(ogpImages);

  // sort: 日付順
  data.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });

  return {
    path: 'posts.json',
    data: JSON.stringify(data),
  };
});

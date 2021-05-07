const cheerio = require('cheerio');
const utils = require('./modules/utils');

const getTerms = (terms) => {
  const data = [];

  terms.forEach((term) => {
    data.push({
      name: term.name,
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

hexo.extend.generator.register('posts', (locals) => {
  const posts = locals.posts;
  const data = [];

  posts.forEach((post) => {
    // 記事内容をパースする
    const $ = cheerio.load(post.content);

    data.push({
      title: post.title,
      path: post.path,
      date: post.date.toDate().toISOString(),
      updated: post.updated.toDate().toISOString(),
      content: $('body').html(),
      excerpt: utils.getHeadings(post.content),
      categories: getTerms(post.categories.data),
      tags: getTerms(post.tags.data),
      prev: getConduitLinks(post.prev),
      next: getConduitLinks(post.next),
    });
  });

  // sort: 日付順
  data.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });

  return {
    path: 'posts.json',
    data: JSON.stringify(data),
  };
});

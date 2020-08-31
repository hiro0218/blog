const cheerio = require('cheerio');
const utils = require('./modules/utils');

hexo.extend.generator.register('pages', (locals) => {
  const posts = locals.pages;
  const data = [];

  posts.forEach((post) => {
    // 記事内容をパースする
    const $ = cheerio.load(post.content);

    data.push({
      title: post.title,
      path: post.path,
      slug: post.slug,
      date: post.date.toDate().toISOString(),
      updated: post.updated.toDate().toISOString(),
      content: $('body').html(),
      excerpt: utils.getHeadings(post.content),
    });
  });

  return {
    path: 'pages.json',
    data: JSON.stringify(data),
  };
});

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

hexo.extend.generator.register('posts', (locals) => {
  const posts = locals.posts;
  const data = [];
  const ogpImages = [];

  posts.forEach((post) => {
    ogpImages.push({
      title: post.title,
      output: `./public/images/ogp/${post.slug}.png`,
    });

    data.push({
      title: post.title,
      path: post.path,
      permalink: encodeURI(post.permalink),
      date: post.date.toDate().toISOString(),
      updated: post.updated.toDate().toISOString(),
      thumbnail: utils.getThumbnail(post.content),
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

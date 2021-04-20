const utils = require('./modules/utils');

const isIgnoreCategory = (categories) => {
  let isIgnore = false;
  const category_name = '名探偵コナン';

  for (let i = 0; i < categories.data.length; i++) {
    const data = categories.data[i];
    if (data.name === category_name) {
      isIgnore = true;
      break;
    }
  }

  return isIgnore;
};

hexo.extend.generator.register('archives', (locals) => {
  const data = [];

  locals.posts.forEach((post) => {
    data.push({
      title: post.title,
      date: post.date,
      path: post.path,
      excerpt: utils.getHeadings(post.content),
    });
  });

  // sort: 日付順
  data.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });

  return {
    path: 'archives.json',
    data: JSON.stringify(data),
  };
});

hexo.extend.generator.register('recent_posts', (locals) => {
  const data = [];

  locals.posts.forEach((post) => {
    if (!isIgnoreCategory(post.categories)) {
      data.push({
        title: post.title,
        date: post.date,
        updated: post.updated,
        path: post.path,
        excerpt: utils.getHeadings(post.content),
      });
    }
  });

  // sort: 更新日付順
  data.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });

  // 5件絞り込み
  const posts = data.filter((_, i) => i < 5);

  return {
    path: 'recent_posts.json',
    data: JSON.stringify(posts),
  };
});

hexo.extend.generator.register('updates_posts', (locals) => {
  const data = [];

  locals.posts.forEach((post) => {
    if (!isIgnoreCategory(post.categories)) {
      data.push({
        title: post.title,
        date: post.date,
        updated: post.updated,
        path: post.path,
        excerpt: utils.getHeadings(post.content),
      });
    }
  });

  // sort: 更新日付順
  data.sort((a, b) => {
    return a.updated < b.updated ? 1 : -1;
  });

  // 5件絞り込み
  const posts = data.filter((value) => value.date.toDate() < value.updated.toDate()).filter((_, i) => i < 5);

  return {
    path: 'updates_posts.json',
    data: JSON.stringify(posts),
  };
});

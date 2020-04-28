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

hexo.extend.generator.register('posts', (locals) => {
  const posts = locals.posts;
  const data = [];

  posts.forEach((post) => {
    data.push({
      title: post.title,
      path: post.path,
      permalink: encodeURI(post.permalink),
      date: post.updated.toDate().toISOString(),
      updated: post.date.toDate().toISOString(),
      categories: getTerms(post.categories.data),
      tags: getTerms(post.tags.data),
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

hexo.extend.generator.register('archives', (locals) => {
  const posts = locals.posts;
  const data = [];

  posts.forEach((post) => {
    data.push({
      title: post.title,
      date: post.date,
      path: post.path,
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

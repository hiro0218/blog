hexo.extend.generator.register('tags', (locals) => {
  const tags = locals.tags;
  const data = [];

  tags.forEach((tag) => {
    data.push({
      name: tag.name,
      count: tag.length,
    });
  });

  // sort: 件数順
  data.sort((a, b) => {
    return a.count < b.count ? 1 : -1;
  });

  return {
    path: 'tags.json',
    data: JSON.stringify(data),
  };
});

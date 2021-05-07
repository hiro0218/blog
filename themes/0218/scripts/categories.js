hexo.extend.generator.register('categories', (locals) => {
  const categories = locals.categories;
  const data = [];

  categories.forEach((category) => {
    data.push({
      name: category.name,
      count: category.length,
    });
  });

  // sort: 件数順
  data.sort((a, b) => {
    return a.count < b.count ? 1 : -1;
  });

  return {
    path: 'categories.json',
    data: JSON.stringify(data),
  };
});

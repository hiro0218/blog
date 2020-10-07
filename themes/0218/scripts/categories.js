hexo.extend.generator.register('categories', (locals) => {
  const categories_data = locals.data.categories;
  const categories = locals.categories;
  const data = [];

  categories.forEach((category) => {
    const [category_data] = categories_data.filter((data) => data.name === category.name);

    data.push({
      name: category.name,
      slug: category.slug,
      path: encodeURI(category.path),
      count: category.length,
      pickup: !!category_data,
      logo: category_data ? category_data.logo : '',
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

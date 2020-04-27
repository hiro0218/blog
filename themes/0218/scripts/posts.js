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

/**
 * h2の内容をを取得して中身を取り出す
 */
const getHeadings = (content) => {
  const headings = content.match(/<h2>(.*?)<\/h2>/gim);

  if (!headings) return '';

  const excerpt = headings
    .map((a) => {
      return a.replace(/<(|\/)h2>/gim, '');
    })
    .join(' / ');

  return excerpt;
};

hexo.extend.generator.register('posts', (locals) => {
  const posts = locals.posts;
  const data = [];

  posts.forEach((post) => {
    const excerpt = getHeadings(post.content);

    data.push({
      title: post.title,
      path: post.path,
      permalink: encodeURI(post.permalink),
      date: post.updated.toDate().toISOString(),
      updated: post.date.toDate().toISOString(),
      excerpt: excerpt,
      categories: getTerms(post.categories.data),
      tags: getTerms(post.tags.data),
    });
  });

  return {
    path: 'posts.json',
    data: JSON.stringify(data),
  };
});

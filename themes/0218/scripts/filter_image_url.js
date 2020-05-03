const URL = 'https://hiro0218.github.io/blog';

hexo.extend.filter.register('after_post_render', function (data) {
  data.content = data.content.replace(/\/images\/([^&\/]+)\.+(jpg|png|gif)/gim, `${URL}$&`);

  return data;
});

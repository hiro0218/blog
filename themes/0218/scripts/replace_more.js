hexo.extend.filter.register('after_post_render', function (data) {
  data.content = data.content.replace('<a id="more"></a>', '\r\n<div class="more js-separate"></div>\r\n');

  return data;
});

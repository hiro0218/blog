const cheerio = require('cheerio');

module.exports = {
  /**
   * h2の内容をを取得して中身を取り出す
   */
  getHeadings(content) {
    const $ = cheerio.load(content);
    const $h2 = $('h2');
    const headings = [];

    $h2.each(function (i) {
      // 5つだけ抽出
      if (i < 5) {
        headings[i] = $(this).text();
      }
    });

    return headings.join(' / ');
  },

  /**
   * 記事内容から画像URLを取得する
   */
  getThumbnail(content) {
    const $ = cheerio.load(content);
    const $img = $('img[src]');
    const regex = new RegExp('^(https)://', 'i');
    let thumbnail = '';

    $img.each(function (i) {
      const src = $(this).attr('src');

      // 妥当性をチェック
      if (regex.test(src)) {
        thumbnail = src;
      }
    });

    return thumbnail;
  },
};

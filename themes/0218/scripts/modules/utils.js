module.exports = {
  /**
   * h2の内容をを取得して中身を取り出す
   */
  getHeadings(content) {
    const headings = content.match(/<h2>(.*?)<\/h2>/gim);

    if (!headings) return '';

    const excerpt = headings
      .map((a) => {
        return a.replace(/<(|\/)h2>/gim, '');
      })
      .join(' / ');

    return excerpt;
  },

  /**
   * 記事内容から画像URLを取得する
   */
  getThumbnail(content) {
    // img要素のデータを取得
    const imgData = content.match(/img.*?src\=([^\s]*)\s/);
    if (imgData) {
      // src属性の中身を取得
      const srcWithQuotes = imgData[1];
      const src = srcWithQuotes.substring(1, srcWithQuotes.length - 1);

      // 妥当性をチェック
      const regex = new RegExp('^(https)://', 'i');
      if (regex.test(src)) {
        return src;
      }
    }

    return '';
  },
};

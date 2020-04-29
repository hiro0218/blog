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
};

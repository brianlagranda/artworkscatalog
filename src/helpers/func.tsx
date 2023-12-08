module.exports = {
  extractHtmlTags(text: string) {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  },

  shortText(text: string) {
    const dotIndex = text.indexOf('.');

    return text.slice(0, dotIndex + 1);
  },
};

module.exports = {
  extractShortDescription(description: string) {
    const dotIndex = description.indexOf('.');

    const shortDescription = description.slice(0, dotIndex + 1);

    return shortDescription.replace(/<\/?[^>]+(>|$)/g, '');
  },
};

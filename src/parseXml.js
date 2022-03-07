import uniqueId from 'lodash/uniqueId.js';

export default (data, url) => {
  const parser = new DOMParser();
  const feedId = uniqueId();
  const xmlDoc = parser.parseFromString(data.contents, 'application/xml');
  const feedTitle = xmlDoc.querySelector('channel > title').textContent;
  const feedDescription = xmlDoc.querySelector('channel > description').textContent;
  const posts = Array.from(xmlDoc.querySelectorAll('item')).map((item) => {
    const title = item.querySelector('title').textContent;
    const id = uniqueId();
    const link = item.querySelector('link').textContent;
    const description = item.querySelector('description').textContent;
    return {
      id,
      title,
      link,
      description,
      feedId,
    };
  });

  return {
    id: feedId,
    url,
    feedTitle,
    feedDescription,
    posts,
  };
};

import { differenceWith, isEqual, uniqueId } from 'lodash';
import axios from 'axios';
import parseXml from './parseXml.js';
import useProxy from './utils/useProxy.js';

const setAutoUpdate = (watchedState, i18n) => {
  if (watchedState.feeds.length === 0) {
    setTimeout(() => setAutoUpdate(watchedState), 10000);
    return;
  }

  const promises = watchedState.feeds.map(({ url, id }) => axios.get(useProxy(url))
    .then((response) => {
      if (response.status === 200) return response;
      throw new Error(i18n.t('formErrors.network'));
    })
    .then((fetchedData) => {
      const parsedData = parseXml(fetchedData, url);
      const oldPosts = watchedState.posts.filter((post) => post.feedId === id);
      const titles = oldPosts.map((post) => post.title);
      const newPosts = differenceWith(parsedData.posts, oldPosts, isEqual)
        .filter((newPost) => !titles.includes(newPost.title))
        .map((item) => ({
          id: uniqueId(),
          title: item.title,
          link: item.link,
          description: item.description,
          feedId: item.feeds,
          state: item.state,
        }));
      watchedState.posts.unshift(...newPosts);
    })
    .catch((e) => {
      console.warn(e);
    }));
  Promise.all(promises).then(() => {
    setTimeout(() => setAutoUpdate(watchedState), 10000);
  });
};

export default setAutoUpdate;

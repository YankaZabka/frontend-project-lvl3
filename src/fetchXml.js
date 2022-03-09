import axios from 'axios';
import parseXml from './parseXml.js';
import useProxy from './utils/useProxy.js';

export default (state, watchedState, url, i18n) => axios.get(useProxy(url))
  .then((response) => {
    if (response.status === 200) {
      watchedState.form.status = 'succeed';
      return response;
    }
    throw new Error(i18n.t('formErrors.network'));
  })
  .then((fetchedData) => {
    try {
      const parsedData = parseXml(fetchedData, url);
      watchedState.feeds.unshift({
        title: parsedData.feedTitle,
        description: parsedData.feedDescription,
        id: parsedData.id,
        url: parsedData.url,
      });
      watchedState.posts.unshift(...parsedData.posts);
    } catch (e) {
      throw new Error(i18n.t('formErrors.parsing'));
    }
    watchedState.form.status = 'ready';
  })
  .catch((err) => {
    if (err.message.includes('Network')) {
      watchedState.form.error = i18n.t('formErrors.network');
      return;
    }
    watchedState.form.error = err.message;
    watchedState.form.status = 'ready';
  });

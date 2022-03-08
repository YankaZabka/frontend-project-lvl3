import axios from 'axios';
import parseXml from './parseXml.js';
import useProxy from './utils/useProxy.js';

export default (state, watchedState, url, i18n) => {
  const proxyfyUrl = useProxy(url);

  console.log('PROXYFYURL!!!', proxyfyUrl);

  return axios.get(proxyfyUrl)
    .then((response) => {
      if (response.status === 200) return response;
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
    })
    .catch((err) => {
      watchedState.form.error = err.message;
    });
};

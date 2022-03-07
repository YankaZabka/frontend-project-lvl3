import fetchXml from './fetchXml.js';

const setAutoUpdate = (state, watchedState, i18nInstance) => {
  if (state.feeds.length === 0) {
    setTimeout(() => setAutoUpdate(state, watchedState, i18nInstance), 5000);
    return;
  }
  state.feeds.forEach(({ url }) => {
    const updateFeed = () => {
      fetchXml(state, watchedState, url, i18nInstance, true)
        .then(() => {
          setTimeout(() => updateFeed(), 5000);
        });
    };
    updateFeed();
  });
};

export default setAutoUpdate;

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap"
import 'regenerator-runtime/runtime.js';
import 'core-js/stable';
import i18n from 'i18next';
import getWatchedState from './view.js';
import isValidUrl from './yupValidate.js';
import resources from './locales/index.js';
import fetchXml from './fetchXml.js';
import setAutoUpdate from './setAutoUpdate.js';

const DEFAULT_LANGUAGE = 'ru';

const app = () => {
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: DEFAULT_LANGUAGE,
    debug: false,
    resources,
  }).catch((e) => {
    console.log('Localization error: ', e.message);
  });

  const state = {
    form: {
      feedback: '',
      error: '',
    },
    feeds: [],
    posts: [],
  };

  const formEl = document.querySelector('.rss-form');
  const inputEl = document.querySelector('#url-input');
  const feedbackEl = document.querySelector('.feedback');
  const feedsContainer = document.querySelector('.feeds');
  const postsContainer = document.querySelector('.posts');

  const elements = {
    formEl,
    inputEl,
    feedbackEl,
    feedsContainer,
    postsContainer,
  };

  const watchedState = getWatchedState(state, elements, i18nInstance);

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rssUrl = formData.get('url');

    isValidUrl(state.feeds, rssUrl, i18nInstance)
      .then(() => fetchXml(state, watchedState, rssUrl, i18nInstance))
      .catch((err) => {
        watchedState.form.error = err.message;
      });
  });

  setAutoUpdate(watchedState, i18nInstance);

};

app();

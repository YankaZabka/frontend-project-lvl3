import 'bootstrap/dist/css/bootstrap.min.css';
import 'regenerator-runtime/runtime.js';
import 'core-js/stable';
import getWatchedState from './view.js';
import isValidUrl from './yupValidate.js';
import i18n from "i18next";
import resources from "./locales/index"


const DEFAULT_LANGUAGE = 'ru';

const app = () => {

  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: DEFAULT_LANGUAGE,
    debug: false,
    resources,
  }).catch((e) => {
    console.log("Localization error: ", e.message)
  });

  const state = {
    form: {
      state: 'empty',
      feedback: '',
      error: '',
    },
    feeds: [],
    posts: [],
  };

  const formEl = document.querySelector('.rss-form');
  const inputEl = document.querySelector('#url-input');
  const feedbackEl = document.querySelector('.feedback');

  const elements = {
    formEl,
    inputEl,
    feedbackEl,
  };

  const watchedState = getWatchedState(state, elements, i18nInstance);

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rssUrl = formData.get('url');

    isValidUrl(state.feeds, rssUrl, i18nInstance)
      .then((response) => {
        watchedState.feeds.push(response);
      }).catch((err) => {
        watchedState.form.error = err.message;
      });
  });
};

app();

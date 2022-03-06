import 'bootstrap/dist/css/bootstrap.min.css';
import 'regenerator-runtime/runtime.js';
import 'core-js/stable';
import getWatchedState from './view.js';
import isValidUrl from './yupValidate.js';

const app = () => {
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

  const watchedState = getWatchedState(state, elements);

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rssUrl = formData.get('url');

    isValidUrl(state.feeds, rssUrl)
      .then((response) => {
        watchedState.feeds.push(response);
      }).catch((err) => {
        watchedState.form.error = err.message;
      });
  });
};

app();

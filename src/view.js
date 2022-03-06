import onChange from 'on-change';

export default (state, { feedbackEl, formEl, inputEl }, i18n) => {
  const watchedState = onChange(state, (path, value, previousValue) => {
    console.log('path:', path);
    console.log('value:', value);
    console.log('previousValue:', previousValue);

    if (path === 'feeds') {
      feedbackEl.textContent = i18n.t('formSuccess');
      feedbackEl.classList.remove('text-danger');
      feedbackEl.classList.add('text-success');

      inputEl.classList.remove('is-invalid');
      formEl.reset();
      inputEl.focus();
    } else if (path === 'form.error') {
      inputEl.classList.add('is-invalid');
      feedbackEl.textContent = value;

      feedbackEl.classList.remove('text-success');
      feedbackEl.classList.add('text-danger');
    }
  });

  return watchedState;
};

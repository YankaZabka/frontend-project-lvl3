import parseXml from './parseXml.js';

export default (state, watchedState, url, i18n, isUpdating = false) => fetch(`https://hexlet-allorigins.herokuapp.com/get?url=
                                ${encodeURIComponent(url)
}`)
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error(i18n.t('formErrors.network'));
  })
  .then((data) => {
    try {
      const parsedData = parseXml(data, url);
      if (isUpdating) {
        const updateFeedId = state.feeds.find((feed) => feed.url === url).id;
        const restPosts = state.posts.filter((post) => post.feedId !== updateFeedId);
        const updatedPosts = parsedData.posts.map((post) => ({
          id: post.id,
          title: post.title,
          link: post.link,
          description: post.description,
          feedId: updateFeedId,
        }));
        watchedState.posts = [...restPosts, ...updatedPosts];
      } else {
        watchedState.feeds.push({
          title: parsedData.feedTitle,
          description: parsedData.feedDescription,
          id: parsedData.id,
          url: parsedData.url,
        });
        watchedState.posts = [...state.posts, ...parsedData.posts];
      }
    } catch (e) {
      throw new Error(i18n.t('formErrors.parsing'));
    }
  })
  .catch((err) => {
    watchedState.form.error = err.message;
  });

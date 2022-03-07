import parseXml from "./parseXml";

export default (state, watchedState, url, i18n) => {
    fetch(`https://hexlet-allorigins.herokuapp.com/get?url=
                                ${encodeURIComponent(url)
    }`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error(i18n.t('formErrors.network'))
        })
        .then(data => {
            try {
                const parsedData = parseXml(data)
                watchedState.feeds.push({
                    title: parsedData.feedTitle,
                    description: parsedData.feedDescription,
                    id: parsedData.id,
                    link: parsedData.feedLink
                });
                watchedState.posts = [...state.posts, ...parsedData.posts]
            } catch(e) {
                throw new Error(i18n.t('formErrors.parsing'))
            }
        })
        .catch((err) => {
            watchedState.form.error = err.message
        })
}

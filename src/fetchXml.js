import parseXml from './parseXml.js';
import axios from "axios"
import useProxy from "./utils/useProxy.js";

export default (state, watchedState, url, i18n) =>
    axios.get(useProxy(url))
        .then((response) => {
            console.log("response", response)
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
                    watchedState.posts.unshift(...parsedData.posts)
            } catch (e) {
                throw new Error(i18n.t('formErrors.parsing'));
            }
        })
        .catch((err) => {
            watchedState.form.error = err.message;
        });

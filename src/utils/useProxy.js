export default (url) => {
    const processedByProxy = new URL('https://hexlet-allorigins.herokuapp.com/get?');
    processedByProxy.searchParams.set('url', url);
    processedByProxy.searchParams.set('disableCache', true);
    return processedByProxy.toString();
};

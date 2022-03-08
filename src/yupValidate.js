import * as yup from 'yup';

export default (feeds, newUrl, i18n) => {
  const schema = yup.object({
    url: yup.string()
      .url(i18n.t('formErrors.wrongUrl'))
      .test(
        'is-uniq',
        () => i18n.t('formErrors.isUniq'),
        () => {
          const sameUrl = feeds.find((item) => item.url === newUrl);
          return sameUrl === undefined;
        },
      ),
  });

  return schema.validate({ url: newUrl });
};

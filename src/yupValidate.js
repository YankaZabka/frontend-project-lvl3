import { object, string } from 'yup';

export default (feeds, newUrl) => {
  const schema = object({
    url: string()
      .url()
      .test(
        'is-uniq',
        () => 'RSS уже существует',
        () => {
          const sameUrl = feeds.find((item) => item.url === newUrl);
          return sameUrl === undefined;
        },
      ),
  });

  return schema.validate({ url: newUrl });
};

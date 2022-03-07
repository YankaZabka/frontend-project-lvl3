export default (container, feeds, i18n) => {
  container.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18n.t('feeds');
  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');

  feeds.forEach((item) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.classList.add('list-group-item', 'border-0', 'border-end-0');
    const titleEl = document.createElement('h3');
    titleEl.classList.add('h6', 'm-0');
    titleEl.textContent = item.title;
    const descripEl = document.createElement('p');
    descripEl.classList.add('m-0', 'small', 'text-black-50');
    descripEl.textContent = item.description;

    listGroupItem.append(titleEl, descripEl);
    listGroup.append(listGroupItem);
  });

  cardBody.append(cardTitle);
  card.append(cardBody, listGroup);
  container.append(card);
};

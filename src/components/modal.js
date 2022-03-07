const renderModal = (postData, link) => {
  if (link.classList.contains('fw-bold')) {
    link.classList.remove('fw-bold');
    link.classList.add('fw-normal');
  }

  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLink = document.querySelector('.full-article');
  modalTitle.textContent = postData.title;
  modalBody.textContent = postData.description;
  modalLink.setAttribute('href', postData.link);
};

export default renderModal;

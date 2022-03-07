export default (container, posts, i18n) => {
    container.innerHTML = ""
    const card = document.createElement("div")
    card.classList.add("card", "border-0")
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    const cardTitle = document.createElement("h2")
    cardTitle.classList.add("card-title", "h4")
    cardTitle.textContent = i18n.t("posts")
    const listGroup = document.createElement("ul")
    listGroup.classList.add("list-group", "border-0", "rounded-0")

    posts.forEach(item => {
        const listGroupItem = document.createElement("li")
        listGroupItem.classList.add("list-group-item",
            "d-flex", "justify-content-between", "align-items-start",
            "border-0", "border-end-0")
        const titleEl = document.createElement("a")
        titleEl.classList.add("fw-bold")
        titleEl.setAttribute("target", "_blank")
        titleEl.setAttribute("rel", "noopener noreferrer")
        titleEl.setAttribute("href", item.link)
        titleEl.dataset.id = item.id
        titleEl.textContent = item.title

        const btnEl = document.createElement("button")
        btnEl.classList.add("btn", "btn-outline-primary", "btn-sm")
        btnEl.setAttribute("type", "button")
        btnEl.dataset.id = item.id
        btnEl.dataset.bsToggle = "modal"
        btnEl.dataset.bsTarget = "#modal"
        btnEl.textContent = i18n.t("browsing")

        listGroupItem.append(titleEl, btnEl)
        listGroup.append(listGroupItem)
    })

    cardBody.append(cardTitle)
    card.append(cardBody, listGroup)
    container.append(card)
}

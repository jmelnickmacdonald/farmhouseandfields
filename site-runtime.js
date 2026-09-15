(function () {
  const content = window.FARMHOUSE_SITE_CONTENT || {};

  function valueAt(path) {
    return String(path || "")
      .split(".")
      .reduce(function (value, key) {
        return value && Object.prototype.hasOwnProperty.call(value, key)
          ? value[key]
          : undefined;
      }, content);
  }

  document.querySelectorAll("[data-site-text]").forEach(function (element) {
    const value = valueAt(element.dataset.siteText);
    if (value !== undefined && value !== null) {
      element.textContent = String(value);
    }
  });

  document.querySelectorAll("[data-site-src]").forEach(function (element) {
    const value = valueAt(element.dataset.siteSrc);
    if (value) {
      element.src = String(value);
    }
  });

  document.querySelectorAll("[data-site-if]").forEach(function (element) {
    const value = valueAt(element.dataset.siteIf);
    element.hidden = !String(value || "").trim();
  });


  document.querySelectorAll("[data-site-href]").forEach(function (element) {
    const value = valueAt(element.dataset.siteHref);
    if (value !== undefined && value !== null && String(value).trim()) {
      const prefix = element.dataset.siteHrefPrefix || "";
      element.href = prefix + String(value).trim();
    }
  });

  document.querySelectorAll("[data-site-tone]").forEach(function (element) {
    const value = String(valueAt(element.dataset.siteTone) || "wine").toLowerCase();
    element.classList.remove("notice-wine", "notice-river");
    element.classList.add(value === "river" ? "notice-river" : "notice-wine");
  });

  document.querySelectorAll("[data-site-list]").forEach(function (container) {
    const list = valueAt(container.dataset.siteList);
    if (!Array.isArray(list)) return;

    const tag = container.dataset.siteListTag || "p";
    container.innerHTML = "";

    list.forEach(function (item) {
      const element = document.createElement(tag);
      element.textContent = String(item || "");
      container.appendChild(element);
    });
  });

  document.dispatchEvent(new CustomEvent("farmhouse:content-ready", {
    detail: content
  }));
})();

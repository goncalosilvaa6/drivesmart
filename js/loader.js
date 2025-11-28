window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    if (!loader) {
    return;
    }

    loader.classList.add("loader-hidden");

    while (loader.hasChildNodes()) {
        loader.removeChild(loader.firstChild);
    } 
})
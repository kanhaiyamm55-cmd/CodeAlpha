/* =========================================
   CODEALPHA TASK 1
   IMAGE GALLERY
========================================= */


/* =========================================
   DEFAULT PHOTOS
========================================= */

const defaultPhotos = [

    {
        id: 1,

        title: "Mountain Adventure",

        category: "nature",

        description:
            "A beautiful mountain landscape surrounded by clouds.",

        url:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",

        favorite: false,

        createdAt: Date.now() - 5000

    },


    {
        id: 2,

        title: "City Lights",

        category: "city",

        description:
            "Beautiful city lights during the evening.",

        url:
            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",

        favorite: false,

        createdAt: Date.now() - 4000

    },


    {
        id: 3,

        title: "Travel Memories",

        category: "travel",

        description:
            "A peaceful destination waiting to be explored.",

        url:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",

        favorite: false,

        createdAt: Date.now() - 3000

    },


    {
        id: 4,

        title: "Forest",

        category: "nature",

        description:
            "A peaceful green forest surrounded by nature.",

        url:
            "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",

        favorite: false,

        createdAt: Date.now() - 2000

    },


    {
        id: 5,

        title: "Ocean View",

        category: "travel",

        description:
            "A relaxing view of the ocean and blue sky.",

        url:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",

        favorite: false,

        createdAt: Date.now() - 1000

    },


    {
        id: 6,

        title: "Modern Architecture",

        category: "city",

        description:
            "Modern architecture in a beautiful urban environment.",

        url:
            "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",

        favorite: false,

        createdAt: Date.now()

    }

];


/* =========================================
   GET PHOTOS FROM LOCAL STORAGE
========================================= */

let photos =
    JSON.parse(localStorage.getItem("pixelVaultPhotos")) ||
    defaultPhotos;


/* =========================================
   GLOBAL VARIABLES
========================================= */

let currentCategory = "all";

let currentPhotos = [];

let currentLightboxIndex = 0;


/* =========================================
   DOM ELEMENTS
========================================= */

const gallery =
    document.getElementById("gallery");

const photoCount =
    document.getElementById("photoCount");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const emptyState =
    document.getElementById("emptyState");


/* MODAL */

const addModal =
    document.getElementById("addModal");

const openAddModal =
    document.getElementById("openAddModal");

const closeAddModal =
    document.getElementById("closeAddModal");

const cancelAdd =
    document.getElementById("cancelAdd");


/* FORM */

const photoForm =
    document.getElementById("photoForm");

const imageTitle =
    document.getElementById("imageTitle");

const imageUrl =
    document.getElementById("imageUrl");

const imageCategory =
    document.getElementById("imageCategory");

const imageDescription =
    document.getElementById("imageDescription");


/* PREVIEW */

const imagePreview =
    document.getElementById("imagePreview");

const previewImg =
    document.getElementById("previewImg");


/* LIGHTBOX */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const lightboxDescription =
    document.getElementById("lightboxDescription");

const imageCounter =
    document.getElementById("imageCounter");


/* =========================================
   SAVE TO LOCAL STORAGE
========================================= */

function savePhotos() {

    localStorage.setItem(
        "pixelVaultPhotos",
        JSON.stringify(photos)
    );

}


/* =========================================
   RENDER GALLERY
========================================= */

function renderGallery() {

    let filteredPhotos = [...photos];


    /* CATEGORY FILTER */

    if (currentCategory === "favorite") {

        filteredPhotos =
            filteredPhotos.filter(
                photo => photo.favorite
            );

    }

    else if (currentCategory !== "all") {

        filteredPhotos =
            filteredPhotos.filter(
                photo =>
                    photo.category === currentCategory
            );

    }


    /* SEARCH */

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    if (searchTerm) {

        filteredPhotos =
            filteredPhotos.filter(photo =>

                photo.title
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                photo.description
                    .toLowerCase()
                    .includes(searchTerm)

            );

    }


    /* SORT */

    switch (sortSelect.value) {

        case "newest":

            filteredPhotos.sort(
                (a, b) =>
                    b.createdAt - a.createdAt
            );

            break;


        case "oldest":

            filteredPhotos.sort(
                (a, b) =>
                    a.createdAt - b.createdAt
            );

            break;


        case "az":

            filteredPhotos.sort(
                (a, b) =>
                    a.title.localeCompare(b.title)
            );

            break;


        case "za":

            filteredPhotos.sort(
                (a, b) =>
                    b.title.localeCompare(a.title)
            );

            break;

    }


    /* SAVE CURRENT FILTERED PHOTOS */

    currentPhotos = filteredPhotos;


    /* CLEAR GALLERY */

    gallery.innerHTML = "";


    /* EMPTY */

    if (filteredPhotos.length === 0) {

        emptyState.classList.remove("hidden");

    }

    else {

        emptyState.classList.add("hidden");

    }


    /* CREATE CARDS */

    filteredPhotos.forEach(
        (photo, index) => {

            const card =
                document.createElement("article");

            card.className =
                "gallery-card";


            card.innerHTML = `

                <img
                    src="${photo.url}"
                    alt="${escapeHTML(photo.title)}"
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/600x500?text=Image+Unavailable'"
                >

                <div class="card-overlay">

                    <div class="card-top">

                        <button
                            class="icon-btn favorite-btn ${
                                photo.favorite ? "active" : ""
                            }"
                            data-favorite="${photo.id}"
                            aria-label="Favorite"
                        >

                            <i class="${
                                photo.favorite
                                ? "fa-solid"
                                : "fa-regular"
                            } fa-heart"></i>

                        </button>

                    </div>


                    <div class="card-bottom">

                        <div>

                            <div class="card-title">
                                ${escapeHTML(photo.title)}
                            </div>

                            <div class="card-category">
                                ${escapeHTML(photo.category)}
                            </div>

                        </div>

                    </div>

                </div>
            `;


            /* OPEN LIGHTBOX */

            card.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target.closest(
                            ".favorite-btn"
                        )
                    ) {
                        return;
                    }

                    openLightbox(index);

                }
            );


            /* FAVORITE BUTTON */

            const favoriteButton =
                card.querySelector(
                    ".favorite-btn"
                );


            favoriteButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    toggleFavorite(photo.id);

                }
            );


            gallery.appendChild(card);

        }
    );


    /* PHOTO COUNT */

    const total =
        filteredPhotos.length;

    photoCount.textContent =
        `${total} ${total === 1 ? "photo" : "photos"}`;

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================
   FAVORITE
========================================= */

function toggleFavorite(id) {

    photos =
        photos.map(photo => {

            if (photo.id === id) {

                return {
                    ...photo,
                    favorite: !photo.favorite
                };

            }

            return photo;

        });


    savePhotos();

    renderGallery();

    showToast("Favorite updated ❤️");


    /* Update lightbox if open */

    if (lightbox.classList.contains("active")) {

        updateLightbox();

    }

}


/* =========================================
   OPEN ADD MODAL
========================================= */

function openModal() {

    addModal.classList.add("active");

    imageTitle.focus();

}


openAddModal.addEventListener(
    "click",
    openModal
);


document
    .getElementById("emptyAddBtn")
    .addEventListener(
        "click",
        openModal
    );


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    addModal.classList.remove("active");

    photoForm.reset();

    imagePreview.classList.add("hidden");

    previewImg.src = "";

}


closeAddModal.addEventListener(
    "click",
    closeModal
);


cancelAdd.addEventListener(
    "click",
    closeModal
);


/* CLICK OUTSIDE MODAL */

addModal.addEventListener(
    "click",
    event => {

        if (
            event.target === addModal
        ) {

            closeModal();

        }

    }
);


/* =========================================
   IMAGE URL PREVIEW
========================================= */

imageUrl.addEventListener(
    "input",
    function () {

        const url =
            imageUrl.value.trim();


        if (!url) {

            imagePreview.classList.add(
                "hidden"
            );

            return;

        }


        previewImg.src = url;

        imagePreview.classList.remove(
            "hidden"
        );

    }
);


/* =========================================
   ADD PHOTO
========================================= */

photoForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            imageTitle.value.trim();

        const url =
            imageUrl.value.trim();

        const category =
            imageCategory.value;

        const description =
            imageDescription.value.trim();


        if (!title || !url) {

            showToast(
                "Please fill required fields."
            );

            return;

        }


        const newPhoto = {

            id: Date.now(),

            title: title,

            url: url,

            category: category,

            description:
                description ||
                "No description available.",

            favorite: false,

            createdAt: Date.now()

        };


        photos.unshift(newPhoto);


        savePhotos();

        renderGallery();

        closeModal();

        showToast(
            "Photo added successfully!"
        );

    }
);


/* =========================================
   LIGHTBOX
========================================= */

function openLightbox(index) {

    currentLightboxIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


document
    .getElementById("closeLightbox")
    .addEventListener(
        "click",
        closeLightbox
    );


/* =========================================
   UPDATE LIGHTBOX
========================================= */

function updateLightbox() {

    if (
        currentPhotos.length === 0
    ) {

        return;

    }


    const photo =
        currentPhotos[
            currentLightboxIndex
        ];


    lightboxImage.src =
        photo.url;


    lightboxImage.alt =
        photo.title;


    lightboxTitle.textContent =
        photo.title;


    lightboxCategory.textContent =
        photo.category;


    lightboxDescription.textContent =
        photo.description;


    imageCounter.textContent =
        `${currentLightboxIndex + 1} / ${currentPhotos.length}`;


    /* FAVORITE ICON */

    const favoriteIcon =
        document.querySelector(
            "#favoriteLightbox i"
        );


    if (photo.favorite) {

        favoriteIcon.className =
            "fa-solid fa-heart";

    }

    else {

        favoriteIcon.className =
            "fa-regular fa-heart";

    }

}


/* =========================================
   NEXT IMAGE
========================================= */

function nextImage() {

    if (
        currentPhotos.length === 0
    ) {

        return;

    }


    currentLightboxIndex++;

    if (
        currentLightboxIndex >=
        currentPhotos.length
    ) {

        currentLightboxIndex = 0;

    }


    updateLightbox();

}


/* =========================================
   PREVIOUS IMAGE
========================================= */

function previousImage() {

    if (
        currentPhotos.length === 0
    ) {

        return;

    }


    currentLightboxIndex--;

    if (
        currentLightboxIndex < 0
    ) {

        currentLightboxIndex =
            currentPhotos.length - 1;

    }


    updateLightbox();

}


document
    .getElementById("nextBtn")
    .addEventListener(
        "click",
        nextImage
    );


document
    .getElementById("prevBtn")
    .addEventListener(
        "click",
        previousImage
    );


/* =========================================
   LIGHTBOX FAVORITE
========================================= */

document
    .getElementById("favoriteLightbox")
    .addEventListener(
        "click",
        function () {

            if (
                currentPhotos.length === 0
            ) {

                return;

            }


            const photo =
                currentPhotos[
                    currentLightboxIndex
                ];


            toggleFavorite(photo.id);

        }
    );


/* =========================================
   DELETE PHOTO
========================================= */

function deletePhoto(id) {

    const photo =
        photos.find(
            item => item.id === id
        );


    if (!photo) {

        return;

    }


    const confirmed =
        confirm(
            `Delete "${photo.title}" from your gallery?`
        );


    if (!confirmed) {

        return;

    }


    photos =
        photos.filter(
            item => item.id !== id
        );


    savePhotos();

    closeLightbox();

    renderGallery();

    showToast(
        "Photo deleted successfully."
    );

}


/* =========================================
   LIGHTBOX DELETE
========================================= */

document
    .getElementById("deleteLightbox")
    .addEventListener(
        "click",
        function () {

            if (
                currentPhotos.length === 0
            ) {

                return;

            }


            const photo =
                currentPhotos[
                    currentLightboxIndex
                ];


            deletePhoto(photo.id);

        }
    );


/* =========================================
   DOWNLOAD IMAGE
========================================= */

document
    .getElementById("downloadBtn")
    .addEventListener(
        "click",
        async function () {

            if (
                currentPhotos.length === 0
            ) {

                return;

            }


            const photo =
                currentPhotos[
                    currentLightboxIndex
                ];


            try {

                const response =
                    await fetch(photo.url);

                const blob =
                    await response.blob();


                const blobUrl =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    blobUrl;


                link.download =
                    `${photo.title}.jpg`;


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                URL.revokeObjectURL(
                    blobUrl
                );


            }

            catch (error) {

                /* Fallback */

                window.open(
                    photo.url,
                    "_blank"
                );

            }

        }
    );


/* =========================================
   CATEGORY FILTER
========================================= */

document
    .querySelectorAll(".nav-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".nav-btn"
                    )
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                this.classList.add(
                    "active"
                );


                currentCategory =
                    this.dataset.category;


                renderGallery();

            }
        );

    });


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    renderGallery
);


/* =========================================
   SORT
========================================= */

sortSelect.addEventListener(
    "change",
    renderGallery
);


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /* ESC */

        if (event.key === "Escape") {

            if (
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeLightbox();

            }

            if (
                addModal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }


        /* LIGHTBOX CONTROLS */

        if (
            lightbox.classList.contains(
                "active"
            )
        ) {

            if (
                event.key === "ArrowRight"
            ) {

                nextImage();

            }

            if (
                event.key === "ArrowLeft"
            ) {

                previousImage();

            }

        }

    }
);


/* =========================================
   MOBILE MENU
========================================= */

document
    .getElementById("mobileMenu")
    .addEventListener(
        "click",
        function () {

            const nav =
                document.querySelector(
                    ".nav"
                );


            if (
                nav.style.display ===
                "flex"
            ) {

                nav.style.display =
                    "none";

            }

            else {

                nav.style.display =
                    "flex";

                nav.style.flexDirection =
                    "column";

                nav.style.position =
                    "absolute";

                nav.style.top =
                    "75px";

                nav.style.left =
                    "0";

                nav.style.right =
                    "0";

                nav.style.background =
                    "#11141a";

                nav.style.padding =
                    "15px";

            }

        }
    );


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================
   INITIAL LOAD
========================================= */

renderGallery();

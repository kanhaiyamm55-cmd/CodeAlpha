document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CURRENT YEAR
    ========================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================
       MOBILE MENU
    ========================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinksMenu = document.getElementById("navLinks");

    if (menuToggle && navLinksMenu) {

        menuToggle.addEventListener("click", () => {

            navLinksMenu.classList.toggle("active");

            const isOpen =
                navLinksMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon = menuToggle.querySelector("i");

            if (isOpen) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuToggle.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        });


        /* Close menu when any option is clicked */

        navLinksMenu.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinksMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =========================
       SMOOTH NAVIGATION
    ========================== */

    const navLinks =
        document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetSection =
                document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                const navbar =
                    document.querySelector(".navbar");

                const navbarHeight =
                    navbar ? navbar.offsetHeight : 75;

                const targetPosition =
                    targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }

        });

    });


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================== */

    const navbar =
        document.querySelector(".navbar");

    function handleNavbar() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleNavbar
    );

    handleNavbar();


    /* =========================
       ACTIVE NAV LINK
    ========================== */

    const sections =
        document.querySelectorAll("section[id]");

    const links =
        document.querySelectorAll(".nav-links a");


    function updateActiveLink() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        links.forEach((link) => {

            link.classList.remove("active");

            const linkTarget =
                link.getAttribute("href");

            if (
                linkTarget ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* =========================
       REVEAL ANIMATION
    ========================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-grid, " +
            ".skill-card, " +
            ".experience-card, " +
            ".project-card, " +
            ".resume-box, " +
            ".contact-box"
        );


    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =========================
       TYPING EFFECT
    ========================== */

    const typingText =
        document.querySelector(".typing-text");

    if (typingText) {

        const words = [
            "Frontend Developer",
            "AI Web Developer",
            "Web Designer",
            "Full Stack Developer"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let isDeleting = false;


        function typeText() {

            const currentWord =
                words[wordIndex];


            if (!isDeleting) {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    isDeleting = true;

                    setTimeout(
                        typeText,
                        1500
                    );

                    return;
                }

            } else {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (characterIndex === 0) {

                    isDeleting = false;

                    wordIndex++;

                    if (
                        wordIndex >=
                        words.length
                    ) {

                        wordIndex = 0;

                    }

                }

            }


            const typingSpeed =
                isDeleting ? 45 : 85;

            setTimeout(
                typeText,
                typingSpeed
            );

        }


        typeText();

    }


    /* =========================
       PROJECT HOVER
    ========================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.classList.add("hovered");
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {
                card.classList.remove("hovered");
            }
        );

    });


    /* =========================
       EXTERNAL LINKS
    ========================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =========================
       CONSOLE
    ========================== */

    console.log(
        "Kanhaiya Mishra Portfolio Loaded Successfully!"
    );

});

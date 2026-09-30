/* =========================================================
   GREENCORNER — INTERACTIVE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".navigation");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuButton.textContent = isOpen
                ? "✕"
                : "☰";
        });


        // Tutup menu setelah memilih halaman
        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.textContent = "☰";
            });

        });
    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", event => {

        if (!menuButton || !navigation) {
            return;
        }

        const clickedInsideMenu =
            navigation.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰";
        }
    });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".feature-card, " +
        ".team-card, " +
        ".plant-card, " +
        ".gallery-card, " +
        ".role-card, " +
        ".care-card, " +
        ".hope-card, " +
        ".purpose-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element, index) => {

            element.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 60, 300)}ms`
            );

            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================================
       ACTIVE PAGE
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document.querySelectorAll(
        ".navigation a"
    ).forEach(link => {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       PAGE TRANSITION
       ===================================================== */

    document.querySelectorAll(
        'a[href$=".html"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http")
            ) {
                return;
            }

            event.preventDefault();

            document.body.classList.add(
                "page-exit"
            );

            setTimeout(() => {

                window.location.href = href;

            }, 180);

        });

    });


    /* =====================================================
       CARD TILT EFFECT — DESKTOP
       ===================================================== */

    const tiltCards = document.querySelectorAll(
        ".feature-card, " +
        ".team-card, " +
        ".plant-card, " +
        ".gallery-card"
    );

    const canHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    if (canHover) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) * -2;

                    const rotateY =
                        ((x - centerX) /
                            centerX) * 2;

                    card.style.transform =
                        `perspective(700px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-6px)`;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });
    }


    /* =====================================================
       BUTTON RIPPLE
       ===================================================== */

    document.querySelectorAll(
        ".button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const ripple =
                    document.createElement(
                        "span"
                    );

                ripple.classList.add(
                    "button-ripple"
                );

                const rect =
                    button.getBoundingClientRect();

                ripple.style.left =
                    `${event.clientX - rect.left}px`;

                ripple.style.top =
                    `${event.clientY - rect.top}px`;

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);

            }
        );

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.createElement("button");

    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.setAttribute(
        "aria-label",
        "Kembali ke atas"
    );

    backToTop.innerHTML = "↑";

    document.body.appendChild(
        backToTop
    );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        },
        {
            passive: true
        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       KEYBOARD ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (navigation) {
                    navigation.classList.remove(
                        "open"
                    );
                }

                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.textContent =
                        "☰";
                }

            }

        }
    );

});
/* =========================================================
   JAVASCRIPT INTERACTION
   ========================================================= */

.feature-card,
.team-card,
.plant-card,
.gallery-card,
.role-card,
.care-card,
.hope-card,
.purpose-card {
    opacity: 0;
    transform: translateY(25px);
    transition:
        opacity 0.6s ease var(--reveal-delay, 0ms),
        transform 0.6s ease var(--reveal-delay, 0ms),
        box-shadow 0.3s ease,
        border-color 0.3s ease;
}

.feature-card.is-visible,
.team-card.is-visible,
.plant-card.is-visible,
.gallery-card.is-visible,
.role-card.is-visible,
.care-card.is-visible,
.hope-card.is-visible,
.purpose-card.is-visible {
    opacity: 1;
    transform: translateY(0);
}


/* PAGE EXIT */

body.page-exit {
    opacity: 0;
    transition: opacity 0.18s ease;
}


/* BUTTON RIPPLE */

.button {
    position: relative;
    overflow: hidden;
}

.button-ripple {
    position: absolute;

    width: 10px;
    height: 10px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.35);

    transform: translate(-50%, -50%) scale(0);

    animation: ripple 0.6s ease-out;

    pointer-events: none;
}

@keyframes ripple {
    to {
        transform:
            translate(-50%, -50%)
            scale(18);

        opacity: 0;
    }
}


/* BACK TO TOP */

.back-to-top {
    position: fixed;

    right: 22px;
    bottom: 22px;

    width: 46px;
    height: 46px;

    display: grid;
    place-items: center;

    border: 1px solid var(--border);
    border-radius: 14px;

    background: var(--green-dark);
    color: white;

    font-size: 20px;
    font-weight: 700;

    cursor: pointer;

    opacity: 0;
    visibility: hidden;

    transform: translateY(15px);

    transition:
        opacity 0.3s ease,
        visibility 0.3s ease,
        transform 0.3s ease,
        background 0.3s ease;

    z-index: 900;
}

.back-to-top.show {
    opacity: 1;
    visibility: visible;

    transform: translateY(0);
}

.back-to-top:hover {
    background: var(--green);

    transform:
        translateY(-4px);
}


/* MOBILE */

@media (max-width: 700px) {

    .back-to-top {
        right: 15px;
        bottom: 15px;
    }
}


/* REDUCED MOTION */

@media (prefers-reduced-motion: reduce) {

    .feature-card,
    .team-card,
    .plant-card,
    .gallery-card,
    .role-card,
    .care-card,
    .hope-card,
    .purpose-card {
        opacity: 1;
        transform: none;
    }

    body.page-exit {
        opacity: 1;
    }
}

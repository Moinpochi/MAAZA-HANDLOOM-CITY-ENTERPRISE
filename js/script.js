/* =========================================================
   MAAZA HANDLOOM & CITY ENTERPRISE
   WEBSITE INTERACTIONS
   ========================================================= */


/* ================= BUSINESS CONFIG ================= */

const CONFIG = {

  whatsapp: "919119195395",

  phone: "+919119195395",

  maps: "https://maps.app.goo.gl/LFLVQWq3pYuYzimC7"

};


/* ================= HELPERS ================= */

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];


/* ================= WHATSAPP ================= */

function whatsappUrl(category = "General Wholesale Enquiry") {

  const message =
`Hello, I am interested in ${category} from Maaza Handloom & City Enterprise.

Please share the latest catalogue, product availability and wholesale details.

Thank you.`;

  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}


/* ================= APPLY BUSINESS LINKS ================= */

function applyLinks() {

  /* WhatsApp links */

  $$("[data-wa-category]").forEach((element) => {

    element.href =
      whatsappUrl(element.dataset.waCategory);

  });


  /* Google Maps */

  const mapLink = $("#mapLink");

  if (mapLink && CONFIG.maps) {

    mapLink.href = CONFIG.maps;

  }


  /* Phone */

  const phoneLinks = [
    $("#callLink"),
    $("#footerCall")
  ];

  phoneLinks.forEach((link) => {

    if (!link) return;

    link.href = `tel:${CONFIG.phone}`;

  });

}


/* ================= NAVBAR ================= */

function setupNavbar() {

  const nav = $("#nav");

  if (!nav) return;

  function updateNavbar() {

    nav.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  }

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

}


/* ================= MOBILE MENU ================= */

function setupMobileMenu() {

  const menu = $("#mobileMenu");
  const toggle = $("#menuToggle");

  if (!menu || !toggle) return;


  function closeMenu() {

    menu.classList.remove("open");

    toggle.classList.remove("active");

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menu.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "menu-open"
    );

  }


  function openMenu() {

    menu.classList.add("open");

    toggle.classList.add("active");

    toggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menu.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "menu-open"
    );

  }


  toggle.addEventListener(
    "click",
    () => {

      const isOpen =
        menu.classList.contains("open");

      if (isOpen) {

        closeMenu();

      } else {

        openMenu();

      }

    }
  );


  $$("#mobileMenu a").forEach((link) => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeMenu();

      }

    }
  );

}


/* ================= SCROLL REVEAL ================= */

function setupReveal() {

  const elements =
    $$(".reveal");

  if (!elements.length) return;


  /*
    If IntersectionObserver is unavailable,
    simply show everything.
  */

  if (!("IntersectionObserver" in window)) {

    elements.forEach((element) => {

      element.classList.add("visible");

    });

    return;

  }


  const observer =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach((element) => {

    observer.observe(element);

  });

}


/* ================= NUMBER COUNTERS ================= */

function setupCounters() {

  const counters =
    $$(".counter");

  if (!counters.length) return;


  if (!("IntersectionObserver" in window)) {

    counters.forEach((counter) => {

      counter.textContent =
        counter.dataset.target;

    });

    return;

  }


  const observer =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;


          const element =
            entry.target;

          const target =
            Number(element.dataset.target);


          if (!Number.isFinite(target)) {

            return;

          }


          const startTime =
            performance.now();

          const duration =
            1200;


          function animate(currentTime) {

            const progress =
              Math.min(
                (currentTime - startTime) /
                duration,
                1
              );


            const eased =
              1 -
              Math.pow(
                1 - progress,
                3
              );


            element.textContent =
              Math.floor(
                target * eased
              );


            if (progress < 1) {

              requestAnimationFrame(
                animate
              );

            } else {

              element.textContent =
                target;

            }

          }


          requestAnimationFrame(
            animate
          );


          observer.unobserve(
            element
          );

        });

      },
      {
        threshold: 0.7
      }
    );


  counters.forEach((counter) => {

    observer.observe(counter);

  });

}


/* ================= IMAGE FALLBACK ================= */

function setupImages() {

  const images =
    $$("img");


  images.forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        const parent =
          image.parentElement;

        if (parent) {

          parent.classList.add(
            "missing"
          );

        }

      }
    );

  });

}


/* ================= CUSTOM CURSOR ================= */

function setupCursor() {

  const dot =
    $(".cursor-dot");

  const ring =
    $(".cursor-ring");


  if (!dot || !ring) return;


  /*
    Custom cursor only on devices
    with a real pointer.
  */

  if (!window.matchMedia(
    "(pointer: fine)"
  ).matches) {

    dot.style.display = "none";
    ring.style.display = "none";

    return;

  }


  window.addEventListener(
    "pointermove",
    (event) => {

      dot.style.left =
        `${event.clientX}px`;

      dot.style.top =
        `${event.clientY}px`;


      ring.animate(
        {
          left:
            `${event.clientX}px`,

          top:
            `${event.clientY}px`
        },
        {
          duration: 180,

          fill: "forwards"
        }
      );

    }
  );


  $$(
    "a, button, .collection-card"
  ).forEach((element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        ring.classList.add(
          "hover"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        ring.classList.remove(
          "hover"
        );

      }
    );

  });

}


/* ================= MAGNETIC BUTTONS ================= */

function setupMagneticButtons() {

  const buttons =
    $$(".magnetic");


  if (!buttons.length) return;


  buttons.forEach((element) => {

    element.addEventListener(
      "pointermove",
      (event) => {

        if (
          window.innerWidth < 901 ||
          !window.matchMedia(
            "(pointer: fine)"
          ).matches
        ) {

          return;

        }


        const rect =
          element.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left -
            rect.width / 2
          ) * 0.12;


        const y =
          (
            event.clientY -
            rect.top -
            rect.height / 2
          ) * 0.12;


        element.style.transform =
          `translate(${x}px, ${y}px)`;

      }
    );


    element.addEventListener(
      "pointerleave",
      () => {

        element.style.transform = "";

      }
    );

  });

}


/* ================= SMOOTH INTERNAL LINKS ================= */

function setupInternalLinks() {

  $$('a[href^="#"]').forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });

}


/* ================= START ================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    applyLinks();

    setupNavbar();

    setupMobileMenu();

    setupReveal();

    setupCounters();

    setupImages();

    setupCursor();

    setupMagneticButtons();

    setupInternalLinks();

  }
);

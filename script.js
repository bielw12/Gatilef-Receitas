document.addEventListener("DOMContentLoaded", function () {
    const highlightsCarousel = document.querySelector(".highlights-carousel .carousel-wrapper");
    const categoriesCarousel = document.querySelector(".categories-carousel .carousel-wrapper");
    const highlightsPrev = document.querySelector(".highlights-prev");
    const highlightsNext = document.querySelector(".highlights-next");
    const categoriesPrev = document.querySelector(".categories-prev");
    const categoriesNext = document.querySelector(".categories-next");

    let highlightsIndex = 0;
    let categoriesIndex = 0;
    let highlightsInterval;
    let categoriesInterval;

    function initializeCarousel(carousel) {
        const items = Array.from(carousel.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });
        const itemWidth = items[0].offsetWidth;
        carousel.style.width = `${items.length * 2 * itemWidth}px`;
        moveCarousel(carousel, 0, false); 
    }

    function moveCarousel(carousel, index, transition = true) {
        const itemWidth = carousel.children[0].offsetWidth;
        const totalWidth = itemWidth * carousel.children.length;
        const offset = index * itemWidth;
        carousel.style.transition = transition ? 'transform 0.5s ease' : 'none';
        carousel.style.transform = `translateX(-${offset}px)`;
    }

    function startAutoplay() {
        highlightsInterval = setInterval(() => {
            highlightsIndex++;
            if (highlightsIndex >= highlightsCarousel.children.length / 2) {
                highlightsIndex = 0;
                moveCarousel(highlightsCarousel, highlightsIndex, false);
                setTimeout(() => {
                    moveCarousel(highlightsCarousel, highlightsIndex);
                }, 500); 
            } else {
                moveCarousel(highlightsCarousel, highlightsIndex);
            }
        }, 2500);

        categoriesInterval = setInterval(() => {
            categoriesIndex++;
            if (categoriesIndex >= categoriesCarousel.children.length / 2) {
                categoriesIndex = 0;
                moveCarousel(categoriesCarousel, categoriesIndex, false);
                setTimeout(() => {
                    moveCarousel(categoriesCarousel, categoriesIndex);
                }, 500);  
            } else {
                moveCarousel(categoriesCarousel, categoriesIndex);
            }
        }, 2500);
    }

    function stopAutoplay() {
        clearInterval(highlightsInterval);
        clearInterval(categoriesInterval);
    }

    highlightsPrev.addEventListener("click", function () {
        stopAutoplay();
        highlightsIndex = (highlightsIndex > 0) ? highlightsIndex - 1 : highlightsCarousel.children.length / 2 - 1;
        moveCarousel(highlightsCarousel, highlightsIndex);
        startAutoplay();
    });

    highlightsNext.addEventListener("click", function () {
        stopAutoplay();
        highlightsIndex = (highlightsIndex + 1) % (highlightsCarousel.children.length / 2);
        moveCarousel(highlightsCarousel, highlightsIndex);
        startAutoplay();
    });

    categoriesPrev.addEventListener("click", function () {
        stopAutoplay();
        categoriesIndex = (categoriesIndex > 0) ? categoriesIndex - 1 : categoriesCarousel.children.length / 2 - 1;
        moveCarousel(categoriesCarousel, categoriesIndex);
        startAutoplay();
    });

    categoriesNext.addEventListener("click", function () {
        stopAutoplay();
        categoriesIndex = (categoriesIndex + 1) % (categoriesCarousel.children.length / 2);
        moveCarousel(categoriesCarousel, categoriesIndex);
        startAutoplay();
    });

    initializeCarousel(highlightsCarousel);
    initializeCarousel(categoriesCarousel);
    startAutoplay();
});


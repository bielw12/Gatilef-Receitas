document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelector('.carousel-items');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    let currentIndex = 0;
    const itemCount = items.children.length;
    let itemWidth = items.children[0].getBoundingClientRect().width;
    let intervalId;

    function goToSlide(index) {
        if (index < 0) index = itemCount - 1;
        if (index >= itemCount) index = 0;
        items.style.transition = 'transform 0.5s ease'; 
        items.style.transform = `translateX(-${index * itemWidth}px)`;
        currentIndex = index;
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        intervalId = setInterval(nextSlide, 3000); 
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide(); 
        startAutoSlide(); 
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide(); 
        startAutoSlide(); 
    });

    startAutoSlide();

    window.addEventListener('resize', () => {
        itemWidth = items.children[0].getBoundingClientRect().width;
        items.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    });

    carousel.addEventListener('mouseover', stopAutoSlide);

    carousel.addEventListener('mouseout', startAutoSlide);
});

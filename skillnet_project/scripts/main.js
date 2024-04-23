'use strict'

window.onload = () => {
	// init menu burger
	(function menuInit() {
		if (document.querySelector(".icon-menu")) {
			document.addEventListener("click", function (e) {
				if (e.target.closest('.icon-menu')) {
					document.documentElement.classList.toggle("menu-open");
					document.body.classList.toggle('lock');
				} else {
					document.documentElement.classList.remove("menu-open");
					document.body.classList.remove('lock')
				}
			});
		};
	})()

	// init swiper
	const swiperThumb = new Swiper('.classes__slider-thumbs', {
		// Optional parameters

		spaeed: 800,
		spaceBetween: 20,
		slidesPerView: 7,
		freeMode: true,
		watchSlidesProgress: true,
		grid: {
			rows: 1,
		},

	});
	const swiperMain = new Swiper('.classes__slider', {
		// Optional parameters
		spaeed: 800,
		loop: true,
		// effect: 'fade',
		spaceBetween: 10,
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 3,
		coverflowEffect: {
			rotate: 70,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		thumbs: {
			swiper: swiperThumb,
		},
	});
};

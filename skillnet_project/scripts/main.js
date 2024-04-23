'use strict'

window.onload = () => {
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
};

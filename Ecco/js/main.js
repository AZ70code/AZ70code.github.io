
window.onload = function () {



// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle


"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

  
if(document.querySelector('.galery__slider')) {
	new Swiper('.galery__slider', {
		navigation: {
			nextEl:'.swiper-button-next',
			prevEl:'.swiper-button-prev'
		},
		pagination: {
			el:'.swiper-pagination',
			 clickable:true,
			 dinamicBullets: true,
		},
		keyboard: {
			enable: true,
			onlyInViewport: true,
			pageUpdpwn: true,
		},
		slidesPerView: 'auto',
		spaceBetween: 30,
		loop: true,
		speed: 600,
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 50,

			},
			479: {
				slidesPerView: 'auto',
			},
		},
	});
}
//================= open/close form ===============================
	let contentForm = document.getElementById("form");
	let contentInfo = document.getElementById("info");
	let show = document.getElementById("showContent");
	let hide = document.getElementById("hideContent");

	function formShow() {
		if (window.innerWidth > 479 ) {
			show.addEventListener("click", (e) => {
				contentForm.style.opacity = "1";
				contentForm.style.visibility = "visible";
				contentInfo.style.opacity = "0";
				contentInfo.style.visibility = "hidden";
				e.preventDefault();
			});

			hide.addEventListener("click", (e) => {
				contentForm.style.opacity = "0";
				contentForm.style.visibility = "hidden";
				contentInfo.style.opacity = "1";
				contentInfo.style.visibility = "visible";
				e.preventDefault();
			});
		}	
	}
	show.addEventListener('click', formShow());
	hide.addEventListener('click', formShow());

	window.addEventListener('resize', () => {
		show.addEventListener('click', formShow());
		hide.addEventListener('click', formShow());
	
	});
//==================== switch tabs ======================================

	let tabBlack = document.getElementById('black');
	let tabRed = document.getElementById('red');
	let contentBlack = document.getElementById('items-black');
	let contentRed = document.getElementById('items-red');
	let galeryBlack = document.getElementById('galery-black');
	let galeryRed = document.getElementById('galery-red');
	let itemBlack = document.getElementById('item-black');
	let itemRed = document.getElementById('item-red');
	let titleBlack = document.getElementById('title-black');
	let titleRed = document.getElementById('title-red');



	tabBlack.addEventListener('click', function() {
		tabBlack.classList.add('_active');
		contentBlack.classList.add('_active');
		galeryBlack.classList.add('_active');
		titleBlack.classList.add('_active');
		tabRed.classList.remove('_active');
		contentRed.classList.remove('_active');
		galeryRed.classList.remove('_active');
		titleRed.classList.remove('_active');

		
	});
	tabRed.addEventListener('click', function() {
		tabBlack.classList.remove('_active');
		contentBlack.classList.remove('_active');
		galeryBlack.classList.remove('_active');
		titleBlack.classList.remove('_active');
		tabRed.classList.add('_active');
		contentRed.classList.add('_active');
		galeryRed.classList.add('_active');
		titleRed.classList.add('_active');

	});

	function tabSwitch() {
		if (window.innerWidth < 992 ) {
			itemBlack.addEventListener('click', function() {
			contentBlack.classList.add('_active');
			galeryBlack.classList.add('_active');
			titleBlack.classList.add('_active');
			contentRed.classList.remove('_active');
			galeryRed.classList.remove('_active');
			titleRed.classList.remove('_active');
			});

			itemRed.addEventListener('click', function() {
			contentBlack.classList.remove('_active');
			galeryBlack.classList.remove('_active');
			titleBlack.classList.remove('_active');
			contentRed.classList.add('_active');
			galeryRed.classList.add('_active');
			titleRed.classList.add('_active');
			});
		}
	}
	itemBlack.addEventListener('click', tabSwitch());
	itemRed.addEventListener('click', tabSwitch());

//====== инициализация галереи=======================
let allGalleries = document.querySelectorAll('._lightgallery');
allGalleries.forEach(item => lightGallery(item));



//Tabs
/* let tabs = document.querySelectorAll(".tabs-order__body");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll(".tabs-order__arrow");
	console.log(tabs_items);

	let tabs_blocks = tab.querySelectorAll(".tabs-order__items");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];

		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');

			}

			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
 */
};
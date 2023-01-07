'use strict'

counter();
graph();

function counter() {
//check the presence of counters on the page and reset them
	if (document.querySelectorAll("[data-count]").length) {
		document.querySelectorAll("[data-count]").forEach(el => {
			el.dataset.count = el.innerHTML;
			el.innerHTML = `0`;
		});
	}
    setTimeout(() => countStart(), 300);

	function countStart() {
		let counters = document.querySelectorAll("[data-count]");
		if (counters.length) {
			counters.forEach(counter => {
				countAnimate(counter);
			});
		}
	}
	function countAnimate(counter) {

		let start = null;
		const durationAnimate = parseInt(counter.dataset.countSpeed) ? parseInt(counter.dataset.countSpeed) : 3000;
		const finalValue = parseInt(counter.dataset.count);
		const startValue = 0;
		const step = (timestamp) => {
			if (!start) start = timestamp;
			const progress = Math.min((timestamp - start) / durationAnimate, 1);
			counter.innerHTML = Math.floor(progress * (startValue + finalValue));
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}
}
function graph() {
    const grafcols = document.querySelectorAll('.graphcol');
    grafcols.forEach(col => {
        col.style.height = 5 + 'px';
    })
    setTimeout(() => {
        grafcols.forEach((col, i) => {
			let colHeight = col.dataset.colHeight;
            setTimeout(() => {
				//adjustment according to grid size
				let colValue = (+colHeight - 102) * 1.08;
                col. style. transition='all 2s ease'
                col.style.height = colValue + 'px';
            }, 300 * ++i);
			col.addEventListener('mouseover', () => {
				col.textContent = colHeight;
			})
			col.addEventListener('mouseout', () => {
				col.textContent = '';
			})
        })
    }, 1000)
}


class Burger {
	constructor(menu, burger) {
		this.menuSelector = menu;
		this.burgerSelector = burger;
		this.menuElement = document.querySelector('.' + this.menuSelector);
		this.burgerElement = document.querySelector('.' + this.burgerSelector);

		this.classNames = {
			activity: '_active',
		};
	}

	init() {
		document.addEventListener('click', e => {
			this.clickHandler(e);
		});
	}

	destroy() {
		document.removeEventListener('click', e => {
			this.clickHandler(e);
		});
	}

	clickHandler(event) {
		const target = event.target;

		if (
			target.classList.contains(this.burgerSelector) &&
			!this.menuElement.classList.contains(this.classNames.activity)
		) {
			this.open();
		} else {
			this.close();
		}
	}

	open() {
		this.menuElement.classList.add(this.classNames.activity);
		this.burgerElement.classList.add(this.classNames.activity);
	}

	close() {
		this.menuElement.classList.remove(this.classNames.activity);
		this.burgerElement.classList.remove(this.classNames.activity);
	}
}

export default Burger;

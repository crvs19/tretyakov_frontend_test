class MyBasket {
	constructor(selector) {
		this.element = document.querySelector(selector);
		this.products = this.element.querySelectorAll('.product');
		this.productsAmount = this.products.length;
		this.subTotal = this.element.querySelector('#subtotal-value');
		this.tax = this.element.querySelector('#tax-value');
		this.shipping = this.element.querySelector('#shipping-value');
		this.total = this.element.querySelector('#total-value');

		this.externalAgents = {
			tax: 100,
			shipping: 150,
		};

		this.classNames = {
			emptyState: '_empty',
		};
	}

	init() {
		this.productActions();
		this.calculateSummary();
	}

	calculateSummary() {
		let sumOfProducts = 0;
		this.products.forEach(product => {
			const priceElement = product.querySelector('.product__price');
			const price = Number(priceElement.innerHTML.replace(/\D/g, ''));

			sumOfProducts += price;

			if (sumOfProducts > 0) {
				this.subTotal.innerHTML = `$ ${sumOfProducts}`;
				this.tax.innerHTML = `$ ${this.externalAgents.tax}`;
				this.shipping.innerHTML = `$ ${this.externalAgents.shipping}`;
				this.total.innerHTML = `$ ${
					sumOfProducts + this.externalAgents.tax + this.externalAgents.shipping
				}`;
			} else {
				this.subTotal.innerHTML = 0;
				this.tax.innerHTML = 0;
				this.shipping.innerHTML = 0;
				this.total.innerHTML = 0;
			}
		});
	}

	productActions() {
		this.products.forEach(product => {
			const decreaseButton = product.querySelector('button[data-button="decrease"]');
			const increaseButton = product.querySelector('button[data-button="increase"]');
			const deleteButton = product.querySelector('button[data-button="remove"]');
			const priceElement = product.querySelector('.product__price');
			const price = Number(priceElement.innerHTML.replace(/\D/g, ''));
			const amountElement = product.querySelector('.counter__num');
			let amount = Number(amountElement.innerHTML);

			const decreaseAmount = () => {
				if (amount > 0) {
					const newAmount = amount - 1;
					amount = newAmount;
					amountElement.innerHTML = newAmount;
					const newPrice = price * amount;
					priceElement.innerHTML = `$ ${newPrice}`;
					this.calculateSummary();
				}
			};

			const increaseAmount = () => {
				const newAmount = amount + 1;
				amount = newAmount;
				amountElement.innerHTML = newAmount;
				const newPrice = price * amount;
				priceElement.innerHTML = `$ ${newPrice}`;
				this.calculateSummary();
			};

			const removeProduct = () => {
				priceElement.innerHTML = 0;
				this.calculateSummary();
				product.remove();
				this.productsAmount -= 1;
				if (this.productsAmount === 0) {
					this.element.classList.add(this.classNames.emptyState);
				}
			};

			decreaseButton.addEventListener('click', () => {
				decreaseAmount();
			});

			increaseButton.addEventListener('click', () => {
				increaseAmount();
			});

			deleteButton.addEventListener('click', e => {
				e.preventDefault();
				removeProduct();
			});
		});
	}
}

export default MyBasket;

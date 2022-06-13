class CardNumber {
	constructor(inputSet) {
		this.cnSelector = inputSet;
		this.cnElement = document.querySelector('.' + this.cnSelector);
		this.inputs = this.cnElement.querySelectorAll('input');
	}

	init() {
		this.inputs.forEach(item => item.addEventListener('input', () => this.inputHandler(item)));
	}

	destroy() {
		this.inputs.forEach(item => item.removeEventListener('input'));
	}

	inputHandler(inputElement) {
		const nextInput = inputElement.nextElementSibling;
		if (inputElement.value.length >= 4 && nextInput) {
			nextInput.focus();
		}
	}
}

export default CardNumber;

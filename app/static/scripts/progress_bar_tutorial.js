class ProgressBar {
    constructor (element, initialValue = 0) {
        this.valueElem = element.querySelector('.progressValue');
        this.fillElem = element.querySelector('.progressFill');

        this.setValue(initialValue);
    }

    setValue (newValue) {
        if (newValue < 0) {
            newValue = 0;
        }
        if (newValue > 100) {
            newValue = 100;
        }

        this.value = newValue;
        this.update();
    }

    update () {
        const percentage = this.value + '%';
        this.fillElem.style.width = percentage;
        this.valueElem.textContent = percentage;
    }

    increment () {
        var newPercentage = (this.value + 1) + '%';
        this.fillElem.style.width = newPercentage;
        this.valueElem.textContent = newPercentage;
    }
}

var pb = ProgressBar('.progressBar', 0);
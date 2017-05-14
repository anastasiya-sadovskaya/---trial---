class Button{
    constructor(){
        components.pageControllers.push(this);
        this.className = 'pageController'
    }

    create(){
        this.DOMElement = ElementFactory.create('button', {class: this.className});
        body.appendChild(this.DOMElement);
    }

    setActive(value){
        this.DOMElement.className = this.className + (value ? ' active' : '');
    }
}
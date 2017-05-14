class VideoNode{
    constructor(width){
        components.videoNodes.push(this);
        this.margin = 0;
        this.width = width;
        this.rendered = false;
    }
    
    create(responseItem){
        this.DOMElement = ElementFactory.create('div', this.getContainerAttributes(), this.getContainerProperties());
        this.title = ElementFactory.create('span', {class: 'title'}, {innerHTML: responseItem.snippet.title});
        this.image = ElementFactory.create('img', {src: responseItem.snippet.thumbnails.high.url}, {});
    }

    render(){
        this.setMargin();
        ElementFactory.render(this.DOMElement, components.searchResult.DOMElement);
        ElementFactory.render(this.title, this.DOMElement);
        ElementFactory.render(this.image, this.DOMElement);
        this.rendered = true;

        this.image.onmousedown = function (event) {
            event.preventDefault();
            self.screenX = event.screenX;
            self.screenY = event.screenY;
        }

        this.image.onmouseup = function (event) {
            var delta = self.screenX - event.screenX;
            if (delta < 0 && delta < -self.swipeLength) {
                self.prevPage();
            }

            if (delta > 0 && delta > self.swipeLength) {
                self.nextPage();
            }
        }
    }
    
    setMargin(margin){
        this.margin = margin;
        this.DOMElement.style.marginLeft = `${this.margin}px`;
        this.DOMElement.style.marginRight = `${this.margin}px`;
    }

    getContainerAttributes(){
        return {class: 'videoNode'};
    }

    getContainerProperties(){
        return { style:{margin:'0'}};
    }
}
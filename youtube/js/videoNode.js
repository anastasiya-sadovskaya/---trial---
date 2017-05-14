class VideoNode{
    constructor(){
        components.videoNodes.push(this);
        this.margin = 0;
        this.width = 400;
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
        
    }
    
    setMargin(){
        this.margin = ((screenWidth - (this.width * components.searchResult.videosOnPage())) / (components.searchResult.videosOnPage() * 2));
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
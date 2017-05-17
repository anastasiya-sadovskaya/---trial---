class VideoNode{
    constructor(width){
        components.videoNodes.push(this);
        this.margin = 0;
        videoNodeWidth = width;
        this.width = videoNodeWidth;
        
        this.rendered = false;
    }
    
    create(responseItem){
        this.DOMElement = ElementFactory.create('div', this.getContainerAttributes(), this.getContainerProperties());
        this.play = ElementFactory.create('div', {class: 'playVideo'}, {style: {display: 'none'}});
        this.image = ElementFactory.create('img', {src: responseItem.snippet.thumbnails.high.url}, {});
        this.title = ElementFactory.create('span', {class: 'title'}, {innerHTML: responseItem.snippet.title});
        this.viewCount = ElementFactory.create('div', {class: 'viewCount'}, {innerHTML: responseItem.statistics.viewCount});
        this.author = ElementFactory.create('div', {class: 'viewCount'}, {innerHTML: responseItem.snippet.channelTitle});
        this.date = ElementFactory.create('span', {class: 'date'}, {innerHTML: responseItem.snippet.publishedAt});
        this.description = ElementFactory.create('div', {class: 'description'}, {innerHTML: responseItem.snippet.description});

        
    }

    render(){
        this.setMargin();
        ElementFactory.render(this.DOMElement, components.searchResult.DOMElement);
        ElementFactory.render(this.image, this.DOMElement);
        ElementFactory.render(this.title, this.DOMElement);
        ElementFactory.render(this.play, this.DOMElement);
        ElementFactory.render(this.viewCount, this.DOMElement);
        ElementFactory.render(this.author, this.DOMElement);
        ElementFactory.render(this.date, this.DOMElement);
        ElementFactory.render(this.description, this.DOMElement);

        // this.DOMElement.appendChild(this.play);
        // this.DOMElement.appendChild(this.viewCount);
        // this.DOMElement.appendChild(this.author);
        // this.DOMElement.appendChild(this.date);
        // this.DOMElement.appendChild(this.description);

        this.rendered = true;
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
        return { style:{margin:'0', width: `${this.width}px`}};
    }
}
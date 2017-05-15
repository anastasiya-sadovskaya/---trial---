class VideoNode{
    constructor(responseItem){
        components.videoNodes.push(this);
        this.margin = 0;

        
    }

    create(){
        this.DOMElement = ElementFactory.create('div', getContainerCssClasses(), getContainerProperties(), components.searchResult.DOMElement);
        ElementFactory.create('span', {class: 'title'}, {innerHTML: responseItem.snippet.title}, this.DOMElement);
        ElementFactory.create('img', {'src':responseItem.snippet.thumbnails.high.url}, {}, this.DOMElement);
    }

    getContainerCssClasses = function(){
        return {class: 'videoNode'};
    }

    getContainerProperties = function(){
        return { style:{margin:`${margin}px`}, innerHTML: 'Hello' };
    }
}
class VideoNode{
    constructor(obj){
        components.videoNodes.push(this);

        this.DOMElement = ElementFactory.create('div', {class: 'videoNode'}, { style:{margin:`${margin}px`}, innerHTML: 'Hello' }, components.searchResult.DOMElement);
        ElementFactory.create('span', {class: 'title'}, {innerHTML: obj.snippet.title}, this.DOMElement);
        ElementFactory.create('img', {'src':obj.snippet.thumbnails.high.url}, {}, this.DOMElement);
    }


}
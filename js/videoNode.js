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
        this.title = ElementFactory.create('span', {class: 'title'}, {innerHTML: responseItem.snippet.title});
        this.image = ElementFactory.create('img', {src: responseItem.snippet.thumbnails.high.url}, {});
    }

    render(){
        this.setMargin();
        ElementFactory.render(this.DOMElement, components.searchResult.DOMElement);
        ElementFactory.render(this.title, this.DOMElement);
        ElementFactory.render(this.image, this.DOMElement);
        this.rendered = true;

        // self.DOMElement.onmousedown = function (event) {
        //     self.screenX = event.screenX;
        //     self.screenY = event.screenY;
        // }

        // self.DOMElement.onmouseup = function (event) {
        //     var delta = self.screenX - event.screenX;
        //     if (delta < 0 && delta < -self.swipeLength) {
        //         if(self.page > 1){
        //             self.prevPage();
        //         }
        //     }

        //     if (delta > 0 && delta > self.swipeLength) {
        //         self.nextPage();
        //     }
        // }



//         var container = self.DOMElement;//document.getElementById('resultList');//self.DOMElement;        //
// container.ondragstart = function() {
//   return false;
// };
// container.onmousedown = function(e){
//     container.style.position = 'absolute';
//     moveAt(e);

 

//     function moveAt(e){
//         container.style.left = e.pageX - container.offsetWidth / 2 + 'px';
//         //container.style.top = e.pageY ;//- container.offsetHeight / 2 + 'px';
//     };

//     document.onmousemove = function(e) {
//         moveAt(e);
//     }

//     document.body.onmouseup = function() {
//         document.onmousemove = null;
//         //container.onmouseup = null;
//     }
// }




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
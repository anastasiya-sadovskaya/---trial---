class SearchResult{
    constructor(){
        components.searchResult = this;
        this.DOMElement = ElementFactory.create('div', {class: 'resultList'});
        for(var i = 1; i < 4; i++){
            components.pageControllers.push(ElementFactory.create('div', {class: 'controller'}, {innerHTML: i}, body));
        }
        this.page = 1;

        // this.pageLeft = function(){this.page -= 1;
        // console.log(`translateX(${this.page * 50}px)`);
        // document.getElementsByClassName('resultList')[0].style.transform = `translateX(50px)`;}
        
        this.videosOnPage = Math.floor(screenWidth / 400);
    }

    getDOMElement(){
        return this.DOMElement;
    }

    calculateWidth(){
        margin = marginsWidth / (videosOnPage * 2);
        return (videoArr.length * 400) + (videoArr.length * margin);
    }

    pageLeft(pageNum){
        this.page -= pageNum;
        this.DOMElement.style.transform = `translateX(${this.page * screenWidth}px)`;
    }

    pageRight(pageNum){
        this.page += pageNum;
        this.DOMElement.style.transform = `translateX(${this.page * screenWidth}px)`;
    }

    changePage(pageNum){
        this.page = pageNum;       //it will be this.page = controller.innerHTML;
        this.DOMElement.style.transform = `translateX(-${this.page * screenWidth}px)`;
    }   

    renderNewVideos(){
        // this.DOMElement.style.width += this.calculateWidth();
    }
    
}
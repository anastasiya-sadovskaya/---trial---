class SearchResult{
    constructor(){
        this.DOMElement = ElementFactory.create('div', {class: 'resultList'} );
        this.page = 1;

        // this.pageLeft = function(){this.page -= 1;
        // console.log(`translateX(${this.page * 50}px)`);
        // document.getElementsByClassName('resultList')[0].style.transform = `translateX(50px)`;}
        
        this.videosOnPage = Math.floor(screenWidth / 360);
    }

    getDOMElement(){
        return this.DOMElement;
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
        this.page += pageNum;       //it will be this.page = controller.innerHTML;
        this.DOMElement.style.transform = `translateX(${this.page * screenWidth}px)`;
    }   
    
}
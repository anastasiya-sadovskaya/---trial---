class SearchResult {
    constructor() {
        self = this;
        self.pageFunctions = {
            1: function(page){return page - 1;},
            2: function(page){return page;},
            3: function(page){return page + 1;}
        }
        components.searchResult = this;
        // for(var i = 1; i < 4; i++){
        //     components.pageControllers.push(ElementFactory.create('div', {class: 'controller'}, {innerHTML: i}, body));
        // }
        this.page = 1;
    }

    create() {
        this.DOMElement = ElementFactory.create('div', { class: 'resultList' }, {});
        let videoNodes = [];
        for(let i = 0; i < videoArr.length; i++) {
            videoNodes.push(new VideoNode());
            videoNodes[i].create(videoArr[i]);
            videoNodes[i].render();
        }  
        this.buttons = [];

        for (let i = 0; i < 5; i++) {
            this.buttons.push(new Button);
            this.buttons[i].create();
            if(i > 0 && i < 4){
                this.buttons[i].DOMElement.innerHTML = i;
                this.buttons[i].DOMElement.onclick = self.changePage;
            }
        }
        this.buttons[0].DOMElement.innerHTML = 'Prev';
        this.buttons[0].DOMElement.onclick = self.prevPage;
        this.buttons[4].DOMElement.innerHTML = 'Next'; 
        this.buttons[4].DOMElement.onclick = self.nextPage;
        self.setPage(1);
        // if(self.page < 2){
        //     this.buttons[0].DOMElement.style.display = 'none';
        // }

        
    }

    render() {
        this.setWidth();
        ElementFactory.render(this.DOMElement);
    }

    getDOMElement() {
        return this.DOMElement;
    }

    setWidth() {
        //margin = marginsWidth / (videosOnPage * 2);
        components.videoNodes[0].setMargin();
        this.width = (videoArr.length * videoNodeWidth) + (videoArr.length * components.videoNodes[0].margin * 2);
        this.DOMElement.style.width = `${this.width}px`;
    }

    videosOnPage() {
        return Math.floor(screenWidth / components.videoNodes[0].width);
    }
    
    setPage(pageNum){
        self.DOMElement.style.transform = `translateX(-${(pageNum-1) * screenWidth}px)`;
        
        if(self.page <= 1){
            self.buttons[0].DOMElement.style.opacity = '0';
        } else {
            self.buttons[0].DOMElement.style.opacity = '1';
            for(var key in self.pageFunctions){
                this.buttons[key].DOMElement.innerHTML = self.pageFunctions[key](self.page);
            }
        }
        
        for (let i = 1; i < 4; i++) {
            // if(this.buttons[i].DOMElement.innerHTML == pageNum){
            //     this.buttons[i].setActive(true);
            // } else {
            //     this.setActive(false);
            // }

            var buttonController = this.buttons[i];
            buttonController.setActive(buttonController.DOMElement.innerHTML == pageNum);
        }
        

    }

    nextPage() {
        self.page += 1;
        console.log(self.page);
        self.setPage(self.page);
        //self.DOMElement.style.transform = `translateX(-${self.page * screenWidth}px)`;
    }

    prevPage() {
        self.page -= 1;
        console.log(self.page);
        self.setPage(self.page);
        //self.DOMElement.style.transform = `translateX(${self.page * screenWidth}px)`;
    }

    changePage(pageNum) {
        self.page = parseInt(this.innerHTML);       //it will be this.page = controller.innerHTML;
        //this.DOMElement.style.transform = `translateX(-${this.page * screenWidth}px)`;
        self.setPage(self.page);
    }

    renderNewVideos() {
        // this.DOMElement.style.width += this.calculateWidth();
    }

}
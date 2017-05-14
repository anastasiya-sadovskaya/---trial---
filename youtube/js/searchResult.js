class SearchResult {
    constructor() {
        self = this;
        self.pageFunctions = {
            1: function (page) { return page - 1; },
            2: function (page) { return page; },
            3: function (page) { return page + 1; }
        }

        self.videoNodes = [];
        self.page = 1;
        self.videosOnPageNumber = null;
        self.prevVideosOnPageNumber = null;

        components.searchResult = this;
    }

    create() {
        this.DOMElement = ElementFactory.create('div', { class: 'resultList' }, {});
        
        self.createNodes();

        for (let i = 0; i < videoArr.length; i++) {
            self.videoNodes[i].render();
        }
        this.buttons = [];

        for (let i = 0; i < 5; i++) {
            this.buttons.push(new Button);
            this.buttons[i].create();
            if (i > 0 && i < 4) {
                this.buttons[i].DOMElement.innerHTML = i;
                this.buttons[i].DOMElement.onclick = () => self.changePage(this.buttons[i], undefined);
            }
        }

        this.buttons[0].DOMElement.innerHTML = 'Prev';
        this.buttons[0].DOMElement.onclick = self.prevPage;
        this.buttons[4].DOMElement.innerHTML = 'Next';
        this.buttons[4].DOMElement.onclick = self.nextPage;
        self.setPage(1);

        let countOfVideos = this.videosOnPage();
        let margin = ((screenWidth - (videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
        this.setMargin(margin);

        let width = (self.videoNodes.length * videoNodeWidth) + (self.videoNodes.length * margin * 2);
        this.setWidth(width);

        body.appendChild(this.DOMElement);
        //ElementFactory.render(this.DOMElement);
    }

    createNodes(){
        for (let i = 0; i < videoArr.length; i++) {
            var videoNode = new VideoNode(window.videoNodeWidth);
            self.videoNodes.push(videoNode);
            videoNode.create(videoArr[i]);
        }
    }

    getDOMElement() {
        return this.DOMElement;
    }

    setWidth(width) {
        this.width = width;
        this.DOMElement.style.width = `${this.width}px`;
    }

    setMargin(margin) {
        if (self.videoNodes.length) {
            for (let i = 0; i < self.videoNodes.length; i++) {
                self.videoNodes[i].setMargin(margin);
            }
        }
    }

    videosOnPage() {
        if(this.videosOnPageNumber == null) {
            this.videosOnPageNumber = Math.floor(screenWidth / components.videoNodes[0].width)
            this.prevVideosOnPageNumber = this.videosOnPageNumber;
        }

        this.prevVideosOnPageNumber = this.videosOnPageNumber;
        this.videosOnPageNumber = Math.floor(screenWidth / components.videoNodes[0].width);
        return this.videosOnPageNumber;
    }

    setPage(pageNum) {
        
        self.page = pageNum;
        self.DOMElement.style.transform = `translateX(-${(pageNum - 1) * screenWidth}px)`;
        self.calcLoadPage();

        if (self.page <= 1) {
            self.buttons[0].DOMElement.style.opacity = '0';
            for(let i = 1; i < 4; i++){
                self.buttons[i].DOMElement.innerHTML = i;
            }
        } else {
            self.buttons[0].DOMElement.style.opacity = '1';
            for (var key in self.pageFunctions) {
                this.buttons[key].DOMElement.innerHTML = self.pageFunctions[key](self.page);
            }
        }

        for (let i = 1; i < 4; i++) {

            var buttonController = this.buttons[i];
            buttonController.setActive(buttonController.DOMElement.innerHTML == pageNum);
        }

        self.onPageSet();
    }

    onPageSet(){
        if(self.page === self.pageForLoad){
            YouTubeApiClient.search(function(response){
                nextPageToken = response.nextPageToken;
                videoArr = response.items;
                self.createNodes();

                let countOfVideos = self.videosOnPage();
                let margin = ((screenWidth - (videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
                self.setMargin(margin);

                let width = (self.videoNodes.length * videoNodeWidth) + (self.videoNodes.length * margin * 2);
                self.setWidth(width);

                self.videoNodes.filter(vn => vn.rendered == false).map(vn => vn.render());
            });
        }
    }

    calcLoadPage(){
        self.pageForLoad;
        var tempPageForLoad = components.videoNodes.length / self.videosOnPage();
        if(Number.isInteger(tempPageForLoad)){
            self.pageForLoad = tempPageForLoad + 1;
        } else {
            self.pageForLoad = Math.ceil(tempPageForLoad);
        }
    }

    nextPage() {
        self.setPage(self.page + 1);
    }

    prevPage() {
        self.setPage(self.page - 1);
    }

    changePage(button, pageNum) {
        self.setPage(pageNum == undefined ? parseInt(button.DOMElement.innerHTML) : pageNum);
    }

    renderNewVideos() {
    }
   
    remove(){
        components.searchResult = null;
        components.videoNodes = [];
        nextPageToken = null;
        videoArr = [];

        self.DOMElement.parentNode.removeChild(self.DOMElement);
        for (var i = 0; i < self.buttons.length; i++) {
            body.removeChild(self.buttons[i].DOMElement);         
        }
    }
}
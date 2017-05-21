import AppManager from './appManager';
import AppSettings from './appSettings.js';
import ElementFactory from './elementFactory';
import YouTubeApiClient from './youTubeApiClient';
import VideoNode from './videoNode';
import Button from './button';

export default class SearchResult {
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
        self.swipeLength = 100;
        self.lastPage = null;
        self.noResults = false;

        AppManager.resultsList = this;
    }

    create() {
        this.DOMElement = ElementFactory.create('div', { class: 'resultList' });
        if (AppSettings.responsItemsCount != 0) {
            if (AppSettings.screenWidth < 400) {
                self.createNodes(AppSettings.screenWidth);
            } else {
                self.createNodes(400);
            }
            for (let i = 0; i < AppSettings.responsItemsCount; i++) {
                self.videoNodes[i].render();
            }
            this.buttons = [];

            let countOfVideos = self.videosOnPage();
            let margin = ((AppSettings.screenWidth - (AppSettings.videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
            this.setMargin(margin);

            let width = (self.videoNodes.length * AppSettings.videoNodeWidth) + (self.videoNodes.length * margin * 2);
            this.setWidth(width);

            document.body.appendChild(self.DOMElement);
            self.controllers = ElementFactory.create('div', { class: 'controllers' });
            document.body.appendChild(self.controllers);



            for (let i = 0; i < 5; i++) {
                this.buttons.push(new Button);
                this.buttons[i].create();
                if (i > 0 && i < 4) {
                    this.buttons[i].DOMElement.innerHTML = i;
                    this.buttons[i].DOMElement.onclick = () => self.changePage(this.buttons[i], undefined);
                }
            }
            if (AppSettings.screenWidth > 767) {
                this.buttons.map(function (el) { el.DOMElement.className = 'pageController'; })
            }

            this.buttons[0].DOMElement.innerHTML = 'Prev';
            this.buttons[0].DOMElement.id = 'prev';
            this.buttons[0].DOMElement.onclick = self.prevPage;
            this.buttons[4].DOMElement.innerHTML = 'Next';
            this.buttons[4].DOMElement.id = 'next';
            this.buttons[4].DOMElement.onclick = self.nextPage;

            var firstLoadPagesCount = Math.ceil(AppSettings.responsItemsCount / self.videosOnPage());
            if (firstLoadPagesCount < 4) {
                for (var i = 1; i <= firstLoadPagesCount; i++) {
                    this.buttons[i].DOMElement.className = 'pageController';

                }
            } else {
                for (var i = 1; i < 4; i++) {
                    this.buttons[i].DOMElement.className = 'pageController';

                }
            }

            // for (let i = 0; i < 5; i++) {
            //      this.buttons.push(new Button);
            // }

            // var firstLoadPagesCount = Math.ceil(AppSettings.responsItemsCount / self.videosOnPage());
            // if(firstLoadPagesCount < 4){
            //     for(var i = 1; i <= firstLoadPagesCount; i++ ){
            //         this.buttons[i].create();
            //         this.buttons[i].DOMElement.innerHTML = i;
            //         this.buttons[i].DOMElement.onclick = () => self.changePage(this.buttons[i], undefined);
            //     }
            // }


            self.calcLastPage();
            self.setPage(1);



        } else {
            self.setWidth(AppSettings.screenWidth);
            document.body.appendChild(self.DOMElement);
            self.page = 1;
            self.DOMElement.innerHTML = '<span class = "nullRes">Sorry, nothing was found :(</span>';
            self.DOMElement.style.cursor = 'default';
            self.noResults = true;

        }


        var list = self.DOMElement;
        if (!self.noResults) {
            list.onmousedown = function (e) {
                var coords = getCoords(list);
                var shiftX = e.pageX - coords.left;
                self.screenX = event.screenX;
                self.DOMElement.style.cursor = '-webkit-grabbing';

                list.style.position = 'relative';
                moveAt(e);

                function moveAt(e) {
                    list.style.transition = 'none';
                    list.style.transform = `translate(${e.pageX - shiftX}px)`;
                    self.deltaTranslate = e.pageX - shiftX;
                }

                document.onmousemove = function (e) {
                    moveAt(e);
                };

                list.onmouseup = function () {
                    list.style.transition = 'transform 1s';
                    document.onmousemove = document.onmouseup = null;
                    list.onmouseup = list.onmousemove = null;
                    self.DOMElement.style.cursor = '-webkit-grab';
                    var delta = self.screenX - event.screenX;
                    if (delta < 0) {
                        if (delta < -self.swipeLength) {
                            if (self.page > 1) {

                                self.prevPage();
                            } else {
                                list.style.transform = `translate(${self.currentTranslate}px)`;
                            }
                        } else {
                            list.style.transform = `translate(${self.currentTranslate}px)`;

                        }
                    }

                    if (delta > 0) {
                        if (delta > self.swipeLength) {
                            if (self.page != self.lastPage) {
                                self.nextPage();
                            } else {
                                list.style.transform = `translate(${self.currentTranslate}px)`;
                                for (let i = 0; i < 5; i++){
                                    if(AppManager.pageControllers[i].DOMElement.innerHTML == self.page){
                                        for(let j = 4; j > i; j--){
                                            AppManager.pageControllers[j].DOMElement.className = 'pageController disable';
                                            AppManager.pageControllers[j].DOMElement.onclick = 'none';

                                        }
                                    }
                                }
                            }
                        } else {
                            list.style.transform = `translate(${self.currentTranslate}px)`;
                             for (let i = 0; i < 5; i++){
                                    if(AppManager.pageControllers[i].DOMElement.innerHTML == self.page){
                                        for(let j = 4; j > i; j--){
                                            AppManager.pageControllers[j].DOMElement.className = 'pageController disable';
                                            AppManager.pageControllers[j].DOMElement.onclick = 'none';

                                        }
                                    }
                                }
                        }
                    }
                };

                function getCoords(elem) {
                    var box = elem.getBoundingClientRect();

                    return {
                        left: box.left + pageXOffset
                    };

                }
                return false;
            }

            list.ondragstart = function () {
                return false;
            };

        }

        AppManager.disableScreen.style.display = 'none';
        AppManager.spiner.style.display = 'none';
    }


    createNodes(width) {
        for (let i = 0; i < AppSettings.responsItemsCount; i++) {
            var videoNode = new VideoNode(width);
            self.videoNodes.push(videoNode);
            videoNode.create(AppManager.currentVideos[i]);
        }
    }

    getDOMElement() {
        return this.DOMElement;
    }

    setWidth(width) {
        this.width = width;
        if (Math.ceil(this.width / AppSettings.screenWidth) == (this.width / AppSettings.screenWidth)) {
            this.DOMElement.style.width = `${this.width}px`;
        } else {
            this.width = Math.ceil(this.width / AppSettings.screenWidth) * AppSettings.screenWidth;
            this.DOMElement.style.width = `${this.width}px`;
        }
    }

    setMargin(margin) {
        if (self.videoNodes.length) {
            for (let i = 0; i < self.videoNodes.length; i++) {
                self.videoNodes[i].setMargin(margin);
            }
        }
    }

    videosOnPage() {
        if (this.videosOnPageNumber == null) {
            if (AppManager.videoNodes.length != 0) {
                this.videosOnPageNumber = Math.floor(AppSettings.screenWidth / AppManager.videoNodes[0].width)
            } else {
                this.videosOnPageNumber = 0;
            }
            this.prevVideosOnPageNumber = this.videosOnPageNumber;
        } else {

            this.prevVideosOnPageNumber = this.videosOnPageNumber;
            this.videosOnPageNumber = Math.floor(AppSettings.screenWidth / AppManager.videoNodes[0].width);
        }
        return this.videosOnPageNumber;

    }

    setPage(pageNum) {
        self.page = pageNum;
        self.DOMElement.style.left = '0px';
        self.DOMElement.style.transform = `translateX(-${(pageNum - 1) * AppSettings.screenWidth}px)`;
        self.currentTranslate = -((pageNum - 1) * AppSettings.screenWidth);
        self.calcLoadPage();
        self.onPageSet();
        
        if (AppSettings.responsItemsCount) {
            if (self.page !== self.pageForLoad && (self.page + 1) != self.lastPage) {
                if (self.page <= 1) {
                    self.buttons[0].DOMElement.className = 'pageController disable';
                    self.buttons[0].DOMElement.onclick = 'none';
                    for (let i = 1; i < 4; i++) {
                        self.buttons[i].DOMElement.innerHTML = i;
                    }

                } else {
                    self.buttons[0].DOMElement.className = 'pageController';
                    this.buttons[0].DOMElement.onclick = self.prevPage;
                    for (var key in self.pageFunctions) {
                        this.buttons[key].DOMElement.innerHTML = self.pageFunctions[key](self.page);
                    }
                }

                self.buttons[4].DOMElement.className = 'pageController';
                self.buttons[4].DOMElement.onclick = self.nextPage;

            }
        } 

        


        for (let i = 1; i < 4; i++) {
            if (this.buttons[i].DOMElement) {
                var buttonController = this.buttons[i];
                buttonController.setActive(buttonController.DOMElement.innerHTML == pageNum);
            }
        }

        // if (self.isLastPage()) {
        //     if (AppSettings.screenWidth > 767) {
        //         self.buttons[4].DOMElement.className = 'pageController disable';
        //     }
        //     self.buttons[4].DOMElement.onclick = 'none';
        // } else {
        //     self.buttons[4].DOMElement.className = 'pageController';
        //     this.buttons[4].DOMElement.onclick = self.nextPage;
        // }




    }

    onPageSet() {
        //if (self.pageForLoad != self.lastPage) {
            if (self.page === self.pageForLoad) {
                YouTubeApiClient.search(function (response) {
                    console.log(response);
                    AppManager.currentVideos = response.items;
                    self.calcLastPage();
                    if (self.page != self.lastPage) {
                        if (AppSettings.screenWidth < 400) {
                            self.createNodes(AppSettings.screenWidth);
                        } else {
                            self.createNodes(400);
                        }
                        self.calcLastPage();
                        AppManager.disableScreen.style.display = 'none';
                        AppManager.spiner.style.display = 'none';
                        let countOfVideos = self.videosOnPage();
                        let margin = ((AppSettings.screenWidth - (AppSettings.videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
                        self.setMargin(margin);

                        let width = (self.videoNodes.length * AppSettings.videoNodeWidth) + (self.videoNodes.length * margin * 2);
                        self.setWidth(width);

                        self.videoNodes.filter(vn => vn.rendered == false).map(vn => vn.render());
                        // if (self.isLastPage()) {
                        //     if (AppSettings.screenWidth > 767) {
                        //         self.buttons[4].DOMElement.className = 'pageController disable';
                        //     }
                        //     self.buttons[4].DOMElement.onclick = 'none';
                        // } else {

                        self.buttons[4].DOMElement.className = 'pageController';
                        self.buttons[4].DOMElement.onclick = self.nextPage;


                        //}

                    }
                });


                // self.calcLastPage();


           // }
        } else {
            self.buttons[4].DOMElement.className = 'pageController disable';
            self.buttons[4].DOMElement.onclick = 'none';
        }

        console.log('page for load: ' + self.pageForLoad);
                    console.log('last page: ' + self.lastPage);
    }

    calcLoadPage() {
        self.pageForLoad;
        var tempPageForLoad = AppManager.videoNodes.length / self.videosOnPage();
        if (Number.isInteger(tempPageForLoad)) {
            self.pageForLoad = tempPageForLoad - 1;
        } else {
            self.pageForLoad = Math.floor(tempPageForLoad);
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

    calcLastPage() {
        let lastVideos = AppSettings.responsItemsCount / self.videosOnPage();
        if (AppSettings.responsItemsCount < 15) {
            if (Math.ceil(lastVideos) === lastVideos) {
                self.lastPage = AppManager.videoNodes.length / self.videosOnPage();
            } else {
                self.lastPage = Math.ceil(AppManager.videoNodes.length / self.videosOnPage());
            }
        } else {
            self.lastPage = Math.ceil(AppManager.videoNodes.length / self.videosOnPage());
        }
        return self.lastPage;
    }

    isLastPage() {
        if (self.page === self.lastPage) {
            return true;
        }
        return false;
    }

    remove() {
        if (self.noResults) {
            self.DOMElement.parentNode.removeChild(self.DOMElement);
        } else {
            document.body.removeChild(AppManager.resultsList.controllers);
            AppManager.videoNodes = [];
            AppSettings.nextPageToken = null;
            AppManager.currentVideos = [];
            self.DOMElement.parentNode.removeChild(self.DOMElement);
            AppManager.resultsList = null;
            AppSettings.responsItemsCount = 0;
        }
    }
}


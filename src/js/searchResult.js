import AppManager from './appManager';
import AppSettings from './appSettings.js';
import ElementFactory from './elementFactory';
import YouTubeApiClient from './youTubeApiClient';
import VideoNode from './videoNode';
import Button from './button';

export default class SearchResult {
    constructor() {
        AppManager.resultsList = this;
        AppManager.resultsList.pageFunctions = {
            1: function (page) { return page - 1; },
            2: function (page) { return page; },
            3: function (page) { return page + 1; }
        }

        AppManager.resultsList.videoNodes = [];
        AppManager.resultsList.page = 1;
        AppManager.resultsList.videosOnPageNumber = null;
        AppManager.resultsList.prevVideosOnPageNumber = null;
        AppManager.resultsList.swipeLength = 100;
        AppManager.resultsList.lastPage = null;
        AppManager.resultsList.noResults = false;

        
    }

    create() {
        this.DOMElement = ElementFactory.create('div', { class: 'resultList' });
        if (AppSettings.responsItemsCount != 0) {
            if (AppSettings.screenWidth < 400) {
                AppManager.resultsList.createNodes(AppSettings.screenWidth);
            } else {
                AppManager.resultsList.createNodes(400);
            }
            for (let i = 0; i < AppSettings.responsItemsCount; i++) {
                AppManager.resultsList.videoNodes[i].render();
            }
            this.buttons = [];

            let countOfVideos = AppManager.resultsList.videosOnPage();
            let margin = ((AppSettings.screenWidth - (AppSettings.videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
            this.setMargin(margin);

            let width = (AppManager.resultsList.videoNodes.length * AppSettings.videoNodeWidth) + (AppManager.resultsList.videoNodes.length * margin * 2);
            this.setWidth(width);

            document.body.appendChild(AppManager.resultsList.DOMElement);
            AppManager.resultsList.controllers = ElementFactory.create('div', { class: 'controllers' });
            document.body.appendChild(AppManager.resultsList.controllers);



            for (let i = 0; i < 5; i++) {
                this.buttons.push(new Button);
                this.buttons[i].create();
                if (i > 0 && i < 4) {
                    this.buttons[i].DOMElement.innerHTML = i;
                    this.buttons[i].DOMElement.onclick = () => AppManager.resultsList.changePage(this.buttons[i], undefined);
                }
            }
            if (AppSettings.screenWidth > 767) {
                this.buttons.map(function (el) { el.DOMElement.className = 'pageController'; })
            }

            this.buttons[0].DOMElement.innerHTML = 'Prev';
            this.buttons[0].DOMElement.id = 'prev';
            this.buttons[0].DOMElement.onclick = AppManager.resultsList.prevPage;
            this.buttons[4].DOMElement.innerHTML = 'Next';
            this.buttons[4].DOMElement.id = 'next';
            this.buttons[4].DOMElement.onclick = AppManager.resultsList.nextPage;

            var firstLoadPagesCount = Math.ceil(AppSettings.responsItemsCount / AppManager.resultsList.videosOnPage());
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

            // var firstLoadPagesCount = Math.ceil(AppSettings.responsItemsCount / AppManager.resultsList.videosOnPage());
            // if(firstLoadPagesCount < 4){
            //     for(var i = 1; i <= firstLoadPagesCount; i++ ){
            //         this.buttons[i].create();
            //         this.buttons[i].DOMElement.innerHTML = i;
            //         this.buttons[i].DOMElement.onclick = () => AppManager.resultsList.changePage(this.buttons[i], undefined);
            //     }
            // }


            AppManager.resultsList.calcLastPage();
            AppManager.resultsList.setPage(1);



        } else {
            AppManager.resultsList.setWidth(AppSettings.screenWidth);
            document.body.appendChild(AppManager.resultsList.DOMElement);
            AppManager.resultsList.page = 1;
            AppManager.resultsList.DOMElement.innerHTML = '<span class = "nullRes">Sorry, nothing was found :(</span>';
            AppManager.resultsList.DOMElement.style.cursor = 'default';
            AppManager.resultsList.noResults = true;

        }


        var list = AppManager.resultsList.DOMElement;
        if (!AppManager.resultsList.noResults) {
            list.onmousedown = function (e) {
                var coords = getCoords(list);
                var shiftX = e.pageX - coords.left;
                AppManager.resultsList.screenX = event.screenX;
                AppManager.resultsList.DOMElement.style.cursor = '-webkit-grabbing';

                list.style.position = 'relative';
                moveAt(e);

                function moveAt(e) {
                    list.style.transition = 'none';
                    list.style.transform = `translate(${e.pageX - shiftX}px)`;
                    AppManager.resultsList.deltaTranslate = e.pageX - shiftX;
                }

                document.onmousemove = function (e) {
                    moveAt(e);
                };

                list.onmouseup = function () {
                    list.style.transition = 'transform 1s';
                    document.onmousemove = document.onmouseup = null;
                    list.onmouseup = list.onmousemove = null;
                    AppManager.resultsList.DOMElement.style.cursor = '-webkit-grab';
                    var delta = AppManager.resultsList.screenX - event.screenX;
                    if (delta < 0) {
                        if (delta < -AppManager.resultsList.swipeLength) {
                            if (AppManager.resultsList.page > 1) {

                                AppManager.resultsList.prevPage();
                            } else {
                                list.style.transform = `translate(${AppManager.resultsList.currentTranslate}px)`;
                            }
                        } else {
                            list.style.transform = `translate(${AppManager.resultsList.currentTranslate}px)`;

                        }
                    }

                    if (delta > 0) {
                        if (delta > AppManager.resultsList.swipeLength) {
                            if (AppManager.resultsList.page != AppManager.resultsList.lastPage) {
                                AppManager.resultsList.nextPage();
                            } else {
                                list.style.transform = `translate(${AppManager.resultsList.currentTranslate}px)`;
                                for (let i = 0; i < 5; i++){
                                    if(AppManager.pageControllers[i].DOMElement.innerHTML == AppManager.resultsList.page){
                                        for(let j = 4; j > i; j--){
                                            AppManager.pageControllers[j].DOMElement.className = 'pageController disable';
                                            AppManager.pageControllers[j].DOMElement.onclick = 'none';

                                        }
                                    }
                                }
                            }
                        } else {
                            list.style.transform = `translate(${AppManager.resultsList.currentTranslate}px)`;
                             for (let i = 0; i < 5; i++){
                                    if(AppManager.pageControllers[i].DOMElement.innerHTML == AppManager.resultsList.page){
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
            AppManager.resultsList.videoNodes.push(videoNode);
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
        if (AppManager.resultsList.videoNodes.length) {
            for (let i = 0; i < AppManager.resultsList.videoNodes.length; i++) {
                AppManager.resultsList.videoNodes[i].setMargin(margin);
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
        AppManager.resultsList.page = pageNum;
        AppManager.resultsList.DOMElement.style.left = '0px';
        AppManager.resultsList.DOMElement.style.transform = `translateX(-${(pageNum - 1) * AppSettings.screenWidth}px)`;
        AppManager.resultsList.currentTranslate = -((pageNum - 1) * AppSettings.screenWidth);
        AppManager.resultsList.calcLoadPage();
        AppManager.resultsList.onPageSet();
        
        if (AppSettings.responsItemsCount) {
            if (AppManager.resultsList.page !== AppManager.resultsList.pageForLoad && (AppManager.resultsList.page + 1) != AppManager.resultsList.lastPage) {
                if (AppManager.resultsList.page <= 1) {
                    AppManager.resultsList.buttons[0].DOMElement.className = 'pageController disable';
                    AppManager.resultsList.buttons[0].DOMElement.onclick = 'none';
                    for (let i = 1; i < 4; i++) {
                        AppManager.resultsList.buttons[i].DOMElement.innerHTML = i;
                    }

                } else {
                    AppManager.resultsList.buttons[0].DOMElement.className = 'pageController';
                    this.buttons[0].DOMElement.onclick = AppManager.resultsList.prevPage;
                    for (var key in AppManager.resultsList.pageFunctions) {
                        this.buttons[key].DOMElement.innerHTML = AppManager.resultsList.pageFunctions[key](AppManager.resultsList.page);
                    }
                }

                AppManager.resultsList.buttons[4].DOMElement.className = 'pageController';
                AppManager.resultsList.buttons[4].DOMElement.onclick = AppManager.resultsList.nextPage;

            }
        } 

        


        for (let i = 1; i < 4; i++) {
            if (this.buttons[i].DOMElement) {
                var buttonController = this.buttons[i];
                buttonController.setActive(buttonController.DOMElement.innerHTML == pageNum);
            }
        }

        // if (AppManager.resultsList.isLastPage()) {
        //     if (AppSettings.screenWidth > 767) {
        //         AppManager.resultsList.buttons[4].DOMElement.className = 'pageController disable';
        //     }
        //     AppManager.resultsList.buttons[4].DOMElement.onclick = 'none';
        // } else {
        //     AppManager.resultsList.buttons[4].DOMElement.className = 'pageController';
        //     this.buttons[4].DOMElement.onclick = AppManager.resultsList.nextPage;
        // }




    }

    onPageSet() {
        //if (AppManager.resultsList.pageForLoad != AppManager.resultsList.lastPage) {
            if (AppManager.resultsList.page === AppManager.resultsList.pageForLoad) {
                YouTubeApiClient.search(function (response) {
                    console.log(response);
                    AppManager.currentVideos = response.items;
                    AppManager.resultsList.calcLastPage();
                    if (AppManager.resultsList.page != AppManager.resultsList.lastPage) {
                        if (AppSettings.screenWidth < 400) {
                            AppManager.resultsList.createNodes(AppSettings.screenWidth);
                        } else {
                            AppManager.resultsList.createNodes(400);
                        }
                        AppManager.resultsList.calcLastPage();
                        AppManager.disableScreen.style.display = 'none';
                        AppManager.spiner.style.display = 'none';
                        let countOfVideos = AppManager.resultsList.videosOnPage();
                        let margin = ((AppSettings.screenWidth - (AppSettings.videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
                        AppManager.resultsList.setMargin(margin);

                        let width = (AppManager.resultsList.videoNodes.length * AppSettings.videoNodeWidth) + (AppManager.resultsList.videoNodes.length * margin * 2);
                        AppManager.resultsList.setWidth(width);

                        AppManager.resultsList.videoNodes.filter(vn => vn.rendered == false).map(vn => vn.render());
                        // if (AppManager.resultsList.isLastPage()) {
                        //     if (AppSettings.screenWidth > 767) {
                        //         AppManager.resultsList.buttons[4].DOMElement.className = 'pageController disable';
                        //     }
                        //     AppManager.resultsList.buttons[4].DOMElement.onclick = 'none';
                        // } else {

                        AppManager.resultsList.buttons[4].DOMElement.className = 'pageController';
                        AppManager.resultsList.buttons[4].DOMElement.onclick = AppManager.resultsList.nextPage;


                        //}

                    }
                });


                // AppManager.resultsList.calcLastPage();


           // }
        } else {
            AppManager.resultsList.buttons[4].DOMElement.className = 'pageController disable';
            AppManager.resultsList.buttons[4].DOMElement.onclick = 'none';
        }

        console.log('page for load: ' + AppManager.resultsList.pageForLoad);
                    console.log('last page: ' + AppManager.resultsList.lastPage);
    }

    calcLoadPage() {
        AppManager.resultsList.pageForLoad;
        var tempPageForLoad = AppManager.videoNodes.length / AppManager.resultsList.videosOnPage();
        if (Number.isInteger(tempPageForLoad)) {
            AppManager.resultsList.pageForLoad = tempPageForLoad - 1;
        } else {
            AppManager.resultsList.pageForLoad = Math.floor(tempPageForLoad);
        }
    }

    nextPage() {
        AppManager.resultsList.setPage(AppManager.resultsList.page + 1);
    }

    prevPage() {
        AppManager.resultsList.setPage(AppManager.resultsList.page - 1);
    }

    changePage(button, pageNum) {
        AppManager.resultsList.setPage(pageNum == undefined ? parseInt(button.DOMElement.innerHTML) : pageNum);
    }

    calcLastPage() {
        let lastVideos = AppSettings.responsItemsCount / AppManager.resultsList.videosOnPage();
        if (AppSettings.responsItemsCount < 15) {
            if (Math.ceil(lastVideos) === lastVideos) {
                AppManager.resultsList.lastPage = AppManager.videoNodes.length / AppManager.resultsList.videosOnPage();
            } else {
                AppManager.resultsList.lastPage = Math.ceil(AppManager.videoNodes.length / AppManager.resultsList.videosOnPage());
            }
        } else {
            AppManager.resultsList.lastPage = Math.ceil(AppManager.videoNodes.length / AppManager.resultsList.videosOnPage());
        }
        return AppManager.resultsList.lastPage;
    }

    isLastPage() {
        if (AppManager.resultsList.page === AppManager.resultsList.lastPage) {
            return true;
        }
        return false;
    }

    remove() {
        if (AppManager.resultsList.noResults) {
            AppManager.resultsList.DOMElement.parentNode.removeChild(AppManager.resultsList.DOMElement);
        } else {
            document.body.removeChild(AppManager.resultsList.controllers);
            AppManager.videoNodes = [];
            AppSettings.nextPageToken = null;
            AppManager.currentVideos = [];
            AppManager.resultsList.DOMElement.parentNode.removeChild(AppManager.resultsList.DOMElement);
            AppManager.resultsList = null;
            AppSettings.responsItemsCount = 0;
        }
    }
}


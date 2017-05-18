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
        self.swipeLength = 100;
        self.lastPage = null;
        self.noResults = false;

        components.searchResult = this;
    }

    create() {
        this.DOMElement = ElementFactory.create('div', { class: 'resultList' });
        if (videoArr.length != 0) {
            if (screenWidth < 400) {
                self.createNodes(screenWidth);
            } else {
                self.createNodes(400);
            }
            for (let i = 0; i < videoArr.length; i++) {
                self.videoNodes[i].render();
            }
            this.buttons = [];

            let countOfVideos = self.videosOnPage();
            let margin = ((screenWidth - (videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
            this.setMargin(margin);

            let width = (self.videoNodes.length * videoNodeWidth) + (self.videoNodes.length * margin * 2);
            this.setWidth(width);

            body.appendChild(self.DOMElement);
            self.controllers = ElementFactory.create('div', { class: 'controllers' });
            body.appendChild(self.controllers);

            for (let i = 0; i < 5; i++) {
                this.buttons.push(new Button);
                this.buttons[i].create();
                if (i > 0 && i < 4) {
                    this.buttons[i].DOMElement.innerHTML = i;
                    this.buttons[i].DOMElement.onclick = () => self.changePage(this.buttons[i], undefined);
                }
            }

            this.buttons[0].DOMElement.innerHTML = 'Prev';
            this.buttons[0].DOMElement.id = 'prev';
            this.buttons[0].DOMElement.onclick = self.prevPage;
            this.buttons[4].DOMElement.innerHTML = 'Next';
            this.buttons[4].DOMElement.id = 'next';
            this.buttons[4].DOMElement.onclick = self.nextPage;
            self.calcLastPage();
            self.setPage(1);

        } else {
            self.setWidth(screenWidth);
            body.appendChild(self.DOMElement);
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
                            }
                        } else {
                            list.style.transform = `translate(${self.currentTranslate}px)`;
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

        disableScreen.style.display = 'none';
    }


    createNodes(width) {
        for (let i = 0; i < videoArr.length; i++) {
            var videoNode = new VideoNode(width);
            self.videoNodes.push(videoNode);
            videoNode.create(videoArr[i]);
        }
    }

    getDOMElement() {
        return this.DOMElement;
    }

    setWidth(width) {
        this.width = width;
        if (Math.ceil(this.width / screenWidth) == (this.width / screenWidth)) {
            this.DOMElement.style.width = `${this.width}px`;
        } else {
            this.width = Math.ceil(this.width / screenWidth) * screenWidth;
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
            if (components.videoNodes.length != 0) {
                this.videosOnPageNumber = Math.floor(screenWidth / components.videoNodes[0].width)
            } else {
                this.videosOnPageNumber = 0;
            }
            this.prevVideosOnPageNumber = this.videosOnPageNumber;
        } else {

            this.prevVideosOnPageNumber = this.videosOnPageNumber;
            this.videosOnPageNumber = Math.floor(screenWidth / components.videoNodes[0].width);
        }
        return this.videosOnPageNumber;

    }

    setPage(pageNum) {
        self.page = pageNum;
        self.DOMElement.style.left = '0px';
        self.DOMElement.style.transform = `translateX(-${(pageNum - 1) * screenWidth}px)`;
        self.currentTranslate = -((pageNum - 1) * screenWidth);
        self.onPageSet();
        self.calcLoadPage();

        if (videoArr.length) {        // ?Добавить убирание кнопок ,если мало видео
            if (self.page <= 1) {
                if (screenWidth > 767) {
                    self.buttons[0].DOMElement.style.opacity = '0';
                }
                self.buttons[0].DOMElement.onclick = 'none';
                for (let i = 1; i < 4; i++) {
                    self.buttons[i].DOMElement.innerHTML = i;
                }

            } else {
                self.buttons[0].DOMElement.style.opacity = '1';
                this.buttons[0].DOMElement.onclick = self.prevPage;
                for (var key in self.pageFunctions) {
                    this.buttons[key].DOMElement.innerHTML = self.pageFunctions[key](self.page);
                }
            }


            for (let i = 1; i < 4; i++) {

                var buttonController = this.buttons[i];
                buttonController.setActive(buttonController.DOMElement.innerHTML == pageNum);
            }

            self.calcLastPage();

            if (self.isLastPage()) {
                if (screenWidth > 767) {
                    self.buttons[4].DOMElement.style.opacity = '0';
                }
                self.buttons[4].DOMElement.onclick = 'none';
            } else {
                self.buttons[4].DOMElement.style.opacity = '1';
                this.buttons[4].DOMElement.onclick = self.nextPage;
            }


        }
    }

    onPageSet() {
        if (self.page === self.pageForLoad) {
            if(self.page != self.lastPage){
                YouTubeApiClient.search(function (response) {
                    videoArr = response.items;
                    if (screenWidth < 400) {
                        self.createNodes(screenWidth);
                    } else {
                        self.createNodes(400);
                    }
                    disableScreen.style.display = 'none';
                    let countOfVideos = self.videosOnPage();
                    let margin = ((screenWidth - (videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
                    self.setMargin(margin);

                    let width = (self.videoNodes.length * videoNodeWidth) + (self.videoNodes.length * margin * 2);
                    self.setWidth(width);

                    self.videoNodes.filter(vn => vn.rendered == false).map(vn => vn.render());
                });

                self.calcLastPage();

            }
        }
    }

    calcLoadPage() {
        self.pageForLoad;
        var tempPageForLoad = components.videoNodes.length / self.videosOnPage();
        if (Number.isInteger(tempPageForLoad)) {
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

    calcLastPage() {
        console.log(self.page);
        if (videoArr.length < 15) {
            var lastVideos = videoArr.length / self.videosOnPage();
            if (Math.ceil(lastVideos) === lastVideos) {
                //self.lastPage = self.page + Math.ceil(lastVideos);
                self.lastPage = components.videoNodes.length / self.videosOnPage();
            } else {
                self.lastPage =  Math.ceil(components.videoNodes.length / self.videosOnPage());
            }
        } else {
            self.lastPage =  Math.ceil(components.videoNodes.length / self.videosOnPage());
        }
        console.log(self.lastPage);
        return self.lastPage;
    }

    isLastPage() {
        if (self.page === self.lastPage) {
            return true;
        } else {
            return false;
        }
    }

    // renderNewVideos() {
    // }

    remove() {
        if (self.noResults) {
            self.DOMElement.parentNode.removeChild(self.DOMElement);
        } else {
            body.removeChild(components.searchResult.controllers);
            components.videoNodes = [];
            nextPageToken = null;
            videoArr = [];
            self.DOMElement.parentNode.removeChild(self.DOMElement);
            components.searchResult = null;
        }
    }
}
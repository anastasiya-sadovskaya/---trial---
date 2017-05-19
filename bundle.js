/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchButton = exports.input = exports.responsItemsCount = exports.spiner = exports.disableScreen = exports.a = exports.videoNodeWidth = exports.videoNodeWidthExceptPhones = exports.screenWidth = exports.body = exports.components = undefined;
exports.onSearchSuccessCallback = onSearchSuccessCallback;

var _elementFactory = __webpack_require__(1);

var _elementFactory2 = _interopRequireDefault(_elementFactory);

var _youTubeApiClient = __webpack_require__(3);

var _youTubeApiClient2 = _interopRequireDefault(_youTubeApiClient);

var _searchResult = __webpack_require__(2);

var _searchResult2 = _interopRequireDefault(_searchResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = exports.components = {};
var body = exports.body = document.body;
var screenWidth = exports.screenWidth = body.offsetWidth;
var videoNodeWidthExceptPhones = exports.videoNodeWidthExceptPhones = 400;
var videoNodeWidth = exports.videoNodeWidth = 400;
var a = exports.a = { b: 42 };
var disableScreen = exports.disableScreen = _elementFactory2.default.create('div', { class: 'disableScreen' });
var spiner = exports.spiner = _elementFactory2.default.create('img', { class: 'spiner', src: 'img/spiner2.gif' });
body.appendChild(disableScreen);
disableScreen.style.display = 'none';
body.appendChild(spiner);
spiner.style.display = 'none';
components.videoNodes = [];
components.pageControllers = [];
var responsItemsCount = exports.responsItemsCount = 0;

body.onresize = function () {
    exports.screenWidth = screenWidth = body.offsetWidth;
    if (screenWidth < 400) {
        exports.videoNodeWidth = videoNodeWidth = screenWidth;
        body.className = 'phone';
        input.className = 'phone';
        search.className += ' phone';
    } else {
        exports.videoNodeWidth = videoNodeWidth = videoNodeWidthExceptPhones;
        body.className = '';
        input.className = '';
        search.className = 'search';
    }
    components.videoNodes.map(function (el) {
        el.DOMElement.style.width = videoNodeWidth + 'px';
    });
    if (components.searchResult) {
        var videosOnPage;
        if (screenWidth < 400) {
            videosOnPage = 1;
        } else {
            videosOnPage = components.searchResult.videosOnPage();
        }
        var margin = (screenWidth - videoNodeWidth * videosOnPage) / (videosOnPage * 2);
        components.searchResult.setMargin(margin);

        var width = components.searchResult.videoNodes.length * videoNodeWidth + components.searchResult.videoNodes.length * margin * 2;
        components.searchResult.setWidth(width);

        var page = Math.ceil(((components.searchResult.page - 1) * components.searchResult.prevVideosOnPageNumber + 1) / videosOnPage);
        components.searchResult.setPage(page);
    }
};

var input = exports.input = _elementFactory2.default.create('input', { type: 'text', class: 'input', id: 'query', autofocus: '', placeholder: 'Enter request...' });
_elementFactory2.default.render(input);
var searchButton = exports.searchButton = _elementFactory2.default.create('button', { class: 'search', id: 'search' }, {
    innerHTML: 'Search', onclick: onSearchSuccessCallback });
_elementFactory2.default.render(searchButton);

document.onkeypress = function (event) {
    if (event.keyCode == 13) {
        searchButton.click();
    }
};

function renderPreviews() {
    var list = new _searchResult2.default();
    list.create();
}

function onSearchSuccessCallback() {
    if (components.searchResult) {
        components.searchResult.remove();
    }
    _youTubeApiClient2.default.search(function (response) {
        console.log(response);
        body.style.display = 'block';
        renderPreviews();
        if (screenWidth < 400) {
            body.className = 'phone';
            input.className = 'phone';
            search.className += ' phone';
        }
    });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ElementFactory() {
    var element = null;
    return {
        create: function create(tagName, attrs, props) {
            element = document.createElement(tagName);

            for (var attr in attrs) {
                element.setAttribute(attr, attrs[attr]);
            }

            Object.assign(element, props);
            if (props && props.style) {
                Object.assign(element.style, props.style);
            }
            return element;
        },

        render: function render(el, parent) {
            if (!parent) {
                document.body.appendChild(el);
            } else {
                parent.appendChild(el);
            }
            return el;
        }
    };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _videoNode = __webpack_require__(4);

var _videoNode2 = _interopRequireDefault(_videoNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchResult = function () {
    function SearchResult() {
        _classCallCheck(this, SearchResult);

        self = this;
        self.pageFunctions = {
            1: function _(page) {
                return page - 1;
            },
            2: function _(page) {
                return page;
            },
            3: function _(page) {
                return page + 1;
            }
        };

        self.videoNodes = [];
        self.page = 1;
        self.videosOnPageNumber = null;
        self.prevVideosOnPageNumber = null;
        self.swipeLength = 100;
        self.lastPage = null;
        self.noResults = false;

        components.searchResult = this;
    }

    _createClass(SearchResult, [{
        key: 'create',
        value: function create() {
            var _this = this;

            this.DOMElement = ElementFactory.create('div', { class: 'resultList' });
            if (videoArr.length != 0) {
                if (screenWidth < 400) {
                    self.createNodes(screenWidth);
                } else {
                    self.createNodes(400);
                }
                for (var _i = 0; _i < videoArr.length; _i++) {
                    self.videoNodes[_i].render();
                }
                this.buttons = [];

                var countOfVideos = self.videosOnPage();
                var margin = (screenWidth - videoNodeWidth * countOfVideos) / (countOfVideos * 2);
                this.setMargin(margin);

                var width = self.videoNodes.length * videoNodeWidth + self.videoNodes.length * margin * 2;
                this.setWidth(width);

                body.appendChild(self.DOMElement);
                self.controllers = ElementFactory.create('div', { class: 'controllers' });
                body.appendChild(self.controllers);

                var _loop = function _loop(_i2) {
                    _this.buttons.push(new Button());
                    _this.buttons[_i2].create();
                    if (_i2 > 0 && _i2 < 4) {
                        _this.buttons[_i2].DOMElement.innerHTML = _i2;
                        _this.buttons[_i2].DOMElement.onclick = function () {
                            return self.changePage(_this.buttons[_i2], undefined);
                        };
                    }
                };

                for (var _i2 = 0; _i2 < 5; _i2++) {
                    _loop(_i2);
                }
                if (screenWidth > 767) {
                    this.buttons.map(function (el) {
                        el.DOMElement.style.opacity = 0;
                    });
                }

                this.buttons[0].DOMElement.innerHTML = 'Prev';
                this.buttons[0].DOMElement.id = 'prev';
                this.buttons[0].DOMElement.onclick = self.prevPage;
                this.buttons[4].DOMElement.innerHTML = 'Next';
                this.buttons[4].DOMElement.id = 'next';
                this.buttons[4].DOMElement.onclick = self.nextPage;

                var firstLoadPagesCount = Math.ceil(videoArr.length / self.videosOnPage());
                if (firstLoadPagesCount < 4) {
                    for (var i = 1; i <= firstLoadPagesCount; i++) {
                        this.buttons[i].DOMElement.style.opacity = 1;
                    }
                } else {
                    for (var i = 1; i < 4; i++) {
                        this.buttons[i].DOMElement.style.opacity = 1;
                    }
                }

                // for (let i = 0; i < 5; i++) {
                //      this.buttons.push(new Button);
                // }

                // var firstLoadPagesCount = Math.ceil(videoArr.length / self.videosOnPage());
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
                        list.style.transform = 'translate(' + (e.pageX - shiftX) + 'px)';
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
                                    list.style.transform = 'translate(' + self.currentTranslate + 'px)';
                                }
                            } else {
                                list.style.transform = 'translate(' + self.currentTranslate + 'px)';
                            }
                        }

                        if (delta > 0) {
                            if (delta > self.swipeLength) {
                                if (self.page != self.lastPage) {
                                    self.nextPage();
                                } else {
                                    list.style.transform = 'translate(' + self.currentTranslate + 'px)';
                                }
                            } else {
                                list.style.transform = 'translate(' + self.currentTranslate + 'px)';
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
                };

                list.ondragstart = function () {
                    return false;
                };
            }

            disableScreen.style.display = 'none';
            spiner.style.display = 'none';
        }
    }, {
        key: 'createNodes',
        value: function createNodes(width) {
            for (var i = 0; i < videoArr.length; i++) {
                var videoNode = new _videoNode2.default(width);
                self.videoNodes.push(videoNode);
                videoNode.create(videoArr[i]);
            }
        }
    }, {
        key: 'getDOMElement',
        value: function getDOMElement() {
            return this.DOMElement;
        }
    }, {
        key: 'setWidth',
        value: function setWidth(width) {
            this.width = width;
            if (Math.ceil(this.width / screenWidth) == this.width / screenWidth) {
                this.DOMElement.style.width = this.width + 'px';
            } else {
                this.width = Math.ceil(this.width / screenWidth) * screenWidth;
                this.DOMElement.style.width = this.width + 'px';
            }
        }
    }, {
        key: 'setMargin',
        value: function setMargin(margin) {
            if (self.videoNodes.length) {
                for (var i = 0; i < self.videoNodes.length; i++) {
                    self.videoNodes[i].setMargin(margin);
                }
            }
        }
    }, {
        key: 'videosOnPage',
        value: function videosOnPage() {
            if (this.videosOnPageNumber == null) {
                if (components.videoNodes.length != 0) {
                    this.videosOnPageNumber = Math.floor(screenWidth / components.videoNodes[0].width);
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
    }, {
        key: 'setPage',
        value: function setPage(pageNum) {
            self.page = pageNum;
            self.DOMElement.style.left = '0px';
            self.DOMElement.style.transform = 'translateX(-' + (pageNum - 1) * screenWidth + 'px)';
            self.currentTranslate = -((pageNum - 1) * screenWidth);
            self.onPageSet();
            self.calcLoadPage();
            if (videoArr.length) {
                if (self.page !== self.pageForLoad && self.page + 1 != self.lastPage) {
                    if (self.page <= 1) {
                        if (screenWidth > 767) {
                            self.buttons[0].DOMElement.style.opacity = '0';
                        }
                        self.buttons[0].DOMElement.onclick = 'none';
                        for (var i = 1; i < 4; i++) {
                            self.buttons[i].DOMElement.innerHTML = i;
                        }
                    } else {
                        self.buttons[0].DOMElement.style.opacity = '1';
                        this.buttons[0].DOMElement.onclick = self.prevPage;
                        for (var key in self.pageFunctions) {
                            this.buttons[key].DOMElement.innerHTML = self.pageFunctions[key](self.page);
                        }
                    }

                    self.buttons[4].DOMElement.style.opacity = '1';
                    self.buttons[4].DOMElement.onclick = self.nextPage;
                }
            }
            for (var _i3 = 1; _i3 < 4; _i3++) {
                if (this.buttons[_i3].DOMElement) {
                    var buttonController = this.buttons[_i3];
                    buttonController.setActive(buttonController.DOMElement.innerHTML == pageNum);
                }
            }

            self.calcLastPage();

            // if (self.isLastPage()) {
            //     if (screenWidth > 767) {
            //         self.buttons[4].DOMElement.style.opacity = '0';
            //     }
            //     self.buttons[4].DOMElement.onclick = 'none';
            // } else {
            //     self.buttons[4].DOMElement.style.opacity = '1';
            //     this.buttons[4].DOMElement.onclick = self.nextPage;
            // }

        }
    }, {
        key: 'onPageSet',
        value: function onPageSet() {
            if (self.pageForLoad != self.lastPage) {
                if (self.page === self.pageForLoad) {
                    YouTubeApiClient.search(function (response) {
                        videoArr = response.items;
                        self.calcLastPage();
                        if (self.page != self.lastPage) {
                            if (screenWidth < 400) {
                                self.createNodes(screenWidth);
                            } else {
                                self.createNodes(400);
                            }
                            self.calcLastPage();
                            disableScreen.style.display = 'none';
                            spiner.style.display = 'none';
                            var countOfVideos = self.videosOnPage();
                            var margin = (screenWidth - videoNodeWidth * countOfVideos) / (countOfVideos * 2);
                            self.setMargin(margin);

                            var width = self.videoNodes.length * videoNodeWidth + self.videoNodes.length * margin * 2;
                            self.setWidth(width);

                            self.videoNodes.filter(function (vn) {
                                return vn.rendered == false;
                            }).map(function (vn) {
                                return vn.render();
                            });
                            // if (self.isLastPage()) {
                            //     if (screenWidth > 767) {
                            //         self.buttons[4].DOMElement.style.opacity = '0';
                            //     }
                            //     self.buttons[4].DOMElement.onclick = 'none';
                            // } else {

                            self.buttons[4].DOMElement.style.opacity = '1';
                            self.buttons[4].DOMElement.onclick = self.nextPage;

                            //}
                        }
                    });

                    // self.calcLastPage();

                }
            } else {
                if (screenWidth > 767) {
                    self.buttons[4].DOMElement.style.opacity = '0';
                }
                self.buttons[4].DOMElement.onclick = 'none';
            }
        }
    }, {
        key: 'calcLoadPage',
        value: function calcLoadPage() {
            self.pageForLoad;
            var tempPageForLoad = components.videoNodes.length / self.videosOnPage();
            if (Number.isInteger(tempPageForLoad)) {
                self.pageForLoad = tempPageForLoad - 1;
            } else {
                self.pageForLoad = Math.floor(tempPageForLoad);
            }
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {
            self.setPage(self.page + 1);
        }
    }, {
        key: 'prevPage',
        value: function prevPage() {
            self.setPage(self.page - 1);
        }
    }, {
        key: 'changePage',
        value: function changePage(button, pageNum) {
            self.setPage(pageNum == undefined ? parseInt(button.DOMElement.innerHTML) : pageNum);
        }
    }, {
        key: 'calcLastPage',
        value: function calcLastPage() {
            console.log(self.page);
            if (videoArr.length < 15) {
                var lastVideos = videoArr.length / self.videosOnPage();
                if (Math.ceil(lastVideos) === lastVideos) {
                    //self.lastPage = self.page + Math.ceil(lastVideos);
                    self.lastPage = responsItemsCount / self.videosOnPage();
                } else {
                    self.lastPage = Math.ceil(responsItemsCount / self.videosOnPage());
                }
            } else {
                self.lastPage = Math.ceil(responsItemsCount / self.videosOnPage());
            }
            console.log(self.lastPage);
            return self.lastPage;
        }
    }, {
        key: 'isLastPage',
        value: function isLastPage() {
            if (self.page === self.lastPage) {
                return true;
            } else {
                return false;
            }
        }

        // renderNewVideos() {
        // }

    }, {
        key: 'remove',
        value: function remove() {
            if (self.noResults) {
                self.DOMElement.parentNode.removeChild(self.DOMElement);
            } else {
                body.removeChild(components.searchResult.controllers);
                components.videoNodes = [];
                nextPageToken = null;
                videoArr = [];
                self.DOMElement.parentNode.removeChild(self.DOMElement);
                components.searchResult = null;
                responsItemsCount = 0;
            }
        }
    }]);

    return SearchResult;
}();

exports.default = SearchResult;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = __webpack_require__(0);

var nextPageToken;

exports.default = function YouTubeApiClient() {
    var element = null,
        idArr = [],
        url = '';
    return {
        search: function search(successCallback) {
            return new Promise(function (resolve, reject) {
                _app.disableScreen.style.display = 'block';
                _app.spiner.style.display = 'block';
                var XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
                var q = _app.input.value;
                var xhr = new XHR();
                url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&alt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=' + q;
                if (nextPageToken) {
                    url += '&pageToken=' + (bla - bla);
                }
                xhr.open('GET', url, true);
                xhr.send();
                xhr.onload = function () {
                    if (this.status == 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
            }).then(function (response) {
                console.log(a.b);
                nextPageToken = response.nextPageToken;
                var ids = [];
                for (var i = 0; i < response.items.length; i++) {
                    ids.push(response.items[i].id.videoId);
                }

                YouTubeApiClient.getVideoInfo(ids, successCallback);
            });
        },

        getVideoInfo: function getVideoInfo(ids, successCallback) {
            return new Promise(function (resolve, reject) {
                var XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
                var q = _app.input.value;
                var xhr = new XHR();
                url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&id=';
                for (var i = 0; i < ids.length; i++) {
                    url += ids[i] + ',';
                }

                xhr.open('GET', url, true);
                xhr.send();
                xhr.onload = function () {
                    if (this.status == 200) {
                        resolve(JSON.parse(this.response));
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
            }).then(function (response) {
                //console.log(response);
                videoArr = response.items;
                responsItemsCount += response.items.length;
                successCallback(response);
            });
        }
    };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: C:/Users/Anastasia Sadovskaya/Documents/RS/empty/js/videoNode.js: \"videoNodeWidth\" is read-only\n\n\u001b[0m \u001b[90m  5 | \u001b[39m        components\u001b[33m.\u001b[39mvideoNodes\u001b[33m.\u001b[39mpush(\u001b[36mthis\u001b[39m)\u001b[33m;\u001b[39m\n \u001b[90m  6 | \u001b[39m        \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mmargin \u001b[33m=\u001b[39m \u001b[35m0\u001b[39m\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m  7 | \u001b[39m        videoNodeWidth \u001b[33m=\u001b[39m width\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m        \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m  8 | \u001b[39m        \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mwidth \u001b[33m=\u001b[39m videoNodeWidth\u001b[33m;\u001b[39m\n \u001b[90m  9 | \u001b[39m        \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mrendered \u001b[33m=\u001b[39m \u001b[36mfalse\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 10 | \u001b[39m\u001b[0m\n");

/***/ })
/******/ ]);
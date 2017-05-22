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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elementFactory__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(4);
// import 'babel-polyfill';

// import YouTubeApiClient from './youTubeApiClient';


/* harmony default export */ __webpack_exports__["a"] = (function AppManager() {
    return {
        searchInput: __WEBPACK_IMPORTED_MODULE_0__elementFactory__["a" /* default */].create('input', { type: 'text', class: 'input', id: 'query', autofocus: '', placeholder: 'Enter request...' }),
        searchButton: __WEBPACK_IMPORTED_MODULE_0__elementFactory__["a" /* default */].create('button', { class: 'search', id: 'search' }, { innerHTML: 'Search', onclick: __WEBPACK_IMPORTED_MODULE_1__app__["default"] }),
        disableScreen: __WEBPACK_IMPORTED_MODULE_0__elementFactory__["a" /* default */].create('div', { class: 'disableScreen' }),
        spiner: __WEBPACK_IMPORTED_MODULE_0__elementFactory__["a" /* default */].create('img', { class: 'spiner', src: 'img/spiner2.gif' }),
        currentVideos: [],
        resultsList: null,
        videoNodes: [],
        pageControllers: [],
    };
}());


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((function AppSettings() {
    return {
        nextPageToken: null,
        screenWidth: document.body.offsetWidth,
        videoNodeWidthExceptPhones: 400,
        videoNodeWidth: 400,
        responsItemsCount: 0
    }
})());

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function ElementFactory() {
    let element = null;
    return {
        create(tagName, attrs, props) {
            element = document.createElement(tagName);

            for (let attr in attrs) {
                element.setAttribute(attr, attrs[attr]);
            }

            Object.assign(element, props);
            if (props && props.style) {
                Object.assign(element.style, props.style);
            }
            return element;
        },

        render(el, parent) {
            if (!parent) {
                document.body.appendChild(el);
            } else {
                parent.appendChild(el);
            }
            return el;
        },
    };
}());


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__appManager__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appSettings__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__youTubeApiClient__ = __webpack_require__(3);
//import AppSettings from './appSettings';




// import ElementFactory from './elementFactory';
// import VideoNode from './videoNode';
// import SearchResult from './searchResult';
//import onSearchSuccessCallback from './app';

/* harmony default export */ __webpack_exports__["a"] = ((function YouTubeApiClient(...args) {
    var element = null,
        idArr = [],
        url = '';
    var getVideoInfo = function (ids, successCallback) {
        return new Promise(function (resolve, reject) {
            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            var q = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchInput.value;
            var xhr = new XHR();
            url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&id=`;
            for (let i = 0; i < ids.length; i++) {
                url += `${ids[i]},`;
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
        })

            .then(function (response) {
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].currentVideos = response.items;
                __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].responsItemsCount = response.items.length;
                successCallback(response);
            })

    };
    return {
        search: function (successCallback) {
            return new Promise(function (resolve, reject) {
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].disableScreen.style.display = 'block';
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].spiner.style.display = 'block';
                var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
                var q = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchInput.value;
                var xhr = new XHR();
                url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&alt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=${q}`;
                if (__WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].nextPageToken) {
                    url += `&pageToken=${__WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].nextPageToken}`;
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
            })
                .then(function (response) {
                    //console.log(a.b);
                    __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].nextPageToken = response.nextPageToken;
                    let ids = [];
                    for (let i = 0; i < response.items.length; i++) {
                        ids.push(response.items[i].id.videoId);
                    }

                    getVideoInfo(ids, successCallback);
                })
        }
    };
})());


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = onSearchSuccessCallback;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__appManager__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appSettings__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__youTubeApiClient__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__searchResult__ = __webpack_require__(5);







document.body.appendChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].disableScreen);
__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].disableScreen.style.display = 'none';
document.body.appendChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].spiner);
__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].spiner.style.display = 'none';
__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes = [];
__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].pageControllers = [];

document.body.onresize = () => {
    __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].screenWidth = document.body.offsetWidth;
    if (__WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].screenWidth < 400) {
        __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].videoNodeWidth = __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].screenWidth;
        document.body.className = 'phone';
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchInput.className = 'phone';
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchButton.className += ' phone';
    } else {
        __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].videoNodeWidth = __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].videoNodeWidthExceptPhones;
        document.body.className = '';
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchInput.className = '';
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchButton.className = 'search';
    }
    __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes.map((el, index) => {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes[index].DOMElement.style.width = `${__WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].videoNodeWidth}px`;
        return el;
    });
    if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList) {
        let videosOnPage;
        if (__WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].screenWidth < 400) {
            videosOnPage = 1;
        } else {
            videosOnPage = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPage();
        }
        const margin = ((__WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].screenWidth - (__WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].videoNodeWidth * videosOnPage)) / (videosOnPage * 2));
        const page = Math.ceil((((__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page - 1) * __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.prevVideosOnPageNumber) + 1) / videosOnPage);
        const width = (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.length * __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].videoNodeWidth) + (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.length * margin * 2);
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setWidth(width);
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setMargin(margin);
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setPage(page);
    }
};


document.body.appendChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchInput);
document.body.appendChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchButton);

document.onkeypress = (event) => {
    if (event.keyCode === 13) {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchButton.click();
    }
};

function renderPreviews() {
    const list = new __WEBPACK_IMPORTED_MODULE_3__searchResult__["a" /* default */]();
    list.create();
}

function onSearchSuccessCallback() {
    if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList) {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.remove();
    }

    __WEBPACK_IMPORTED_MODULE_2__youTubeApiClient__["a" /* default */].search(() => {
        document.body.style.display = 'block';
        renderPreviews();
        if (__WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].screenWidth < 400) {
            document.body.className = 'phone';
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchInput.className = 'phone';
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].searchButton.className += ' phone';
        }
    });
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__appManager__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appSettings_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elementFactory__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__youTubeApiClient__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__videoNode__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__button__ = __webpack_require__(6);







class SearchResult {
    constructor() {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList = this;
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.pageFunctions = {
            1: function (page) { return page - 1; },
            2: function (page) { return page; },
            3: function (page) { return page + 1; }
        }

        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes = [];
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page = 1;
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPageNumber = null;
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.prevVideosOnPageNumber = null;
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.swipeLength = 100;
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage = null;
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.noResults = false;

        
    }

    create() {
        this.DOMElement = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('div', { class: 'resultList' });
        if (__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].responsItemsCount != 0) {
            if (__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth < 400) {
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.createNodes(__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth);
            } else {
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.createNodes(400);
            }
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].responsItemsCount; i++) {
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes[i].render();
            }
            this.buttons = [];

            let countOfVideos = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPage();
            let margin = ((__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth - (__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
            this.setMargin(margin);

            let width = (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.length * __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].videoNodeWidth) + (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.length * margin * 2);
            this.setWidth(width);

            document.body.appendChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement);
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.controllers = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('div', { class: 'controllers' });
            document.body.appendChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.controllers);



            for (let i = 0; i < 5; i++) {
                this.buttons.push(new __WEBPACK_IMPORTED_MODULE_5__button__["a" /* default */]);
                this.buttons[i].create();
                if (i > 0 && i < 4) {
                    this.buttons[i].DOMElement.innerHTML = i;
                    this.buttons[i].DOMElement.onclick = () => __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.changePage(this.buttons[i], undefined);
                }
            }
            if (__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth > 767) {
                this.buttons.map(function (el) { el.DOMElement.className = 'pageController'; })
            }

            this.buttons[0].DOMElement.innerHTML = 'Prev';
            this.buttons[0].DOMElement.id = 'prev';
            this.buttons[0].DOMElement.onclick = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.prevPage;
            this.buttons[4].DOMElement.innerHTML = 'Next';
            this.buttons[4].DOMElement.id = 'next';
            this.buttons[4].DOMElement.onclick = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.nextPage;

            var firstLoadPagesCount = Math.ceil(__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].responsItemsCount / __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPage());
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


            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.calcLastPage();
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setPage(1);



        } else {
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setWidth(__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth);
            document.body.appendChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement);
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page = 1;
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement.innerHTML = '<span class = "nullRes">Sorry, nothing was found :(</span>';
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement.style.cursor = 'default';
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.noResults = true;

        }


        var list = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement;
        if (!__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.noResults) {
            list.onmousedown = function (e) {
                var coords = getCoords(list);
                var shiftX = e.pageX - coords.left;
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.screenX = event.screenX;
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement.style.cursor = '-webkit-grabbing';

                list.style.position = 'relative';
                moveAt(e);

                function moveAt(e) {
                    list.style.transition = 'none';
                    list.style.transform = `translate(${e.pageX - shiftX}px)`;
                    __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.deltaTranslate = e.pageX - shiftX;
                }

                document.onmousemove = function (e) {
                    moveAt(e);
                };

                list.onmouseup = function () {
                    list.style.transition = 'transform 1s';
                    document.onmousemove = document.onmouseup = null;
                    list.onmouseup = list.onmousemove = null;
                    __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement.style.cursor = '-webkit-grab';
                    var delta = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.screenX - event.screenX;
                    if (delta < 0) {
                        if (delta < -__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.swipeLength) {
                            if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page > 1) {

                                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.prevPage();
                            } else {
                                list.style.transform = `translate(${__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.currentTranslate}px)`;
                            }
                        } else {
                            list.style.transform = `translate(${__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.currentTranslate}px)`;

                        }
                    }

                    if (delta > 0) {
                        if (delta > __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.swipeLength) {
                            if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page != __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage) {
                                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.nextPage();
                            } else {
                                list.style.transform = `translate(${__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.currentTranslate}px)`;
                                for (let i = 0; i < 5; i++){
                                    if(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].pageControllers[i].DOMElement.innerHTML == __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page){
                                        for(let j = 4; j > i; j--){
                                            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].pageControllers[j].DOMElement.className = 'pageController disable';
                                            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].pageControllers[j].DOMElement.onclick = 'none';

                                        }
                                    }
                                }
                            }
                        } else {
                            list.style.transform = `translate(${__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.currentTranslate}px)`;
                             for (let i = 0; i < 5; i++){
                                    if(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].pageControllers[i].DOMElement.innerHTML == __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page){
                                        for(let j = 4; j > i; j--){
                                            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].pageControllers[j].DOMElement.className = 'pageController disable';
                                            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].pageControllers[j].DOMElement.onclick = 'none';

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

        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].disableScreen.style.display = 'none';
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].spiner.style.display = 'none';
    }


    createNodes(width) {
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].responsItemsCount; i++) {
            var videoNode = new __WEBPACK_IMPORTED_MODULE_4__videoNode__["a" /* default */](width);
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.push(videoNode);
            videoNode.create(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].currentVideos[i]);
        }
    }

    getDOMElement() {
        return this.DOMElement;
    }

    setWidth(width) {
        this.width = width;
        if (Math.ceil(this.width / __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth) == (this.width / __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth)) {
            this.DOMElement.style.width = `${this.width}px`;
        } else {
            this.width = Math.ceil(this.width / __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth) * __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth;
            this.DOMElement.style.width = `${this.width}px`;
        }
    }

    setMargin(margin) {
        if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.length) {
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.length; i++) {
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes[i].setMargin(margin);
            }
        }
    }

    videosOnPage() {
        if (this.videosOnPageNumber == null) {
            if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes.length != 0) {
                this.videosOnPageNumber = Math.floor(__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth / __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes[0].width)
            } else {
                this.videosOnPageNumber = 0;
            }
            this.prevVideosOnPageNumber = this.videosOnPageNumber;
        } else {

            this.prevVideosOnPageNumber = this.videosOnPageNumber;
            this.videosOnPageNumber = Math.floor(__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth / __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes[0].width);
        }
        return this.videosOnPageNumber;

    }

    setPage(pageNum) {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page = pageNum;
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement.style.left = '0px';
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement.style.transform = `translateX(-${(pageNum - 1) * __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth}px)`;
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.currentTranslate = -((pageNum - 1) * __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth);
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.calcLoadPage();
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.onPageSet();
        
        if (__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].responsItemsCount) {
            if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page !== __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.pageForLoad && (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page + 1) != __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage) {
                if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page <= 1) {
                    __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[0].DOMElement.className = 'pageController disable';
                    __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[0].DOMElement.onclick = 'none';
                    for (let i = 1; i < 4; i++) {
                        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[i].DOMElement.innerHTML = i;
                    }

                } else {
                    __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[0].DOMElement.className = 'pageController';
                    this.buttons[0].DOMElement.onclick = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.prevPage;
                    for (var key in __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.pageFunctions) {
                        this.buttons[key].DOMElement.innerHTML = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.pageFunctions[key](__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page);
                    }
                }

                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[4].DOMElement.className = 'pageController';
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[4].DOMElement.onclick = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.nextPage;

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
            if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page === __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.pageForLoad) {
                __WEBPACK_IMPORTED_MODULE_3__youTubeApiClient__["a" /* default */].search(function (response) {
                    console.log(response);
                    __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].currentVideos = response.items;
                    __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.calcLastPage();
                    if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page != __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage) {
                        if (__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth < 400) {
                            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.createNodes(__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth);
                        } else {
                            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.createNodes(400);
                        }
                        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.calcLastPage();
                        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].disableScreen.style.display = 'none';
                        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].spiner.style.display = 'none';
                        let countOfVideos = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPage();
                        let margin = ((__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].screenWidth - (__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].videoNodeWidth * countOfVideos)) / (countOfVideos * 2));
                        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setMargin(margin);

                        let width = (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.length * __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].videoNodeWidth) + (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.length * margin * 2);
                        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setWidth(width);

                        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videoNodes.filter(vn => vn.rendered == false).map(vn => vn.render());
                        // if (AppManager.resultsList.isLastPage()) {
                        //     if (AppSettings.screenWidth > 767) {
                        //         AppManager.resultsList.buttons[4].DOMElement.className = 'pageController disable';
                        //     }
                        //     AppManager.resultsList.buttons[4].DOMElement.onclick = 'none';
                        // } else {

                        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[4].DOMElement.className = 'pageController';
                        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[4].DOMElement.onclick = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.nextPage;


                        //}

                    }
                });


                // AppManager.resultsList.calcLastPage();


           // }
        } else {
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[4].DOMElement.className = 'pageController disable';
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.buttons[4].DOMElement.onclick = 'none';
        }

        console.log('page for load: ' + __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.pageForLoad);
                    console.log('last page: ' + __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage);
    }

    calcLoadPage() {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.pageForLoad;
        var tempPageForLoad = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes.length / __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPage();
        if (Number.isInteger(tempPageForLoad)) {
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.pageForLoad = tempPageForLoad - 1;
        } else {
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.pageForLoad = Math.floor(tempPageForLoad);
        }
    }

    nextPage() {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setPage(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page + 1);
    }

    prevPage() {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setPage(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page - 1);
    }

    changePage(button, pageNum) {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.setPage(pageNum == undefined ? parseInt(button.DOMElement.innerHTML) : pageNum);
    }

    calcLastPage() {
        let lastVideos = __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].responsItemsCount / __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPage();
        if (__WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].responsItemsCount < 15) {
            if (Math.ceil(lastVideos) === lastVideos) {
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage = __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes.length / __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPage();
            } else {
                __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage = Math.ceil(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes.length / __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPage());
            }
        } else {
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage = Math.ceil(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes.length / __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.videosOnPage());
        }
        return __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage;
    }

    isLastPage() {
        if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.page === __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.lastPage) {
            return true;
        }
        return false;
    }

    remove() {
        if (__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.noResults) {
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement.parentNode.removeChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement);
        } else {
            document.body.removeChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.controllers);
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes = [];
            __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].nextPageToken = null;
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].currentVideos = [];
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement.parentNode.removeChild(__WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement);
            __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList = null;
            __WEBPACK_IMPORTED_MODULE_1__appSettings_js__["a" /* default */].responsItemsCount = 0;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SearchResult;




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__appManager__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elementFactory__ = __webpack_require__(2);



class Button {
    constructor() {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].pageControllers.push(this);
        this.className = 'pageController';
    }

    create() {
        this.DOMElement = __WEBPACK_IMPORTED_MODULE_1__elementFactory__["a" /* default */].create('button', { class: this.className });
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.controllers.appendChild(this.DOMElement);
    }

    setActive(value) {
        this.DOMElement.className = this.className + (value ? ' active' : '');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Button;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__appManager__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appSettings__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elementFactory__ = __webpack_require__(2);




class VideoNode {
    constructor(width) {
        __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].videoNodes.push(this);
        this.margin = 0;
        __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].videoNodeWidth = width;
        this.width = __WEBPACK_IMPORTED_MODULE_1__appSettings__["a" /* default */].videoNodeWidth;
        this.rendered = false;
    }

    create(responseItem) {
        const date = responseItem.snippet.publishedAt.substring(0, 10);

        this.DOMElement = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('div', this.getContainerAttributes(), this.getContainerProperties());
        this.play = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('div', { class: 'playVideo' }, { style: { display: 'none' }, innerHTML: '<i class="fa fa-play" aria-hidden="true"></i>' });
        this.image = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('div', { class: 'preview' }, { style: { backgroundImage: `url(${responseItem.snippet.thumbnails.high.url})` } });
        this.info = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('div', { class: 'info' });
        this.title = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('a', { class: 'title', href: `https://www.youtube.com/watch?v=${responseItem.id}`, target: '_blank' }, { innerHTML: responseItem.snippet.title });
        this.viewCount = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('div', { class: 'viewCount' }, { innerHTML: responseItem.statistics.viewCount });
        this.author = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('div', { class: 'author' }, { innerHTML: responseItem.snippet.channelTitle });
        this.date = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('span', { class: 'date' }, { innerHTML: date });
        this.description = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('div', { class: 'description' }, { innerHTML: responseItem.snippet.description });
        this.more = __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].create('a', { class: 'more', href: `https://www.youtube.com/watch?v=${responseItem.id}`, target: '_blank' }, { innerHTML: '...' });

        const node = this.DOMElement;
        node.onmousedown = function () {
            node.style.cursor = '-webkit-grabbing';
        };

        node.onmouseup = function () {
            node.style.cursor = 'pointer';
        };
    }

    render() {
        this.setMargin();
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.DOMElement, __WEBPACK_IMPORTED_MODULE_0__appManager__["a" /* default */].resultsList.DOMElement);
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.image, this.DOMElement);
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.info, this.DOMElement);
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.title, this.info);
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.play, this.DOMElement);
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.viewCount, this.info);
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.author, this.info);
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.date, this.info);
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.description, this.info);
        __WEBPACK_IMPORTED_MODULE_2__elementFactory__["a" /* default */].render(this.more, this.description);

        this.rendered = true;
    }

    setMargin(margin) {
        this.margin = margin;
        this.DOMElement.style.marginLeft = `${this.margin}px`;
        this.DOMElement.style.marginRight = `${this.margin}px`;
    }

    getContainerAttributes() {
        this.class = { class: 'videoNode' };
        return this.class;
    }

    getContainerProperties() {
        return { style: { margin: '0', width: `${this.width}px` } };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VideoNode;




/***/ })
/******/ ]);
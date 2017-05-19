import AppManager from './appManager';
import AppSettings from './appSettings';
import ElementFactory from './elementFactory';
import YouTubeApiClient from './youTubeApiClient';
import SearchResult from './searchResult';

export var components = {};
//export var body = document.body;
//export var AppManager.screenWidth = body.offsetWidth;
//export var videoNodeWidthExceptPhones = 400;
//export var videoNodeWidth = 400;
export var disableScreen = ElementFactory.create('div', {class: 'disableScreen'});
export var spiner = ElementFactory.create('img', {class: 'spiner', src: 'img/spiner2.gif'});
body.appendChild(disableScreen);
disableScreen.style.display = 'none';
body.appendChild(spiner);
spiner.style.display = 'none';
components.videoNodes = [];
components.pageControllers = [];
//export var responsItemsCount = 0;

body.onresize = function () {
    AppSettings.AppManager.screenWidth = body.offsetWidth;
    if(AppManager.screenWidth < 400){
        videoNodeWidth = AppManager.screenWidth;
        body.className = 'phone';
        input.className = 'phone';
        search.className += ' phone';
    } else {
        videoNodeWidth = videoNodeWidthExceptPhones;
        body.className = '';
        input.className = '';
        search.className = 'search';
    }
    components.videoNodes.map(function(el){el.DOMElement.style.width = `${videoNodeWidth}px`});
    if(components.searchResult){
        var videosOnPage;
        if(AppManager.screenWidth < 400){
            videosOnPage = 1;
        } else {
            videosOnPage = components.searchResult.videosOnPage();
        }
        let margin = ((AppManager.screenWidth - (videoNodeWidth * videosOnPage)) / (videosOnPage * 2));
        components.searchResult.setMargin(margin);

        let width = (components.searchResult.videoNodes.length * videoNodeWidth) + (components.searchResult.videoNodes.length * margin * 2);
        components.searchResult.setWidth(width);

        var page = Math.ceil(((components.searchResult.page - 1) * components.searchResult.prevVideosOnPageNumber + 1) / videosOnPage);
        components.searchResult.setPage(page);
    }
};

//export var input = ElementFactory.create('input', { type: 'text', class: 'input', id: 'query', autofocus: '' , placeholder: 'Enter request...'});
//ElementFactory.render(input);
document.body.appendChild(AppManager.searchInput);
//export var searchButton = ElementFactory.create('button', { class: 'search', id: 'search' }, {innerHTML: 'Search', onclick: onSearchSuccessCallback});
//ElementFactory.render(searchButton);
document.body.appendChild(AppManager.searchButton);

document.onkeypress = function(event) {
    if (event.keyCode == 13) {
        searchButton.click();
    }
};

function renderPreviews() {
    var list = new SearchResult;
    list.create();
}

export function onSearchSuccessCallback() {
    if(components.searchResult){
        components.searchResult.remove();
    }
    YouTubeApiClient.search(function (response) {
        console.log(response);
        body.style.display = 'block';
        renderPreviews();
        if(AppManager.screenWidth < 400){
            body.className = 'phone';
            input.className = 'phone';
            search.className += ' phone';
        }
    });
}

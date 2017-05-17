var components = {};
components.videoNodes = [];
components.pageControllers = [];
var body = document.body;
var screenWidth = body.offsetWidth;
var videoNodeWidthExceptPhones = 400;
var videoNodeWidth = 400;
var nextPageToken = null;
var disableScreen = ElementFactory.create('div', {class: 'disableScreen'});
body.appendChild(disableScreen);
disableScreen.style.display = 'none';

body.onresize = function () {
    screenWidth = body.offsetWidth;
    if(screenWidth < 400){
        videoNodeWidth = screenWidth;
    } else {
        videoNodeWidth = videoNodeWidthExceptPhones;
    }
    components.videoNodes.map(function(el){el.DOMElement.style.width = `${videoNodeWidth}px`});
    if(components.searchResult){
        var videosOnPage;
        if(screenWidth < 400){
            videosOnPage = 1;
        } else {
            videosOnPage = components.searchResult.videosOnPage();
        }
        let margin = ((screenWidth - (videoNodeWidth * videosOnPage)) / (videosOnPage * 2));
        components.searchResult.setMargin(margin);

        let width = (components.searchResult.videoNodes.length * videoNodeWidth) + (components.searchResult.videoNodes.length * margin * 2);
        components.searchResult.setWidth(width);

        var page = Math.ceil(((components.searchResult.page - 1) * components.searchResult.prevVideosOnPageNumber + 1) / videosOnPage);
        components.searchResult.setPage(page);
    }
};

var input = ElementFactory.create('input', { type: 'text', class: 'input', id: 'query', autofocus: '' });
ElementFactory.render(input);
var searchButton = ElementFactory.create('button', { class: 'search', id: 'search' }, {
    innerHTML: 'Search', onclick: onSearchSuccessCallback});
ElementFactory.render(searchButton);

document.onkeypress = function(event) {
    if (event.keyCode == 13) {
        searchButton.click();
    }
};

function renderPreviews() {
    var list = new SearchResult;
    list.create();
}

function onSearchSuccessCallback() {
    if(components.searchResult){
        components.searchResult.remove();
    }
    YouTubeApiClient.search(function (response) {
        console.log(response);
        body.style.display = 'block';
        renderPreviews();
    });
}

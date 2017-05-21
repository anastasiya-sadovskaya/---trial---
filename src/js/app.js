import 'babel-polyfill';
import AppManager from './appManager';
import AppSettings from './appSettings';
import YouTubeApiClient from './youTubeApiClient';
import SearchResult from './searchResult';


document.body.appendChild(AppManager.disableScreen);
AppManager.disableScreen.style.display = 'none';
document.body.appendChild(AppManager.spiner);
AppManager.spiner.style.display = 'none';
AppManager.videoNodes = [];
AppManager.pageControllers = [];

document.body.onresize = function () {
    AppSettings.screenWidth = document.body.offsetWidth;
    if (AppSettings.screenWidth < 400) {
        AppSettings.videoNodeWidth = AppSettings.screenWidth;
        document.body.className = 'phone';
        AppManager.searchInput.className = 'phone';
        search.className += ' phone';
    } else {
        AppSettings.videoNodeWidth = AppSettings.videoNodeWidthExceptPhones;
        document.body.className = '';
        AppManager.searchInput.className = '';
        search.className = 'search';
    }
    AppManager.videoNodes.map(function (el) { el.DOMElement.style.width = `${AppSettings.videoNodeWidth}px` });
    if (AppManager.resultsList) {
        var videosOnPage;
        if (AppSettings.screenWidth < 400) {
            videosOnPage = 1;
        } else {
            videosOnPage = AppManager.resultsList.videosOnPage();
        }
        let margin = ((AppSettings.screenWidth - (AppSettings.videoNodeWidth * videosOnPage)) / (videosOnPage * 2));
        AppManager.resultsList.setMargin(margin);

        let width = (AppManager.resultsList.videoNodes.length * AppSettings.videoNodeWidth) + (AppManager.resultsList.videoNodes.length * margin * 2);
        AppManager.resultsList.setWidth(width);

        var page = Math.ceil(((AppManager.resultsList.page - 1) * AppManager.resultsList.prevVideosOnPageNumber + 1) / videosOnPage);
        AppManager.resultsList.setPage(page);
    }
};


document.body.appendChild(AppManager.searchInput);
document.body.appendChild(AppManager.searchButton);

document.onkeypress = function (event) {
    if (event.keyCode == 13) {
        AppManager.searchButton.click();
    }
};

function renderPreviews() {
    var list = new SearchResult;
    list.create();
}

export function onSearchSuccessCallback() {
    console.log('hello');
    if (AppManager.resultsList) {
        AppManager.resultsList.remove();
    }

    YouTubeApiClient.search(function (response) {
        console.log(response);
        document.body.style.display = 'block';
        renderPreviews();
        if (AppSettings.screenWidth < 400) {
            document.body.className = 'phone';
            AppManager.searchInput.className = 'phone';
            search.className += ' phone';
        }
    });
}

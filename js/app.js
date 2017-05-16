var components = {};
components.videoNodes = [];
components.pageControllers = [];
var body = document.body;
var screenWidth = body.offsetWidth;
var videoNodeWidthExceptPhones = 400;
var videoNodeWidth = 400;
var nextPageToken = null;
var disableScreen;

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


// function searchFunc(successCallback) {
//     return new Promise(function (resolve, reject) {
//         var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
//         var q = input.value;
//         var xhr = new XHR();
//         var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&alt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=${q}`
//         if (nextPageToken) {
//             url += `&pageToken=${nextPageToken}`;
//         }
//         xhr.open('GET', url, true);
//         xhr.send();
//         xhr.onload = function () {
//             if (this.status == 200) {
//                 resolve(JSON.parse(this.response));
//             } else {
//                 var error = new Error(this.statusText);
//                 error.code = this.status;
//                 reject(error);
//             }
//         };
//     })

//         .then(function(response) {
//             successCallback(response);
//         });
// };  

function renderPreviews() {
    var list = new SearchResult;
    list.create();
}

function onSearchSuccessCallback() {
    if(components.searchResult){
        components.searchResult.remove();
    }
    YouTubeApiClient.search(function (response) {
        body.style.display = 'block';
        renderPreviews();
    });
}







// var input = document.createElement('input');
// input.type = 'text';
// input.id = 'query';
// document.body.appendChild(input);

// var search = document.createElement('button');
// search.innerHTML = 'Search'
// search.className = 'search';
// document.body.appendChild(search);
// search.addEventListener('click', searchFunc);

// var videoArr = [];
// var obj = {};



// function renderPreviews(){
//     let container = document.createElement('div');
//             container.className = 'video-list';
//             container.style.background = 'red';
//             document.body.appendChild(container);

//     for (let i = 0; i < 15; i++){
//         if(videoArr[i]){


//             // let link = document.createElement('a');
//             let img = document.createElement('img');
//             img.src = videoArr[i].snippet.thumbnails.high.url;
//             container.appendChild(img);
//         } else { 
//             return false
//         }
//     }
// }

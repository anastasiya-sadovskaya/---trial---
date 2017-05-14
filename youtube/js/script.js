var components = {};
components.videoNodes = [];
components.pageControllers = [];
var body = document.body;
var screenWidth = body.offsetWidth;
var videoNodeWidth = 400;
//var youtubeResponse = null;
var nextPageToken = null;
// var videosOnPage = Math.floor(screenWidth / 400);
// var marginsWidth = screenWidth - (400 * videosOnPage);
// var margin = marginsWidth / (videosOnPage * 2);

body.onresize = function(){ 
                            screenWidth = body.offsetWidth;
                            if(components.videoNodes.length){
                                for(let i = 0; i < components.videoNodes.length; i++){
                                    components.videoNodes[i].setMargin();
                                } 
                            }    
                            components.searchResult.setWidth();

                            
                };

var input = ElementFactory.create('input', {type: 'text', class: 'input', id:'query', autofocus:''});
ElementFactory.render(input);
var searchButton = ElementFactory.create('button', {class: 'search'}, {innerHTML: 'Search', onclick: searchFunc})
ElementFactory.render(searchButton);

function searchFunc(){
    return new Promise(function(resolve, reject) {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var q = input.value;
        var xhr = new XHR();
        var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&alt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=${q}`
        if(nextPageToken){
            url += `&pageToken=${nextPageToken}`;
        }
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(JSON.parse(this.response));
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
    })
    
        .then(response => {
            console.log(response);
            //obj = response;
            nextPageToken = response.nextPageToken;
            videoArr = response.items;
            body.style.display = 'block';
            renderPreviews();
        });
};

function renderPreviews(){
    // let videoNodes = [];
    // for(var i = 0; i < videoArr.length; i++) {
    //     videoNodes.push(new VideoNode());
    //     videoNodes[i].create(videoArr[i]);
    // }  
    var list = new SearchResult;
    list.create();
    list.render();

    // for(var i = 0; i < videoNodes.length; i++) {
    //     videoNodes[i].render();
    // }
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

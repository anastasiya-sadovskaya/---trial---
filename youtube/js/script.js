var input = document.createElement('input');
input.type = 'text';
input.id = 'query';
document.body.appendChild(input);

var search = document.createElement('button');
search.innerHTML = 'Search'
search.className = 'search';
document.body.appendChild(search);
search.addEventListener('click', searchFunc);

var videoArr = [];
var obj = {};

createElementCallback("div", 'My own div', search, {"id": "myDiv"}, function (element) {
    element.style.background = "red";
    element.style.width = "100px";
    element.style.height = "100px";
});

var clipsToRender = [];
for (var index = 0; index < 10; index++) {
    clipsToRender.push(new VideoElement("Cats" + index));
}

clipsToRender.forEach(function(element) {
    element.renderCompleted = function(element){
        // console.log("we log newly created element");
        // console.log(element);
        alert("Element was created!");
    }
    element.render();
}, this);

function renderPreviews(){
    for (let i = 0; i < 15; i++){
        if(videoArr[i]){
            let container = document.createElement('div');
            container.className = 'video-list';
            let link = document.createElement('a');
            let img = document.createElement('img');
            img.src = videoArr[i].snippet.thumbnails.high.url;
            container.appendChild(img);
        } else { 
            return false
        }
    }
}

function searchFunc(){
    return new Promise(function(resolve, reject) {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var q = document.getElementById('query').value;
        var xhr = new XHR();
        xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&&alt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=' + q, true);
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
            obj = response;
            console.log(typeof response);
            console.log(obj);
            videoArr = response.items;
            console.log(videoArr);
            renderPreviews();
        });
};

function createElement(tagName, innerHtml, parent, options){
    var element = document.createElement(tagName);

    element.innerHTML = innerHtml;

    for(var prop in options){
        element.setAttribute(prop, options[prop]);
    }

    if(parent === undefined || parent === null){
        document.body.appendChild(element);
    }
    else{
        parent.appendChild(element);
    }

    return element;
}

function createElementCallback(tagName, innerHtml, parent, options, callback) {
    var element = createElement(tagName, innerHtml, parent, options);
    callback(element);
    return element;
}

function VideoElement(name){
    var self = this;
    self.name = name;
    self.domElement = null;

    self.renderCompleted = null;

    self.render = function(parent){
        self.domElement = createElementCallback("div", name, parent, {"id": "myDiv"}, function (element) {
            element.style.background = "red";
            element.style.width = "100px";
            element.style.height = "100px";
        });

        onRenderCompleted(self.domElement);
    }

    self.remove = function(){
        self.domElement.parentElement.removeChild(self.domElement);
    }

    function onRenderCompleted(element){
        if(self.renderCompleted){
            self.renderCompleted(element);
        }
    }
}
window.YouTubeApiClient = (function (...args) {
    var element = null,
        idArr = [],
        url = '';
    return {
        search: function (successCallback) {
            return new Promise(function (resolve, reject) {
                disableScreen.style.display = 'block';
                var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
                var q = input.value;
                var xhr = new XHR();
                url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&alt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=${q}`;
                if (nextPageToken) {
                    url += `&pageToken=${nextPageToken}`;
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
                .then(function(response){
                    nextPageToken = response.nextPageToken;
                    let ids = [];
                    for (let i = 0; i < response.items.length; i++) {
                        ids.push(response.items[i].id.videoId);
                    }

                    YouTubeApiClient.getVideoInfo(ids, successCallback);
                })
        },

        getVideoInfo: function (ids, successCallback) {
            return new Promise(function (resolve, reject) {
                var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
                var q = input.value;
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

                .then(function(response){
                    //console.log(response);
                    videoArr = response.items;
                    successCallback(response);
                    
                })

        }
    };
})();
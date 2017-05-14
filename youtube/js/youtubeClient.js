window.YouTubeApiClient = (function (...args) {
    var element = null;
    var idArr = [];
    return {
        search: function (successCallback) {
            return new Promise(function (resolve, reject) {
                var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
                var q = input.value;
                var xhr = new XHR();
                var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&alt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=${q}`
                //var url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&maxResults=15&id=nSDgHBxUbVQ,c4BLVznuWnU,87gWaABqGYsalt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=${q}`
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

                .then(function (response) {

                    console.log(response);
                    successCallback(response);

                    for (let i = 0; i < videoArr.length; i++) {
                        idArr.push(response.items[i].id.videoId);
                    }
                    console.log(idArr);
                });
        },

        getVideoInfo: function () {
            return new Promise(function (resolve, reject) {
                var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
                var q = input.value;
                var xhr = new XHR();
                //var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&alt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=${q}`
                var url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&id=`
                for (let i = 0; i < idArr; i++) {
                    url += idArr[i];
                }
                // if (nextPageToken) {
                //     url += `&pageToken=${nextPageToken}`;
                // }
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
            });
        }
    };
})();
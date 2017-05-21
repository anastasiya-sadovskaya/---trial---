//import AppSettings from './appSettings';

import AppManager from './appManager';
import AppSettings from './appSettings';
import YouTubeApiClient from './youTubeApiClient';
// import ElementFactory from './elementFactory';
// import VideoNode from './videoNode';
// import SearchResult from './searchResult';
//import onSearchSuccessCallback from './app';

export default (function YouTubeApiClient(...args) {
    var element = null,
        idArr = [],
        url = '';
    var getVideoInfo = function (ids, successCallback) {
        return new Promise(function (resolve, reject) {
            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            var q = AppManager.searchInput.value;
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
                AppManager.currentVideos = response.items;
                AppSettings.responsItemsCount = response.items.length;
                successCallback(response);
            })

    };
    return {
        search: function (successCallback) {
            return new Promise(function (resolve, reject) {
                AppManager.disableScreen.style.display = 'block';
                AppManager.spiner.style.display = 'block';
                var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
                var q = AppManager.searchInput.value;
                var xhr = new XHR();
                url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&alt=json&key=AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0&q=${q}`;
                if (AppSettings.nextPageToken) {
                    url += `&pageToken=${AppSettings.nextPageToken}`;
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
                    AppSettings.nextPageToken = response.nextPageToken;
                    let ids = [];
                    for (let i = 0; i < response.items.length; i++) {
                        ids.push(response.items[i].id.videoId);
                    }

                    getVideoInfo(ids, successCallback);
                })
        }
    };
})();

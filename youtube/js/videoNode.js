class VideoNode extends Element{
    constructor(obj){
        super('img', SearchResultsContainer, {'src':obj.snippet.thumbnails.high.url})
        var node = new Element('img', SearchResultsContainer, {'src':obj.snippet.thumbnails.high.url});
    }
}
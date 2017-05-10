class Element{
    constructor(tagName, parent, attrs){
        var element = document.createElement(tagName);

        for(var attr in attrs){
            element.setAttribute(attr, attrs[attr]);
        }

        if(!parent){
            document.body.appendChild(element);
        }else{
            parent.appendChild(element);
        }
        return element;
    }
}
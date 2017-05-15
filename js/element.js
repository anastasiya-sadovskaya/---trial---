// class Element{
//     constructor(tagName, parent, attrs, props){
//         var element = document.createElement(tagName);

//         for(var attr in attrs){
//             element.setAttribute(attr, attrs[attr]);
//         }

//         if(!parent){
//             document.body.appendChild(element);
//         }else{
//             parent.appendChild(element);
//         }

//         Object.assign(element, props);
        
//         return element;
//     }
// }

window.ElementFactory = (function(...args){
    return {
        create:  function(tagName, attrs, props, parent){
            var element = document.createElement(tagName);

        for(var attr in attrs){
            element.setAttribute(attr, attrs[attr]);
        }

        Object.assign(element, props);

        if(!parent){
            document.body.appendChild(element);
        }else{
            parent.appendChild(element);
        }
        
        return element;
        }
    }
})();
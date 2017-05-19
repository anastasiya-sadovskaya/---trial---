export default (function ElementFactory(...args) {
    var element = null;
    return {
        create: function (tagName, attrs, props) {
            element = document.createElement(tagName);

            for (var attr in attrs) {
                element.setAttribute(attr, attrs[attr]);
            }

            Object.assign(element, props);
            if (props && props.style) {
                Object.assign(element.style, props.style);
            }
            return element;
        },

        render: function (el, parent) {
            if (!parent) {
                document.body.appendChild(el);
            } else {
                parent.appendChild(el);
            }
            return el;
        }
    }
})();

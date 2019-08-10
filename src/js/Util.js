
export const Util = {
    cleanHTML: function(html){
        var reg = /^ .*>$/
        html = html.replace(reg, ">");
        return html;
    },
    merging: function (range)
    {
        
    },
    isNode: function(element){
        if( element.nodeType == 1)
            return true;
        return false;
    },
};
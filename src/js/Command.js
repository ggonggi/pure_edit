import {Util} from './Util.js';
import {Selector} from './Selector.js';
export const Command = {
    palette:function(editableDIV, range, selector)
    {
        this.menuSelector ^= selector;
        var arr = Util.postorder();

        for ( var n of arr)
        {
            console.log(n);
        }
        
    },
    bold:function(editableDIV, range, selector)
    {
        
        this.menuSelector ^= selector;
        var textNode = Util.splitTextNode(range.startContainer, range.startOffset, range.endOffset);
        
        var r = document.createRange();
        console.log(textNode);
        
        
    },
    underline:function(editableDIV, range, selector)
    {
        this.menuSelector ^= selector;
        editableDIV.firstChild.appendChild(document.createTextNode('a'));
    },
    italic:function(editableDIV, range, selector)
    {
        this.menuSelector ^= selector;
        Util.travalNodeTree();
    },
   
    strike:function(editableDIV, range, selector)
    {
        this.menuSelector ^= selector;
        
    },
    justify:function(editableDIV, range, selector)
    {
        this.menuSelector ^= selector;
        
    },
    left:function(editableDIV, range, selector)
    {
        this.menuSelector ^= selector;
        
    },
    right:function(editableDIV, range, selector)
    {
        this.menuSelector ^= selector;
        
    },
    center:function(editableDIV, range, selector)
    {
        this.menuSelector ^= selector;
        
    },
    image:function(editableDIV, range, selector)
    {
        
    },
    youtube:function(editableDIV, range, selector)
    {
        
    },
    attach:function(editableDIV, range, selector)
    {
        console.log(editableDIV)
        console.log(range)
        console.log('attach')
    }
};
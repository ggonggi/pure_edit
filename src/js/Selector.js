import {Util} from './Util.js';

export const Selector =(function()
    {
        var startNode = null;
        var startOffset = null;
        var endNode = null;
        var endOffset = null;
        var commonNode = null;
        var collapsed = true;
        var currentPath = null;

        function getElementPath()
        {
            if ( !startNode ) return;

            let path = new Array();
            let currentNode = startNode;
            while( currentNode.className != 'edit-box' )
            {
               if ( currentNode.nodeName != '#text')
               {
                path.push(currentNode.nodeName);
               }

                currentNode=currentNode.parentNode;
            }
            
            return path;
        }

        return {
            getRange: function()
            {
                let newRange = document.createRange();
                if( startNode == null ) return newRange;

                newRange.setStart(startNode, startOffset);
                newRange.setEnd(endNode,endOffset);
                return newRange;
            },
            setRange: function(range)
            {
                let selection = window.getSelection();

                selection.removeAllRanges();
        
                selection.addRange(range);
            },
            getFocusEditor: function()
            {
                let selection = window.getSelection();

                selection.removeAllRanges();
        
                selection.addRange(getRange());
            },
            event: function()
            {
                let selection = window.getSelection();
       
                if( selection.rangeCount < 1 || !Util.isFormatNode(selection.anchorNode) ) return;
     
                let range = selection.getRangeAt(0);
        
                startNode = range.startContainer;
                endNode = range.endContainer;
                startOffset = range.startOffset;
                endOffset = range.endOffset;
                commonNode = range.commonAncestorContainer;
                collapsed = range.collapsed;

                currentPath = getElementPath();
                console.log(range)
                console.log(currentPath);
            },


        };
        
    }
    )();

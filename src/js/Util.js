
export const Util = {
    VAILD_FROMATNODE: ['P','DEL','EM','INS','STRONG','#text'],
    cleanHTML: function(html){
        var reg = /^ .*>$/
        html = html.replace(reg, ">");
        return html;
    },
    isNode: function(element){
        if( element.nodeType == 1)
            return true;
        return false;
    },
    isFormatNode: function(element){
        if ( !element ) return false;
        
        for( var item of this.VAILD_FROMATNODE)
        {
            if ( element.nodeName == item ) return true;
        }

        return false;
    },
    isEqualFormatNode: function(current, target){
        if( !Array.isArray(current) || !Array.isArray(target) || current.length != target.length ) return false;
        
        for( var tag of current )
        {
            var result = target.find((item)=>{
                return item == tag;
            });

            if ( result == undefined ) return false;
        }

        return true;
    },
    getElementPath: function(startNode, isNode=true)
        {
            if ( !startNode ) return;

            let path = new Array();
            let currentNode = startNode;
            while( currentNode.nodeName != 'P' )
            {

                   if ( isNode )
                   {
                    path.push(currentNode);
                   }
                   else{
                    path.push(currentNode.nodeName);
                   }


                currentNode=currentNode.parentNode;
            }
            
            return path;
        },
        removeFormatNode: function(path, format, s=0, e)
        {
          for ( var node of path)
          {}
        },
        indexOf:function( node )
        {
            if ( node.parentNode == null || node.parentNode.childNodes.length == 0 ) return;

            var index = 0;

            for( var child of node.parentNode.childNodes )
            {
                if ( node === child )
                {
                    return index; 
                }
                index++;
            }
        },
        postorder:function(startNode, endNode)
        {
            var stack = new Array();
            var root = document.getElementById('edit-box');
            var currentNode = root;
            var nodeSet = new Array();

            stack.push(root);

            if( startNode == endNode == undefined ) return [];

            while( currentNode != null )
            {
                currentNode = stack.pop();
                if( currentNode.childNodes.length != 0 && currentNode.nodeType != 3 )
                {
                    stack.push(currentNode);
                    stack.push(currentNode.firstChild);
                    continue;
                }
                else
                {
                    //this.visit(currentNode);
                    if ( currentNode.nodeType == 3)
                        nodeSet.push(currentNode);
                }

                currentNode = this.next(currentNode);

                
                while (currentNode == null && stack.length != 0 ){
                        currentNode = stack.pop();   
                        //this.visit(currentNode);
                        currentNode = this.next(currentNode);
                }
                stack.push(currentNode);
            }

            return nodeSet;
        },
        next:function(node)
        {
            var index = this.indexOf(node);
            if( !node || index >= node.parentNode.childNodes.length-1 ) return null;

            return node.parentNode.childNodes[index+1];
            
        },
        visit:function(node)
        {
            if(node.nodeType == 3 )
            {
                console.log(node.textContent)
            }
            else
            {
                console.log(node.nodeName)
            }
        }


};
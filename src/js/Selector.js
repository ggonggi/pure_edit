
export const Selector ={
    start_node: '',
    start_offset: 0,
    end_node: '',
    end_offset:0,
    common_node:'',
    collasped: true,
    top_element:[],
    getRange: function()
    {
        let newRange = document.createRange();
        this.event();
        newRange.setStart(this.start_node, this.start_offset);
        newRange.setEnd(this.end_node,this.end_offset);
        return newRange;
    },
    event: function()
    {
        let selection = window.getSelection();
        if( selection.rangeCount < 1) return;

         let   range = selection.getRangeAt(0)
                //console.log(range);

        this.start_node = range.startContainer;
        this.end_node = range.endContainer;
        this.start_offset = range.startOffset;
        this.end_offset = range.endOffset;
        this.common_node = range.commonAncestorContainer;

        //console.log(this.getRange());
    },
    addEvent: function(_document)
    {
        if( document === _document ) 
        document.addEventListener('selectionchange', this.event.bind(Selector));
    },
    addEditor:function(elements)
    {
        if ( elements && elements.length >= 1 )
        {
            var i=0;
            for ( var element of elements )
            {
                if ( element.className == 'edit-box')
                this.top_element[i++] = element;
            }
        }
    },

} 
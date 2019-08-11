
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

        newRange.setStart(this.start_node, this.start_offset);
        newRange.setEnd(this.end_node,this.end_offset);

        return newRange;
    },
    setRange: function(range)
    {
        let selection = window.getSelection();

        selection.removeAllRanges();

        selection.addRange(range);
    },
    move: function()
    {
        let selection = window.getSelection();

        selection.removeAllRanges();

        selection.addRange(this.getRange());
    },
    event: function()
    {
        let selection = window.getSelection();
        console.log(selection);
        console.log(this.start_node);
        console.log(this.start_offset);
        console.log(this.end_node);
        console.log(this.end_offset);
        if( selection.rangeCount < 1  ) return;


        let   range = selection.getRangeAt(0)

        this.start_node = range.startContainer;
        this.end_node = range.endContainer;
        this.start_offset = range.startOffset;
        this.end_offset = range.endOffset;
        this.common_node = range.commonAncestorContainer;
        this.collasped = range.collasped;

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
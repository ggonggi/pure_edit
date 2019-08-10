export const Context ={
    editor: [],
    attach:function(nameOrElement)
    {
        if ( typeof nameOrElement === 'object' ) //element
        {
            var elements = nameOrElement;

            if ( elements && elements.length >= 1) {
                var i = 0;
                for (var element of elements) {
                    if (element.className == 'edit-box')
                    this.editor[i++]= element;
                }
            }

        }
        else if ( typeof nameOrElement === 'string' ) //className
        {
            var elements;
    
            var a = document.getElementsByClassName('');

            if ( elements = document.getElementById(nameOrElement) ? document.getElementById(nameOrElement) : 
            document.getElementsByName(nameOrElement).length ?  document.getElementsByName(nameOrElement) :
            document.getElementsByClassName(nameOrElement).length ? document.getElementsByClassName(nameOrElement) : null )
                {
                    if ( elements && elements.length >= 1) {
                        var i = 0;
                        for (var element of elements) {
                            this.editor[i++]= element;
                        }
                    }
                }
        }
        else
        {
            throw new Error('context err : attaching argument is possible on object or string');
        }
    }
};
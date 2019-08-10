import { Context } from './Context.js'
import { Selector } from './Selector.js';

export const EventHandler = {
    attach: function (elements) {
        if (elements && elements.length >= 1) {
            var i = 0;
            for (var element of elements) {
                if (element.className == 'edit-box')
                    element.addEventListener('keyup', this.keyEvent);
                    element.addEventListener('input',this.inputEvent);
                    element.addEventListener('DOMNodeInserted', this.nodeInsertEvent);
            }
        }
    },
    nodeInsertEvent: function(event) {
        console.log(Selector.getRange());
        console.log(event)
        
        if ( !/span/.test(event.target.className) && event.target.nodeType == '1' && event.target.nodeName == 'SPAN' && event.target.parentNode.nodeName == 'P' )
        {
            for ( var element of event.target.childNodes )
            {
                event.target.parentNode.insertBefore(element,event.target);

            }
            event.target.parentNode.removeChild(event.target);
        }
    },
    inputEvent: function (event) {
        console.log(event)
    },
    keyEvent: function (event) {
        switch (event.key) {
            case 'Backspace':
                var selection = window.getSelection();
                var range = selection.getRangeAt(0);

                if (selection.anchorNode.className == 'edit-box' && selection.anchorNode.textContent === '' && !selection.anchorNode.hasChildNodes()) {
                    event.preventDefault();
                    event.stopPropagation();
                    var p = document.createElement('P');
                    p.innerHTML = '<br>';
                    Context.editor[0].appendChild(p);
                    return;
                }
                break;
            case 'Enter':
                var selection = window.getSelection();
                var range = document.createRange();
                if (selection.anchorNode.nodeName == 'LI' && selection.anchorNode.firstChild.nodeName == 'BR') {
                    var el = document.createElement('P');
                    el.innerHTML = '<br>';
                    Context.editor[0].appendChild(el);

                    range.setStart(el, 0);
                    range.setEnd(el, 0);

                    selection.removeAllRanges();
                    selection.addRange(range);
                    event.preventDefault();
                }
                break;
        }

    }
};
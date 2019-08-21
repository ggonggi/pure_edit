import {Selector} from './Selector.js';
import { Editor } from './Editor.js';

export const EventHandler = (
    function () {

        return {
            attach: function (element) {
                if (element && element.className == 'edit-box') {

                    element.addEventListener('keydown', this.keydownEvent);
                    element.addEventListener('keyup', this.keyupEvent);
                    element.addEventListener('input', this.inputEvent);
                    element.addEventListener('DOMNodeInserted', this.nodeInsertEvent);
                    document.addEventListener('selectionchange', Selector.event);
                }
            },
            inputEvent: function (event) {
                console.log(event);

                if ( event.inputType == "insertText" )
                {
                    var range = Selector.getRange();

                    if (range.startContainer.nodeName == 'STRONG' && range.collapsed == true) {
                        range.startContainer.innerHTML = range.startContainer.innerHTML.replace(/\u200B/g, "");
                        console.log(range.startContainer.innerHTML);
                        Selector.move();
                    }
                }


            },
            nodeInsertEvent: function (event) {

                console.log(event)
                if (event.target.nodeType == '1' && event.target.nodeName == 'SPAN' && event.target.parentNode.nodeName == 'P' && event.target.classList.length == 0) {
                    for (var element of event.target.childNodes) {
                        event.target.parentNode.insertBefore(element, event.target);

                    }
                    event.target.parentNode.removeChild(event.target);
                }
            },
            keydownEvent: function (event) {
            /*    
            
            var selectedMenu = Toolbar.getSelectedMenu();

                if ((selectedMenu & MENU_FLAG.bold) != 0) {
                    var node = document.createElement('strong');
                    node.innerHTML = '\u200B';
                    Selector.getRange().insertNode(node);
                    let range = document.createRange();
                    range.setStart(node, 1);
                    range.setEnd(node, 1);
                    Selector.setRange(range);
                }
                */

            },
            keyupEvent: function (event) {

                console.log(event)
                switch (event.key) {
                    case 'Backspace':
                        var selection = window.getSelection();
                        var range = selection.getRangeAt(0);

                        if (selection.anchorNode.className == 'edit-box' && selection.anchorNode.textContent === '' && !selection.anchorNode.hasChildNodes()) {
                            event.preventDefault();
                            event.stopPropagation();
                            var p = document.createElement('P');
                            p.innerHTML = '<br>';
                            
                            Editor.getEditableDIV().appendChild(p);
                            return;
                        }
                        break;
                    case 'Enter':
                        var selection = window.getSelection();
                        var range = document.createRange();
                        if (selection.anchorNode.nodeName == 'LI' && selection.anchorNode.firstChild.nodeName == 'BR') {
                            var el = document.createElement('P');
                            el.innerHTML = '<br>';
                            Editor.getEditableDIV().appendChild(p);

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
    })();
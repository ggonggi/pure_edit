import {Context} from './js/Context.js'
import {Selector} from './js/Selector.js'
import {EventHandler} from './js/EventHandler.js'
import { Toolbar } from './js/Toolbar.js';


var a = Toolbar;

Context.attach('edit-box');

var editor = Context.editor;
Selector.addEvent(document);
EventHandler.attach(editor);


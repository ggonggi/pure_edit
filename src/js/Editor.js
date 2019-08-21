import {Command} from './Command.js';
import { Selector } from './Selector.js';
import { EventHandler } from './EventHandler.js';

function Element() {
    this.element = null;
}
Element.prototype.getElement = function()
{
    return this.element;
}


function Button(icon, command)
{
    Element.call(this);
    this.element = document.createElement('button')
    this.element.classList.add(icon);
    this.command = command;
    this.element.addEventListener('click', command);
}

Button.prototype = Object.create(Element.prototype);
Button.prototype.constructor = Button;


function Group() {

    Element.call(this);
    this.buttonList = new Array();
    this.element = document.createElement('div');
    this.element.classList.add('group');
}

Group.prototype = Object.create(Element.prototype);
Group.prototype.constructor = Group;

Group.prototype.addButton = function(button)
{
    if ( !button ) return;

    if ( Array.isArray(button)  )
    {
        for ( var item of button)
        {
            this.buttonList.push(item);
            this.element.appendChild(item.getElement());
        }
    }
    else
    {
        this.buttonList.push(button);
        this.element.appendChild(button.getElement());
    }
};


function Toolbox() {
    this.groupList = new Array();
    this.element = document.createElement('div');
    this.element.classList.add('toolbox');
};

Toolbox.prototype = Object.create(Element.prototype);
Toolbox.prototype.constructor = Toolbox;

Toolbox.prototype.addGroup = function(group)
{
    if ( !group ) return;
    if ( Array.isArray(group) )
    {
        for ( var item of group)
        {
            this.groupList.push(item);
            this.element.appendChild(item.getElement());
        }
    }
    else
    {
        this.groupList.push(group);
        this.element.appendChild(group.getElement());
    }
};


export const Editor = (function()
{
    const EDIT_ID = 'ceditor-box';
    const BUTTON_LIST = [
        {command:'palette', class:'icon-palette', func:Command.palette, selector:0b00000001},
        {command:'bold', class:'icon-bold', func:Command.bold, selector:0b00000010},
        {command:'underline', class:'icon-underline', func:Command.underline, selector:0b00000100},
        {command:'italic', class:'icon-italic', func:Command.italic, selector:0b00001000},
        {command:'strike', class:'icon-strikethrough', func:Command.strike, selector:0b00010000},
        {command:'left', class:'icon-align-left', func:Command.left, selector:0b00100000},
        {command:'center', class:'icon-align-center', func:Command.center, selector:0b01000000},
        {command:'right', class:'icon-align-right', func:Command.right, selector:0b10000000},
        {command:'image', class:'icon-image', func:Command.image, selector:0b00000000},
        {command:'youtube', class:'icon-youtube', func:Command.youtube, selector:0b00000000},
        {command:'attach', class:'icon-attach', func:Command.attach, selector:0b00000000},
    ];
    
    var element = document.getElementById(EDIT_ID);
    var toolBox = new Toolbox();
    var groupList = [new Group(),new Group(),new Group()];
    var buttonList = new Array();
    var menuSelector = 0b00000000;
    const editableDIV = document.createElement('div');
    var eventHandler = EventHandler;
    eventHandler.attach(editableDIV);

    editableDIV.setAttribute('CONTENTEDITABLE', 'true');
    editableDIV.setAttribute('id', 'edit-box');
    editableDIV.classList.add('edit-box');
    editableDIV.innerHTML='<p><strong>1234</strong><strong>1234</strong></p>'

    if ( !element ) return;

    element.classList.add(EDIT_ID);

    for ( var button of BUTTON_LIST)
    {
        buttonList.push(new Button(button.class, (function(button)
        {
            var button = button;
            return function()
            {
                button.func.call(Editor,editableDIV,Selector.getRange(),button.selector);
            }
        })(button) ));
    }

    groupList[0].addButton([buttonList[0],buttonList[1],buttonList[2],buttonList[3],buttonList[4]]);

    groupList[1].addButton([buttonList[5],buttonList[6],buttonList[7]]);

    groupList[2].addButton([buttonList[8],buttonList[9],buttonList[10]]);

    toolBox.addGroup([groupList[0],groupList[1],groupList[2]]);

    element.appendChild(toolBox.getElement());

    element.appendChild(editableDIV);

    return {
        get menuSelector()
        {
            return menuSelector;
        },
        set menuSelector(val)
        {
            menuSelector = val;
        },
        getElement:function()
        {
            return element;
        },
        getEditableDIV:function()
        {
            return editableDIV;
        }
    }

}
)();
import { Context } from "./Context.js";
import { Selector } from "./Selector.js";

const tools=
{
    redo:"icon-redo",
    undo:"icon-undo",
    bold:"icon-bold",
    underline:"icon-underline",
    italic:"icon-italic",
    palette:"icon-palette",
    strike:"icon-strikethrough",
    justify:"icon-align-justify",
    left:"icon-align-left",
    right:"icon-align-right",
    center:"icon-align-center",
    image:"icon-image",
    youtube:"icon-youtube",
    attach:"icon-attach"
};

const color_map=
{
'#003366': [-200,54],
'#336699': [-200,72],
'#3366CC': [-200,90],
'#003399': [-200,108],
'#000099': [-200,126],
'#0000CC': [-200,144],
'#000066': [-200,162],
'#006666': [-185,45],
'#006699': [-185,63],
'#0099CC': [-185,81],
'#0066CC': [-185,99],
'#0033CC': [-185,117],
'#0000FF': [-185,135],
'#3333FF': [-185,153],
'#333399': [-185,171],
'#669999': [-170,36],
'#009999': [-170,54],
'#33CCCC': [-170,72],
'#00CCFF': [-170,90],
'#0099FF': [-170,108],
'#0066FF': [-170,126],
'#3366FF': [-170,144],
'#3333CC': [-170,162],
'#666699': [-170,180],
'#339966': [-155,27],
'#00CC99': [-155,45],
'#00FFCC': [-155,63],
'#00FFFF': [-155,81],
'#33CCFF': [-155,99],
'#3399FF': [-155,117],
'#6699FF': [-155,135],
'#6666FF': [-155,153],
'#6600FF': [-155,171],
'#6600CC': [-155,189],
'#339933': [-140,18],
'#00CC66': [-140,36],
'#00FF99': [-140,54],
'#66FFCC': [-140,72],
'#66FFFF': [-140,90],
'#66CCFF': [-140,108],
'#99CCFF': [-140,126],
'#9999FF': [-140,144],
'#9966FF': [-140,162],
'#9933FF': [-140,180],
'#9900FF': [-140,198],
'#006600': [-125,9], 
'#00CC00': [-125,27],
'#00FF00': [-125,45],
'#66FF99': [-125,63],
'#99FFCC': [-125,81],
'#CCFFFF': [-125,99],
'#CCCCFF': [-125,117],
'#CC99FF': [-125,135],
'#CC66FF': [-125,153],
'#CC33FF': [-125,171],
'#CC00FF': [-125,189],
'#9900CC': [-125,207],
'#003300': [-110,0], 
'#009933': [-110,18],
'#33CC33': [-110,36],
'#66FF66': [-110,54],
'#99FF99': [-110,72],
'#CCFFCC': [-110,90],
'#000000': [-110,108],
'#FFCCFF': [-110,126],
'#FF99FF': [-110,144],
'#FF66FF': [-110,162],
'#FF00FF': [-110,180],
'#CC00CC': [-110,198],
'#660066': [-110,216],
'#336600': [-95,9],
'#009900': [-95,27], 
'#66FF33': [-95,45], 
'#99FF66': [-95,63], 
'#CCFF99': [-95,81], 
'#FFFFCC': [-95,99], 
'#FFCCCC': [-95,117],
'#FF99CC': [-95,135],
'#FF66CC': [-95,153],
'#FF33CC': [-95,171],
'#CC0099': [-95,189],
'#993399': [-95,207],
'#333300': [-80,18], 
'#669900': [-80,36], 
'#99FF33': [-80,54], 
'#CCFF66': [-80,72], 
'#FFFF99': [-80,90], 
'#FFCC99': [-80,108],
'#FF9999': [-80,126],
'#FF6699': [-80,144],
'#FF3399': [-80,162],
'#CC3399': [-80,180],
'#990099': [-80,198],
'#666633': [-65,27], 
'#99CC00': [-65,45], 
'#CCFF33': [-65,63], 
'#FFFF66': [-65,81], 
'#FFCC66': [-65,99], 
'#FF9966': [-65,117],
'#FF6666': [-65,135],
'#FF0066': [-65,153],
'#CC6699': [-65,171],
'#993366': [-65,189],
'#999966': [-50,36], 
'#CCCC00': [-50,54], 
'#FFFF00': [-50,72], 
'#FFCC00': [-50,90], 
'#FF9933': [-50,108],
'#FF6600': [-50,126],
'#FF5050': [-50,144],
'#CC0066': [-50,162],
'#660033': [-50,180],
'#996633': [-35,45], 
'#CC9900': [-35,63], 
'#FF9900': [-35,81], 
'#CC6600': [-35,99], 
'#FF3300': [-35,117],
'#FF0000': [-35,135],
'#CC0000': [-35,153],
'#990033': [-35,171],
'#663300': [-20,54], 
'#996600': [-20,72], 
'#CC3300': [-20,90], 
'#993300': [-20,108],
'#990000': [-20,126],
'#800000': [-20,144],
'#993333': [-20,162],
}

const menu_flag=
{
    palette:Number.parseInt('10000000', 2),
    bold:Number.parseInt('01000000', 2),
    underline:Number.parseInt('00100000', 2),
    italic:Number.parseInt('00010000', 2),
    strike:Number.parseInt('00001000', 2),
    left:Number.parseInt('00000100', 2),
    center:Number.parseInt('00000010', 2),
    right:Number.parseInt('00000001', 2),
    //unimplement
    justify:Number.parseInt('00000000', 2),
    redo: Number.parseInt('00000000', 2),
    undo:Number.parseInt('00000000', 2)
};

var menu_status=
{
    menu_selection: 0,
    color_selection: '#000000'
}


export const Toolbar=(function(){
    let colorPicker_toggle = false;
    const tool_click = function(element, command)
    {
        element.classList.toggle('active');
        switch(command)
        {
            case 'palette': show_COLORPICKER(); break;
            case 'bold': setStyle_BOLD(element); break;
            case 'underline': setStyle_UNDERLINE(element); break;
            case 'italic': setStyle_ITALIC(element); break;
            case 'strike': setStyle_Strike(element); break;
            case 'left': setStyle_LEFT(element); break;
            case 'center': setStyle_CENTER(element); break;
            case 'right': setStyle_RIGHT(element); break;
            case 'image':

            break;

            case 'youtube':
                
            break;

            case 'attach':
                
            break;

            //unimplement
            case 'redo':break;
            case 'undo':break;
            case 'justify':break;
        }
    }
    const setColor = function(color, top, left)
    {
        document.getElementById("selectedhexagon").style.top = top + "px";
        document.getElementById("selectedhexagon").style.left = left + "px";
        document.getElementById("color-direction").style.color='#ffffff';
        document.getElementById("color-direction").innerText = color;
        document.getElementById("color-direction").style.backgroundColor = color;
        menu_status.color_selection=color;
        if ( color != '#000000' )
            menu_status.menu_selection ^= menu_flag.palette;
    }
    const getColor = function()
    {
        return menu_status.color_selection;
    }
    const show_COLORPICKER = function()
    {
            if ( colorPicker_toggle )
            {
                document.getElementById('color-picker').style.display='none';
                colorPicker_toggle = false;
            }
            else
            {
                document.getElementById('color-picker').style.display='';
                colorPicker_toggle = true;
     
            }
    }
    const setStyle_BOLD = function(button)
    {
        menu_status.menu_selection ^= menu_flag.bold;
        var node = document.createElement('span');
        node.classList.add('bold');
        node.innerHTML='\u200B';
        //node.appendChild(br);
        Selector.getRange().insertNode(node);
        let range = document.createRange();
        range.setStart(node,1);
        range.setEnd(node,1);
        Selector.setRange(range);
        //Selector.move();
    }
    const setStyle_UNDERLINE = function(button)
    {
        menu_status.menu_selection ^= menu_flag.underline;
    }
    const setStyle_ITALIC = function(button)
    {
        menu_status.menu_selection ^= menu_flag.italic;
    }
    const setStyle_Strike = function(button)
    {
        menu_status.menu_selection ^= menu_flag.strike;
    }
    const setStyle_JUSTIFY = function(button)
    {
        menu_status.menu_selection ^= menu_flag.justify;
    }
    const setStyle_LEFT = function(button)
    {
        menu_status.menu_selection ^= menu_flag.left;
    }
    const setStyle_CENTER = function(button)
    {
        menu_status.menu_selection ^= menu_flag.center;
    }
    const setStyle_RIGHT = function(button)
    {
        menu_status.menu_selection ^= menu_flag.right;
    }
    const insert_IMAGE = function()
    {
        
    }
    const insert_YOUTUBE = function()
    {

    }
    const doATTACH = function()
    {

    }
    //add menu click event
    const _tools = Object.entries(tools);

    for( var item of _tools )
    {
        let tools = document.getElementsByClassName(item[1]);
        for ( let tool of tools )
        {
            tool.addEventListener('click',(function(){
                let value = item[0];
                let _tool = tool;
                return function()
                {
                    tool_click(_tool, value);
                };
                
            })());
        }
    }
    
    //add color-picker click event

    const ele = document.getElementById('color-map');

    for ( let area of ele.children )
    {
        let color = area.alt;
        let top = color_map[color][0];
        let left = color_map[color][1];

        area.addEventListener('click', (function(){
            return function()
            {
                setColor(color,top,left);
            };
        }
        )());
    }

    return {
        getTools:function()
        {
            return _tools;
        }
    };
})();
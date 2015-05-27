/********************************************************************************

   Documentation

*********************************************************************************

rangeLib.js
---------------------
Run makeControls with a data json structure as its parameter
The corresponding controls are created on-screen and automatically update the corresponding global variables


 
-------------==============######## Documentation End ###########==============-------------
*/

//---------------------------------------------------------------------------------------------------
// showVal
//---------------------------------------------------------------------------------------------------


function showVal(ths)
{
	var val=Number(ths.value);
	var elemid=ths.id;
	var appendix=elemid.slice(-1);
	var butlast=elemid.slice(0, -1);
	var prependix=elemid.substring(0,2);
	var antependix=elemid.substring(2,elemid.length);
					
	if(isNaN(val)) val=0;

	if(appendix=="T") elemid=butlast;

	// Filter for max and min
	document.getElementById(elemid).value=val;
	val=document.getElementById(elemid).value;
	document.getElementById(elemid+"T").value=val;

	if(prependix=="RR"||prependix=="GG"||prependix=="BB"){
		str="RGB(";
		str+=Math.round(document.getElementById("RR"+antependix).value*255.0)+",";
		str+=Math.round(document.getElementById("GG"+antependix).value*255.0)+",";
		str+=Math.round(document.getElementById("BB"+antependix).value*255.0)+")";
	 	document.getElementById("RR"+antependix+"O").style.background=str;
	}
}

//---------------------------------------------------------------------------------------------------
// switchBin
//---------------------------------------------------------------------------------------------------

function switchBin(ths)
{
	var val=Number(ths.value);
	
	if(val==1){
			ths.className="binary binaryon";				
	}else{
			ths.className="binary";								
	}
}

//---------------------------------------------------------------------------------------------------
// makeControl
//---------------------------------------------------------------------------------------------------

function makeControl(kind,defaultval,minval,maxval,step,nme,lbl)
{
		var str="";

		str+="<tr>";
		str+="<td>\n";
		
		// Ordinary range control or RGB control and Binary Control
		if(kind==0||kind==2){
								str+="<span class='lab' id='"+nme+"L'>"+lbl+":&nbsp;</span>\n";
						str+="</td>\n";
						str+="<td>\n";
								str+="<input id='"+nme+"T' type='text' value='"+defaultval+"' class='numt' onchange='showVal(this)' />\n";
						str+="</td>\n";
						str+="<td>\n";
								str+="<input id='"+nme+"' class='numb' type='range' min='"+minval+"' max='"+maxval+"' value='"+defaultval+"' step='"+step+"' oninput='showVal(this)' onchange='showVal(this)' />\n";
		}else if(kind==1){
								str+="<span class='lab' id='"+nme+"L'>"+lbl+":&nbsp;</span>\n";
						str+="</td>\n";
						str+="<td>\n";
								str+="<input id='"+nme+"' type='range' class='binary' min='0' max='1' value='0' step='1' oninput='switchBin(this)' onchange='switchBin(this)' />\n";
		}
		
		// R component of RGB control which houses the color display.
		if(kind==2){
						str+="</td>\n";
						str+="<td rowspan='3'>\n";
						str+="<div id='"+nme+"O' class='RGBBox'></div>\n";
		}

		str+="</td>\n";
		str+="</tr>";

		return str;
}

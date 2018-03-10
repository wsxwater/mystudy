// JavaScript Document
function Select(){
    var oSelect=document.getElementById('select');
	var oShow_address=getByClass(oSelect,'show_address')[0];
	var aLiShow_address=oShow_address.getElementsByTagName('li');
	oSelect.onmouseover=function(){
	   oShow_address.style.display='block';
	}
	oSelect.onmouseout=function(){
	   oShow_address.style.display='none';
	}	
	
}
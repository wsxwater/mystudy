// JavaScript Document
function getEvent(obj,ev,fn){
	    
		if(obj.attachEvent){
		   obj.attachEvent('on'+ev,fn);  //attachEvent:ie支持；attachEvent(事件，函数)
		}
	    else{
		   obj.addEventListener(ev,fn,false);  //addEventListener:ff，chrome支持；addEventListener(事件[不带on的]，函数，false)
		}
	 }
	 
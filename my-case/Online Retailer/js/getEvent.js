// JavaScript Document
function getEvent(obj,ev,fn){
	    
		if(obj.attachEvent){
		   obj.attachEvent('on'+ev,fn);  //attachEvent:ie֧�֣�attachEvent(�¼�������)
		}
	    else{
		   obj.addEventListener(ev,fn,false);  //addEventListener:ff��chrome֧�֣�addEventListener(�¼�[����on��]��������false)
		}
	 }
	 
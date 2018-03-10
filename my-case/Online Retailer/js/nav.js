
function nav(){
     var oNav=document.getElementById('nav');
	 var aANav=oNav.getElementsByTagName('a');
	 
	 for(var i=0;i<aANav.length;i++){
	   aANav[i].index=i;
	   aANav[i].onmouseover=function(){
		 for(var i=0;i<aANav.length;i++){
		   	 aANav[i].className='';
		 }
		 this.className='active';
	   }
	}	
}
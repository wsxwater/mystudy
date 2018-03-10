
function share(){

	var oShare=document.getElementById('share');
		 oShare.onmouseover=function(){
		   startMove(this,{left:0});	 
		 }
		oShare.onmouseout=function(){
		   startMove(this,{left:-173});
		 }
	window.onscroll=window.onresize=function()
	  {
		 var oShare=document.getElementById('share');
		 var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		 oShare.style.top=parseInt((document.documentElement.clientHeight-oShare.offsetTop)/2+scrollTop)+'px';
	  }	
}
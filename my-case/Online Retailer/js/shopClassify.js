
/*function getPos(ev){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
	
	return {x:ev.clientX+scrollLeft,y:ev.clientY+scrollTop};
}*/

  window.onload=function(){
    var oBan=document.getElementById('banner');
    var oImgBox=getByClass(oBan,'imgBox')[0];
	var aBLi=oImgBox.getElementsByTagName('li');
	
	var oImgNum=getByClass(oBan,'imgNum')[0];
	var aNa=oImgNum.getElementsByTagName('a');
	var now=0;
	
    for(var i=0;i<aNa.length;i++){
	   aNa[i].index=i;
	   aNa[i].onmouseover=function()
	   {
		  now=this.index;
		  tab();
	   }
	}
	
	function tab(){
	  for(var i=0;i<aNa.length;i++)
	  {
	    aNa[i].className='';
	  }
	    aNa[now].className='active';
	   startMove(oImgBox,{left:-810*now});
	}
	
    function next()
   {
	  now++;
	  if(now==aNa.length)
	  {
		   now=0;
	  }
	 
	  tab();
   }
	
	var timer=setInterval(next,4000);
	
	 oBan.onmouseover=function()
	 {
		  clearInterval(timer);
	 }
	 oBan.onmouseout=function()
	 {
		  timer=setInterval(next,4000);
	 }  
	 
	 addLoadEvent(share());
     addLoadEvent(nav());
	 addLoadEvent(shopClass1());
	  addLoadEvent(returnTop());
  }




function banner(){
    var oBan=document.getElementById('banner');
    var oImgBox=getByClass(oBan,'imgBox')[0];
	var aBLi=oImgBox.getElementsByTagName('li');
	var oImgNum=getByClass(oBan,'imgNum')[0];
	var aNa=oImgNum.getElementsByTagName('a');
	var now=now1=0;
	
	var oBanSm=document.getElementById('banner_sm');
	var oImgBox1=getByClass(oBanSm,'imgBox')[0];
	var aBLi1=oImgBox1.getElementsByTagName('li');
	var oImgNum1=getByClass(oBanSm,'imgNum')[0];
	var aNa1=oImgNum1.getElementsByTagName('a');
	
	
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
	
	var timer=setInterval(next,2000);
	
	 oBan.onmouseover=function()
	 {
		  clearInterval(timer);
	 }
	 oBan.onmouseout=function()
	 {
		  timer=setInterval(next,2000);
	 }  

     
	 for(var j=0;j<aNa1.length;j++){
	   aNa1[j].index=j;
	   aNa1[j].onmouseover=function()
	   {
		  now1=this.index;
		  tab1();
	   }
	}
	
	function tab1(){
	  for(var j=0;j<aNa1.length;j++)
	  {
	    aNa1[j].className='';
	  }
	    aNa1[now1].className='active';
	   startMove(oImgBox1,{left:-190*now1});
	}
	
    function next1()
   {
	  now1++;
	  if(now1==aNa1.length)
	  {
		   now1=0;
	  }
	 
	  tab1();
   }
	
	var timer1=setInterval(next1,1000);
	
	 oBanSm.onmouseover=function()
	 {
		  clearInterval(timer1);
	 }
	 oBanSm.onmouseout=function()
	 {
		  timer1=setInterval(next1,1000);
	 }	
}
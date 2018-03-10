

  function returnTop(){
    var oBtn=document.getElementById('btn');
	var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
	var timer=null;
	var bStop=true;
	
	window.onscroll=function(){
	  var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	   if(scrollTop>clientHeight){
	      oBtn.style.display='block';
	   }
	   else{
	      oBtn.style.display='none';
	   }
	  
	   if(!bStop){
	     clearInterval(timer);
	   }
	   bStop=false;
	}
	
	oBtn.onclick=function(){ 
		 timer=setInterval(function(){
		 var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	     var speed=Math.floor(-scrollTop/5);
			document.documentElement.scrollTop=document.body.scrollTop=scrollTop+speed;
			
			bStop=true;
			
		    if(scrollTop==0){
			  clearInterval(timer);
			}
		 },30);
    }		 
	 
  }


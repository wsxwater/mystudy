
  window.onload=function(){
	function addLoadEvent(func){
	  var oldonload=window.onload;
	  if(typeof window.onload!="function")
	  {
		  window.onload=func;
	  }
	  else{
		  window.onload=function(){
			  oldonload();
			  func();
		  }
	   }
	}  
	addLoadEvent(share());
    addLoadEvent(nav());
	addLoadEvent(shopClass1());
	addLoadEvent(Select());
	addLoadEvent(returnTop());

  }


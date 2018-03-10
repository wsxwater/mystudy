
function shopClass1(){
    var oShopClass=document.getElementById('shopClass');
	var aLiShopClass=oShopClass.getElementsByTagName('li');
	var oShopClass_show=document.getElementById('shopClass_show');
	var aShopClass_item=oShopClass_show.getElementsByTagName('dl');	
	var aUlShopClass=oShopClass.getElementsByTagName('ul')[0];
	
	oShopClass.onmouseover=function(){
	     oShopClass_show.className=oShopClass_show.className.replace(/\s?shopClass_show\Shide/,'');
	     oShopClass_show.className+=' show';
			 for(var m=0;m<aShopClass_item.length;m++){
				aShopClass_item[m].index=m;
				aShopClass_item[m].onmouseover=function(){
					for(var m=0;m<aShopClass_item.length;m++){
						aShopClass_item[m].className = aShopClass_item[m].className.replace(/\s?shopClass_active/,'');	
						aLiShopClass[m].className = aLiShopClass[m].className.replace(/\s?show/,'');	
					}
					this.className +=' shopClass_active';
					aLiShopClass[this.index].className +=' show';
				}
		   }
		   aUlShopClass.style.display='block';
	}  
	
	oShopClass.onmouseout=function(){
	    oShopClass_show.className=oShopClass_show.className.replace(/\s+?\Sshow/,'');
	    oShopClass_show.className='shopClass_show hide';
		aUlShopClass.style.display='none';
	}	
}
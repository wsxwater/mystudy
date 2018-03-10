
function shopClass(){
        var $=function(id){ return document.getElementById(id); }

    var oShopClass=$('shopClass');
	var aLiShopClass=oShopClass.getElementsByTagName('li');
	var oShopClass_show=$('shopClass_show');
	var aShopClass_item=oShopClass_show.getElementsByTagName('dl');	
	var aUlShopClass=oShopClass.getElementsByTagName('ul')[0];
	
	oShopClass.onmouseover=function(){
		 for(var i=0;i<aShopClass_item.length;i++){
			aShopClass_item[i].index=i;
			aShopClass_item[i].onmouseover=function(){
				for(var i=0;i<aShopClass_item.length;i++){
					aShopClass_item[i].className = aShopClass_item[i].className.replace(/\s?shopClass_active/,'');	
					aLiShopClass[i].className = aLiShopClass[i].className.replace(/\s?show/,'');
				}
				this.className +=' shopClass_active';					
				aLiShopClass[this.index].className +=' show';
			}
			
		}
	   aUlShopClass.style.display='block';
	}  
	oShopClass.onmouseout=function(){
		aUlShopClass.style.display='none';
		  for(var i=0;i<aShopClass_item.length;i++)
			aShopClass_item[i].className+='';
	}	
}

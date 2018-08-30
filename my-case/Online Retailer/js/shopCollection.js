
window.onload=function(){	 
	addLoadEvent(share());
    addLoadEvent(nav());
	addLoadEvent(shopClass1());
	//addLoadEvent(returnTop());

	/*if(!document.getElementsByClassName){
	   document.getElementsByClassName=function(cls){
	      var rel=[];
		  var els=document.getElementsByTagName('*');
		  for(var a=0;a<els.length;a++){
              if(els[a].className===cls
			     ||els[a].className.indexOf(cls+' ')>=0
			     ||els[a].className.indexOf(' '+cls+' ')>=0
				 ||els[a].className.indexOf(' '+cls)>=0){
			     rel.push(els[a]);
			  }  
		  }
          return rel;
	   }
	}*/
	/*var oChecksInput=document.getElementsByClassName('checks');
	var oChecksAllInput=document.getElementsByClassName('check_all');*/
	var oCartTable=document.getElementById('cartTable');
	var oTr=oCartTable.tBodies[0].rows;
	var oChecksInput=getByClass(document,'checks');
	var oChecksAllInput=getByClass(document,'check_all');
	var oPriceTotal=document.getElementById('priceTotal');
	var oSelectedTotal=document.getElementById('selectedTotal');
	var oSelected=document.getElementById('selected');
	var oFoot=document.getElementById('foot');
	var oSelectedViewList=document.getElementById('selectedViewList');
	var oDeleteAll=document.getElementById('deleteAll');
	
	//è®¡ç®—
	function getTotal(){
	   var oSel=0;
	   var oPri=0;
	   var HTMLstr='';
	   for(var x=0;x<oTr.length;x++){
	      if(oTr[x].getElementsByTagName('input')[0].checked){
		     oTr[x].className='on';
		     oSel+=parseInt(oTr[x].getElementsByTagName('input')[1].value);
			 oPri+=parseFloat(oTr[x].cells[4].innerHTML);
			 HTMLstr+='<div><img src="'+oTr[x].getElementsByTagName('img')[0].src+'" alt="送货" /><span class="del" index="'+x+'">取消选择</span></div>';
		  }
		  else{
		     oTr[x].className='';
		  }
	   }
	   oSelectedTotal.innerHTML=oSel;
	   oPriceTotal.innerHTML=oPri.toFixed(2);//toFixed(2):å°æ•°ä½åªæœ‰ä¸¤ä½
	   oSelectedViewList.innerHTML=HTMLstr;
	   
	   if(oSel==0){
	      oFoot.className='foot';
	   }
	}
	
	//å°è®¡
	function getSubTotal(tr){
	  var tds=tr.cells;
	  var price=parseFloat(tds[2].innerHTML);
	  var count=parseInt(tr.getElementsByTagName('input')[1].value);
	  var SubTol=parseFloat(price*count);
	  tds[4].innerHTML=SubTol.toFixed(2);
	}
	
	for(var x=0;x<oChecksInput.length;x++){
	   oChecksInput[x].onclick=function(){
	      if(this.className==='check_all checks'){
		      for(var y=0;y<oChecksInput.length;y++){
			     oChecksInput[y].checked=this.checked;
			  }
		  }
		  if(this.checked==false){
		     for(var z=0;z<oChecksAllInput.length;z++){
			   oChecksAllInput[z].checked=false;
			 }
		  }
	      getTotal();
	   }
	}
	
	oSelected.onclick=function(){
	   if(oFoot.className=='foot'){
	      if(oSelectedTotal.innerHTML!=0){
		    oFoot.className='foot show';
		  }	
	   }
	   else{
	      oFoot.className='foot';
	   }
	}
	
	oSelectedViewList.onclick=function(e){
	    var e = e || event;
        var el = e.srcElement||e.target;
	   if(el.className=="del"){
	      var index=el.getAttribute('index');
		  var input=oTr[index].getElementsByTagName('input')[0];
		  input.checked=false;
		  input.onclick();
	   }
	}
	
	
	//reduction plus
	for(var x=0;x<oTr.length;x++){
	   oTr[x].onclick=function(e){
		  var e = e || event;
          var el = e.srcElement||e.target;
		  var oCls=el.className;
		  var input=this.getElementsByTagName('input')[1];
		  var val=parseInt(input.value);
		  var oReduction=getByClass(document,'reduction')[0];
		  
		  switch(oCls){
		   case 'reduction':
		    if(val>1){
		         input.value=val-1;
			}
			if(input.value<=1){
			     oReduction.innerHTML='';
		    }		
			     getSubTotal(this);
				 break;
		   case	'plus':
				input.value=val+1;
				oReduction.innerHTML='-';
				getSubTotal(this);
				 break;
		   case 'delete':
		   var conf=confirm('确定要删除吗？');
		   //alert(this.parentNode);
		        if(conf){
				  this.parentNode.removeChild(this);
				}
		         break;		 
			default:
			     break;
		  }
		  getTotal();
	   }
	   
	   oTr[x].getElementsByTagName('input')[1].onkeyup=function(){
	      var val=parseInt(this.value);
		  var tr=this.parentNode.parentNode.parentNode.parentNode;
		  var Reduction=getByClass(tr,'reduction')[0];
		  if(isNaN(val)||val<1){
		     val=1;
		  }	
		  this.value=val;
		  if(val<=1){
		     Reduction.innerHTML='';
		  }
		  else{
		     Reduction.innerHTML='-';
		  }
		  getSubTotal(tr);
	   }
	  }
	
	oDeleteAll.onclick=function(){
	    if(oSelectedTotal.innerHTML!=0){
		   var conf=confirm('ç¡®å®šè¦å…¨éƒ¨åˆ é™¤å—ï¼Ÿ');
		   if(conf){
			 for(var x=0;x<oTr.length;x++){
			   var input=oTr[x].getElementsByTagName('input')[0];
			   if(input.checked){
				  oTr[x].parentNode.removeChild(oTr[x]);
				  x--;
			   }
			 }
		   }
		}  
	}
	
	oChecksAllInput[0].checked=true;
	oChecksAllInput[0].onclick;
	
  }


function ajax(url,fnSucc,fnFail){
  
   if(window.XMLHttpRequeset){
     var oAjax=new XMLHttpRequeset();
   }
   else{
     var oAjax=new ActiveXobject("Microsoft.XMLHTTP");
   }

   oAjax.open('GET',url,true);
  
   oAjax.send();

   oAjax.onreadystatechange=function(){
     
     if(oAjax.readyState==4){
        if(oAjax.status==200){
           fnSucc(oAjax.responseText);
        }
        else{
           if(fnFail){
             fnFail(oAjax.status);
           }
        }   
     }
   }
}
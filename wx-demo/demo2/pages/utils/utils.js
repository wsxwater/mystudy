function starToArr(stars){
    var arr=[];
    var num=stars.substring(0,1);

    for(var i=0;i<5;i++){
      if(num<i){
        arr.push(0);
      }else{
        arr.push(1)
      }
    }

    return arr;
}


module.exports={
  starToArr: starToArr
}
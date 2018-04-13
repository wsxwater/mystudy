function starToArr(stars){
    var arr=[];
    var num=stars.substring(0,1);

    for(var i=1;i<=5;i++){
      if(num<i){
        arr.push(0);
      }else{
        arr.push(1)
      }
    }

    return arr;
}

function http(url, callback) {
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json' 
    },
    success: function (res) {
      callback(res.data)
    }
  })
}

function subStrings(strings,start,end){
  var result='';
  if (strings.length >= end) {
    result = strings.substring(start, end) + '...'
  }else{
    result=strings;
  }

  return result;
}


module.exports={
  starToArr: starToArr,
  http:http,
  subStrings: subStrings
}
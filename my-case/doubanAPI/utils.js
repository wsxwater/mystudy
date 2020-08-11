var gobalurl='https://api.douban.com';//没有使用nginx
//var gobalurl='http://b.com';  //使用了nginx代理到豆瓣api，要使用gobalurl就要启动服务器start nginx,重启服务器nginx -s reload
//var gobalurl='/base';  //隐藏跨域

function httpGet(url,callback,error) {
	var xhrs=$.ajax({
			url:url,
			type:'GET',
			// dataType: 'jsonp',//没有使用nginx
	        // crossDomain: true,//没有使用nginx
			success:function (res) {
				callback(res)
			},
			error:function (res) {
				error();
			},
		});
}

function starToArr(stars){//将星星数字，转为数组，例如:50=>[1,1,1,1,1]
    var arr=[];
    var num=stars.substring(0,1);//截取数字第一位，例如：50=>5
    // var num2=stars.substring(2,1);
    // console.log(num2);

    for(var i=1;i<=5;i++){
      if(num<i){//如果5小于i，就添加数字0
        arr.push(0);
      }else{//如果5不小于i，就添加数字1
        arr.push(1)
      }
    }
    
    return arr;
}

function addItalicLine(object) {
    var objectJoin='';
    var objectFinal='';
    for (prop in object) {
       objectJoin=objectJoin+object[prop].name+' / ';
    }
    objectFinal=objectJoin.substring(0,objectJoin.length-3); 

    return objectFinal;
}

function addArrItalicLine(arr) {
    var arrJoin='';
    var arrFinal='';
    for (prop in arr) {
        arrJoin=arrJoin+arr[prop]+' / ';
    }
    arrFinal=arrJoin.substring(0,arrJoin.length-3); 

    return arrFinal;
}

function appendStar(star,parent) {//将星星数组[1,1,1,1,1]插入对应颜色的星星字符
    for (var i = 0; i < star.length; i++) {
        var starArr=[];
        var starImg='<span>★</span>';

        if (star[i]==1) {
            starImg='<span class="on">★</span>';
        }else if (star[i]==0) {
            starImg='<span>★</span>';
        }
        starArr.push(starImg);
        parent.append(starArr);
    }
}


function getUrlParam(name) {
    /**
     * window.location.search：设置或获取 href 属性中跟在问号后面的部分
     * var test = window.location.search;
         alert(test);
        返回：?opt=1
     */
    
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r=window.location.search.substr(1).match(reg);

    if (r!=null) {
        return unescape(r[2]);
    }
    return null;
}

// 解决豆瓣403图片缓存问题
// 豆瓣限制了图片的加载，可以把图片缓存下来： 只要在请求到的图片链接前面加上‘https://images.weserv.nl/?url=’即可（注：这是一个专门缓存图片的网址），可能会有点慢。
function getImages( _url ){
  if( _url !== undefined ){
    let _u = _url.substring( 7 );
    return 'https://images.weserv.nl/?url=' + _u;
  }
}

function getChinese(strValue) {  
    if(strValue!= null && strValue!= ""){  
        var reg = /[\u4e00-\u9fa5]/g;   
	    var result = strValue.match(reg).join("");  
	    return result; 
    }else { 
        return ""; 
    } 
}  
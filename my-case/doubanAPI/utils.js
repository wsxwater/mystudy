var gobalurl='https://api.douban.com';


function httpGet(url,callback,error) {
	var xhrs=$.ajax({
			url:url,
			type:'GET',
			dataType: 'jsonp',
	        crossDomain: true,
			success:function (res) {
				callback(res)
			},
			error:function (res) {
				//alert('error');
				//window.location.href='list.html';
				//$('.tip').text('加载失败。。。');
				error();
			},
		});
}

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

function appendStar(star,parent) {
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
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r=window.location.search.substr(1).match(reg);

    if (r!=null) {
        return unescape(r[2]);
        return null;
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
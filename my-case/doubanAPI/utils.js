function httpGet(url,callback) {
	$.ajax({
		url:url,
		type:'GET',
		dataType: 'jsonp',
        crossDomain: true,
		success:function (res) {
			callback(res)
		},
		error:function (res) {
			alert('error');
			window.location.href='list.html';
		},
	})
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
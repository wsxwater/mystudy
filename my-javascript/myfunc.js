/**
 * [scroll 获取DOM所在位置]
 * @return {[type]} [description]
 */
function scroll() {
	if (window.pageYOffset!==null) {
		return {
			left:window.pageXOffset,
			top:window.pageYOffset
		}
	}else if (document.CompatMode==='CSS1Compat') {
		return {
			left:document.documentElement.scrollLeft,
			top:document.documentElement.scrollTop
		}
	}
	return {
		left:document.body.scrollLeft,
		top:document.body.scrollTop
	}
}
/**
 * [client 获取屏幕尺寸]
 * @return {[type]} [description]
 */
function client() {
	if (window.innerWidth) {
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else if (document.CompatMode==='CSS1Compat') {
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
	return {
		width:document.body.clientWidth,
		height:document.body.clientHeight
	}
}

/**
 * [getByClass 获取类名]
 * @param  {[type]} parent [父节点]
 * @param  {[type]} sclass [类名]
 * @return {[type]}        [返回arr]
 */
function getByClass(parent,sclass) {
	if (parent.getElementsByClassName) {
		return parent.getElementsByClassName(sclass);
	} else {
		var aEle=parent.getElementsByTagName('*');
		var arr=[];
		var i=0;
		for(i=0;i<aEle.length;i++){
		  if(aEle[i].className.search(sclass)){
		   arr.push(aEle[i]);
		  }
		}
		return arr;
	}
}


/**
 * [$ 获取id]
 * @param  {[DOM]} id 
 */
function $(id) {
	return typeof id==='string'?document.getElementById(id):null;
}


/**
 * [show 显示]
 * @param  {[DOM]} obj 
 */
function show(obj) {
	obj.style.display='block';
}

/**
 * [hide 隐藏]
 * @param  {[DOM]} obj 
 */
function hide(obj) {
	obj.style.display='none';
}

/**
 * [constant 定时器匀速动画]
 * @param  {[DOM]} obj    [description]
 * @param  {[number]} target [目标]
 * @param  {[number]} speed  [速度]
 */
function constant(obj,target,speed) {
	clearInterval(obj.timer);
	obj.timer=setInterval(function () {
         
        var dir=target-obj.offsetLeft>0?speed:-speed;
		obj.style.left=obj.offsetLeft+dir+'px';
        
        if (Math.abs(target-obj.offsetLeft)<Math.abs(dir)) {
        	clearInterval(obj.timer);
        	obj.style.left=target+'px';
        }

	},20)
}

/**
 * [getStyle 获取样式]
 * @param  {[DOM]} obj  
 * @param  {[string]} name [属性，例如height、width等等]
 */
function getStyle(obj,name){
   if(obj.currentStyle){
       return obj.currentStyle[name];
   }else{
       return getComputedStyle(obj,false)[name];
   }
}

/**
 * [startMove 动画]   startMove(obj,{height:10px,width:10px},function(){...})
 * @param  {[DOM]} obj   
 * @param  {[string]} json  
 * @param  {[function]} fnEnd 
 */
function startMove(obj,json,fnEnd) {
	
	clearInterval(obj.timer);
	var b_stop=true;
    
    obj.timer=setInterval(function () {
    	for (attr in json) {
	    	var cur=0;
	    	//获取设置的最初的样式css，当属性名是opacity时要特殊处理
            cur=attr=='opacity'?Math.round(parseFloat(getStyle(obj,attr))*100):parseInt(getStyle(obj,attr));
	    	var speed=(json[attr]-cur)/6;//json[attr]，函数设置的值，即目标值；cur为原始值。begin+=(end-begin)*系数，系数一般为0.2
	    	speed=speed>0?Math.ceil(speed):Math.floor(speed);//speed，速度。
            
            if (cur!=json[attr]) b_stop=false; //json[attr]，函数设置的值，即目标值。当cur的累加值(cur+speed)不等于json[attr]时，b_stop为false
            
            if (attr=='opacity') {
            	obj.style.filter='alpha(opacity:'+(cur+speed)+')';
            	obj.style.opacity=(cur+speed)/100;
            }else{
		    	obj.style[attr]=cur+speed+'px';
            }
    	}

		if (b_stop) {
			clearInterval(obj.timer);
			if (fnEnd) fnEnd();
		}
    },20)
}


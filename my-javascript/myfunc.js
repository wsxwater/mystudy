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
 * [getStyle 获取样式的属性值]
 * @param  {[DOM]} obj  
 * @param  {[string]} name [属性，例如height、width等等]
 */
function getStyle(obj,name){
   if(obj.beginrentStyle){
       return obj.beginrentStyle[name];
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
    
	var begin=0,speed=0,target=0;
    obj.timer=setInterval(function () {
		var b_stop=true;

    	for (attr in json) {
	    	//获取设置的最初的样式css，当属性名是opacity时要特殊处理
            if (attr=='opacity') {
            	begin=Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
            	target=parseInt(json[attr]*100);
            }else if(attr=='scrollTop'){
            	begin=Math.ceil(obj.scrollTop)||0;
            	target=parseInt(json[attr]);
            }else{
            	begin=parseInt(getStyle(obj,attr))||0;
	            target=parseInt(json[attr]);
            }

            //(target-begin)求出步长 
	    	speed=(target-begin)*0.2;//target，函数设置的值，即目标值；begin为原始值。begin+=(target-begin)*系数，系数一般为0.2
	    	speed=target>begin?Math.ceil(speed):Math.floor(speed);//speed，速度。

            if (attr=='opacity') {
            	obj.style.filter='alpha(opacity:'+(begin+speed)+')';
            	obj.style.opacity=(begin+speed)/100;
            }else if(attr=='scrollTop'){
                obj.scrollTop=begin+speed;
            }else{
		    	obj.style[attr]=begin+speed+'px';
            }

            if (begin!=target){b_stop=false}; //target，函数设置的值，即目标值。当begin的累加值(begin+speed)不等于target时，b_stop为false

            // console.log(begin,target);
    	}

		if (b_stop) {
			clearInterval(obj.timer);
			if (fnEnd) fnEnd();
		}
    },30)
}

function hasClass(obj,sClass){
    return obj.className.match(new RegExp('(\\s|^)'+sClass+'(\\s|$)'),'');
}
 
function removeClass(obj,sClass){
    if(hasClass(obj,sClass)){
	   var re=new RegExp('(\\s|^)'+sClass+'(\\s|$)');
	   obj.className=obj.className.replace(re,'');
	}
}
 
function addClass(obj,sClass){
    if(!hasClass(obj,sClass)){
	   obj.className+=' '+sClass;
	}
}



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
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function $(id) {
	return typeof id==='string'?document.getElementById(id):null;
}


/**
 * [show 显示]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function show(obj) {
	obj.style.display='block';
}

/**
 * [hide 隐藏]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function hide(obj) {
	obj.style.display='none';
}



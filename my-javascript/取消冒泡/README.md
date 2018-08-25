# 取消冒泡方法
> 标准浏览器和ie浏览器
  w3c：event.stopPropagation()  <code>Propagation 传播 传递</code> 
  IE ：event.cancelBubble=true; <code>cancel：取消;bubble：冒泡</code>

> 兼容写法
if (event && event.stopPropagation) {//w3c标准
    event.stopPropagation();
}else{
    event.cancelBubble=true;//ie 678
}

---

# 获取当前操作对象
> 开发中，当执行一个事件时需要去知道触发这个事件的对象是谁？那么如何获取：
  火狐、谷歌 event.target
  ie678 event.srcElement
  
> 兼容写法
var target=event.target?event.target:event.srcElement;


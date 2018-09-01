# 获取用户选中内容
> 标准浏览器  
  window.getSelection()

> ie
  document.selection.createRange().text;

> 兼容写法
  var selectText;
  if(window.getSelection){
    selectText=window.getSelection().toString();
  }else{
    selectText=document.selection.createRange().text;
  }
> 微博分享
  http://service.weibo.com/share/share.php?searchPic=false&title='+selectText+'&url=http://www.baidu.com

---

# 防止拖动时选中内容
  window.getSelection?window.getSelection().removeAllRanges():document.selection.empty()
  案例：放大镜效果，滚动条效果 
   
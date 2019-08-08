// tabs/tabs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     currentIndex:0,
     tabArr:['小说','娱乐','休闲','财经'],
     navson:[
       {
         "class":"blue",
         "title":"可回收",
         "context": "我是中国人\n我是中国人\n我是中国人"
       },
       {
         "class": "green",
         "title": "可回收",
         "context": "我是中国人ddd\n我是中国人dd\n我是中国人ddd"
       }
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // var len = this.data.navson.length;
    // for (var i = 0; i < len;i++){
    //   console.log(this.data.navson[i].context.replace(/\\n+$/g,"<br />"))
    // }
  
  },
  tabsFun:function(e){
     var current = e.currentTarget.dataset.current;
     
     
     this.setData({
       currentIndex: current
     })
  }
})
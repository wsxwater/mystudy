// tabs/tabs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     currentIndex:0,
     tabArr:['小说','娱乐','休闲','财经']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
  },
  tabsFun:function(e){
     var current = e.currentTarget.dataset.current;

     this.setData({
       currentIndex: current
     })
  }
})
//index.js

var newsData=require('../data/data.js');

Page({
  data: {
   
  },
  onLoad: function (options) {

      this.setData({
        author:newsData.initData
      })
      
  },

  goDetail:function(event){
      //console.log(event.currentTarget.dataset.newsid)
      

      wx.navigateTo({
        url: '../detail/detail?newsid='+event.currentTarget.dataset.newsid
      })
  }
  
})

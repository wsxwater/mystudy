// pages/detail/detail.js
var newsData = require('../data/data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
     NEWSID:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //console.log(options.newsid);

      this.setData(newsData.initData[options.newsid]);

      this.setData({
        newsId: options.newsid
      })

      // var newsIDF = wx.getStorageSync('newsIDF');

      // if (newsIDF) {
      //   var newIDF = newsIDF[options.newsid];

      // } else {
      //   var newsIDF = {};
      //   newsIDF[options.newsid] = 0;
      //   wx.setStorageSync('newsIDF', newsIDF);
      // }
  },
  goCart: function () {
    wx.navigateTo({
      url: '../cart/cart',
    });
  },
  addCart:function (event) {
    
    //console.log(this.data.newsId)
    // var newsIDF = wx.getStorageSync('newsIDF');
    // var newIDF = newsIDF[this.data.newsId] || 0;
    // newIDF = newIDF+1;

    // newsIDF[this.data.newsId] = newIDF;

    // wx.setStorageSync('newsIDF', newsIDF);
    
    var list=this.data.NEWSID;

    list.push(this.data.newsId)
    
    this.setData({
      Id:list
    })

    wx.setStorage({
      key: 'newsid',
      data: list,
    })

    
  },
  onUnload:function(){
    
  }
})
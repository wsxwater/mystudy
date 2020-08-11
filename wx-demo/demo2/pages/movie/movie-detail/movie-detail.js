var movieData = require('../../data/movieData1.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.movieid)

    this.setData({
      movieID: options.movieid
    });

    //wx.hideNavigationBarLoading();
  },
  onReady:function(){
    //wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: this.data.movieID+'电影详情',
    });
    
  }

})
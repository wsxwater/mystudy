//var movieData = require('../../data/movieData1.js');
var app = getApp();

var utils = require('../../utils/utils.js');

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
    //console.log(options.movieid)

    this.setData({
      movieID: options.movieid
    });

    var searchMovieID = app.globalUrlData.movieUrl+'/v2/movie/subject/' + this.data.movieID;
    utils.http(searchMovieID,this.callback);

    
  },
  callback:function(res){
    console.log(res)

    wx.hideNavigationBarLoading();
  },
  onReady:function(){
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: this.data.movieID,
    });
    
  }
  
})
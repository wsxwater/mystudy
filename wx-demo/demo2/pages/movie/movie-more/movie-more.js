// pages/movie/movie-more/movie-more.js

var movieData = require('../../data/movieData1.js');


var utils = require('../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreMovies: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //console.log(options.categoryname)
      var categoryName=options.categoryname;
      var that=this;
      switch (categoryName) {
        case "正在热映":
          wx.setNavigationBarTitle({
            title: categoryName,
          });
          that.mycallback(movieData.initData[0], 'inTheaters', categoryName);
          
        break;
        case "排行榜":
          wx.setNavigationBarTitle({
            title: categoryName,
          });
          that.mycallback(movieData.initData[1], 'Top250', categoryName);
        break;
      }
  },

  mycallback: function (n, category, categoryName) {
    //console.log(movieData.initData[0]);

    var movies = [];

    for (var i in n.subjects) {
      var subjects = n.subjects[i];
      var title = subjects.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }

      var coverUrl = subjects.images.large;
      var star = subjects.rating.stars;
      var average = subjects.rating.average;
      var movieId = subjects.id;

      var temp = {
        title: title,
        coverUrl: coverUrl,
        average: average,
        movieId: movieId,
        star: utils.starToArr(star)
      }

      movies.push(temp);
    }

    console.log(movies);

    this.setData({
      moreMovies: movies
    })

    // var readyData = {};

    // readyData[category] = {
    //   categoryName: categoryName,
    //   movies: movies
    // }

    // console.log(readyData)

    // this.setData(readyData);


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
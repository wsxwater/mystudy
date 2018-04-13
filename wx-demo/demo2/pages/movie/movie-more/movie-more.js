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
      var movieDataArr;
      switch (categoryName) {
        case "正在热映":
          wx.setNavigationBarTitle({
            title: categoryName,
          });
          movieDataArr = movieData.initData[0];
          
        break;
        case "排行榜":
          wx.setNavigationBarTitle({
            title: categoryName,
          });
          movieDataArr = movieData.initData[1];
        break;
      }
      
      this.mycallback(movieDataArr, 'Top250', categoryName);
      
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

    //wx.hideNavigationBarLoading();

  },
  goMovieDetail: function (event) {
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid=' + event.currentTarget.dataset.movieid
    })
  },
  onReachBottom: function () {
    console.log(2222222222)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //wx.showNavigationBarLoading();
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
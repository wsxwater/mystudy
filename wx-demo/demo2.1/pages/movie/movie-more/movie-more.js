// pages/movie/movie-more/movie-more.js

var app=getApp();

var utils = require('../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreMovies: [],
    nextStart:0,
    totalMovies:[],
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //console.log(options.categoryname)
      var categoryName=options.categoryname;
      //var movieDataArr;
      var allUrls='';
      var that=this;
      switch (categoryName) {
        case "正在热映":
          wx.setNavigationBarTitle({
            title: categoryName,
          });
          allUrls = app.globalUrlData.movieUrl + '/v2/movie/in_theaters';
        break;
        case "排行榜":
          wx.setNavigationBarTitle({
            title: categoryName,
          });
          allUrls = app.globalUrlData.movieUrl + '/v2/movie/top250';
        break;
      }
      
      utils.http(allUrls,this.callback);

      this.setData({
        allUrls:allUrls
      });

      wx.showNavigationBarLoading();
      
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var nextUrls = this.data.allUrls + '?start=' + this.data.nextStart + '&count=20';
    utils.http(nextUrls, this.callback);
    wx.showNavigationBarLoading();
  },

  callback: function (res) {

    var movies = [];

    for (var i in res.subjects) {
      var subjects = res.subjects[i];

      var temp = {
        title: utils.subStrings(subjects.title,0,6),
        coverUrl: subjects.images.large,
        average: subjects.rating.average,
        movieId: subjects.id,
        star: utils.starToArr(subjects.rating.stars)
      }

      movies.push(temp);
    }

    //console.log(movies);
    var totalMovies;

    if(!this.data.isEmpty){
      totalMovies=this.data.moreMovies.concat(movies);
    }else{
      totalMovies =movies;
      this.data.isEmpty=false;
    }

    this.setData({
      moreMovies: totalMovies //movies
    })
    this.data.nextStart += 20;
    wx.hideNavigationBarLoading();

  },
  goMovieDetail: function (event) {
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid=' + event.currentTarget.dataset.movieid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }

 
})
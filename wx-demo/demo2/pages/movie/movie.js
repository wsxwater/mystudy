// pages/movie/movie.js
var movieData=require('../data/movieData1.js');

var app=getApp();

var utils=require('../../pages/utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
     inTheaters:[],
     Top250:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    /**
     * movieHttp这个函数会报403，暂时无法解决
     * 
        var inTheaters = app.globalUrlData.movieUrl + '/v2/movie/in_theaters?start=0&count=3';
        var top250 = app.globalUrlData.movieUrl + '/v2/movie/top250?start=0&count=2';

        this.movieHttp(inTheaters, this.callback,'inTheaters');
        this.movieHttp(Top250, this.callback,'Top250');
     *  
     */

    //console.log(movieData.initData)

    this.mycallback(movieData.initData[0],'inTheaters','正在热映');
    this.mycallback(movieData.initData[1],'Top250','排行榜');
    //wx.hideNavigationBarLoading();

    // this.setData({
    //   inTheaters: movieData.initData.inTheaters
    // })

    // var movies1 = movieData.initData[0].inTheaters.movies;
    // for (var i = 0; i <= movies1.length-1;i++){
    //     if(movies1[i].title.length>=6){
    //       movies1[i].title = movies1[i].title.substring(0,6)+'...'
    //     }
    // }
    // var movies2 = movieData.initData[1].Top250.movies;
    // for (var i = 0; i <= movies2.length - 1; i++) {
    //   if (movies1[i].title.length >= 6) {
    //     movies2[i].title = movies2[i].title.substring(0, 6) + '...'
    //   }
    // }

    // this.setData({
    //   inTheaters: movieData.initData[0].inTheaters,
    //   Top250: movieData.initData[1].Top250
    // })

    
    wx.request({
      url: app.globalUrlData.movieUrl + '/v2/movie/in_theaters?start=0&count=3',
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function (res) {
        callback(res)
      }
    })    
  },
  movieHttp: function (url, callback, category){
        wx.request({
          url: url,
          header: {
            'content-type': 'application/xml' // 默认值
          },
          success: function (res) {
            callback(res.data)
          }
        })
  },
  callback:function(res){
        console.log(res);  
  },

  mycallback:function(n,category,categoryName){
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

        //console.log(movies)

        var readyData={};

        readyData[category]={
          categoryName: categoryName,
          movies:movies
        }

        //console.log(readyData)

        this.setData(readyData);

       
  },
  goMovieDetail:function(event){
       wx.navigateTo({
         url: './movie-detail/movie-detail?movieid='+event.currentTarget.dataset.movieid
       })
  },
  goMovieMore: function (event) {
    wx.navigateTo({
      url: './movie-more/movie-more?categoryname=' + event.currentTarget.dataset.categoryname
    })
  },
  onReady:function(){
    //wx.showNavigationBarLoading();
  }


})
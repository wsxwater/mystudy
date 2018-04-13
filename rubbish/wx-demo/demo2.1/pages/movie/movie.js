// pages/movie/movie.js

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

    var inTheaters = app.globalUrlData.movieUrl + '/v2/movie/in_theaters?start=0&count=3';
    var top250 = app.globalUrlData.movieUrl + '/v2/movie/top250?start=0&count=3';

    this.movieHttp(inTheaters, this.callback, 'inTheaters', '正在热映');
    this.movieHttp(top250, this.callback, 'Top250','排行榜');
        
  },
  movieHttp: function (url, callback, category, categoryName){
        wx.request({
          url: url,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            callback(res.data, category, categoryName)
          }
        })
  },
  callback: function (res, category, categoryName){
        //console.log(res); 
        var movies=[];
        for (var i in res.subjects) {
          var subjects = res.subjects[i];
          var title = subjects.title;
          

          var coverUrl = subjects.images.large;
          var star = subjects.rating.stars;
          var average = subjects.rating.average;
          var movieId = subjects.id;

          var temp = {
            title: utils.subStrings(title, 0, 6),
            coverUrl: coverUrl,
            average: average,
            movieId: movieId,
            star: utils.starToArr(star)
          }

          movies.push(temp);
        }

        //console.log(movies)

        var readyData = {};

        readyData[category] = {
          categoryName: categoryName,
          movies: movies
        }

        console.log(readyData)

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
  cancelSearch:function(){
    console.log('cancelSearch')
  }


})
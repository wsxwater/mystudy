var movieData = require('../../data/movieData1.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    movieID:''
=======
    
>>>>>>> ddc4ed0645783b77bb6c050ae019b20a64231d67
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.movieid)
<<<<<<< HEAD

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
  
=======
    //console.log(movieData.initData[0])
  }
>>>>>>> ddc4ed0645783b77bb6c050ae019b20a64231d67
})
// pages/news/news-detail/news-detail.js


var newsData = require('../../data/newsData.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
     isPlayer:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     /**
      * option：页面跳转时所带来的参数
      */
      //console.log(options.newsid)
      //console.log(newsData.initData[options.newsid])
      this.setData(newsData.initData[options.newsid]);

      this.setData({
        newsId: options.newsid
      });

      //console.log(this.data.newsid)

      var newsCollect = wx.getStorageSync('newsCollect');
      
      if (newsCollect){
        var newCollect = newsCollect[options.newsid];
        this.setData({
          collected: newCollect || false
        });
      }else{
        var newsCollect = {};
        newsCollect[options.newsid]=false;
        wx.setStorageSync('newsCollect', newsCollect);
      }
      

      var that = this;
      wx.onBackgroundAudioStop(function () {
        that.setData({
          isPlayer: false
        });
      });

      wx.onBackgroundAudioPlay(function () {
        that.setData({
          isPlayer: true
        });
      });

      wx.onBackgroundAudioPause(function () {
        that.setData({
          isPlayer: false
        });
      });

  },

  newsCollection:function(event){
    var newsCollect = wx.getStorageSync('newsCollect');
    var newCollect = newsCollect[this.data.newsId];
    
    newCollect = ! newCollect;

    newsCollect[this.data.newsId] = newCollect;

    wx.setStorageSync('newsCollect', newsCollect);
    
    this.setData({
      collected: newCollect
    });
    
    wx.showToast({
      title: newsCollect[this.data.newsId]?'收藏成功':'取消收藏',
      icon:'success',
      duration:800,
      mask:true
    })

  },
  musicPlayerTap:function(event){
    var that=this;
    
    // wx.getBackgroundAudioPlayerState({
    //   success:function(res){
    //     var status = res.status;


    //     if(status!=1 || status==''){
          
    //       wx.playBackgroundAudio({
    //         dataUrl: newsData.initData[that.data.newsId].newsDetailMusic.url,
    //         title: newsData.initData[that.data.newsId].newsDetailMusic.title,
    //         coverImgUrl: newsData.initData[that.data.newsId].newsDetailMusic.coverImg
    //       });
    //       that.setData({
    //         isPlayer: true
    //       });
    //     }else{
    //       wx.pauseBackgroundAudio();

    //       that.setData({
    //         isPlayer: false
    //       });
    //     }

    //   }
    // })
   
    if (!that.data.isPlayer){

      wx.playBackgroundAudio({
        dataUrl: newsData.initData[that.data.newsId].newsDetailMusic.url,
        title: newsData.initData[that.data.newsId].newsDetailMusic.title,
        coverImgUrl: newsData.initData[that.data.newsId].newsDetailMusic.coverImg
      });
      that.setData({
        isPlayer:true
      });
      
    }else{
      
      wx.pauseBackgroundAudio();
      that.setData({
        isPlayer: false
      });
    }

  },

  onUnload:function(){
    wx.stopBackgroundAudio();
    this.setData({
      isPlayer: false
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }

  
})
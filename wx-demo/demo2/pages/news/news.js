// pages/news/news.js
var newsData=require('../data/newsData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:true,
    indicatorColor:'#f5d5aa',
    indicatorActiveColor:'#915b13',
    autoplay:true,
    interval:'3000',
    circular:true,
    unewsData:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(newsData);
    this.setData({
      swiperItem: [
        { src: '../images/banner/b1.jpg' },
        { src: '../images/banner/b2.jpg' },
        { src: '../images/banner/b3.jpg' },
        { src: '../images/banner/b4.jpg' },
        { src: '../images/banner/b5.jpg' }
      ],
      unewsData: newsData.initData
    })
    
  },

  goNewsDetail:function(event){
    var newsID = event.currentTarget.dataset.newsid;
    //console.log(newsID);

    wx.navigateTo({
      url: 'news-detail/news-detail?newsid='+newsID,
    })
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
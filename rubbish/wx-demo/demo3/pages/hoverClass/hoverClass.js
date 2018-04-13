// pages/hoverClass/hoverClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:0,
    y:0,
    list:[
      { id: 0, title: '头条' },
      { id: 1, title: '新闻' },
      { id: 2, title: '娱乐' },
      { id: 3, title: '科技' }
    ],
    _num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  menuClick: function (e) {
    console.log(e.currentTarget.dataset.num)
    this.setData({
      _num: e.currentTarget.dataset.num
    })
  },
  tap: function (e) {
    this.setData({
      x: 30,
      y: 30
    });
  },
  onChange: function (e) {
    console.log(e.detail)
  },
  onScale: function (e) {
    console.log(e.detail)
  }
})
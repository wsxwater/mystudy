// pages/cart/cart.js
var newsData = require('../data/data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],
     nodes: [{
       name: 'div',
       attrs: {
         class: 'div_class',
         style: 'line-height: 60px; color: red;'
       },
       children: [{
         type: 'text',
         text: 'Hello&nbsp;World!'
       }]
     }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    

    wx.getStorage({
      key: 'list',
      success: function(res) {
        
        that.setData({
          list:res.data
        })

        
      },
    })

  }
})
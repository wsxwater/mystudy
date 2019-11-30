// pages/cart/cart.js
var newsData = require('../data/data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
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
=======
  
>>>>>>> ddc4ed0645783b77bb6c050ae019b20a64231d67
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD
    var that=this;

    

    wx.getStorage({
      key: 'list',
      success: function(res) {
        
        that.setData({
          list:res.data
        })

        
      },
    })
=======
    //console.log(options.idx)

    //this.setData(newsData.initData[options.idx])

    
    // var newsIDF = wx.getStorageSync('newsIDF');

    // wx.getStorageInfo({
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })

    

    // wx.getStorage({
    //   key: 'newsIDF',
    //   success: function (res) {
    //     console.log(res.data[0])
    //   }
    // })
    
    //if (newsIDF) {
      //console.log(newsIDF)

      


      //console.log(newsData.initData[newsIDF])
    //} 

>>>>>>> ddc4ed0645783b77bb6c050ae019b20a64231d67

  }
})
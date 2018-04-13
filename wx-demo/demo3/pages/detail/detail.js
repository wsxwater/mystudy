// pages/detail/detail.js
var newsData = require('../data/data.js');
var li=[];

Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],
     mli:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //console.log(options.newsid);

      this.setData(newsData.initData[options.newsid]);

      this.setData({
        newsId: options.newsid
      });
      
 
  },
  goCart: function (event) {
    
    wx.navigateTo({
      url: '../cart/cart?newsid=' + event.currentTarget.dataset.newsid + '&authorname=' + event.currentTarget.dataset.authorname,
    });

    // wx.switchTab({
    //   url: '../cart/cart'
    // })
  },
  addCart:function (event) {
    var n = event.currentTarget.dataset.newsid;
    var num = newsData.initData[n].num | 0;
    num = num + 1;
    newsData.initData[n].num = num;
    
    
    li.push(newsData.initData[n]);
    
    this.setData({
      list: this.unique(li, 'newsId')
    })

    wx.setStorage({
      key: 'list',
      data: this.data.list
    })
    
  },
  unique:function(list,types){
    var sum=list.length;
    for (var i = 0; i < sum; ++i) {
      for (var j = 0; j < sum; ++j) {
        //要注意，不能自己跟自己比
        if (i != j) {
          if (list[i][types] == list[j][types]) {
            list.splice(j, 1);
            sum--;
          }
        }

      }
    } 

    return list;

  }
})
// pages/address/address.js

var li = [];


Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:li
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var flag = false;//判断是从哪个页面跳转过来  
    flag = options.flag;
    

    var len = this.data.list.length;
    var that=this;
    if (flag) {
      li.push({
        "index": len++,
        "username": options.username,
        "addressDetail": options.address,
        "checked": options.checked,
      });
      
      this.setData({
        list: li
      });

      
      wx.setStorage({
        key: 'listAdd',
        data: that.data.list,
      });  
      
    };  

    

    wx.getStorage({
      key: 'listAdd',
      success: function(res) {
          that.setData({
            list: res.data
          })
      }
    });

    
  },
  goAddressForm:function(){
    wx.navigateTo({
      url: 'new-address/new-address'
    });
    var that = this;
    wx.getStorage({
      key: 'listAdd',
      success: function (res) {
        that.setData({
          list: res.data
        })
      }
    });
  },
  modifyAddress:function(e){

    
    let username = e.currentTarget.dataset.username,
        address = e.currentTarget.dataset.address,
        checked = e.currentTarget.dataset.checked,
        index = e.currentTarget.dataset.index,
        sign = e.currentTarget.dataset.sign;

        
    wx.navigateTo({
      url: 'new-address/new-address?username=' + username +
                                '&address=' + address +
                                '&checked=' + checked + 
                                '&index=' + index+
                                '&sign=' + sign
    });

    // wx.navigateTo({
    //   url: `new-address/new-address
    //         ?username=${username}
    //         &address=${address}
    //         &checked=${checked}
    //         &index=${index}`
    // })

    
    
  }
})
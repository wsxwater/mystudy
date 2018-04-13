// pages/address/new-address/new-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       console.log(options);

       if(options.sign=='modify'){
         wx.setNavigationBarTitle({
           title: '修改收货地址'
         });

         this.setData({
           sign: options.sign,
           mindex:options.index,
           maddress: options.address,
           mchecked:options.checked
         });

       }else{
         wx.setNavigationBarTitle({
           title: '新增收货地址'
         })
       }
       
      //  wx.setNavigationBarTitle({
      //    title: '新增收货地址'
      //  })
       
       this.setData(options)
       

       
  },

  formSubmit: function (e) {
    var warn = "";
    var that = this;
    var flag = false;
    if (e.detail.value.username == "") {
      warn = "请填写您的姓名！";
    }  else if (e.detail.value.address == '') {
      warn = "请输入地址";
    } else {
      flag = true;
      //console.log('form发生了submit事件，携带数据为：', e.detail.value);

      wx.redirectTo({
        url: '../address?username=' + e.detail.value.username + '&address=' + e.detail.value.address + "&checked=" + e.detail.value.switch + "&flag=" + flag,
      });

      if (that.data.sign=='modify'){
        wx.redirectTo({
          url: '../address?username=' + e.detail.value.username + '&address=' + e.detail.value.address + "&checked=" + e.detail.value.switch + "&flag=" + flag+'&index='+that.data.mindex,
        });
      }

      


    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }  

    

  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
  
})
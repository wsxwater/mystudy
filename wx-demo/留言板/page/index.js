// page/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputVal:'',
      msgData:[],
      showError:false
  },
  changeInputVal(ev){
      //console.log(ev);
      //console.log(ev.detail.value);
      this.setData({
        inputVal: ev.detail.value
      });
  },
  addMsg(){
      //console.log(this.data.inputVal);
      var list=this.data.msgData;

      if(this.data.inputVal.length>0){
        list.push({
          msg: this.data.inputVal
        });

        //更新
        this.setData({
          msgData: list,
          inputVal: '',
          showError: false
        });
        
        wx.setStorage({
          key: 'inputVal',
          data: list,
        });


      }else{
        this.setData({
          showError: true
        });
      }
      
  },
  cancelMsg(ev){
      //console.log(ev);
      //console.log(ev.target.dataset.index);
      var n = ev.target.dataset.index;
      var list=this.data.msgData;
      list.splice(n,1);
      
      this.setData({
        msgData: list
      });
      
      wx.setStorage({
        key: 'inputVal',
        data: list,
      });
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    wx.getStorage({
      key: 'inputVal', success(res) {
        that.setData({
          msgData: res.data,
        });
      }
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
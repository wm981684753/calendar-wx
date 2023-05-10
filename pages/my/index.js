// pages/my/index.js
import { refreshToken } from '../../public/public.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarList:{}
  },
  show(){
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      //接口获取我的日程列表
      wx.request({
        url: getApp().globalData.host+"/myCalendar",
        method:"get",
        header:{
          "Content-Type": "application/x-www-form-urlencoded",
          "token": wx.getStorageSync('token')
        },
        success(response){
            var response = response.data
            console.log(response)
            if(response.code==200){
                //页面渲染
                that.setData({
                  calendarList:response.data
                })
            }
            if(response.code==401){
              refreshToken("/pages/my/index")
            }
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
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 1]
    perpage.onLoad()
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
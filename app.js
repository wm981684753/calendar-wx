// app.js
App({
  globalData: {
    userInfo: null,
    appName:"盼兮在兮",
    isHide:false,
    host:"http://localhost"
  },
  
  onLaunch() {
    var that = this
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   // 查看是否授权
   wx.getSetting({
    success: function(res) {
     if (res.authSetting['scope.userInfo']) {
      // wx.setStorage({ key:"isHide",data:false})
      // wx.navigateTo({
      //   url: '/pages/login/index',
      // })
     } else {
      // 用户没有授权
      // 改变 isHide 的值，显示授权页面
      wx.redirectTo({
          url: '/pages/login/index',
        })
     }
    }
   });
  },
})

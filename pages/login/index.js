
Page({
  data: {
   //判断小程序的API，回调，参数，组件等是否在当前版本可用。
  //  canIUse: wx.canIUse('button.open-type.getUserInfo'),
   canIUse: true,
   isHide: false,
   app:getApp(),
  },
  
  onLoad: function() {
    var that = this
    if(wx.getStorageSync('isHide')){
      wx.redirectTo({
        url: '/pages/cal/index',
      })
    }
  },
  
  bindGetUserInfo: function(e) {
   if (e.detail.userInfo) {
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      var userInfo = e.detail.userInfo
      console.log(userInfo);
      wx.setStorage({ key:"userInfo",data:userInfo})

    //用户按了允许授权按钮
    var that = this;

    wx.getUserInfo({
      success: function(res) {
       // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
       // 根据自己的需求有其他操作再补充
       // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
       wx.login({
        success: res => {
         // 获取到用户的 code 之后：res.code
         console.log("用户的code:" + res.code);
         // 可以传给后台，再经过解析获取用户的 openid
         // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
         wx.request({
          // 自行补上自己的 APPID 和 SECRET
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2edd3050e5587cd6&secret=22be3c8649db53eaeec50c28ecf4abcb&js_code=' + res.code + '&grant_type=authorization_code',
          success: res => {
           // 获取到用户的 openid
           console.log(res.data);
           //获取到用户信息之后，请求接口获取token
           wx.request({
           // 自行补上自己的 APPID 和 SECRET
           url: that.data.app.globalData.host+"/loginOrRegister",
           method:'post',
           header:{
             "Content-Type": "application/x-www-form-urlencoded"
           },
           data:{
            openId:res.data.openid,
            nickName:e.detail.userInfo.nickName,
            sessionKey:res.data.session_key,
            photo:e.detail.userInfo.avatarUrl
          },
          success(response){
            console.log("返回的token："+response.data.data)
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
           that.setData({isHide: true});
           wx.setStorage({ key:"isHide",data:true})
           wx.setStorage({ key:"openid",data:res.data.openid})
           wx.setStorage({ key:"token",data:response.data.data.token})
           wx.setStorage({ key:"refreshToken",data:response.data.data.refreshToken})
           wx.redirectTo({
            url: '/pages/cal/index',
          })
           }})
          }
         });
        }
       });
      }
     });
   } else {
    //用户按了拒绝按钮
    wx.showModal({
     title: '警告',
     content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
     showCancel: false,
     confirmText: '返回授权',
     success: function(res) {
      // 用户没有授权成功，不需要改变 isHide 的值
      if (res.confirm) {
       console.log('用户点击了“返回授权”');
      }
     }
    });
   }
  }
 })
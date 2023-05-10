module.exports.refreshToken = refreshToken
function refreshToken(url){
  //判断是否有用户refreshToken
  var refreshToken = wx.getStorageSync('refreshToken')
  console.log("public-refreshToken:"+refreshToken)
  if(refreshToken){
    console.log("token:"+wx.getStorageSync('token'))
    console.log("refreshToken:"+wx.getStorageSync('refreshToken'))
    //再次请求 换取新的token
    wx.request({
      url: getApp().globalData.host+"/refreshToken",
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data:{
        "token": wx.getStorageSync('token'),
        "refreshToken": wx.getStorageSync('refreshToken')
      },
      success(response){
        console.log("public-换取新的成功")
        console.log(response.data)
        if(response.data.data.token){
          wx.setStorage({ key:"isHide",data:true})
          wx.setStorage({ key:"token",data:response.data.data.token})
          wx.setStorage({ key:"refreshToken",data:response.data.data.refreshToken})
        }
        wx.redirectTo({
          url: url,
        })
      },
      fail(fail){
        //查看是否有openid
        var openId = wx.getStorageSync('openid')
        console.log("public-openId:"+openId)
        if(openId){

        }else{
          console.log("public-重新授权:")
        //重新授权
          wx.setStorage({ key:"isHide",data:false})
          wx.redirectTo({
            url: url,
          })
        }
      }
    })
}else{
  //查看是否有openid
  console.log("public-未找到refreshtoken")
  var openId = wx.getStorageSync('openid')
  if(openId){

  }else{
  //重新授权
    wx.setStorage({ key:"isHide",data:false})
    wx.redirectTo({
      url: '/pages/login/index',
    })
  }
}
}
// pages/dateSel/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    start_time: "",
    end_time: "",
    comment:"",
    select_time:"",
    isShow:false,
    userId:0,
    isPublic:1
  },
  // 提交
  dateSubmit(e) {
    let {
      end,
      start
    } = e.detail;
    this.setData({
      start_time:start.year + "-" + start.month + "-" + start.date,
      end_time:end.year + "-" + end.month + "-" + end.date
    })
  },
  
  selectTime() {
    this.setData({
      isShow: true
    })
  },

  onLoad:function(options) {
    var data = wx.getStorageSync('updateItem')
    console.log(data)
    var that = this
    that.setData({
      start_time:data.startTime,
      end_time:data.end_time,
      comment:data.comments,
      id:data.id,
      userId:data.userId,
      isPublic:data.isPublic
    })
  },

  onDelete:function(params) {
    var that=this
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.host+"/deleteCalendar",
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        "token":token
      },
      data:{
        id:that.data.id
      },
      success(response){
          if(response.data.data){
            wx.showToast({
              title: '日程已移除',//提示文字
              duration:1200,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false 
              icon:'success', //图标，支持"success"、"loading" 
              success:function(){
                //清空输入框
                that.setData({
                  start_time:"",
                  end_time:"",
                  comment:""
                })
                //清空缓存
                wx.setStorageSync('updateItem', null)
                //跳转回去
                setTimeout(function () { 
                  wx.redirectTo({
                    url: '/pages/my/index',
                  })
               }, 1200)
              },//接口调用成功
              fail: function () { },  //接口调用失败的回调函数 
              complete: function () { } //接口调用结束的回调函数 
          })  
          }
      }
    })
  },

  formSubmit: function (e) {
    var that=this
    var token = wx.getStorageSync('token')
    var formData = e.detail.value;
    var startTime = parseInt(Date.parse(new Date(formData.start_time)))/1000;
    var endTime = parseInt(Date.parse(new Date(formData.end_time)))/1000;
    wx.request({
      url: getApp().globalData.host+"/updateCalendar",
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        "token":token
      },
      data:{
        startTime:startTime,
        endTime:endTime,
        comments:formData.comment,
        id:that.data.id,
        userId:that.data.userId,
        isPublic:that.data.isPublic
      },
      success(response){
          if(response.data.data){
            wx.showToast({
              title: '日程修改成功',//提示文字
              duration:1200,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false 
              icon:'success', //图标，支持"success"、"loading" 
              success:function(){
                //清空输入框
                that.setData({
                  start_time:"",
                  end_time:"",
                  comment:""
                })
                //清空缓存
                wx.setStorageSync('updateItem', null)
                //跳转回去
                setTimeout(function () { 
                  wx.redirectTo({
                    url: '/pages/my/index',
                  })
               }, 1200)
              },//接口调用成功
              fail: function () { },  //接口调用失败的回调函数 
              complete: function () { } //接口调用结束的回调函数 
          })  
          }
      }
    })
}
})
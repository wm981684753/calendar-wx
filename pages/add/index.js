// pages/dateSel/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start_time: "",
    end_time: "",
    comment:"",
    select_time:"",
    isShow:false
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

  formSubmit: function (e) {
    var that=this
    var token = wx.getStorageSync('token')
    var formData = e.detail.value;
    var startTime = parseInt(Date.parse(new Date(formData.start_time)))/1000;
    var endTime = parseInt(Date.parse(new Date(formData.end_time)))/1000;
    wx.request({
      url: getApp().globalData.host+"/createCalendar",
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        "token":token
      },
      data:{
        startTime:startTime,
        endTime:endTime,
        comments:formData.comment
      },
      success(response){
          if(response.data.data){
            wx.showToast({
              title: '日程创建成功',//提示文字
              duration:2000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false 
              icon:'success', //图标，支持"success"、"loading" 
              success:function(){
                //清空输入框
                that.setData({
                  start_time:"",
                  end_time:"",
                  comment:""
                })
              },//接口调用成功
              fail: function () { },  //接口调用失败的回调函数 
              complete: function () { } //接口调用结束的回调函数 
          })  
          }
      }
    })
}
})
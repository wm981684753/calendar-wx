import { refreshToken } from '../../public/public.js';
Page({
  data: {
    hasData: true,
    spot: ['2021-11-18', '2021-11-16', '2021-11-5']
  },
  dateChange(e) {
    this.setData({
      dateString: e.detail.dateString
    })
    var that = this
    getNowDateCalendar(that,e.detail.dateString)
  },

  onLoad: function () {
    var that = this
    let now = new Date()
    var year = now.getFullYear()
    var month = (now.getMonth() + 1)<10?("0"+(now.getMonth() + 1).toString()):(now.getMonth() + 1)
    var day = now.getDate()<10?("0"+now.getDate().toString()):now.getDate().toString()
    var nowDate = (year.toString())+"-"+(month.toString())+"-"+(day.toString())
    //获取当日日程
    getNowDateCalendar(that,nowDate)
  },

  onShow: function () {
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 1]
    perpage.onLoad()
  },
})

function getNowDateCalendar(that,nowDate) {
  //接口获取我的日程列表
  wx.request({
    url: getApp().globalData.host+"/allCalendar/"+nowDate,
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
          refreshToken("/pages/cal/index")
        }
    }})
}
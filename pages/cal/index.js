Page({
  data: {
    hasData: true,
    spot: ['2021-11-18', '2021-11-16', '2021-11-5']
  },
  dateChange(e) {
    this.setData({
      dateString: e.detail.dateString
    })
  },

  onLoad: function () {
    var that=this
    // wx.request({
    //   url: getApp()..globalData.host+"/",
    // })
  },

  onShow: function () {
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 1]
    perpage.onLoad()
  },

})
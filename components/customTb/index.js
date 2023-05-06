// components/customTb/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    idx: {
      type: Number,
      value: 0
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    tabBar: [{
      "pagePath": "/pages/add/index",
      "text": "添加",
      "switchQr": false,
      "iconPath": "../../img/mld-s.png",
      "selectedIconPath": "../../img/mld.png",
    },
    {
      "pagePath": "/pages/cal/index",
      "text": "看看",
      "switchQr": true,
      "iconPath": "../../img/klmkk.jpeg",
      "selectedIconPath": "../../img/klmkk.jpeg",
    },
    {
      "pagePath": "/pages/my/index",
      "text": "我的",
      "switchQr": false,
      "iconPath": "../../img/ygg-s.png",
      "selectedIconPath": "../../img/ygg.png",
    },
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goToTab: function (e) {
      //如果点击当前页面则不进行跳转
      if (this.data.idx == e.currentTarget.dataset.index) {
        return false
      }
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    },
    // 扫码
    switchQr() {
      this.triggerEvent('look',)
    },

  }
})
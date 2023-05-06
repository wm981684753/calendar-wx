// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_list: [
      {
        title: '自定义swiper组件',
        showmore: false,
        list: [
          {
            name: '自定义swiper组件',
            url: '/pages/swiper/index'
          },
          {
            name: '组件详情',
            url: '/pages/swiper/detail'
          },
        ]
      },
      {
        title: '自定义头部导航栏',
        showmore: false,
        list: [
          {
            name: '自定义头部导航栏',
            url: '/pages/customNav/index'
          },
          {
            name: '组件详情',
            url: '/pages/customNav/detail'
          },
        ]
      },
      {
        title: '自定义loading加载动画组件',
        showmore: false,
        list: [
          {
            name: '自定义loading加载动画组件',
            url: '/pages/loading/index'
          },
          {
            name: '组件详情',
            url: '/pages/loading/detail'
          },
        ]
      },
      {
        showmore: false,
        title: '自定义scroll Tab',
        list: [
          {
            name: '自定义scroll Tab',
            url: '/pages/tab/index'
          }
        ]
      },
      {
        title: '自定义tabbar',
        showmore: false,
        list: [
          {
            name: '自定义tabbar',
            url: '/pages/tabBar/index'
          },
        ]
      },
      {
        title: '自定义日历组件',
        showmore: true,
        list: [
          {
            name: '日历组件，可设置主题色',
            url: '/pages/cal/index'
          },
        ]
      },
      {
        title: '自定义日期区间选组件',
        showmore: true,
        list: [
          {
            name: '日历选择组件，可设置主题色',
            url: '/pages/dateSel/index'
          },
        ]
      },

    ]

  },

  toDetail(e) {
    let { url } = e.currentTarget.dataset;
    wx.navigateTo({
      url: url,
    })
  },
  show() {
    wx.showToast({
      title: '创作不易1，star+关注一下',
      icon: 'none'
    })
  },

  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },

  onReady: function () {

  },


  onShow: function () {


  },
  showMore(e) {
    let { index } = e.currentTarget.dataset, { page_list } = this.data;
    page_list[index].showmore = !page_list[index].showmore
    this.setData({
      page_list: page_list
    })
  }





})
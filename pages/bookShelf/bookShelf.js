// pages/bookShelf/bookShelf.js
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    shelfList: []
  },
  onShow: function (options) {
    this.getShelfList()
  },
  getShelfList: function () {
    app.doFetch({
      url: '/api/bookshelf-list',
      success: (res) => {
        this.setData({
          shelfList: res.data
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '获取书架列表失败',
          icon: 'none'
        })
      }
    })
  },
  jumpToDetails: function (e) {
    wx.navigateTo({
      url: `../bookDetails/bookDetails?id=${e.currentTarget.dataset.id}`
    })
  },
  jumpToBookCity: function () {
    wx.switchTab({
      url: '../bookCity/bookCity'
    })
  }
})
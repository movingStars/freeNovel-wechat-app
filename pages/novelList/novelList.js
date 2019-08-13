// pages/novelList/novelList.js
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    novelList: []
  },
  onLoad: function (options) {
    this.getNovelList(options.id)
  },
  getNovelList: function (categoryId) {
    app.doFetch({
      url: '/api/novel-list',
      params: {
        id: categoryId
      },
      success: (res) => {
        this.setData({
          novelList: res.data
        })
      },
      fail: (res) => {
        console.log(res)
      }
    })
  }
})
// pages/category/category.js
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    categoryList: []
  },
  onLoad: function (options) {
    this.getCategoryList()
  },
  getCategoryList: function () {
    app.doFetch({
      url: '/api/category-list',
      success: (res) => {
        this.setData({
          categoryList: res.data
        })
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  jumpToNovelList: function (e) {
    const categoryId = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `../novelList/novelList?id=${categoryId}`,
    })
  }
})
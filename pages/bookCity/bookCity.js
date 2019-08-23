// pages/bookCity/bookCity.js
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    bestList: [],
    goodList: [],
    suggestList: [],
    searchList: []
  },
  onLoad: function () {
    this.getBestList()
    this.getGoodList()
    this.getSuggestList()
    this.getSearchList()
  },
  onShow: function () {
    this.setData({
      skin: app.globalData.skin
    })
  },
  getBestList: function () {
    app.doFetch({
      url: '/api/best-list',
      success: (res) => {
        this.setData({
          bestList: res.data
        })
      }
    })
  },
  getGoodList: function () {
    app.doFetch({
      url: '/api/best-list',
      success: (res) => {
        this.setData({
          goodList: res.data
        })
      }
    })
  },
  getSuggestList: function () {
    app.doFetch({
      url: '/api/best-list',
      success: (res) => {
        this.setData({
          suggestList: res.data
        })
      }
    })
  },
  getSearchList: function () {
    app.doFetch({
      url: '/api/best-list',
      success: (res) => {
        this.setData({
          searchList: res.data
        })
      }
    })
  },
  jumpToSearchPage: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  jumpToDetails: function (e) {
    wx.navigateTo({
      url: `../bookDetails/bookDetails?id=${e.currentTarget.dataset.id}`
    })
  }
})

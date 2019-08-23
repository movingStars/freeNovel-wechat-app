// pages/search/search.js
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    novelList: [],
    showReaultList: false,
    inputValue: '',
    historyArr: wx.getStorageSync('searchHistoryArr') || [],
    publicSearchArr: []
  },
  onLoad: function (options) {
    this.searchPublicHistory()
  },
  bindInputValue: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    if (e.detail.value === '') {
      this.setData({
        showReaultList: false
      })
    }
  },
  clearInput: function () {
    this.setData({
      inputValue: '',
      showReaultList: false
    })
  },
  doSubmit: function () {
    this.searchNovels(this.data.inputValue)
  },
  searchHistory: function (e) {
    const value = e.currentTarget.dataset.value

    this.setData({
      inputValue: value
    })
    this.searchNovels(value)
  },
  clearSearchHistory: function () {
    this.setData({
      historyArr: []
    })
    wx.removeStorage({
      key: 'searchHistoryArr'
    })
  },
  searchNovels: function (searchValue) {
    const historyArr = wx.getStorageSync('searchHistoryArr') || []

    if (!historyArr.includes(searchValue)) {
      historyArr.push(searchValue)
      wx.setStorage({
        key: 'searchHistoryArr',
        data: historyArr
      })
    }
    this.setData({
      novelList: [],
      showReaultList: true,
      historyArr
    })
    app.doFetch({
      url: '/api/search-novels',
      params: {
        name: searchValue
      },
      success: (res) => {
        this.setData({
          novelList: res.data
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '搜索失败，请稍后重试',
          icon: 'none'
        })
      }
    })
  },
  searchPublicHistory: function () {
    app.doFetch({
      url: '/api/public-history',
      success: (res) => {
        this.setData({
          publicSearchArr: res.data
        })
      }
    })
  },
  jumpToNovelDetails: function (e) {
    const { id, name } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../bookDetails/bookDetails?id=${id}`
    })
    this.addPublicSearch(id, name)
  },
  addPublicSearch: function (id, name) {
    app.doFetch({
      url: '/api/public-search',
      method: 'post',
      params: {
        id,
        name
      },
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  }
})
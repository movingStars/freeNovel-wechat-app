// pages/bookDetails/bookDetails.js
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    novelId: '',
    novelInfo: {},
    readingHistory: wx.getStorageSync('readingHistory') || '12312'
  },
  onLoad: function (options) {
    this.getNovelInfo(options.id)
  },
  getNovelInfo: function (novelId) {
    app.doFetch({
      url: '/api/novel-info',
      params: {
        id: novelId
      },
      success: (res) => {
        this.setData({
          novelId,
          novelInfo: res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.name
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '获取小说信息失败',
          icon: 'none'
        })
      }
    })
  },
  jumpToStartReading: function () {
    const readingHistory = wx.getStorageSync('readingHistory')
    const { novelInfo } = this.data
    let chapterId = 1

    if (readingHistory[novelInfo.name]) {
      chapterId = readingHistory[novelInfo.name]
    }
    wx.navigateTo({
      url: `../readingPage/readingPage?chapterId=${chapterId}&novelName=${novelInfo.name}&updateType=${novelInfo.update_type}&imageUrl=${novelInfo.logo_url}`,
    })
  },
  addBook: function () {
    if (this.data.novelInfo.isAdded) return
    app.doFetch({
      url: '/api/add-book',
      method: 'post',
      params: {
        novelId: this.data.novelId
      },
      success: (res) => {
        wx.showToast({
          title: '已加入书架',
          icon: 'none'
        })
        this.setData({
          novelInfo: {...this.data.novelInfo, isAdded: 1}
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '加入书架失败，请稍后重试',
          icon: 'none'
        })
      }
    })
  },
  onShareAppMessage: function () {
    const { id, name, logo_url } = this.data.novelInfo
    return {
      title: `《${name}》真的超级精彩，推荐给你，快来看看吧！`,
      path: `../bookDetails/bookDetails?id=${id}`,
      imageUrl: logo_url
    }
  }
})
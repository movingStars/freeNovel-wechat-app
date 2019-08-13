// pages/bookDetails/bookDetails.js
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    novelId: '',
    novelInfo: {}
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
        console.log(res)
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
      url: `../readingPage/readingPage?chapterId=${chapterId}&novelName=${novelInfo.name}&updateType=${novelInfo.update_type}`,
    })
  }
})
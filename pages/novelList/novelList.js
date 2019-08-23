// pages/novelList/novelList.js
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    novelList: null,
    pageSize: 15,
    pageIndex: 1,
    hasMore: true,
    isLoading: false,
    categoryId: null
  },
  onLoad: function (options) {
    this.setData({
      categoryId: options.id
    })
    this.getNovelList(options.id)
  },
  getNovelList: function (categoryId) {
    const { novelList, pageSize, pageIndex, hasMore, isLoading } = this.data
    if (!hasMore || isLoading) {
      return false
    }
    this.setData({
      isLoading: true
    })
    app.doFetch({
      url: '/api/novel-list',
      params: {
        id: categoryId,
        pageSize: pageSize,
        pageIndex: pageIndex
      },
      success: (res) => {
        this.setData({
          novelList: novelList ? novelList.concat(res.data || []) : res.data || [],
          pageIndex: pageIndex + 1,
          hasMore: res.data.length === pageSize,
          isLoading: false
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '加载失败，请稍后重试',
          icon: 'none'
        })
        this.setData({
          isLoading: false
        })
      }
    })
  },
  jumpToNovelDetails: function (e) {
    wx.navigateTo({
      url: `../bookDetails/bookDetails?id=${e.currentTarget.dataset.id}`
    })
  },
  onReachBottom: function () {
    this.getNovelList(this.data.categoryId)
  }
})
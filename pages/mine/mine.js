// pages/mine/mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    novelList: []
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo || {}
    })
    this.getPublicSearch()
  },
  getPublicSearch: function () {
    app.doFetch({
      url: '/api/public-search-novels',
      success: (res) => {
        this.setData({
          novelList: res.data
        })
      }
    })
  },
  getWXUserInfo: function (e) {
    const info = e.detail.userInfo || null

    if (info) {
      app.doFetch({
        url: '/api/update-userinfo',
        method: 'post',
        params: info,
        success: (res) => {
          this.setData({
            userInfo: res.data || {}
          })
          app.setUserInfo(res.data || null)
          if (this.data.userInfo.authorized) {
            wx.showToast({
              title: '更新成功',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '授权成功',
              icon: 'none'
            })
          }
        },
        fail: (res) => {
          wx.showToast({
            title: '更新失败，请稍后重试',
            icon: 'none'
          })
        }
      })
    }
  },
  jumpToDetails: function (e) {
    wx.navigateTo({
      url: `../bookDetails/bookDetails?id=${e.currentTarget.dataset.id}`
    })
  },
  jumpToDisclaimer: function () {
    wx.navigateTo({
      url: '../disclaimer/disclaimer'
    })
  }
})
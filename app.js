//app.js
App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  setSkin: function (skin) {
    this.globalData.skin = skin
    wx.setStorageSync('skin', skin)
  },
  doFetch: function ({url = '', method = 'GET', params = {}, header = {}, success = () => {}, fail = () => {}}) {
    const BASE_URL = 'http://127.0.0.1:8787'

    wx.request({
      url: BASE_URL + url,
      method,
      data: params,
      header: {
        ...header
      },
      success: (res) => {
        success(res)
      },
      fail: (res) => {
        fail(res)
      }
    })
  },
  globalData: {
    userInfo: null,
    skin: wx.getStorageSync('skin') || 'dark-skin'
  }
})
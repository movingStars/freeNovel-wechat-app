//app.js
App({
  onLaunch: function () {
    const userInfo = wx.getStorageSync('userInfo') || {}

    if (!userInfo.userToken) {
      //登录
      this.loginMini()
    } else {
      // 获取用户信息
      this.getUserInfo(userInfo.userToken)
    }
  },
  loginMini: function () {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 登录成功，用code换openid
          this.getOpenId(res.code)
        } else {
          wx.showModal({
            title: '提示',
            content: '自动登录失败，是否重新登录',
            cancelText: '否',
            confirmText: '是',
            success: () => {
              this.loginMini()
            }
          })
        }
      }
    })
  },
  getUserInfo: function (userToken) {
    this.doFetch({
      url: '/api/user-info',
      params: {
        token: userToken
      },
      success: (res) => {
        this.setUserInfo(res.data || null)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  getOpenId: function (code) {
    this.doFetch({
      url: '/api/wx-login',
      method: 'post',
      params: {
        code
      },
      success: (res) => {
        this.setUserInfo(res.data || null)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  setSkin: function (skin) {
    this.globalData.skin = skin
    wx.setStorageSync('skin', skin)
  },
  doFetch: function ({url = '', method = 'GET', params = {}, header = {}, success = () => {}, fail}) {
    const BASE_URL = 'http://127.0.0.1:8787'

    wx.request({
      url: BASE_URL + url,
      method,
      data: params,
      header: {
        ...header,
        'Authorization': 'Bearer' + (this.globalData.userInfo ? this.globalData.userInfo.userToken || '' : '')
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode === 304) {
          success(res)
        } else {
          if (fail) {
            fail(res)
          } else {
            wx.showToast({
              title: '服务器错误',
              image: '/assets/images/error.png',
              duration: 3000
            })
          }
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器异常',
          image: '/assets/images/error.png',
          duration: 3000
        })
      }
    })
  },
  setUserInfo: function (info) {
    this.globalData.userInfo = info || null
    wx.setStorageSync('userInfo', info || null)
  },
  globalData: {
    userInfo: wx.getStorageSync('userInfo') || null,
    skin: wx.getStorageSync('skin') || 'dark-skin'
  }
})
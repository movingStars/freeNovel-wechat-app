// pages/readingPage/readingPage.js
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    chapterContent: '',
    chapterList: [],
    currentChapterId: '',
    skinList: [{
      name: 'dark-skin',
      color: '#1f222c'
    }, {
      name: 'yellow-skin',
      color: '#faf9de'
    }, {
      name: 'brown-skin',
      color: '#fff2f2'
    }, {
      name: 'red-skin',
      color: '#fde6e0'
    }, {
      name: 'green-skin',
      color: '#e3edcd'
    }, {
      name: 'blue-skin',
      color: '#dce2f1'
    }, {
      name: 'purple-skin',
      color: '#e9ebfe'
    }, {
      name: 'gray-skin',
      color: '#eaeaef'
    }, {
      name: 'white-skin',
      color: '#ffffff'
    }],
    settingAnimation: {},
    isSettingBoxShown: false,
    fontSize: 36,
    fontStyle: "",
    brightness: 0,
    chapterListAnimation: {},
    isChapterListShown: false
  },
  onLoad: function (options) {
    const { chapterId, novelName, updateType } = options
    this.setData({
      novelName,
      updateType
    })
    wx.setNavigationBarTitle({
      title: novelName
    })
    this.getDefaultBrightness()
    this.getChapterContent(novelName, chapterId)
    this.getChapterList(novelName)
  },
  getChapterContent: function (novelName, chapterId) {
    app.doFetch({
      url: '/api/chapter-content',
      params: {
        novelName,
        chapterId
      },
      success: (res) => {
        this.setData({
          chapterContent: res.data,
          currentChapterId: chapterId
        })

        const readingHistory = wx.getStorageSync('readingHistory') || {}
        readingHistory[novelName] = chapterId
        wx.setStorageSync('readingHistory', readingHistory)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  getChapterList: function (novelName) {
    app.doFetch({
      url: '/api/chapter-list',
      params: {
        novelName
      },
      success: (res) => {
        this.setData({
          chapterList: res.data
        })
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  changeFontSize: function (e) {
    let fontSize = e.target.dataset.val
    
    if (fontSize > 20 && fontSize < 100) {
      this.setData({
        fontStyle: `font-size: ${fontSize}rpx; line-height: ${fontSize * 2}rpx; text-indent: ${fontSize * 2 + 4}rpx; margin-bottom: ${fontSize}rpx;`,
        fontSize: fontSize
      })
    }
  },
  settingTrigger: function () {
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })

    if (this.data.isSettingBoxShown) {
      animation.bottom(-350).step()
    } else {
      animation.bottom(0).step()
    }
    this.setData({
      settingAnimation: animation.export(),
      isSettingBoxShown: !this.data.isSettingBoxShown
    })
  },
  contentTrigger: function (e) {
    if (this.data.isChapterListShown) {
      this.chapterListTrigger()
      return
    }
    if (this.data.isSettingBoxShown) {
      this.settingTrigger()
    } else {
      const touchY = e.touches[0].clientY,
            windowHeight = wx.getSystemInfoSync().windowHeight,
            allowTop = windowHeight / 5,
            allowBottom = windowHeight / 5 * 3

      if (touchY > allowTop && touchY < allowBottom) {
        this.settingTrigger()
      }
    }
  },
  getDefaultBrightness: function () {
    wx.getScreenBrightness({
      success: (res) => {
        this.setData({
          brightness: res.value * 100
        })
      }
    })
  },
  brightnessChange: function (e) {
    wx.setScreenBrightness({
      value: e.detail.value / 100
    })
  },
  chapterListTrigger: function () {
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })

    if (this.data.isChapterListShown) {
      animation.left('-100%').step()
    } else {
      animation.left(0).step()
      if (this.data.isSettingBoxShown) {
        this.settingTrigger()
      }
    }
    this.setData({
      chapterListAnimation: animation.export(),
      isChapterListShown: !this.data.isChapterListShown
    })
  },
  jumpToPreviousChapter: function (e) {
    const id = parseInt(this.data.currentChapterId)

    if (id > 1) {
      this.getChapterContent(this.data.novelName, id - 1)
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      if (e.currentTarget.dataset.type === 'setting') {
        this.settingTrigger()
      }
    }
  },
  jumpToNextChapter: function (e) {
    const id = parseInt(this.data.currentChapterId)

    if (id < this.data.chapterList.length - 1) {
      this.getChapterContent(this.data.novelName, id + 1)
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      if (e.currentTarget.dataset.type === 'setting') {
        this.settingTrigger()
      }
    }
  },
  jumpToSelectedChapter: function (e) {
    const id = parseInt(e.currentTarget.dataset.id)

    if (id != this.data.currentChapterId) {
      this.getChapterContent(this.data.novelName, id)
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    }
    this.chapterListTrigger()
  },
  setSortOrder: function () {
    this.setData({
      chapterList: this.data.chapterList.reverse()
    })
  },
  backToDetails: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})
// pages/bookCity/bookCity.js
//获取应用实例
const app = getApp()

Page({
  data: {
    skin: app.globalData.skin,
    novelList: [
      { name: '花开半朵', url: '5.jpg', author: '史诗' },
      { name: '霸道总裁前夫爱你太难', url: '1.jpg', author: '第三方' },
      { name: '魔卡传奇', url: '6.jpg', author: '撒旦法' },
      { name: '无攻不受戮', url: '7.jpg', author: '风格化' },
      { name: '重生韩娱之墨鱼小姐请站住', url: '8.jpg', author: '东方螃蟹' },
      { name: '超极品纨绔', url: '2.jpg', author: '暗示法' },
      { name: '大主宰', url: '3.jpg', author: '拉卡拉' },
      { name: '法国大小姐', url: '4.jpg', author: '按时佛' }
    ]
  },
  onLoad: function () {
  },
  onShow: function () {
    this.setData({
      skin: app.globalData.skin
    })
  },
  jumpToSearchPage: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  jumpToDetails: function () {
    wx.navigateTo({
      url: '../bookDetails/bookDetails',
    })
  }
})

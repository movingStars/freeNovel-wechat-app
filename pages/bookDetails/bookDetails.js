// pages/bookDetails/bookDetails.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    skin: app.globalData.skin,
    novelInfo: {
      imageUrl: '../../assets/novelImages/2.jpg',
      author: '南派三叔',
      wordCount: '392K',
      commentNum: 238
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      skin: app.globalData.skin
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  jumpTostartReading: function () {
    wx.navigateTo({
      url: '/pages/readingPage/readingPage',
    })
  }
})
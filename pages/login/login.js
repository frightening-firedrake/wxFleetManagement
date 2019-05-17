// pages/logon/logon.js
import WxValidate from '../../utils/WxValidate';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e){
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    params.openid = app.globalData.openid
    console.log(params)
    this.login(params)
  },
  login(data){
    wx.showModal({
      content: "登录功能暂未开通",
      showCancel: false,
    })
    // app.post("wechat/findAllContent").then(res => {
    //   // that.setData({
    //   //   content: str,
    //   // })
    // }, err => {
    //   // console.log(err)
    // })
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  initValidate() {
    const rules = {
      user: {
          required: true,
          // rangelength: [2, 4]
      },
      pass: {
          required: true,
          // idcard: true,
      },
    }
    const messages = {
      user: {
          required: '请输入账号',
          // rangelength: '请输入2~4个汉字个汉字'
      },
      pass: {
          required: '请输入密码',
          // tel: '请输入正确的手机号码',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
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

  }
})
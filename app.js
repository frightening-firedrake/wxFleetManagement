//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success(res) {
        console.log(res)
        return//暂时不往后走了
        if (res.code) {
          // 发起网络请求获取openid 
          wx.request({
            url: 'https://test.com/onLogin',//后台地址待修改
            data: {
              code: res.code
            },
            success(openRes) {
              console.log(openRes.data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
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

  post(url, data, header = {}) {
    wx.showLoading({
      title: "加载中",
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.configUrl + url,
        data: data,
        method: "POST",
        // application/x-www-form-urlencoded
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": this.globalData.token
        },
        success: function(res) {
          wx.hideLoading()
          resolve(res)
        },
        fail: function(err) {
          wx.hideLoading()
          reject(err)
        }
      })
    })
  },
  get(url, data = "") {
    wx.showLoading({
      title: "加载中",
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.configUrl + url,
        data: data,
        method: "GET",
        header: {
          "Authorization": this.globalData.token
        },
        // application/x-www-form-urlencoded
        success: function(res) {
          wx.hideLoading()
          resolve(res)
        },
        fail: function(err) {
          wx.hideLoading()
          reject(err)
        }
      })
    })
  },
  getstorage(key) {
    let that = this
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: key,
        success(res) {
          if (res.data.openid.code == "1000000") {
            // that.login()
            that.setopenid()
          } else {
            resolve(res.data)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  setopenid: function() {
    let that = this
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          let params = {
            code: res.code,
          }
          that.get("getOpenId", params).then(res => {
            if (res.data) {
              that.globalData.openid = res.data
              wx.setStorage({
                key: "openid",
                data: res.data
              })
              resolve(that.globalData.openid)
            }
          }).catch(e => {
            reject(e)
          })
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    openid:6666666666666666666,
    // configUrl: "https://report.ityyedu.com/reportingSystem/wechat/",
    // uploadUrl: 'https://report.ityyedu.com/reportingSystem/',
    token: ""
  }
})
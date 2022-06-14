import axios from 'axios';
import { baseUrl } from '../config/autoconfig';
export function shareFunc(wx, {
    title,
    desc,
    link,
    imgUrl,
    dataUrl = '',
    type = 'link',
    success
}) {
    axios.get(`${baseUrl}/api/weixin/share?url=${window.location.href}`, {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then((result)=>{
        const { timestamp, nonceStr, signature } = result.data.data;

        window.wx.config({
            debug: process.env.NODE_ENV === 'development', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx4268bca2f6420e29', // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature,// 必填，签名
            jsApiList: [ 
                'checkJsApi',
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'updateAppMessageShareData',
                'updateTimelineShareData'
            ], // 必填，需要使用的JS接口列表
            openTagList: []
        });
        wx.ready(function () {
            wx.checkJsApi({
              jsApiList: [
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'updateAppMessageShareData',
                'updateTimelineShareData'
              ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                console.log('checkJsApi:', res);
                if(res.checkResult.updateAppMessageShareData) {
                    console.log('updateAppMessageShareData----初始化');
                    wx.updateAppMessageShareData({ 
                        title,
                        desc:desc?desc:'精彩内容不容错过！',
                        link,
                        imgUrl,
                        success: function () {
                          // 设置成功
                        }
                    })
                } 
                if(res.checkResult.onMenuShareAppMessage){
                    console.log('onMenuShareAppMessage----初始化');
                    wx.onMenuShareAppMessage({
                        title,
                        desc:desc?desc:'精彩内容不容错过！',
                        link,
                        imgUrl,
                        type,
                        dataUrl,
                        success: function () {
                          // 用户点击了分享后执行的回调函数
                        }
                      });
                } 
                if(res.checkResult.onMenuShareTimeline) {
                    console.log('onMenuShareTimeline----初始化');
                    wx.onMenuShareTimeline({
                        title,
                        link,
                        imgUrl,
                        success: function () {
                          // 用户点击了分享后执行的回调函数
                        }
                    });

                } 
                if(res.checkResult.updateTimelineShareData) {
                    console.log('updateTimelineShareData----初始化');
                    wx.updateTimelineShareData({
                        title,
                        link,
                        imgUrl,
                        success: function () {
                          // 用户点击了分享后执行的回调函数
                        }
                    });
                }
              } 
            })
        }); 
    
    })
}
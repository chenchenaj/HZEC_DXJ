<template>
	<view class='container'>
		<!-- <web-view  :src="url"></web-view> -->
		<view style="margin-top: 100rpx;"> </view>
		<video id='myVideo' :src="url" controls autoplay></video>
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import {
		DEBUG,
		SERVER_URL,
		IMAGE_URL
	} from '../../util/config.js'
	let app = getApp()
	let self
	let videoContext
	export default {
		data() {
			return {
				SERVER_URL,
				IMAGE_URL,
				url: ''
			}
		},
		onReady() {
			// #ifndef MP-ALIPAY
			videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		onLoad(params) {
			self = this
			util.showLoading('下载中...')
			uni.downloadFile({
				url: IMAGE_URL + '/' + params.url, //下载地址接口返回
				// url:'http://36.107.94.146:5555/upload/1603070640375528.mp4',
				success: (data) => {
					util.hideLoading()
					DEBUG && console.log('下载返回', data);
					if (data.statusCode === 200) {
						// util.navigate('/pages/video_play/video_play', {
						// 	url: data.tempFilePath
						// })
						self.url = data.tempFilePath
					} else {
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '下载失败,请重新下载',
						});
					}
				},
				fail: (err) => {
					util.hideLoading()
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '失败请重新下载',
					});
				},
			});
		},
		onShow() {

		},
		onUnload() {
			videoContext.pause()
		},
		// 到底了
		onReachBottom() {

		},
		// 分享
		// #ifdef MP-WEIXIN
		onShareAppMessage() {},
		// #endif
		// 页面滚动
		onPageScroll() {

		},
		methods: {}
	}
</script>

<style scoped>
</style>

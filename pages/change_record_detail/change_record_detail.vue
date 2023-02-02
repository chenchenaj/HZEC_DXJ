<template>
	<view class='container'>
		<view class="info flex_r_s">
			<view class="title ">交班人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{detail.createdUser}}</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">接班人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{detail.changer}}</view>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">交接备注</view>
			<view class="question-content flex_c_c">
				<view class='question-content-input'>
					{{detail.content}}
				</view>
			</view>
		</view>
		<!-- 详情只读 -->
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 65rpx 0 39rpx 31rpx ">附件</view>
			<view class="upload flex_r_b">
				<view v-for="(item,index) in detail.image" :key='index' class='upload-img' @click="previewImage(index)">
					<image class='page_img' :src="IMAGE_URL+'/'+item||'../../static/check/img_default.png'" mode="aspectFill"></image>
				</view>
			</view>
			<view style="margin: 31rpx 0 31rpx 50rpx;color: #626262; font-size: 27rpx;">图片详细描述</view>
			<!-- 视频/音频 -->
			<view v-if="detail.video||detail.voice" class="upload flex_r_b">
				<view v-if="detail.video" class='upload-video flex_c_c' @click="toWebView(detail.video)">
					<image class='video' src="../../static/video.png" mode="aspectFit"></image>
					<!-- <video class='video' :src="IMAGE_URL+'/'+detail.video" controls></video> -->
					<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">视频详细描述</view>
				</view>
				<view v-if="detail.voice" class='upload-video flex_c_c' @click="playVoice(detail.voice)">
					<image style="width:100%;height:150rpx;" src="../../static/voice.png" mode="aspectFill"></image>
					<view style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">点击播放/暂停</view>
				</view>
			</view>
		</view>
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
	// 问题描述
	let desc = ''
	// 计时器
	let timer
	// 选择的人员完整信息
	let choseInfo = {}
	let self
	let id = ''
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				detail: {},
				SERVER_URL,
				IMAGE_URL
			}
		},
		onLoad(params) {
			id = params['id'] || ''
			if (id) {
				this.getChangeRecordDetail()
			} else {
				util.goBack()
			}
			self = this
		},
		onUnload() {
			if (innerAudioContext.src) {
				// 已经暂停
				if (!innerAudioContext.paused) {
					// 暂停
					innerAudioContext.pause();
				}
			}
			app.globalData.userChoseInfo = {}
		},
		onShow() {},
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
		methods: {
			toWebView(url) {
				util.navigate('/pages/video_play/video_play', {
					url
				})
			},
			// 播放语音
			playVoice(src) {
				let url = IMAGE_URL + '/' + src
				if (innerAudioContext.src == url) {
					// 已经暂停
					if (innerAudioContext.paused) {
						DEBUG && console.log('播放');
						// 播放
						innerAudioContext.play();
					} else {
						DEBUG && console.log('暂停');
						// 暂停
						innerAudioContext.pause();
					}
				} else {
					innerAudioContext.src = url
					innerAudioContext.play();
				}
			},
			// 预览图片
			previewImage(idx) {
				let list = this.detail.image.map(item => {
					return IMAGE_URL + '/' + item
				})
				uni.previewImage({
					urls: list,
					loop: true,
					current: idx
				});
			},
			async getChangeRecordDetail() {
				let res = await request.get(request.USER.CHANGE_RECORED_DETAIL, {
					handoverId: id
				})
				DEBUG && console.log('交接班详情', res.data);
				if (res.data.statusCode == 200) {
					this.detail = res.data.detail
					this.id = id
				} else {
					util.showModal(res.data.errmsg)
				}
			}
		}
	}
</script>

<style scoped>
	.info {
		width: 100%;
		min-height: 100rpx;
		font-size: 31rpx;
		border-bottom: 1rpx solid #E5E5E5;
	}

	.title {
		width: 130rpx;
		font-weight: bold;
		margin-left: 31rpx;
	}

	.title-content {
		width: 547rpx;
		font-size: 28rpx;
		min-height: 20rpx;
		margin-left: 5rpx;
	}

	.question-content {
		width: 683rpx;
		min-height: 195rpx;
		background-color: #F2F2F2;
		margin-left: 31rpx;
		margin-bottom: 59rpx;
	}

	.question-content-input {
		width: 660rpx;
		height: 170rpx;
		background-color: #F2F2F2;
		font-size: 27rpx;
		color: #626262;
		min-height: 93rpx;
		padding: 5rpx 5rpx;
	}

	.upload {
		width: 683rpx;
		margin-left: 31rpx;
	}

	.upload-img {
		position: relative;
		width: 150rpx;
		height: 150rpx;
	}

	.upload-video {
		position: relative;
		width: 327rpx;
		min-height: 150rpx;
		margin-bottom: 73rpx;
	}

	.video {
		width: 327rpx;
		height: 150rpx;
	}

	.delete {
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		width: 45rpx;
		height: 45rpx;
		z-index: 999;
	}

	.btn {
		width: 269rpx;
		height: 73rpx;
		background-color: #5786F7;
		line-height: 73rpx;
		font-size: 27rpx;
		color: #fff;
		text-align: center;
	}
</style>

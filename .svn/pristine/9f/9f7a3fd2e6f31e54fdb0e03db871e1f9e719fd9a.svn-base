<template>
	<view class='container'>
		<view class="info flex_r_s">
			<view class="title">类型</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">隐患</view>
			</view>
		</view>
		<view v-if="detail.process" class="info flex_r_b">
			<view class="title ">流程说明</view>
			<view class='title-content-input'>
				{{detail.process}}
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">优先级</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">{{(detail.priority==0&&'正常')||(detail.priority==1&&'重要')||(detail.priority==2&&'紧急重要')}}</view>
			</view>
		</view>
		<view v-if="detail.desc" class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">问题描述</view>
			<view class="flex_c_c" style="width: 100%;height: 100%;">
				<view class='question-content-input'>
					{{detail.desc}}
				</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">下发人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.createdUserName}}</view>
			</view>
		</view>
		<view v-if="detail.executor" class="info flex_r_s">
			<view class="title ">审批人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.executor||''}}</view>
			</view>
		</view>
		<view v-if="detail.cc" class="info flex_r_s">
			<view class="title ">抄送人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.cc||''}}</view>
			</view>
		</view>
		<!-- 图片/视频/音频 选择 -->
		<view v-if="detail.image[0]||detail.video||detail.voice" class="info flex_c_s_s">
			<view class="title" style="margin: 65rpx 0 39rpx 31rpx ">附件</view>
			<view class="upload flex_r_a">
				<view v-for="(item,index) in detail.image" :key='index' class='upload-img' @click="chooseImg(index)">
					<image class='page_img' :src="IMAGE_URL+'/'+item||'../../static/check/img_default.png'" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="detail.image[0]" style="margin: 31rpx 0 31rpx 50rpx;color: #626262; font-size: 27rpx;"></view>
			<!-- 视频/音频 -->
			<view class="upload flex_r_b">
				<view v-if="detail.video" class='upload-video flex_c_c' @click="toWebView(detail.video)">
					<image class='video' src="../../static/video.png" mode="aspectFit"></image>
					<!-- 	<image v-if="!detail.video" style="width:100%;height:150rpx;" src="../../static/check/video.png" mode="aspectFill"></image>
					<video class='video' :src="IMAGE_URL+'/'+detail.video" controls></video> -->
					<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">视频描述</view>
				</view>
				<view v-if="detail.voice" class='upload-video flex_c_c' @click="playVoice(detail.voice)">
					<image style="width:100%;height:150rpx;" src="../../static/voice.png" mode="aspectFill"></image>
					<view style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">点击播放/暂停</view>
				</view>
			</view>
		</view>
		<view class="info flex_c_s">
			<view class="flex_r_b" style="width: 100%;margin: 80rpx 0 35rpx;">
				<view class="title ">设备选择</view>
			</view>
			<!-- 点检或巡检项目 -->
			<view v-if="detail.components" v-for="(item,index) in detail.components" :key="index" style="width: 100%;">
				<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
					<view style="margin-left: 31rpx;font-size: 27rpx;color: #626262;">系统名称: {{item.systemName}}</view>
					<view src="" mode="aspectFit" style=" margin:41rpx 38rpx 41rpx 0;width: 40rpx;height:40rpx;"></view>
				</view>
				<view v-for="(itm,idx) in item.device" :key="idx">
					<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="margin:41rpx 38rpx 41rpx 50rpx;font-size: 27rpx;color: #626262;">设备名称: {{itm.parentName}}</view>
					</view>
					<view v-for="(itm1,idx1) in itm.child" :key='idx1' class="flex_c_s" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="width: 600rpx; margin:41rpx 0;font-size: 27rpx;color: #626262;">
							({{idx1+1}}) 隐患项目: {{itm1.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="detail.taskInfo&&detail.taskInfo.isRevoke" class="info flex_r_s">
			<view class="title ">任务状态</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">已撤销</view>
			</view>
		</view>
		<view class="flex_r_c" style="margin: 54rpx 0 250rpx;">
			<!-- 是否展示撤销 -->
			<view v-if="detail.isCycle&&(detail.taskInfo&&detail.taskInfo.isCreatedUser)&&detail.canStop" class="btn" @click="revoke">
				撤销
			</view>
			<!-- <view v-if="detail.verifyer" class="btn" @click="verify">
				提交
			</view> -->
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
	let taskId = ''
	let uid = ''
	let checkId = ''
	let isCreate = ''
	let self
	// 选择的人员完整信息
	let choseInfo = {}
	// 原因信息
	let reason = {}
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				defaultImgList: ['', '', '', ''],
				imgList: {},
				video: {},
				voice: {},
				detail: {
					image: []
				},
				checkInfo: {},
				userChoseInfo: {}, //当前页面各类别人员选择信息
				key: '', //协助人/执行人/抄送人/审批人
				SERVER_URL,
				IMAGE_URL
			}
		},
		onLoad(params) {
			self = this
			taskId = params.id
			uid = params.uid
			checkId = params.checkId
			isCreate= params.isCreate
			if (!taskId) {
				util.goBack()
				return
			}
			this.getTaskDetail()
		},
		onUnload() {
			if (innerAudioContext.src) {
				// 已经暂停
				if (!innerAudioContext.paused) {
					// 暂停
					innerAudioContext.pause();
				}
			}
		},
		onShow() {

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
		methods: {
			toWebView(url) {
				util.navigate('/pages/video_play/video_play', {
					url
				})
			},
			// 图片选择
			chooseImg(idx) {
				let list = this.detail.image.map(item => {
					return IMAGE_URL + '/' + item
				})
				uni.previewImage({
					urls: list,
					loop: true,
					current: idx
				});
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
			// 撤销任务
			async revoke() {
				let res = await request.post(request.USER.END_TASK, {
					taskId
				})
				DEBUG && console.log('撤销任务返回', res.data)
				if (res.data.statusCode == 200) {
					util.goBack()
				} else {
					util.showModal(res.data.errmsg)
				}
			},
			// 获取任务/审批列表
			async getTaskDetail() {
				DEBUG && console.log(taskId, uid);
				let reqData = {
					taskId,
					uid
				}
				if(checkId){
					reqData.checkId = checkId
				}
				if(isCreate){
					reqData.isCreate = isCreate
				}
				let res = await request.get(request.USER.TASK_DETAIL,reqData )
				DEBUG && console.log('任务详情', res.data);
				if (res.data.statusCode == 200) {
					this.detail = res.data.detail
				} else {
					util.showModal(res.data.errmsg, () => {
						util.goBack()
					})
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

	.chose-icon {
		width: 30rpx;
		height: 30rpx;
		border-radius: 25rpx;
	}

	.chose-content {
		font-size: 28rpx;
		margin-left: 20rpx;
		color: #626262;
	}

	.title-content-input {
		max-width: 547rpx;
		margin: 33rpx 0;
		font-size: 27rpx;
		color: #626262;
		min-height: 43rpx;
		margin-right: 40rpx;
	}

	.division {
		width: 683rpx;
		height: 93rpx;
		font-size: 27rpx;
		background-color: #F2F2F2;
		margin-bottom: 53rpx;
	}

	.add-icon {
		width: 37rpx;
		height: 37rpx;
		border-radius: 37rpx;
		margin-right: 38rpx;
	}

	.hour {
		font-size: 27rpx;
		min-width: 140rpx;
		height: 60rpx;
		margin-right: 18rpx;
		background-color: #F2F2F2;
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
		font-size: 27rpx;
		color: #626262;
		min-height: 93rpx;
		padding: 5rpx 5rpx;
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

	.upload {
		width: 683rpx;
		margin-left: 31rpx;
	}

	.upload-img {
		position: relative;
		width: 150rpx;
		height: 150rpx;
	}

	.child-upload-img {
		position: relative;
		width: 135rpx;
		height: 135rpx;
	}

	.upload-video {
		width: 327rpx;
		min-height: 150rpx;
		margin-bottom: 73rpx;
	}

	.child-upload-video {
		position: relative;
		width: 280rpx;
		margin-bottom: 73rpx;
	}

	.video {
		width: 327rpx;
		height: 150rpx;
	}

	.child-video {
		width: 100%;
		height: 150rpx;
	}

	.cycle {
		min-width: 101rpx;
		height: 60rpx;
		background-color: #F2F2F2;
	}

	.date {
		min-width: 399rpx;
		height: 60rpx;
		background-color: #F2F2F2;
	}

	.delete {
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		width: 45rpx;
		height: 45rpx;
		z-index: 99999;
	}

	.user-item {
		font-size: 27rpx;
		color: #5786F7;
	}
</style>

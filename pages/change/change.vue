<template>
	<view class='container'>
		<view class="info flex_r_s" @click="userChose('changer')">
			<view class="title ">接班人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['changer']||'请选择'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">交接备注</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="questionInput" placeholder="请输入内容" value="" />
				</textarea>
			</view>
		</view>
		<!-- 图片/视频/音频 选择 -->
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 65rpx 0 39rpx 31rpx ">附件</view>
			<view class="upload flex_r_b">
				<view v-for="(item,index) in imgList" :key='index' class='upload-img'>
					<image @click="chooseImg(index)" class='page_img' :src="item||'../../static/check/img_default.png'" mode="aspectFill"></image>
					<image v-if="item" @click.stop="deleteImg(index)" class='delete' src="../../static/check/delete.png" mode="aspectFill"></image>
				</view>
			</view>
			<view style="margin: 31rpx 0 31rpx 50rpx;color: #626262; font-size: 27rpx;">添加图片详细描述(可传4张)</view>
			<!-- 视频/音频 -->
			<view class="upload flex_r_b">
				<view class='upload-video flex_c_s' @click="chooseVideo">
					<image v-if="!video" style="width:100%;height:150rpx;" src="../../static/check/video.png" mode="aspectFill"></image>
					<video class='video' v-if="video" :src="video" controls></video>
					<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">添加视频详细描述异常</view>
					<image v-if="video" @click.stop="deleteVideo" class='delete1' src="../../static/check/delete.png" mode="aspectFill"></image>
				</view>
				<view class='upload-video flex_c_s' @click="chooseAudio">
					<image style="width:100%;height:150rpx;" :src="voice?'../../static/voice.png':'../../static/check/audio.png'" mode="aspectFill"></image>
					<view v-if="!voice&&!isRecording" style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">
						点击录制语音(15s以内)
					</view>
					<view v-else-if="!voice&&isRecording" style="color: red; font-size: 27rpx;margin-top: 31rpx;">
						录音中({{count}} s),点击停止
					</view>
					<view v-else style="color: red; font-size: 27rpx;margin-top: 31rpx;">
						录音完成({{count}} s) 点击播放/暂停
					</view>
					<image v-if="voice" @click.stop="deleteVoice" class='delete1' src="../../static/check/delete.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="flex_r_c" style="margin: 54rpx 0 250rpx;">
			<view class="btn" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import {
		DEBUG,
		SERVER_URL
	} from '../../util/config.js'
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	let app = getApp()
	// 问题描述
	let desc = ''
	// 计时器
	let timer
	// 选择的人员完整信息
	let choseInfo = {}
	let self
	export default {
		data() {
			return {
				imgList: ['', '', '', ''],
				video: '',
				voice: '',
				count: 0, //录音秒数
				isRecording: 0, //是否正在录音
				userChoseInfo: {}, //当前页面各类别人员选择信息
				key: '', //协助人/执行人/抄送人/审批人
				SERVER_URL
			}
		},
		onLoad() {
			self = this
			recorderManager.onStop(function(res) {
				DEBUG && console.log('音频临时路径' + res.tempFilePath);
				if (timer) {
					clearInterval(timer)
				}
				self.isRecording = 0
				self.voice = res.tempFilePath;
				innerAudioContext.src = self.voice;
				// console.log('音频时长', innerAudioContext.duration);
				setTimeout(function() {
					self.count = innerAudioContext.duration
				}, 200);

			});
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
		onShow() {
			// 当前选择的人员类型
			if (app.globalData.userChoseInfo[this.key]) {
				choseInfo[this.key] = app.globalData.userChoseInfo[this.key].choseInfo || {}
				if (Object.values(choseInfo[this.key]).length > 0) {
					this.userChoseInfo[this.key] = Object.values(choseInfo[this.key]).map(item => {
						return item.username
					}).join('、')
				} else {
					this.userChoseInfo[this.key] = ''
				}
				this.userChoseInfo = JSON.parse(JSON.stringify(this.userChoseInfo))
				console.log('选择数据', choseInfo);
			}
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
			async getChangeRecordDetail(id) {
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
			},
			// 问题描述
			questionInput(e) {
				desc = e.detail.value
			},
			// 人员选择
			userChose(type) {
				util.navigate('/pages/user_choose/user_choose', {
					type
				})
				this.key = type
			},
			// 删除视频
			deleteVideo() {
				this.video = ''
			},
			// 删除音频
			deleteVoice() {
				this.voice = ''
			},
			// 图片选择
			chooseImg(idx) {
				if (this.imgList[idx]) {
					uni.previewImage({
						urls: this.imgList,
						loop: true,
						current: idx
					});
					return
				}
				uni.chooseImage({
					count: 4,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: function(res) {
						let temp = res.tempFilePaths
						let length = 4 - temp.length
						if (temp.length > 3) {
							self.imgList = temp.slice(0, 4)
						} else {
							for (let i = 0; i < length; i++) {
								temp.push('')
							}
							self.imgList = temp
						}

					}
				})
			},
			// 删除图片
			deleteImg(idx) {
				let temp = JSON.parse(JSON.stringify(this.imgList))
				temp[idx] = ''
				this.imgList = temp
			},
			// 选择视频
			chooseVideo() {
				if (!this.video) {
					uni.chooseVideo({
						count: 1,
						maxDuration: 15,
						sourceType: ['camera', 'album'],
						success: function(res) {
							console.log('视频文件', res.tempFilePath);
							self.video = res.tempFilePath;
						}
					});
				}
			},
			// 录音
			chooseAudio() {
				if (this.voice) {
					// 已经暂停
					if (innerAudioContext.paused) {
						// 播放
						innerAudioContext.play();
					} else {
						// 暂停
						innerAudioContext.pause();
					}
				} else {
					// 如果当前正在录音则停止
					if (this.isRecording) {
						recorderManager.stop()
					} else {
						DEBUG && console.log('开始录音');
						this.count = 0
						// 最长15秒
						recorderManager.start({
							duration: 15000
						});
						// 录制中
						this.isRecording = 1
						timer = setInterval(() => {
							if (self.count < 15) {
								self.count += 1
								// recorderManager.stop()
							} else {
								clearInterval(timer)
							}
						}, 1000)
					}
				}
			},
			// 选择系统
			toSystem() {
				util.navigate('/pages/system_choose/system_choose')
			},
			// 提交
			submit() {
				let files = []
				this.imgList.forEach((item, index) => {
					if (item) {
						files.push({
							name: `image_${index}`,
							uri: item
						})
					}
				})
				if (this.video) {
					files.push({
						name: `video`,
						uri: this.video
					})
				}
				if (this.voice) {
					files.push({
						name: `voice`,
						uri: this.voice
					})
				}
				let fileData = {}
				// 如果有文件再传
				if (files.length > 0) {
					fileData = {
						files
					}
				}
				console.log('上传文件列表', files);
				let changer = Object.keys(choseInfo['changer'] || {})
				if (changer.length < 1) {
					util.showModal('请选择交接人')
					return
				}
				// 上传参数
				let queryData = {
					content: desc,
					changer: JSON.stringify(changer),
				}
				console.log('参数', queryData);
				util.showLoading('提交中...')
				uni.uploadFile({
					...fileData,
					filePath: '',
					name: '',
					url: SERVER_URL + '/user/handover', //仅为示例，非真实的接口地址
					files,
					header: {
						Authorization: `Bearer ${request.TOKEN}`
					},
					formData: queryData,
					success: (uploadFileRes) => {
						util.hideLoading()
						// console.log(123, uploadFileRes.data);
						let res = JSON.parse(uploadFileRes.data)
						if (res.statusCode == 200) {
							util.goBack()
						} else {
							util.showModal(res.errmsg)
						}
					}
				});
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
		min-height: 250rpx;
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

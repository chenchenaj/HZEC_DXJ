<template>
	<view class='container'>
		<view class="info flex_r_s">
			<view class="title">类型</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">{{(detail.type==0&&'点检')||(detail.type==1&&'巡检')||(detail.type==2&&'维修')||(detail.type==3&&'大修列表') || (detail.type==4&&'保养')||(detail.type==5&&'润滑')||(detail.type==6&&'隐患')||''}}</view>
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
		<view v-if="detail.type!=6" class="info flex_c_s_s">
			<view class="flex_r_s" style="margin-top: 55rpx; margin-bottom: 55rpx;">
				<view class="title">检查周期</view>
				<view class="title-content flex_r_e">
					<view class="chose-content">{{(detail.isCycle&&'周期性')||'临时性'}}</view>
				</view>
			</view>
			<view v-if="detail.isCycle" class="flex_r_s" style="margin-bottom:41rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">周期单位</view>
				<view class='cycle'>
					<view class='flex_c_c' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view style="width: 50rpx;text-align: center; color: #626262;">{{detail.unit}}</view>
					</view>
				</view>
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 106rpx;">周期次数</view>
				<view class='cycle'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view style="width: 50rpx;text-align: right; color: #626262;">{{detail.num}}</view>
						<view style="margin-right: 10rpx;">次</view>
					</view>
				</view>
			</view>
			<view v-if="detail                                                                                                                                     .isCycle"
			 v-for="(item,index) in detail.time" :key='index' class="flex_r_s" style="margin:0rpx 0rpx 41rpx 0rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">开始时间</view>
				<view class='date'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view class='flex_r_b' style="width: 340rpx;text-align: center; color: #626262;">
							<view style="margin-left: 20rpx;">{{item.date}}</view>
							<view style="margin-right: 20rpx;">{{item.time}}</view>
						</view>
						<image style="width: 20rpx;height: 12rpx;margin-right: 10rpx;" src="../../static/check/down_arrow.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">下发人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.createdUserName}}</view>
			</view>
		</view>
		<view v-if="detail.aging&&detail.aging!=0" class="info flex_c_c">
			<view class="flex_r_b" style="width: 100%;">
				<view class="title ">执行时效</view>
				<view style="margin-right: 38rpx;color:#626262;font-size: 28rpx;">{{detail['aging']}}小时</view>
			</view>
		</view>
		<view v-if="detail.executor" class="info flex_r_s">
			<view class="title ">执行人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.executor}}</view>
			</view>
		</view>
		<view v-if="detail.desc" class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">问题描述</view>
			<view class="question-content flex_c_c">
				<view class='question-content-input'>
					{{detail.desc}}
				</view>
			</view>
		</view>
		<view class="info flex_c_s">
			<view class="flex_r_b" style="width: 100%;margin: 80rpx 0 35rpx;">
				<view class="title ">检查设备</view>
			</view>
			<!-- 点检或巡检项目 -->
			<view v-for="(item,index) in detail.components" :key="index" style="width: 100%;">
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
							({{idx1+1}}) 检查项目 : {{itm1.name}}
						</view>
						<!-- 选择检查情况 -->
						<view v-if="detail.type<4" class="flex_r_s_s" style="width: 600rpx;margin: 30rpx 0 35rpx;">
							<view class="title" style="margin-left: 0rpx;">检查结果</view>
							<!-- 结果 -->
							<view class="flex_c_s_s" style="width: 420rpx;">
								<view class="flex_r_s_s">
									<view class='flex_r_s'>
										<image class='chose-icon' src="../../static/check/select.png" mode="aspectFill"></image>
										<view v-if="detail.type==0||detail.type==1" class="chose-content font-color">{{(itm1.info.result==0&&'正常')||(itm1.info.result==1&&'自行解决')||(itm1.info.result==2&&'未解决,提交求助')}}</view>
										<view v-if="detail.type==2||detail.type==3" class="chose-content" style="color: #5786F7;">{{(itm1.info.result==0&&'完成')||(itm1.info.result==1&&'未完成')||(itm1.info.result==2&&'无法执行')}}</view>
									</view>

								</view>
							</view>
						</view>
						<view v-if="detail.type==2||detail.type==3" class="flex_r_s_s" style="width: 600rpx;margin: 30rpx 0 35rpx;">
							<view class="title " style="margin-left: 0rpx;">维修类型</view>
							<view class="flex_c_s_s" style="width: 420rpx;">
								<view class="flex_r_s_s">
									<view class='flex_r_s'>
										<image class='chose-icon' src="../../static/check/select.png" mode="aspectFill"></image>
										<view class="chose-content" style="color: #5886F8;">{{itm1.type==0?'停修':'不停修'}}</view>
									</view>
								</view>
							</view>
						</view>
						<view v-if="detail.type==2||detail.type==3" class="flex_r_s_s" style="width: 600rpx;margin: 30rpx 0 35rpx;">
							<view class="title" style="margin-left: 0rpx;">问题类型</view>
							<view class="flex_c_s_s" style="width: 420rpx;">
								<view class="flex_r_s_s">
									<view class='flex_r_s'>
										<image class='chose-icon' src="../../static/check/select.png" mode="aspectFill"></image>
										<view class="chose-content" style="color: #5786F7;">{{(itm1.questionType==0&&'机械故障')||(itm1.questionType==1&&'电气故障')||(itm1.questionType==2&&'工艺故障')||(itm1.questionType==3&&'其他故障')||(itm1.questionType==4&&'现场判断')||(itm1.questionType==5&&'自定义')||''}}</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 自定义问题类型-->
						<view v-if="itm1.questionType==5&&itm1.content" class="flex_c_s_s" style="background-color: #F2F2F2; font-size: 27rpx; width: 600rpx; color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
							<view class="flex_c_c" style="width: 100%;height: 150rpx;">
								<view style="width: 100%;height: 100%;">
									{{itm1.content}}
								</view>
							</view>
						</view>
						<!-- 如果是无法执行 -->
						<view v-if="itm1.info&&itm1.info.result==2&&itm1.info.reason" class="flex_c_s_s" style="background-color: #F2F2F2; font-size: 27rpx; width: 600rpx; color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
							<view class="flex_c_c" style="width: 100%;height: 150rpx;">
								<view style="width: 100%;height: 100%;">
									{{itm1.info.reason}}
								</view>
							</view>
						</view>
						<!-- 只读 -->
						<view v-if="itm1.info&&itm1.info.assist" class='flex_r_b' style="width: 600rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
							<view class="title" style="margin-left: 0;color:#000000">协助人</view>
							<view class="title-content  flex_r_e">
								<view style="color: #626262;">{{itm1.info.assist}}</view>
							</view>
						</view>
						<view v-if="itm1.info&&((itm1.info.image&&itm1.info.image[0])||itm1.info.video||itm1.info.voice) " class="flex_r_s"
						 style="width: 600rpx;margin: 0rpx 0 35rpx;">
							<view class="title" style="margin-left: 0rpx;">附件</view>
						</view>
						<!-- 子设备图片信息只读 -->
						<view v-if="itm1.info&&itm1.info.image&&itm1.info.image[0]" class="flex_r_a" style="width: 600rpx;">
							<view v-for="(itm2,idx2) in itm1.info.image" :key='idx2' class='child-upload-img' @click="previewImage1(index,idx,idx1,idx2)">
								<image class='page_img' :src="IMAGE_URL+'/'+itm2" mode="aspectFill"></image>
							</view>
						</view>
						<view v-if="itm1.info&&itm1.info.image&&itm1.info.image[0]" style="width: 600rpx;text-align: left; margin: 31rpx 0;color: #626262; font-size: 27rpx;">图片详细描述(可传4张)</view>
						<!-- 视频/音频 -->
						<view class="flex_r_b" style="width: 600rpx;">
							<!-- 视频只读 -->
							<view v-if="itm1.info&&itm1.info.video" class='child-upload-video flex_c_c' @click="toWebView(itm1.info.video)">
								<image class='child-video' src="../../static/video.png" mode="aspectFit"></image>
								<!-- <video class='child-video' :src="IMAGE_URL+'/'+itm1.info.video" controls></video> -->
								<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">视频详细描述异常</view>
							</view>
							<!-- 音频只读 -->
							<view v-if="itm1.info&&itm1.info.voice" class='child-upload-video flex_c_c' @click="playVoice(itm1.info.voice)">
								<image style="width:100%;height:150rpx;" src="../../static/voice.png" mode="aspectFill"></image>
								<view style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">点击播放/暂停</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="detail.auditInfo&&detail.auditInfo[0]" class="info flex_c_s_s">
			<view class="flex_r_b" style="width: 100%;margin: 71rpx 0 39rpx 0rpx ">
				<view class="title" style="margin-left: 31rpx;">审核历史</view>
				<view class="flex_r_s">
					<image @click="show(1)" src="../../static/down.png" style="width: 37rpx;height: 37rpx;" mode="aspectFit"></image>
					<image @click="show(0)" src="../../static/up.png" style="width: 37rpx;height: 37rpx;margin-left: 16rpx;margin-right: 38rpx;"
					 mode="aspectFit"></image>
				</view>
			</view>
			<view v-if="showVerifyList" v-for="(item,index) in detail.auditInfo" :key='index' class="question-content flex_c_c"
			 style="background-color: #fff;margin-bottom: 20rpx;box-shadow: 0px 0px 14px 0px rgba(65, 65, 65, 0.15);">
				<view class='flex_r_b' style="width: 100%;height: 105rpx; border-bottom: 1rpx solid #E6E6E6;">
					<view style="margin-left: 39rpx;font-size: 29rpx;">审核人: {{item.reviewer}}</view>
					<view style="margin-right: 39rpx;font-size: 20rpx;color: #6D6D6D;">{{item.modifiedTime}}</view>
				</view>
				<view class='flex_c_c' style="width: 88%;height: 110rpx;font-size: 24rpx;color: #333333;">
					<view class='line1' style="width: 100%;height: 40rpx;">审批结果:<text style="color: #007AFF;">{{verifyRange[item.result]}}</text>；
						审批意见: <text style="color: #007AFF;">{{item.content||'暂无'}}</text></view>
				</view>
			</view>
		</view>
		<!-- 审核结果只读 -->
		<view v-if="verifyRange[detail.result||-1]" class="info flex_c_s_s">
			<view class="flex_r_b" style="width: 100%;margin: 71rpx 0 39rpx 0rpx ">
				<view class="title" style="margin-left: 31rpx;">审核结果</view>
				<view class='date1' style="margin-right: 33rpx;">
					<view class='flex_r_c' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view style="min-width: 150rpx;text-align: center; color: #626262;">{{verifyRange[detail.result]}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="detail.content" class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">审核意见</view>
			<view class="question-content flex_c_c">
				<view class='question-content-input'>
					{{detail.content}}
				</view>
			</view>
		</view>
		<view class="flex_r_c" style="margin: 54rpx 0 250rpx;">
			<view v-if="showSubmit>0" class="btn" @click="submit">下发维修任务</view>
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
	let self
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	// 选择的人员完整信息
	let choseInfo = {}
	// 子设备id
	let childDeviceId = ''
	let timer
	let verifyContent = ''
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
				IMAGE_URL,
				isRecording: 0, //是否正在录音
				count: 0,
				verifyList: [], //审核历史
				showVerifyList: 1, //是否显示审批历史
				verifyRange: ['执行', '暂缓', '忽略', '大修处理', '无法确定'], //审核结果范围
				verifyIdx: -1,
				showSubmit: 0
			}
		},
		onLoad(params) {
			self = this
			taskId = params.id
			if (!taskId) {
				util.goBack()
				return
			}
			this.getTaskDetail()
		},
		onUnload() {
			// 清除大修信息
			app.globalData.overhaulInfo = {}
			app.globalData.submitDeviceInfo = []
		},
		onShow() {
			console.log('完成情况', app.globalData.overhaulInfo);
			this.showSubmit = app.globalData.overhaulInfo.isShow || 0
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
			// 预览图片
			previewImage1(idx1, idx2, idx3, idx4) {
				// console.log(this.detail.components[idx1].device[idx2].child[idx3].info.image);
				let list = this.detail.components[idx1].device[idx2].child[idx3].info.image.map(item => {
					return IMAGE_URL + '/' + item
				})
				// console.log('展示图片列表', list);
				uni.previewImage({
					urls: list,
					loop: true,
					current: idx4
				});
			},
			// 审核选择
			verifySelect(e) {
				// console.log(e);
				this.verifyIdx = e.detail.value
			},
			// 是否显示审批历史
			show(idx) {
				if (idx != this.showVerifyList) {
					this.showVerifyList = idx
				}
			},
			// 审核意见
			verifyInput(e) {
				verifyContent = e.detail.value
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
			// 人员选择
			userChose(type) {
				util.navigate('/pages/user_choose/user_choose', {
					type
				})
				this.key = type
			},
			// 获取任务/审批列表
			async getTaskDetail() {
				let res = await request.get(request.USER.VERIFY_DETAIL, {
					auditId: taskId
				})
				DEBUG && console.log('任务详情', res.data);
				if (res.data.statusCode == 200) {
					this.detail = res.data.detail

					// 如果是维修类型的只有同意和不同意
					if (res.data.detail.type == 2 || res.data.detail.type == 3) {
						this.verifyRange = ['同意', '不同意']
					}
				} else {
					util.showModal(res.data.errmsg, () => {
						util.goBack()
					})
				}
			},
			// 提交
			async submit() {
				// 审核设备临时储存
				app.globalData.submitDeviceInfo = JSON.parse(JSON.stringify(this.detail.components))
				util.navigate('/pages/overhaul_repair/overhaul_repair', {
					type: this.detail.type
				})
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
		min-height: 250rpx;
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

	.date1 {
		min-width: 193rpx;
		height: 60rpx;
		background-color: #F2F2F2;
	}

	.delete {
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		width: 45rpx;
		height: 45rpx;
		z-index: 999;
	}
</style>

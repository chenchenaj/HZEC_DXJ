<template>
	<view class='container'>
		<view class="info flex_r_s">
			<view class="title">类型</view>

			<view class="title-content flex_r_s">
				<view v-if="checkPoint" class='flex_r_s' @click="typeSelect(0)">
					<image class='chose-icon'
						:src="typeIdx==0?'../../static/check/select.png':'../../static/check/unselect.png'"
						mode="aspectFit"></image>
					<view class="chose-content" :class="[typeIdx==0?'font-color':'un-font-color']">点检</view>
				</view>
				<view v-if="inspection" class='flex_r_s' :style="{'margin-left':checkPoint?'50rpx':''}"
					@click="typeSelect(1)">
					<image class='chose-icon'
						:src="typeIdx==1?'../../static/check/select.png':'../../static/check/unselect.png'"
						mode="aspectFit"></image>
					<view class="chose-content" :class="[typeIdx==1?'font-color':'un-font-color']">巡检</view>
				</view>
			</view>
		</view>


		<view class="info flex_r_s">
			<view class="title">场景</view>
			<view class="title-content flex_r_s">
				<image class='chose-icon' src="../../static/check/select.png" mode="aspectFill"></image>
				<view class="chose-content font-color">设备检查</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">流程说明</view>
			<view class="title-content">
				<textarea auto-height class='title-content-input' @input='processInput' placeholder="请输入流程说明"
					:value="processContent">
				</textarea>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">优先级</view>
			<view class="title-content flex_r_s">
				<view class='flex_r_s' @click="prioritySelect(0)">
					<image class='chose-icon'
						:src="priorityIdx==0?'../../static/check/select.png':'../../static/check/unselect.png'"
						mode="aspectFill"></image>
					<view class="chose-content" :class="[priorityIdx==0?'font-color':'un-font-color']">正常</view>
				</view>
				<view class='flex_r_s' style="margin-left: 50rpx;" @click="prioritySelect(1)">
					<image class='chose-icon'
						:src="priorityIdx==1?'../../static/check/select.png':'../../static/check/unselect.png'"
						mode="aspectFill"></image>
					<view class="chose-content" :class="[priorityIdx==1?'font-color':'un-font-color']">重要</view>
				</view>
				<view class='flex_r_s' style="margin-left: 50rpx;" @click="prioritySelect(2)">
					<image class='chose-icon'
						:src="priorityIdx==2?'../../static/check/select.png':'../../static/check/unselect.png'"
						mode="aspectFill"></image>
					<view class="chose-content" :class="[priorityIdx==2?'font-color':'un-font-color']">紧急重要</view>
				</view>
			</view>
		</view>
		<view class="info flex_c_s">
			<view class="flex_r_b" style="width: 100%;margin: 80rpx 0 35rpx;">
				<view class="title ">{{typeIdx==0?'点检项目':'巡检项目'}}</view>
				<image @click="addPro" style="width: 40rpx;height: 40rpx;margin-right: 38rpx;"
					src="../../static/check/add.png" mode="aspectFit"></image>
			</view>
			<!-- 点检或巡检项目 -->
			<view v-for="(item,index) in deviceInfo" :key="index" style="width: 100%;">
				<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
					<view style="margin-left: 31rpx;font-size: 27rpx;color: #626262;">系统名称: {{item.systemName}}</view>
					<image @click='deleteDevice(index)' src="../../static/check/delete.png" mode="aspectFit"
						style=" margin:41rpx 38rpx 41rpx 0;width: 40rpx;height:40rpx;"></image>
				</view>
				<view v-for="(itm,idx) in item.device" :key="idx">
					<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="margin:41rpx 38rpx 41rpx 50rpx;font-size: 27rpx;color: #626262;">设备名称:
							{{itm.parentName}}
						</view>
					</view>
					<view v-for="(itm1,idx1) in itm.child" :key='idx1' class="flex_r_b"
						style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="width: 580rpx; margin:41rpx 38rpx 41rpx 85rpx;font-size: 27rpx;color: #626262;"
							@click="toDetail(itm1.id)">
							({{idx1+1}}) {{typeIdx==0?'点检项目':'巡检项目'}}: {{itm1.name}} <text
								style="color: #007AFF;">(点击查看项目详情)</text>
						</view>
					</view>
				</view>
			</view>
			<view class="division flex_r_c" style="margin-top: 53rpx;">
				<view style="width: 173rpx;height: 1rpx;background-color: #5786F7;"></view>
				<view class="font-color" style="margin: 0 48rpx;">附件/文书</view>
				<view style="width: 173rpx;height: 1rpx;background-color: #5786F7;"></view>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="flex_r_s" style="margin-top: 55rpx;" :style="{'margin-bottom': cycleIdx==1?'50rpx':''}">
				<view class="title">检查周期</view>
				<view class="title-content flex_r_s">
					<view class='flex_r_s' @click="cycleSelect(0)">
						<image class='chose-icon'
							:src="cycleIdx==0?'../../static/check/select.png':'../../static/check/unselect.png'"
							mode="aspectFit"></image>
						<view class="chose-content " :class="[cycleIdx==0?'font-color':'un-font-color']">周期性</view>
					</view>
					<view v-if="!isUpdate" class='flex_r_s' style="margin-left: 50rpx;" @click="cycleSelect(1)">
						<image class='chose-icon'
							:src="cycleIdx==1?'../../static/check/select.png':'../../static/check/unselect.png'"
							mode="aspectFit"></image>
						<view class="chose-content" :class="[cycleIdx==1?'font-color':'un-font-color']">临时性</view>
					</view>
				</view>
			</view>

			<!-- 周期单位,次数 -->
			<view v-if="cycleIdx==0" class="flex_r_s" style="margin:41rpx 0rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">周期单位</view>
				<picker class='cycle' mode="selector" :range="cycleRange" @change="cycleUnitSelect">
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view style="min-width: 50rpx;text-align: center; color: #626262;margin: 0 10rpx;">
							{{cycleRange[cycleUnitIdx]||updateUnit||'请选择'}}
						</view>
						<image style="width: 20rpx;height: 12rpx;margin-right: 10rpx;"
							src="../../static/check/down_arrow.png" mode="aspectFit"></image>
					</view>
				</picker>
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 106rpx;">周期次数</view>
				<view class='cycle'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<input style="width: 50rpx;text-align: right; color: #626262;" type="number" :value="cycleNum"
							@input="cycleNumSelect" />
						<view style="margin-right: 10rpx;">次</view>
					</view>
				</view>
			</view>
			<view v-if="cycleIdx==0" v-for="(item,index) in dateNum" :key='index' class="flex_r_s"
				style="margin:0rpx 0rpx 41rpx 0rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">周期时间</view>
				<picker class='date' mode="multiSelector" :range="dateTime" @change="dateSelect(index,$event)"
					@columnchange='columnChange'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view class='flex_r_b' style="width: 340rpx;text-align: center; color: #626262;">
							<view style="margin-left: 20rpx;">{{item.date||''}}</view>
							<view style="margin-right: 20rpx;">{{item.time||'请选择'}}</view>
						</view>
						<image style="width: 20rpx;height: 12rpx;margin-right: 10rpx;"
							src="../../static/check/down_arrow.png" mode="aspectFit"></image>
					</view>
				</picker>
			</view>
		</view>
		<view class="info flex_c_s">
			<view class="flex_r_b" style="width: 100%;margin: 80rpx 0 35rpx;">
				<view class="title ">执行时效</view>
				<view class="flex_r_s">
					<picker class='hour' mode="selector" :range="hourRange" @change="hourSelect">
						<view class='flex_r_b' style="min-width:140rpx;height: 60rpx;">
							<view
								style="color: #626262; width:110rpx; height: 60rpx;line-height: 60rpx;text-align: center;">
								{{aging||hourRange[hourIdx]}}
							</view>
							<image style="width: 22rpx;height:14rpx;margin-right: 10rpx;"
								src="../../static/check/down_arrow.png" mode="aspectFit"></image>
						</view>
					</picker>
					<view class='font-color' style="margin-right: 38rpx;color:;">小时</view>
				</view>
			</view>
			<view class="division flex_r_c">
				<view style="width: 173rpx;height: 1rpx;background-color: #5786F7;"></view>
				<view class="font-color" style="margin: 0 48rpx;">业务信息</view>
				<view style="width: 173rpx;height: 1rpx;background-color: #5786F7;"></view>
			</view>
		</view>
		<view class="info flex_r_s" @click="userChose('executor')">
			<view class="title ">执行人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['executor']||''}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png"
					mode="aspectFill"></image>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">问题描述</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="questionInput" placeholder="请输入问题描述"
					:value="questionDesc" />
				</textarea>
			</view>
		</view>
		<!-- 图片/视频/音频 选择 -->
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 65rpx 0 39rpx 31rpx ">附件</view>
			<view class="upload flex_r_b">
				<view v-for="(item,index) in imgList" :key='index' class='upload-img'>
					<image @click="chooseImg(index)" class='page_img' :src="item||'../../static/check/img_default.png'"
						mode="aspectFill"></image>
					<image v-if="item" @click.stop="deleteImg(index)" class='delete' src="../../static/check/delete.png"
						mode="aspectFill"></image>
				</view>
			</view>
			<view style="margin: 31rpx 0 31rpx 50rpx;color: #626262; font-size: 27rpx;">添加图片详细描述(可传4张)</view>
			<!-- 视频/音频 -->
			<view class="upload flex_r_b">
				<view class='upload-video  flex_c_s' @click="chooseVideo">
					<image v-if="!video" style="width:100%;height:150rpx;" src="../../static/check/video.png"
						mode="aspectFill"></image>
					<video class='video' id='myVideo' v-if="video" :src="video" controls></video>
					<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">添加视频详细描述异常</view>
					<image v-if="video" @click.stop="deleteVideo" class='delete1' src="../../static/check/delete.png"
						mode="aspectFill"></image>
				</view>
				<view class='upload-video  flex_c_s' @click="chooseAudio">
					<image style="width:100%;height:150rpx;"
						:src="voice?'../../static/voice.png':'../../static/check/audio.png'" mode="aspectFill"></image>
					<view v-if="!voice&&!isRecording" style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">
						点击录制语音(15s以内)
					</view>
					<view v-else-if="!voice&&isRecording" style="color: red; font-size: 27rpx;margin-top: 31rpx;">
						录音中({{count}} s),点击停止
					</view>
					<view v-else style="color: red; font-size: 27rpx;margin-top: 31rpx;">
						录音完成({{count}} s) 点击播放/暂停
					</view>
					<image v-if="voice" @click.stop="deleteVoice" class='delete1' src="../../static/check/delete.png"
						mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="info flex_r_s" @click="userChose('assist')">
			<view class="title ">协助人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['assist']||assistName||'请选择'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png"
					mode="aspectFill"></image>
			</view>
		</view>
		<view class="info flex_r_s" @click="userChose('cc')">
			<view class="title ">抄送人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['cc']||ccName||'请选择'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png"
					mode="aspectFill"></image>
			</view>
		</view>
		<view class="flex_r_c" style="margin: 54rpx 0 250rpx;">
			<!-- <view class="btn" style="margin-right: 130rpx;">撤销</view> -->
			<view class="btn" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import {
		DEBUG,
		SERVER_URL,
		OFFLINE_KEY,
		IMAGE_URL
	} from '../../util/config.js'
	let app = getApp()
	let self
	// 流程
	let process = ''
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	// 周列表
	let weekList = ['周', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
	// 月
	let month = ['月', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
	// 日
	let day = ['日', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
		'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
	]
	// 时
	let hour = ['时', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
		'17',
		'18', '19', '20', '21', '22', '23'
	]
	// 分
	let minute = ['分']
	// 秒
	let second = ['秒']
	// 问题描述
	let desc = ''
	// 计时器
	let timer
	// 选择的人员完整信息
	let choseInfo = {}
	let startTime = 0
	export default {
		data() {
			return {
				isLocalImage: 1, //文件路径是本地还是线上
				isLocalVideo: 1,
				isLocalVoice: 1,
				isUpdate: 0, //是否是修改
				aging: '', //执行时效
				updateUnit: '', //周期单位
				questionDesc: '', //问题描述
				executor: '', //执行人提交
				assist: '', //协助人提交
				cc: '', //抄送人提交
				assistName: '', //协助人名字
				ccName: '', //抄送人名字
				processContent: process, // 流程说明
				imgList: ['', '', '', ''],
				checkPoint: 0, //点检权限
				inspection: 0, //巡检权限
				video: '',
				voice: '',
				typeIdx: 0, //类型选择
				priorityIdx: 0, //优先级选择
				hourRange: [], //执行时效范围
				hourIdx: 0, //执行时效选择
				cycleRange: [], //周期单位范围
				cycleIdx: 1, //检查周期选择
				cycleUnitIdx: -1, //周期单位选择
				dateNum: [{}], //开始时间个数
				cycleNum: 1, //周期次数
				dateTime: [], //日期选择的范围
				date: '', //日期
				time: '', //时间
				deviceInfo: [], //选择的系统-主设备-子设备信息
				count: 0, //录音秒数
				isRecording: 0, //是否正在录音
				userChoseInfo: {}, //当前页面各类别人员选择信息
				key: '', //协助人/执行人/抄送人/审批人
				name: ''
			}
		},
		onReady() {
			for (let i = 0; i < 60; i++) {
				minute.push(i < 10 ? '0' + i : i)
				second.push(i < 10 ? '0' + i : i)
			}
			// 获取 video 上下文 videoContext 对象
			// this.videoContext = uni.createVideoContext('myVideo', this);
			// 进入全屏状态
			// this.videoContext.requestFullScreen();
		},
		onLoad() {
			self = this
			DEBUG && console.log('全局选择设备', app.globalData.deviceInfo)
			process = ''
			choseInfo = {}
			desc = ''
			this.name = app.globalData.userInfo.Name
			// 时效范围
			this.hourRange = app.globalData.setting.AGINGRANGE || []
			// 周期单位
			this.cycleRange = app.globalData.setting.PERIODUNIT || []
			// 点检
			this.checkPoint = app.globalData.userInfo.auth['checkPoint']
			// 巡检
			this.inspection = app.globalData.userInfo.auth['inspection']
			// 判断点巡检权
			if (app.globalData.userInfo.auth['checkPoint']) {
				this.typeIdx = 0
			} else {
				this.typeIdx = 1
			}
			let detailInfo = app.globalData.detailInfo
			// 如果是任务修改
			if (detailInfo) {
				// console.log('修改。。。');
				// 判断文件是不是线上路径
				this.isLocalImage = 0
				this.isLocalVideo = 0
				this.isLocalVoice = 0
				// 类别
				this.typeIdx = detailInfo.type
				// 是修改
				this.isUpdate = 1
				// 显示任务类别
				if (detailInfo.type == 0) {
					this.checkPoint = 1
					this.inspection = 0
				} else {
					this.checkPoint = 0
					this.inspection = 1
				}
				// 流程
				process = detailInfo.process
				this.processContent = process
				// 优先级
				this.priorityIdx = detailInfo.priority
				// 设备选择
				this.deviceInfo = detailInfo.components
				// 检查周期
				this.cycleIdx = 0
				// 周期单位
				this.updateUnit = detailInfo.unit
				// 周期次数
				this.cycleNum = detailInfo.num
				// 周期时间
				this.dateNum = detailInfo.time
				//执行时效
				this.aging = detailInfo.aging
				// 执行人
				this.name = detailInfo.executor
				this.executor = detailInfo.executors
				// 问题描述
				desc = detailInfo.desc
				this.questionDesc = desc
				// 如果有选择图片
				let image = ['', '', '', '']
				if (detailInfo.image[0]) {
					image[0] = detailInfo.image[0] ? IMAGE_URL + '/' + detailInfo.image[0] : ''
					image[1] = detailInfo.image[1] ? IMAGE_URL + '/' + detailInfo.image[1] : ''
					image[2] = detailInfo.image[2] ? IMAGE_URL + '/' + detailInfo.image[2] : ''
					image[3] = detailInfo.image[3] ? IMAGE_URL + '/' + detailInfo.image[3] : ''
				}
				this.imgList = image
				// 视频
				if (detailInfo.video) {
					this.video = IMAGE_URL + '/' + detailInfo.video
				}
				// 音频
				if (detailInfo.voice) {
					this.voice = IMAGE_URL + '/' + detailInfo.voice
					innerAudioContext.src = self.voice;
					setTimeout(function() {
						self.count = innerAudioContext.duration
					}, 200);
				}
				// 协助人
				this.assistName = detailInfo.assist
				this.assist = detailInfo.assists
				// 抄送人
				this.ccName = detailInfo.cc
				this.cc = detailInfo.ccs
			}
			// console.log('音频管理', recorderManager);
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
			if (this.voice) {
				// 已经暂停
				if (!innerAudioContext.paused) {
					// 暂停
					innerAudioContext.pause();
				}
			}
			// 清空选择数据
			app.globalData.detailInfo = ''
			app.globalData.deviceInfo = {}
			app.globalData.userChoseInfo = {}
			app.globalData.submitDeviceInfo = []
		},
		onShow() {
			// 用户选择的系统-主设备-子设备信息
			if (app.globalData.submitDeviceInfo[0]) {
				this.deviceInfo = JSON.parse(JSON.stringify(app.globalData.submitDeviceInfo))
			}
			DEBUG && console.log('全局选择', this.deviceInfo, app.globalData.submitDeviceInfo, app.globalData.userChoseInfo);
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
				DEBUG && console.log('选择数据', choseInfo);
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
			// 部件详情
			toDetail(id) {
				DEBUG && console.log('项目id', id);
				app.globalData.isPoint = this.typeIdx
				util.navigate('/pages/element_detail/element_detail', {
					componentId: id
				})
			},
			// 人员选择
			userChose(type) {
				util.navigate('/pages/user_choose/user_choose', {
					type
				})
				this.key = type
				// 清空原数据
				if (type == 'executor' && this.executor) {
					// 执行人
					this.name = app.globalData.userInfo.Name
					this.executor = ''
				}
				if (type == 'assist' && this.assist) {
					// 协助人
					this.assistName = ''
					this.assist = ''
				}
				if (type == 'cc' && this.cc) {
					// 抄送人
					this.ccName = ''
					this.cc = ''
				}
			},
			// 删除视频
			deleteVideo() {
				this.isLocalVideo = 1
				this.video = ''
			},
			// 删除音频
			deleteVoice() {
				this.isLocalVoice = 1
				this.voice = ''
			},
			// 删除系统-主设备-子设备
			deleteDevice(idx) {
				let key = this.deviceInfo[idx].system
				delete app.globalData.deviceInfo[key]
				let temp = Object.values(app.globalData.deviceInfo)
				if (temp[0]) {
					temp.forEach((item) => {
						item.device = Object.values(item.device)
					})
				}
				this.deviceInfo = temp
			},
			// 添加项目
			addPro() {
				app.globalData.isPoint = this.typeIdx
				util.navigate('/pages/system_choose/system_choose')
			},
			// 问题描述
			questionInput(e) {
				desc = e.detail.value
			},
			// 类型选择
			typeSelect(idx) {
				if (this.typeIdx != idx) {
					this.typeIdx = idx
					this.deviceInfo = []
				}
			},
			// 流程
			processInput(e) {
				process = e.detail.value
			},
			// 优先级选择
			prioritySelect(idx) {
				if (this.priorityIdx != idx) {
					this.priorityIdx = idx
				}
			},
			// 执行时效选择
			hourSelect(e) {
				this.aging = ''
				this.hourIdx = e.detail.value
			},
			// 检查周期选择
			cycleSelect(idx) {
				if (this.cycleIdx != idx) {
					this.cycleIdx = idx
				}
			},
			// 周期单位选择
			cycleUnitSelect(e) {
				this.updateUnit = ''
				this.cycleUnitIdx = e.detail.value
				switch (this.cycleRange[e.detail.value]) {
					case '年':
						this.dateTime = [
							[...month],
							[...day],
							[...hour],
							[...minute],
							[...second]
						]
						break;
					case '月':
						this.dateTime = [
							[...day],
							[...hour],
							[...minute],
							[...second]
						]
						break;
					case '日':
						this.dateTime = [
							[...hour],
							[...minute],
							[...second]
						]
						break;
					case '小时':
						this.dateTime = [
							[...minute],
							[...second]
						]
						break;
					case '周':
						this.dateTime = [
							[...weekList],
							[...hour],
							[...minute],
							[...second]
						]
						break;
					default:
						break;
				}
				this.dateNum.forEach(item => {
					item.date = ''
					item.time = ''
				})
			},
			// 周期次数
			cycleNumSelect(e) {
				// console.log(e);
				if (e.detail.value > 0) {
					this.cycleNum = e.detail.value
					this.dateNum = new Array(parseInt(e.detail.value)).fill('{}')
				} else {
					this.dateNum = []
				}
			},
			// 时间选择器每列触发事件
			columnChange(e) {
				DEBUG && console.log('列变化', e);
				if (this.cycleRange[this.cycleUnitIdx] == '年' && e.detail.column == 0) {
					// 选择的月份
					let value = e.detail.value
					if (value == 2) {
						this.dateTime[1] = [...day.slice(0, 29)]
					} else if (value == 4 || value == 6 || value == 9 || value == 11) {
						this.dateTime[1] = [...day.slice(0, 31)]
					} else {
						this.dateTime[1] = [...day]
					}
				}

			},
			// 时间选择器值改变时触发
			dateSelect(idx, e) {
				let temp = []
				let dateNum = JSON.parse(JSON.stringify(this.dateNum))
				let value = e.detail.value
				value.forEach((item, index) => {
					if (item == 0) {
						temp.push(this.dateTime[index][item + 1])
					} else {
						temp.push(this.dateTime[index][item])
					}
				})

				if (temp.length - 3 < 1) {
					dateNum[idx] = {
						date: '',
						time: temp.join(':')
					}
				} else {
					let date = temp.slice(0, temp.length - 3).join('-')
					let time = temp.slice(temp.length - 3).join(':')
					dateNum[idx] = {
						date,
						time
					}
				}
				this.dateNum = dateNum
				// console.log(this.dateNum);
			},
			// 图片选择
			chooseImg(idx) {
				// 如果存在则预览
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
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
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
						// 改为本地
						self.isLocalImage = 1
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
						compressed: true,
						sourceType: ['camera', 'album'],
						success: function(res) {
							DEBUG && console.log('视频文件', res.tempFilePath);
							// videoCompress.compress({
							// 	source: res.tempFilePath,
							// 	bitRate: 55000,
							// 	size: 640
							// }, result => {
							// 	DEBUG && console.log('压缩后返回', result);
							// 	if (result.status == 'success') {
							// 		self.video = result.path;
							// 	}
							// });
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
				if (this.isRecording) {
					util.showModal('录音中不能提交')
					return
				}
				let files = []
				let image_0 = ''
				let image_1 = ''
				let image_2 = ''
				let image_3 = ''
				let video = ''
				let voice = ''
				if (!this.isLocalImage) {
					this.imgList.forEach((item, index) => {
						index == 0 && (image_0 = item.replace(IMAGE_URL + '/', ""))
						index == 1 && (image_1 = item.replace(IMAGE_URL + '/', ""))
						index == 2 && (image_2 = item.replace(IMAGE_URL + '/', ""))
						index == 3 && (image_3 = item.replace(IMAGE_URL + '/', ""))
					})
				} else {
					this.imgList.forEach((item, index) => {
						if (item) {
							files.push({
								name: `image_${index}`,
								uri: item
							})
						}
					})
				}

				if (this.video) {
					if (!this.isLocalVideo) {
						video = this.video.replace(IMAGE_URL + '/', "")
					} else {
						files.push({
							name: `video`,
							uri: this.video
						})
					}
				}
				if (this.voice) {
					if (!this.isLocalVoice) {
						video = this.voice.replace(IMAGE_URL + '/', "")
					} else {
						files.push({
							name: `voice`,
							uri: this.voice
						})
					}
				}
				let fileData = {}
				// 如果有文件再传
				if (files.length > 0) {
					fileData = {
						files
					}
				}
				DEBUG && console.log('上传文件列表', files, fileData);
				if (!this.deviceInfo[0]) {
					util.showModal('请选择项目')
					return
				}
				// 如果是周期性的
				if (this.cycleIdx == 0) {
					if (!this.cycleRange[this.cycleUnitIdx] && !this.updateUnit) {
						util.showModal('请选择周期单位')
						return
					}
					if (!this.cycleNum || this.cycleNum < 1) {
						util.showModal('周期次数至少为1')
						return
					}
					for (let i = 0; i < this.dateNum.length; i++) {
						if (!this.dateNum[i].time) {
							util.showModal('请完善周期时间')
							return
						}
					}
				}
				let executor = choseInfo['executor'] ? Object.keys(choseInfo['executor']) : (this.excutor || [])
				let assist = choseInfo['assist'] ? Object.keys(choseInfo['assist']) : (this.assist || [])
				let cc = choseInfo['cc'] ? Object.keys(choseInfo['cc']) : (this.cc || [])
				if (executor.length < 1) {
					util.showModal('请选择执行人')
					return
				}
				// 上传参数
				let queryData = {
					type: this.typeIdx,
					process,
					priority: this.priorityIdx,
					components: JSON.stringify(this.deviceInfo),
					isCycle: this.cycleIdx == 0 ? 1 : 0,
					unit: this.updateUnit || this.cycleRange[this.cycleUnitIdx],
					num: this.cycleNum,
					time: JSON.stringify(this.dateNum),
					aging: this.hourRange[this.hourIdx],
					desc,
					executor: JSON.stringify(executor),
					assist: JSON.stringify(assist),
					cc: JSON.stringify(cc),
					voiceTime: this.count,
					image_0,
					image_1,
					image_2,
					image_3,
					video,
					voice
				}
				let url = '/user/releaseCheckTask'
				if (app.globalData.detailInfo) {
					queryData['id'] = app.globalData.detailInfo.id
					url = '/user/updateTask'
				}
				DEBUG && console.log('参数', queryData);
				util.showLoading('提交中...')
				uni.uploadFile({
					...fileData,
					url: SERVER_URL + url, //仅为示例，非真实的接口地址
					filePath: '',
					name: '',
					header: {
						Authorization: `Bearer ${request.TOKEN}`
					},
					formData: queryData,
					success: (uploadFileRes) => {
						let res = JSON.parse(uploadFileRes.data)
						if (res.statusCode == 200) {
							util.hideLoading()
							if (this.isUpdate) {
								util.goBack({
									delta: 2
								})
							} else {
								util.goBack()
							}
						} else {
							util.hideLoading()
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

	.chose-icon {
		width: 30rpx;
		height: 30rpx;
		border-radius: 25rpx;
	}

	.chose-content {
		font-size: 28rpx;
		margin-left: 20rpx;
	}

	.title-content-input {
		width: 100%;
		margin: 33rpx 0;
		background-color: #F2F2F2;
		font-size: 27rpx;
		color: #626262;
		min-height: 93rpx;
		padding: 5rpx 5rpx;
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
		background-color: #F2F2F2;
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
		z-index: 999;
	}
</style>

<template>
	<view class='container'>
		<view class="info flex_r_s">
			<view class="title">类型</view>
			<view class="title-content flex_r_s">
				<view class='flex_r_s'>
					<image class='chose-icon' :src="typeIdx==0?'../../static/check/select.png':'../../static/check/unselect.png'" mode="aspectFit"></image>
					<view class="chose-content" :class="[typeIdx==0?'font-color':'un-font-color']">维修</view>
				</view>
				<!-- 	<view class='flex_r_s' style="margin-left: 50rpx;" @click="typeSelect(1)">
					<image class='chose-icon' :src="typeIdx==1?'../../static/check/select.png':'../../static/check/unselect.png'" mode="aspectFit"></image>
					<view class="chose-content" :class="[typeIdx==1?'font-color':'un-font-color']">大修列表</view>
				</view> -->
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">流程说明</view>
			<view class="title-content">
				<textarea auto-height class='title-content-input' @input='processInput' placeholder="请输入流程说明" value="">
				</textarea>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">优先级</view>
			<view class="title-content flex_r_s">
				<view class='flex_r_s' @click="prioritySelect(0)">
					<image class='chose-icon' :src="priorityIdx==0?'../../static/check/select.png':'../../static/check/unselect.png'"
					 mode="aspectFill"></image>
					<view class="chose-content" :class="[priorityIdx==0?'font-color':'un-font-color']">正常</view>
				</view>
				<view class='flex_r_s' style="margin-left: 50rpx;" @click="prioritySelect(1)">
					<image class='chose-icon' :src="priorityIdx==1?'../../static/check/select.png':'../../static/check/unselect.png'"
					 mode="aspectFill"></image>
					<view class="chose-content" :class="[priorityIdx==1?'font-color':'un-font-color']">重要</view>
				</view>
				<view class='flex_r_s' style="margin-left: 50rpx;" @click="prioritySelect(2)">
					<image class='chose-icon' :src="priorityIdx==2?'../../static/check/select.png':'../../static/check/unselect.png'"
					 mode="aspectFill"></image>
					<view class="chose-content" :class="[priorityIdx==2?'font-color':'un-font-color']">紧急重要</view>
				</view>
			</view>
		</view>
		<view class="info flex_c_s">
			<view class="flex_r_b" style="width: 100%;margin: 80rpx 0 35rpx;">
				<view class="title ">维修设备</view>
				<image @click="addPro" style="width: 40rpx;height: 40rpx;margin-right: 38rpx;" src="../../static/check/add.png"
				 mode="aspectFit"></image>
			</view>
			<!-- 点检或巡检项目 -->
			<view v-for="(item,index) in deviceInfo" :key="index" style="width: 100%;">
				<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
					<view style="font-size: 27rpx;color: #626262;margin: 41rpx 0 41rpx 31rpx;">系统名称: {{item.systemName}}</view>
					<image @click='deleteDevice(index)' src="../../static/check/delete.png" mode="aspectFit" style=" margin:0 38rpx 0 0;width: 40rpx;height:40rpx;"></image>
				</view>
				<view v-for="(itm,idx) in item.device" :key="idx">
					<view class="flex_c_b_s" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="margin:41rpx 38rpx 41rpx 50rpx;font-size: 27rpx;color: #626262;">设备名称: {{itm.parentName}}</view>
						<!-- <view v-if="overhaulName" style=" margin:10rpx 0 41rpx 50rpx; font-size: 24rpx;color: #007AFF;">大修项目:
							{{overhaulName}}</view> -->
					</view>
					<view v-for="(itm1,idx1) in itm.child" :key='idx1' class="flex_c_s" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="width: 580rpx; margin:41rpx 0;font-size: 27rpx;color: #626262;">
							({{idx1+1}}) 维修项目: {{itm1.name}}
						</view>
						<!-- 选择检查情况 -->
						<view class="flex_r_s_s" style="width: 600rpx;margin: 30rpx 0 35rpx;">
							<view class="title" style="margin-left: 0rpx;">维修类型</view>
							<view class="flex_c_s_s" style="width: 420rpx;">
								<view class="flex_r_s_s">
									<view class='flex_r_s' @click="checkEvent(index,idx,idx1,0)">
										<image class='chose-icon' :src="itm1.type==0?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[itm1.type==0?'font-color':'un-font-color']" class="chose-content">停修</view>
									</view>
									<view class='flex_r_s' style="margin-left: 50rpx;" @click="checkEvent(index,idx,idx1,1)">
										<image class='chose-icon' :src="itm1.type==1?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[itm1.type==1?'font-color':'un-font-color']" class="chose-content">不停修</view>
									</view>
								</view>
							</view>
						</view>
						<view class="flex_r_s_s" style="width: 600rpx;margin: 30rpx 0 35rpx;">
							<view class="title" style="margin-left: 0rpx;">问题类型</view>
							<view class="flex_c_s_s" style="width: 500rpx;">
								<view class="flex_r_s_s">
									<view class='flex_r_s' @click="checkEvent1(index,idx,idx1,0)">
										<image class='chose-icon' :src="itm1.questionType==0?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[itm1.questionType==0?'font-color':'un-font-color']" class="chose-content" style="margin-left: 10rpx;font-size: 22rpx;">机械故障</view>
									</view>
									<view class='flex_r_s' style="margin-left: 15rpx;" @click="checkEvent1(index,idx,idx1,1)">
										<image class='chose-icon' :src="itm1.questionType==1?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[itm1.questionType==1?'font-color':'un-font-color']" class="chose-content" style="margin-left: 10rpx;font-size: 22rpx;">电气故障</view>
									</view>
									<view class='flex_r_s' style="margin-left: 15rpx;" @click="checkEvent1(index,idx,idx1,2)">
										<image class='chose-icon' :src="itm1.questionType==2?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[itm1.questionType==2?'font-color':'un-font-color']" class="chose-content" style="margin-left: 10rpx;font-size: 22rpx;">工艺故障</view>
									</view>
								</view>
								<view class="flex_r_s_s" style="margin-top: 40rpx;">
									<view class='flex_r_s' @click="checkEvent1(index,idx,idx1,3)">
										<image class='chose-icon' :src="itm1.questionType==3?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[itm1.questionType==3?'font-color':'un-font-color']" class="chose-content" style="margin-left: 10rpx;font-size: 22rpx;">其他故障</view>
									</view>
									<view class='flex_r_s' style="margin-left: 15rpx;" @click="checkEvent1(index,idx,idx1,4)">
										<image class='chose-icon' :src="itm1.questionType==4?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[itm1.questionType==4?'font-color':'un-font-color']" class="chose-content" style="margin-left: 10rpx;font-size: 22rpx;">现场判断</view>
									</view>
									<view class='flex_r_s' style="margin-left: 15rpx;" @click="checkEvent1(index,idx,idx1,5)">
										<image class='chose-icon' :src="itm1.questionType==5?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[itm1.questionType==5?'font-color':'un-font-color']" class="chose-content" style="margin-left: 10rpx;font-size: 22rpx;">自定义</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 问题类型自定义 -->
						<view v-if="itm1.questionType==5" class="flex_c_s_s" style="background-color: #F2F2F2; font-size: 27rpx; width: 600rpx; color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
							<view class="flex_c_c" style="width: 100%;height: 150rpx;">
								<textarea style="width: 100%;height: 100%;" @input="typeInput(index,idx,idx1,$event)" placeholder="请描述类型" value="" />
								</textarea>
							</view>
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
						<image class='chose-icon' :src="cycleIdx==0?'../../static/check/select.png':'../../static/check/unselect.png'"
						 mode="aspectFit"></image>
						<view class="chose-content " :class="[cycleIdx==0?'font-color':'un-font-color']">周期性</view>
					</view>
					<view class='flex_r_s' style="margin-left: 50rpx;" @click="cycleSelect(1)">
						<image class='chose-icon' :src="cycleIdx==1?'../../static/check/select.png':'../../static/check/unselect.png'"
						 mode="aspectFit"></image>
						<view class="chose-content" :class="[cycleIdx==1?'font-color':'un-font-color']">临时性</view>
					</view>
				</view>
			</view>
			<view v-if="cycleIdx==0" class="flex_r_s" style="margin:41rpx 0rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">周期单位</view>
				<picker class='cycle' mode="selector" :range="cycleRange" @change="cycleUnitSelect">
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view style="min-width: 50rpx;text-align: center; color: #626262;margin: 0 10rpx;">{{cycleRange[cycleUnitIdx]||'请选择'}}</view>
						<image style="width: 20rpx;height: 12rpx;margin-right: 10rpx;" src="../../static/check/down_arrow.png" mode="aspectFit"></image>
					</view>
				</picker>
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 106rpx;">周期次数</view>
				<view class='cycle'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<input style="width: 50rpx;text-align: right; color: #626262;" type="number" :value="cycleNum" @input="cycleNumSelect" />
						<view style="margin-right: 10rpx;">次</view>
					</view>
				</view>
			</view>
			<view v-if="cycleIdx==0" v-for="(item,index) in dateNum" :key='index' class="flex_r_s" style="margin:0rpx 0rpx 41rpx 0rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">周期时间</view>
				<picker class='date' mode="multiSelector" :range="dateTime" @change="dateSelect(index,$event)" @columnchange='columnChange'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view class='flex_r_b' style="width: 340rpx;text-align: center; color: #626262;">
							<view style="margin-left: 20rpx;">{{item.date||''}}</view>
							<view style="margin-right: 20rpx;">{{item.time||'请选择'}}</view>
						</view>
						<image style="width: 20rpx;height: 12rpx;margin-right: 10rpx;" src="../../static/check/down_arrow.png" mode="aspectFit"></image>
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
							<view style="color: #626262; width:110rpx; height: 60rpx;line-height: 60rpx;text-align: center;">{{hourRange[hourIdx]}}</view>
							<image style="width: 22rpx;height:14rpx;margin-right: 10rpx;" src="../../static/check/down_arrow.png" mode="aspectFit"></image>
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
				<view style="color: #626262;">{{userChoseInfo['executor']||name}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">执行须知</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="attentionInput" placeholder="请输入执行须知" value="" />
				</textarea>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">问题描述</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="questionInput" placeholder="请输入问题描述" value="" />
				</textarea>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">原因分析</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="reasonInput" placeholder="请输入原因分析" value="" />
				</textarea>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">解决方案</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="resultInput" placeholder="请输入问题描述" value="" />
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
		<view class="info flex_r_s" @click="userChose('assist')">
			<view class="title ">协助人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['assist']||'请选择'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="info flex_r_s" @click="userChose('cc')">
			<view class="title ">抄送人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['cc']||'请选择'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
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
		SERVER_URL
	} from '../../util/config.js'
	let app = getApp()
	let self
	// 流程
	let process = ''
	const recorderManager = uni.getRecorderManager();
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
	// 原因分析
	let reason = ''
	// 执行须知
	let attention = ''
	// 解决方法
	let result = ''
	// 自定义问题类型
	let question = ''
	// 计时器
	let timer
	// 选择的人员完整信息
	let choseInfo = {}
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				oldComponents: [],
				oldType: '', //原先项目类别
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
				name: '',
				checkInfo: {},
				overhaulName: '' //大修项目名称
			}
		},
		onReady() {
			for (let i = 0; i < 60; i++) {
				minute.push(i < 10 ? '0' + i : i)
				second.push(i < 10 ? '0' + i : i)
			}
		},
		onLoad(params) {
			self = this
			this.oldType = params.type || ''
			// 是否有无法解决的点巡检项目/隐患
			if (app.globalData.submitDeviceInfo[0]) {
				this.oldComponents = JSON.parse(JSON.stringify(app.globalData.submitDeviceInfo))
				this.handleOldDevice()
			}
			// this.overhaulName = app.globalData.submitDeviceInfo[0].device[0].child[0].name
			// app.globalData.submitDeviceInfo[0].device[0].child = []
			process = ''
			// 问题描述
			desc = ''
			// 原因分析
			reason = ''
			// 执行须知
			attention = ''
			// 解决方法
			result = ''
			// 自定义问题类型
			question = ''
			// 选择的人员完整信息
			choseInfo = {}
			this.name = app.globalData.userInfo.Name
			// 时效范围
			this.hourRange = app.globalData.setting.AGINGRANGE || []
			// 周期单位
			this.cycleRange = app.globalData.setting.PERIODUNIT || []
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
			// 清空选择数据
			app.globalData.deviceInfo = {}
			app.globalData.userChoseInfo = {}
			app.globalData.submitDeviceInfo = []
			app.globalData.verifyInfo = {}
		},
		onShow() {
			// 用户选择的系统-主设备-子设备信息
			let deviceInfo = app.globalData.submitDeviceInfo
			for (let i = 0; i < deviceInfo.length; i++) {
				let device = deviceInfo[i].device
				for (let j = 0; j < device.length; j++) {
					let child = device[j].child
					child.forEach(item => {
						item.type = 0
						item.questionType = 0
					})
				}
			}
			this.deviceInfo = JSON.parse(JSON.stringify(deviceInfo))
			DEBUG && console.log('全局选择', app.globalData.submitDeviceInfo, app.globalData.userChoseInfo);
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
			// 处理无法解决的点巡检设备
			handleOldDevice() {
				let components = app.globalData.submitDeviceInfo
				components.forEach((item, index) => {
					item.device.forEach(itm => {
						// 如果是点巡检,主设备和子设备一样
						if (self.oldType != 6) {
							app.globalData.deviceInfo[item.system] = {
								system: item.system,
								systemName: item.systemName,
								device: {
									[itm.parent]: {
										child: [{
											id: itm.parent,
											name: itm.parentName
										}],
										parent: itm.parent,
										parentName: itm.parentName
									}
								}
							}
							itm.child = [{
								id: itm.parent,
								name: itm.parentName
							}]
						} else {
							// 隐患
							app.globalData.deviceInfo[item.system] = {
								system: item.system,
								systemName: item.systemName,
								device: {
									[itm.parent]: itm
								}
							}
						}
					})
				})
				this.deviceInfo = JSON.parse(JSON.stringify(components))
			},
			// 子设备检查情况
			checkEvent(idx1, idx2, idx3, idx) {
				if (this.deviceInfo[idx1].device[idx2].child[idx3].type != idx) {
					this.deviceInfo[idx1].device[idx2].child[idx3].type = idx
				}
				this.deviceInfo = JSON.parse(JSON.stringify(this.deviceInfo))
			},
			// 子设备检查情况
			checkEvent1(idx1, idx2, idx3, idx) {
				if (this.deviceInfo[idx1].device[idx2].child[idx3].questionType != idx) {
					this.deviceInfo[idx1].device[idx2].child[idx3].questionType = idx
					if (idx != 5) {
						this.deviceInfo[idx1].device[idx2].child[idx3].content = ''
					}
				}
				this.deviceInfo = JSON.parse(JSON.stringify(this.deviceInfo))
			},
			// 问题类型输入
			typeInput(idx1, idx2, idx3, e) {
				this.deviceInfo[idx1].device[idx2].child[idx3].content = e.detail.value
				console.log(this.deviceInfo);
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
				app.globalData.isPoint = this.typeIdx == 0 ? 2 : 3
				util.navigate('/pages/system_choose/system_choose')
			},
			// 问题描述
			questionInput(e) {
				desc = e.detail.value
			},
			// 执行须知
			attentionInput(e) {
				attention = e.detail.value
			},
			// 原因分析
			reasonInput(e) {
				reason = e.detail.value
			},
			// 解决方法
			resultInput(e) {
				result = e.detail.value
			},
			// 类型选择
			typeSelect(idx) {
				if (this.typeIdx != idx) {
					this.typeIdx = idx

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
				if (this.isRecording) {
					util.showModal('录音中不能提交')
					return
				}
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
				DEBUG && console.log('上传文件列表', files, fileData);
				if (this.deviceInfo[0].device[0].child.length == 0) {
					util.showModal('请选择维修项目')
					return
				}
				// 如果是周期性的
				if (this.cycleIdx == 0) {
					if (!this.cycleRange[this.cycleUnitIdx]) {
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
				let executor = Object.keys(choseInfo['executor'] || {})
				let assist = Object.keys(choseInfo['assist'] || {})
				let cc = Object.keys(choseInfo['cc'] || {})
				// if (executor.length < 1) {
				// 	util.showModal('请选择执行人')
				// 	return
				// }
				// 上传参数
				let queryData = {
					type: this.typeIdx == 0 ? 2 : 3,
					process,
					priority: this.priorityIdx,
					components: JSON.stringify(this.deviceInfo),
					isCycle: this.cycleIdx == 0 ? 1 : 0,
					unit: this.cycleRange[this.cycleUnitIdx],
					num: this.cycleNum,
					time: JSON.stringify(this.dateNum),
					aging: this.hourRange[this.hourIdx],
					desc,
					attention,
					reason,
					result,
					executor: JSON.stringify(executor),
					assist: JSON.stringify(assist),
					cc: JSON.stringify(cc),
					voiceTime: this.count,
					overhaulId: app.globalData.overhaulInfo.overhaulId
				}
				console.log('参数', queryData, this.deviceInfo);
				util.showLoading('提交中...')
				uni.uploadFile({
					...fileData,
					filePath: '',
					name: '',
					url: SERVER_URL + '/user/releaseCheckTask', //仅为示例，非真实的接口地址
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
							app.globalData.overhaulInfo = {}
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

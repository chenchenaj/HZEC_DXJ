<template>
	<view class='container'>
		<view class="info flex_r_s">
			<view class="title">场景</view>
			<view class="title-content flex_r_s">
				<image class='chose-icon' src="../../static/check/select.png" mode="aspectFit"></image>
				<view class="chose-content font-color">设备隐患</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">流程说明</view>
			<view class="title-content">
				<textarea auto-height class='title-content-input' @input='processInput' placeholder="请输入流程说明" value="" />
				</textarea>
			</view>
		</view>
		<!-- 优先级 -->
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
				<view class="title ">设备隐患</view>
				<view class="flex_r_s">
					<view v-if="deviceInfo[0]" class='verify-btn' @click="open">批量选择审批人</view>
					<image @click="addPro" style="width: 40rpx;height: 40rpx;margin-right: 38rpx;" src="../../static/check/add.png"
					 mode="aspectFit"></image>
				</view>
			</view>
			<!-- 点检或巡检项目 -->
			<view v-for="(item,index) in deviceInfo" :key="index" style="width: 100%;">
				<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
					<view style="margin-left: 31rpx;font-size: 27rpx;color: #626262;">系统名称: {{item.systemName}}</view>
					<image @click='deleteDevice(index)' src="../../static/check/delete.png" mode="aspectFit" style=" margin:41rpx 38rpx 41rpx 0;width: 40rpx;height:40rpx;"></image>
				</view>
				<view v-for="(itm,idx) in item.device" :key="idx">
					<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="margin:41rpx 38rpx 41rpx 50rpx;font-size: 27rpx;color: #626262;">设备名称: {{itm.parentName}}</view>
					</view>
					<view v-for="(itm1,idx1) in itm.child" :key='idx1' class="flex_c_s" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="width: 600rpx; margin:41rpx 0;font-size: 27rpx;color: #626262;">
							({{idx1+1}}) 隐患项目: {{itm1.name}}
						</view>
						<!-- 审批人 -->
						<view @click="userChose('verify',itm1.id)" class='flex_r_b' style="width: 600rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
							<view class="title" style="margin-left: 0;color:#000000">审批人</view>
							<view class="title-content  flex_r_e">
								<block v-if="userChoseInfo['verify'][itm1.id]" v-for="(itm2,idx2) in userChoseInfo['verify'][itm1.id]" :key="idx2">
									<view v-if="idx2<4" class='user-item'> {{itm2.username}}</view>
									<view v-if="idx2<4&&idx2!=userChoseInfo['verify'][itm1.id].length-1" style="color: #5786F7;">></view>
								</block>
								<view v-if="userChoseInfo['verify'][itm1.id]&&userChoseInfo['verify'][itm1.id].length>4" style="color: #5786F7;">...</view>
								<view v-if="!userChoseInfo['verify'][itm1.id]||!userChoseInfo['verify'][itm1.id][0]" style="color: #626262;">请选择</view>
								<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
							</view>
						</view>
						<!-- 抄送人 -->
						<view @click="userChose('cc',itm1.id)" class='flex_r_b' style="width: 600rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
							<view class="title" style="margin-left: 0;color:#000000">抄送人</view>
							<view class="title-content  flex_r_e">
								<view style="color: #626262;">{{userChoseInfo['cc'][itm1.id]||'请选择'}}</view>
								<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
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
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">问题描述</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="questionInput" placeholder="请输入问题描述" value="" />
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
				<view class='upload-video  flex_c_s' @click="chooseAudio">
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
		<!-- 	<view class="info flex_r_s" @click="userChose('verify')">
			<view class="title ">审批人</view>
			<view class="title-content flex_r_e">
				<block v-for="(item,index) in userChoseInfo['verify']" :key="index">
					<view v-if="index<4" class='user-item'> {{item.username}}</view>
					<view v-if="index<4&&index!=userChoseInfo['verify'].length-1" style="color: #5786F7;">></view>
				</block>
				<view v-if="list.length>4" style="color: #5786F7;">...</view>
				<view v-if="!userChoseInfo['verify']||!userChoseInfo['verify'][0]" style="color: #626262;">请选择</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
		</view> -->
		<!-- 	<view class="info flex_r_s" @click="userChose('cc')">
			<view class="title ">抄送人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['cc']||'请选择'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
		</view> -->
		<view class="flex_r_c" style="margin: 54rpx 0 250rpx;">
			<!-- <view class="btn" style="margin-right: 130rpx;">撤销</view> -->
			<view class="btn" @click="submit">提交</view>
		</view>
		<modal ref="modal">
			<view class='modal-content flex_c_s ' @tap.stop='blank'>
				<scroll-view scroll-y="true" style="width: 99%;height: 500rpx;margin-top: 50rpx; border-bottom: 1rpx solid #666666;">
					<view v-for="(item,index) in batchVerifyList" :key="index" style="width: 100%;font-size: 27rpx;margin-bottom: 20rpx;">
						<view class="flex_r_s" style="width: 100%;" @click="verifySelect(index)">
							<image class='list-icon' :src="item.isSelected?'../../static/login/selected.png':'../../static/login/unselected.png'"
							 mode="aspectFill"></image>
							<view class="name line1">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
				<!-- 审批人 -->
				<view @click="userChose('batchVerify')" class='flex_r_b' style="width: 550rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
					<view class="title" style="margin-left: 0;color:#000000">审批人</view>
					<view class="title-content  flex_r_e">
						<block v-if="userChoseInfo['batchVerify']" v-for="(itm2,idx2) in userChoseInfo['batchVerify']" :key="idx2">
							<view v-if="idx2<4" class='user-item'> {{itm2.username}}</view>
							<view v-if="idx2<4&&idx2!=userChoseInfo['batchVerify'].length-1" style="color: #5786F7;">></view>
						</block>
						<view v-if="userChoseInfo['batchVerify']&&userChoseInfo['batchVerify'].length>4" style="color: #5786F7;">...</view>
						<view v-if="!userChoseInfo['batchVerify']||!userChoseInfo['batchVerify'][0]" style="color: #626262;">请选择</view>
						<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="btn" style="margin-top: 30rpx;" @click="verifySubmit">确定</view>
			</view>
		</modal>
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
	// 流程
	let process = ''
	// 问题描述
	let desc = ''
	// 计时器
	let timer
	// 选择的人员完整信息
	let choseInfo = {
		cc: {},
		verify: {},
		batchVerify: {}
	}
	let self
	let startTime = 0
	// 子设备id
	let childId = ''
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				imgList: ['', '', '', ''],
				video: '',
				voice: '',
				priorityIdx: 0, //优先级选择
				deviceInfo: [], //选择的系统-主设备-子设备信息
				count: 0, //录音秒数
				isRecording: 0, //是否正在录音
				userChoseInfo: {
					cc: {},
					verify: {},
					batchVerify: []
				}, //当前页面各类别人员选择信息
				key: '', //协助人/执行人/抄送人/审批人
				name: '', //用户名
				list: [],
				batchVerifyList: [] //批量审批列表
			}
		},
		onLoad() {
			self = this
			choseInfo = {
				cc: {},
				verify: {},
				assist: {}
			}
			process = ''
			// 问题描述
			desc = ''
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
			this.name = app.globalData.userInfo.Name
		},
		onUnload() {
			DEBUG && console.log('卸载数据');
			if (this.voice) {
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
		},
		onShow() {
			// 用户选择的系统-主设备-子设备信息
			this.deviceInfo = app.globalData.submitDeviceInfo
			DEBUG && console.log('全局选择', app.globalData.submitDeviceInfo, app.globalData.userChoseInfo);
			// 当前选择的人员类型
			if (childId && app.globalData.userChoseInfo[this.key] && app.globalData.userChoseInfo[this.key][childId]) {
				choseInfo[this.key][childId] = app.globalData.userChoseInfo[this.key][childId].choseInfo || {}
				if (Object.values(choseInfo[this.key][childId]).length > 0) {
					if (this.key == 'cc') {
						this.userChoseInfo[this.key][childId] = Object.values(choseInfo[this.key][childId]).map(item => {
							return item.username
						}).join('、')
					} else {
						this.userChoseInfo[this.key][childId] = Object.values(choseInfo[this.key][childId])
					}
				} else if (this.key == 'verify') {
					this.userChoseInfo[this.key][childId] = []
				} else {
					this.userChoseInfo[this.key][childDeviceId] = ''
				}
				this.userChoseInfo = JSON.parse(JSON.stringify(this.userChoseInfo))
				DEBUG && console.log('选择数据', choseInfo, this.userChoseInfo);
			} else if (!childId && app.globalData.userChoseInfo[this.key]) {
				choseInfo[this.key] = app.globalData.userChoseInfo[this.key].choseInfo || {}
				if (Object.values(choseInfo[this.key]).length > 0) {
					this.userChoseInfo[this.key] = Object.values(choseInfo[this.key])
				}
				this.userChoseInfo = JSON.parse(JSON.stringify(this.userChoseInfo))
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
			// 批量选择确定
			verifySubmit() {
				if (this.batchVerifyList[0]) {
					this.batchVerifyList.forEach((item, index) => {
						if (item.isSelected) {
							// 如果选择了审批人再执行
							if (choseInfo[this.key]) {
								if (app.globalData.userChoseInfo['verify']) {
									app.globalData.userChoseInfo['verify'][item.taskId] = {
										choseInfo: choseInfo[this.key]
									}
								} else {
									app.globalData.userChoseInfo['verify'] = {
										[item.taskId]: {
											choseInfo: choseInfo[this.key]
										}
									}
								}
								choseInfo['verify'][item.taskId] = choseInfo[this.key]
								this.userChoseInfo['verify'][item.taskId] = this.userChoseInfo[this.key]
							}

						}
					})
					this.userChoseInfo = JSON.parse(JSON.stringify(this.userChoseInfo))
				}
				this.$refs.modal.close()
			},
			// 审批人员批量选择
			verifySelect(idx) {
				this.batchVerifyList[idx].isSelected = !this.batchVerifyList[idx].isSelected
			},
			// 打开弹窗
			open() {
				this.key = 'batchVerify'
				delete this.userChoseInfo[this.key]
				delete choseInfo[this.key]
				delete app.globalData.userChoseInfo[this.key]
				let list = []
				// 生成批量审批人列表
				this.deviceInfo.forEach((item, index) => {
					item.device.forEach((itm, idx) => {
						itm.child.forEach((itm1, idx1) => {
							let data = this.userChoseInfo['verify'][itm1.taskComponentId || itm1.id]
							if (!data || (data && data.length == 0)) {
								list.push({
									name: itm1.name,
									taskId: itm1.taskComponentId || itm1.id,
									isSelected: false
								})
							}
						})
					})
				})
				// 批量审批人列表
				this.batchVerifyList = JSON.parse(JSON.stringify(list))
				DEBUG && console.log('批量审批人列表', this.batchVerifyList);
				this.$refs.modal.open()
			},
			blank() {},
			// 人员选择
			userChose(type, id) {
				childId = id || ''
				util.navigate('/pages/user_choose/user_choose', {
					type,
					id: id || ''
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
				app.globalData.isPoint = 6
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
						console.log('图片列表', self.imgList);
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
							DEBUG && console.log('视频文件', res.tempFilePath);
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
				if (!this.deviceInfo[0]) {
					util.showModal('请选择隐患项目')
					return
				}
				// 如果是周期性的
				// if (this.cycleIdx == 0) {
				// 	if (!this.cycleRange[this.cycleUnitIdx]) {
				// 		util.showModal('请选择周期单位')
				// 		return
				// 	}
				// 	if (!this.cycleNum || this.cycleNum < 1) {
				// 		util.showModal('周期次数至少为1')
				// 		return
				// 	}
				// 	for (let i = 0; i < this.dateNum.length; i++) {
				// 		if (!this.dateNum[i].time) {
				// 			util.showModal('请完善周期时间')
				// 			return
				// 		}
				// 	}
				// }
				let cc = choseInfo['cc'] || {}
				let verify = choseInfo['verify'] || {}
				// 上传参数
				let queryData = {
					type: 6,
					process,
					priority: this.priorityIdx,
					components: JSON.stringify(this.deviceInfo),
					isCycle: 1,
					desc,
					verify: JSON.stringify(verify),
					cc: JSON.stringify(cc),
					voiceTime: this.count
				}
				DEBUG && console.log('参数', queryData);
				util.showLoading('提交中...')
				uni.uploadFile({
					...fileData,
					filePath: '',
					name: '',
					url: SERVER_URL + '/user/releaseDanger', //仅为示例，非真实的接口地址
					files,
					header: {
						Authorization: `Bearer ${request.TOKEN}`
					},
					formData: queryData,
					success: (uploadFileRes) => {
						let res = JSON.parse(uploadFileRes.data)
						if (res.statusCode == 200) {
							util.hideLoading()
							util.goBack()
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
	.modal-content {
		width: 600rpx;
		height: 800rpx;
		background-color: #fff;
		border-radius: 10rpx;
		/* border: 1rpx solid red; */
	}

	.list-icon {
		width: 32rpx;
		height: 32rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
	}

	.name {
		width: 450rpx;
		font-weight: bold;
	}

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

	.video {
		width: 327rpx;
		height: 150rpx;
	}

	.upload-video {
		position: relative;
		width: 327rpx;
		min-height: 250rpx;
		margin-bottom: 73rpx;
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

	.user-item {
		font-size: 27rpx;
		color: #5786F7;
	}

	.add-user {
		width: 59rpx;
		heigth: 59rpx;
		border: 1rpx solid #5786F7;
		text-align: center;
		border-radius: 50rpx;
		line-height: 59rpx;
		font-size: 30rpx;
	}

	.verify-btn {
		width: 220rpx;
		height: 63rpx;
		background-color: #5786F7;
		line-height: 63rpx;
		font-size: 27rpx;
		color: #fff;
		text-align: center;
		margin-right: 40rpx;
	}
</style>

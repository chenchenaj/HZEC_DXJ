<template>
	<view class='container'>
		<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
		<view class="info flex_r_s">
			<view class="title ">执行人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{detail.executor}}</view>
				<!-- <image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image> -->
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">下发人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{detail.createdUser}}</view>
				<!-- <image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image> -->
			</view>
		</view>
		<view v-if="detail.cc" class="info flex_r_s">
			<view class="title ">抄送人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{detail.cc}}</view>
				<!-- <image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image> -->
			</view>
		</view>
		<view v-if="detail.remark" class="info flex_c_s_s">
			<view class="title" style="margin: 25rpx 0 39rpx 31rpx ">下发备注</view>
			<view class="question-content flex_c_c">
				<view class='question-content-input'>{{detail.remark}}</view>
			</view>
		</view>
		<view v-if="detail.doneRemark" class="info flex_c_s_s">
			<view class="title" style="margin: 25rpx 0 39rpx 31rpx ">执行备注</view>
			<view class="question-content flex_c_c">
				<view class='question-content-input'>{{detail.doneRemark}}</view>
			</view>
		</view>
		<view v-if="!detail.isDone&&detail.isExecutor" class="info flex_c_s_s">
			<view class="title" style="margin: 25rpx 0 39rpx 31rpx ">执行备注</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="psInput" placeholder="请输入备注信息" value="" />
				</textarea>
			</view>
		</view>
		<view style="font-size: 24rpx;margin-top: 30rpx; margin-bottom: 10rpx;">原文件为:</view>
		<view class="flex_c_c" @click="download(0)">
			<image v-if="detail.fileType=='docx'||detail.fileType=='doc'" style="width: 67rpx;height:90rpx" src="../../static/word.png"
			 mode="aspectFill"></image>
			<image v-if="detail.fileType=='xls'||detail.fileType=='xlsx'" style="width: 67rpx;height:90rpx" src="../../static/excel.png"
			 mode="aspectFill"></image>
			<image v-if="detail.fileType=='pdf'" style="width: 67rpx;height:90rpx" src="../../static/pdf.png" mode="aspectFill"></image>
			<view style="font-size: 24rpx;">{{detail.fileName}}(<text style="color: #007AFF;">{{detail.fileSize}},点击下载</text>)</view>
		</view>
		<view v-if="detail.doneFile" style="font-size: 24rpx;margin-top: 30rpx;">完成文件为:</view>
		<view v-if="detail.doneFile" class="flex_c_c" style="margin-bottom: 100rpx;" @click="download(1)">
			<image v-if="detail.doneType=='docx'||detail.doneType=='doc'" style="width: 67rpx;height:90rpx" src="../../static/word.png"
			 mode="aspectFill"></image>
			<image v-if="detail.doneType=='xls'||detail.doneType=='xlsx'" style="width: 67rpx;height:90rpx" src="../../static/excel.png"
			 mode="aspectFill"></image>
			<image v-if="detail.doneType=='pdf'" style="width: 67rpx;height:90rpx" src="../../static/pdf.png" mode="aspectFill"></image>
			<view style="font-size: 24rpx;">{{detail.doneName}}(<text style="color: #007AFF;">{{detail.doneSize}},点击下载</text>)</view>
		</view>
		<view v-if="!detail.isDone&&detail.isExecutor" class="flex_c_c">
			<button type="primary" style="margin-top: 50rpx;" @tap="openFile">选择完成附件</button>
			<view v-if="path">文件路径为:</view>
			<view v-if="path" class="path" @click="open">{{path}} <text style="color: #007AFF;">(点击可以查看)</text> </view>
		</view>
		<view v-if="!detail.isDone&&detail.isExecutor" class="info flex_r_s" style="margin-top: 30rpx;" @click="userChose('cc')">
			<view class="title">抄送人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['cc']||'请选择'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view v-if="!detail.isDone&&detail.isExecutor" class="flex_r_c" style="margin: 100rpx 0 250rpx;">
			<view class="btn" @click="submit">完成</view>
		</view>
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import commons from '../../util/commons.js'
	import {
		DEBUG,
		SERVER_URL,
		IMAGE_URL
	} from '../../util/config.js'
	let app = getApp()
	let id = ''
	let self
	// 选择的人员完整信息
	let choseInfo = {}
	// 执行备注
	let excutePs = ''
	export default {
		data() {
			return {
				SERVER_URL,
				IMAGE_URL,
				detail: {},
				path: '',
				userChoseInfo: {}, //当前页面各类别人员选择信息
				key: '' //协助人/执行人/抄送人/审批人
			}
		},
		onLoad(params) {
			choseInfo = {}
			excutePs = ''
			self = this
			id = params.id
			if (!id) {
				util.goBack()
				return
			}
			this.getSafeDetail()
		},
		onUnload() {
			// 清空选择数据
			app.globalData.deviceInfo = {}
			app.globalData.userChoseInfo = {}
			app.globalData.submitDeviceInfo = []
		},
		onShow() {
			DEBUG && console.log('全局选择', app.globalData.userChoseInfo[this.key]);
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
			psInput(e) {
				excutePs = e.detail.value || ''
			},
			// 人员选择
			userChose(type) {
				util.navigate('/pages/user_choose/user_choose', {
					type
				})
				this.key = type
			},
			// 浏览文件
			open() {
				if (app.globalData.platform == 'ios') {
					plus.runtime.openFile(self.path);
				} else {
					uni.openDocument({
						filePath: self.path,
						success: function(res) {
							DEBUG && console.log('打开文档成功');
						},
						fail: function(err) {
							util.showModal(err)
							DEBUG && console.log(err);
						}
					});
				}
			},
			openFile() {
				let platform = app.globalData.platform
				if (platform == 'ios') {
					const iOSFileSelect = uni.requireNativePlugin('YangChuan-YCiOSFileSelect');
					//apple document-types 文件类型参数 https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html 
					let params = {
						"document-types": ["com.adobe.pdf", "com.microsoft.word.doc", "com.microsoft.excel.xls",
							"com.microsoft.powerpoint.ppt"
						],
						"isBase64": 0
					}
					iOSFileSelect.show(params, result => {
						let status = parseInt(result.status);
						if (status == 200) {
							let url = result.url;
							self.path = url
						}
					});
				} else {
					this.$refs.filemanager._openFile()
				}

			},
			resultPath(e) {
				let type = e.substring(e.lastIndexOf('.') + 1);
				if (type != 'doc' && type != 'docx' && type != 'xls' && type != 'xlsx' && type != 'pdf') {
					util.showModal('请选择word/excel/pdf文件')
					return
				}
				this.path = "file:///" + e
			},
			// 下载
			download(idx) {
				let downloadFile
				if (idx == 0) {
					downloadFile = this.detail.file
				} else {
					downloadFile = this.detail.doneFile
				}
				if (!downloadFile) {
					util.showModal('下载文件不存在')
					return
				}
				let file = SERVER_URL + '/' + downloadFile
				commons.download(file, app)
			},
			// 提交
			submit() {
				let cc = Object.keys(choseInfo['cc'] || {})
				// if (executor.length < 1) {
				// 	util.showModal('请选择执行人')
				// 	return
				// }
				if (!this.path) {
					util.showModal('请选择完成附件')
					return
				}
				// 上传参数
				let queryData = {
					id,
					cc: JSON.stringify(cc),
					remark: excutePs
				}
				DEBUG && console.log('参数', queryData);
				util.showLoading('提交中...')
				uni.uploadFile({
					url: SERVER_URL + '/user/doneSafe', //真实的接口地址
					filePath: self.path,
					name: 'file',
					header: {
						Authorization: `Bearer ${request.TOKEN}`
					},
					formData: queryData,
					success: (uploadFileRes) => {
						util.hideLoading()
						let res = JSON.parse(uploadFileRes.data)
						if (res.statusCode == 200) {
							// console.log(231321);
							util.goBack()
						} else {
							util.showModal(res.errmsg)
						}
					}
				});
			},
			// 环保详情
			async getSafeDetail() {
				let res = await request.get(request.USER.SAFE_DETAIL, {
					id
				})
				DEBUG && console.log('安全环保详情', res.data);
				if (res.data.statusCode == 200) {
					this.detail = res.data.detail
				} else {
					util.showModal(res.data.errmsg)
				}
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		overflow: hidden;
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

	.path {
		width: 80%;
		font-size: 24rpx;
		word-break: break-all;
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
</style>

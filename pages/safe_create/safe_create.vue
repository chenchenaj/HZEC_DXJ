<template>
	<view class='container'>
		<view class="info flex_r_s" @click="userChose('executor')">
			<view class="title ">执行人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['executor']||'发给所有人'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="title" style="margin: 25rpx 0 39rpx 31rpx ">备注</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="psInput" placeholder="请输入备注信息" value="" />
				</textarea>
			</view>
		</view>
		<button type="primary" style="margin-top: 50rpx;" @tap="openFile">选择附件</button>
		<view v-if="path">文件路径为:</view>
		<view v-if="path" class="path" @click="open">{{path}} <text style="color: #007AFF;">(点击可以查看)</text> </view>
		<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
		<view class="flex_r_c" style="margin: 100rpx 0 250rpx;">
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
		IMAGE_URL
	} from '../../util/config.js'
	import tkiFileManager from "../../components/tki-file-manager/tki-file-manager.vue"
	let app = getApp()
	// 选择的人员完整信息
	let choseInfo = {}
	let self
	// 备注信息
	let ps = ''
	export default {
		data() {
			return {
				title: '',
				path: '',
				userChoseInfo: {}, //当前页面各类别人员选择信息
				key: '' //协助人/执行人/抄送人/审批人
			}
		},
		components: {
			tkiFileManager
		},
		onLoad() {
			self = this
			ps = ''
			choseInfo = {}
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
				ps = e.detail.value || ''
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
			// 人员选择
			userChose(type) {
				util.navigate('/pages/user_choose/user_choose', {
					type
				})
				this.key = type
			},
			// 提交
			submit() {
				let executor = Object.keys(choseInfo['executor'] || {})
				// if (executor.length < 1) {
				// 	util.showModal('请选择执行人')
				// 	return
				// }
				if (!this.path) {
					util.showModal('请选择附件')
					return
				}
				// 上传参数
				let queryData = {
					executor: JSON.stringify(executor),
					remark: ps
				}
				DEBUG && console.log('参数', queryData);
				util.showLoading('提交中...')
				uni.uploadFile({
					url: SERVER_URL + '/user/safe', //真实的接口地址
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
		margin-bottom: 30rpx;
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

<template>
	<view class='container'>
		<view class="tab flex_r_c">
			<view class="tab-item" :style="{'border-bottom':typeIdx==0?'2rpx solid #5786F7':'',color:typeIdx==0?'#5786F7':''}"
			 @click='changeType(0)'>未读<text v-if="typeIdx==0&&count>0" style="font-size: 22rpx;color: red;">({{count}})</text></view>
			<view class="tab-item" :style="{'border-bottom':typeIdx==1?'2rpx solid #5786F7':'',color:typeIdx==1?'#5786F7':''}"
			 style="margin-left: 150rpx;" @click='changeType(1)'>已读 <text v-if="typeIdx==1&&count>0" style="font-size: 22rpx;color: red;">({{count}})</text></view>
		</view>
		<view style="margin-top: 170rpx;">
			<view v-for="(item,index) in messageList" :key="index" class="content-item flex_c_s" :style="{'margin-bottom':index==messageList.length-1?'120rpx':''}"
			 @tap='open(index)'>
				<view class='list_item flex_r_b' style="border-bottom: 1rpx solid #E6E6E6;">
					<view class='line1' style="width: 300rpx; font-size: 29rpx;color: #000;margin-left:40rpx ;">{{item.title}}</view>
					<view style="font-size: 20rpx;color: #6D6D6D;margin-right: 40rpx;">{{item.createdTime}}</view>
				</view>
				<view class='list_item flex_c_c'>
					<view class='line1' style="width: 605rpx; font-size: 24rpx;color: #333333;">{{item.content||'暂无内容描述'}}</view>
				</view>
			</view>
			<view v-if="!messageList||!messageList[0]">暂无数据</view>
		</view>
		<view v-if="typeIdx==0&&count>0" class="btn" @click="readAll">一键已读</view>
		<!-- <modal ref="modal">
			<view class='modal-content flex_c_s' @tap.stop='blank'>
				<view class="modal-title">3213</view>
				<view class='modal-time'>32131</view>
				<view class='modal-message'>321312</view>
				<view class='modal-submit' @tap='close'>确定</view>
			</view>
		</modal> -->
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import {
		DEBUG
	} from '../../util/config.js'
	let app = getApp()
	let page = 0
	let limit = 10
	let hasNextPage = 0
	export default {
		data() {
			return {
				messageList: [],
				typeIdx: 0,
				count: 0
			}
		},
		onLoad() {

		},
		onShow() {
			page = 0
			this.getMessageList()
		},
		// 到底了
		onReachBottom() {
			if (hasNextPage) {
				page += 1
				this.getMessageList()
			}
		},
		// 分享
		// #ifdef MP-WEIXIN
		onShareAppMessage() {},
		// #endif
		// 页面滚动
		onPageScroll() {

		},
		methods: {
			async readAll() {
				util.showLoading()
				let res = await request.get(request.USER.READ_ALL)
				if (res.data.statusCode == 200) {
					util.hideLoading()
					// 设置app角标
					plus.runtime.setBadgeNumber(0)
					page = 0
					this.getMessageList()
				} else {
					util.hideLoading()
					util.showModal(res.data.errmsg)
				}
			},
			// 更换类别
			changeType(idx) {
				if (this.typeIdx != idx) {
					this.count = 0
					page = 0
					this.typeIdx = idx
					this.getMessageList()
				}
			},
			// 打开弹窗
			async open(index) {
				// this.$refs.modal.open()
				let data = this.messageList[index]
				if (data.type == 0) {
					// DEBUG && console.log('跳转详情', id, uid, idx);
					if (data.taskType < 2) {
						util.navigate('/pages/check_verify/check_verify', {
							id: data.objectId,
							uid: data.uid
						})
					} else if (data.taskType < 4) {
						util.navigate('/pages/repair_verify/repair_verify', {
							id: data.objectId,
							uid: data.uid
						})
					} else if (data.taskType == 4 || data.taskType == 5) {
						util.navigate('/pages/maintain_verify/maintain_verify', {
							id: data.objectId,
							uid: data.uid
						})
					} else if (data.taskType == 6) {
						util.navigate('/pages/danger_detail/danger_detail', {
							id: data.objectId,
							uid: data.uid
						})
					}
				} else {
					util.navigate('/pages/verify_detail/verify_detail', {
						id: data.objectId
					})
				}
				if (data.isRead == 0) {
					this.readMessage(data.id)
				}
			},
			// 关闭弹窗
			close() {
				this.$refs.modal.close()
			},
			// 消息列表
			async getMessageList() {
				let res = await request.get(request.USER.MESSAGE, {
					page,
					limit,
					isRead: this.typeIdx
				})
				DEBUG && console.log('消息列表', res.data);
				if (res.data.statusCode == 200) {
					this.count = res.data.count
					// 已读不需要设置
					if(this.typeIdx!=1){
						// plus.runtime.setBadgeNumber(this.count)	
					}
					hasNextPage = res.data.list.length == limit
					if (page == 0) {
						this.messageList = res.data.list
					} else {
						this.messageList.push(...res.data.list)
					}
				} else {
					util.showModal(res.data.errmsg)
				}
			},
			// 消息列表
			async readMessage(id) {
				let res = await request.get(request.USER.READ_MESSAGE, {
					messId: id
				})
			}
		}
	}
</script>

<style>
	.tab {
		position: fixed;
		background-color: #fff;
		z-index: 99;
		top: 0;
		left: 0;
		width: 100%;
		height: 92rpx;
	}

	.tab-item {
		width: 240rpx;
		line-height: 92rpx;
		font-size: 27rpx;
		text-align: center;
	}

	.content-item {
		position: relative;
		width: 673rpx;
		height: 216rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 1rpx 2rpx 15rpx 0rpx rgba(65, 65, 65, 0.15);
		margin-bottom: 44rpx;
	}

	.list_item {
		width: 100%;
		height: 105rpx;
	}

	.modal-content {
		width: 606rpx;
		min-height: 431rpx;
		background-color: #FFFFFF;
	}

	.modal-title {
		font-size: 28rpx;
		color: #000000;
		margin: 60rpx 0 21rpx 0;
	}

	.modal-time {
		font-size: 20rpx;
		color: #6D6D6D;
	}

	.modal-message {
		width: 413rpx;
		min-height: 100rpx;
		font-size: 24rpx;
		color: #333333;
		margin: 35rpx 0 58rpx 0;
		word-break: break-all;
		/* border: 1rpx solid red; */
	}

	.modal-submit {
		width: 173rpx;
		height: 66rpx;
		text-align: center;
		line-height: 66rpx;
		background-color: #4489CA;
		color: #FFFFFF;
		font-size: 24rpx;
		margin: 0rpx 0 40rpx 0;
	}

	.btn {
		position: fixed;
		bottom: 20rpx;
		left: 200rpx;
		width: 350rpx;
		height: 70rpx;
		background-color: #5786F7;
		line-height: 70rpx;
		font-size: 27rpx;
		color: #fff;
		text-align: center;
		margin-right: 25rpx;
	}
</style>

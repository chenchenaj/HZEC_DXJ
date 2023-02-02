<template>
	<view class='container'>
		<view class="user-info flex_r_b" @click="toPersonInfo">
			<view class="flex_r_s">
				<image class='head-url' :src="userInfo.Photo||'../../static/mine/head_url_default.png'"
					mode="aspectFill"></image>
				<view class="flex_c_c_s" style="height: 79rpx;">
					<view class="username">{{userInfo.Name||''}}</view>
					<view class="desc">{{userInfo.desc||''}}</view>
				</view>
			</view>
			<image class='right-arrow' src="../../static/mine/white_right_arrow.png" mode="aspectFill"></image>
		</view>
		<view class="menu flex_r_b" @click="openRemind">
			<view class="flex_r_s">
				<image class='icon' src="../../static/mine/message.png" mode="aspectFit"></image>
				<view>紧急重要任务消息推送</view>
			</view>
			<image class='right-arrow1' :src="isOpen?'../../static/remind_02.png':'../../static/remind_01.png' "
				mode="aspectFill"></image>
		</view>
		<view class="menu flex_r_b" @click="navigateTo(1)">
			<view class="flex_r_s">
				<image class='icon' src="../../static/mine/message.png" mode="aspectFit"></image>
				<view>消息</view>
			</view>
			<image class='right-arrow ' style="margin-right: 35rpx;" src="../../static/index/right.png"
				mode="aspectFill"></image>
		</view>
		<view class="menu flex_r_b" @click="navigateTo(8)">
			<view class="flex_r_s">
				<image class='icon' src="../../static/mine/task.png" mode="aspectFit"></image>
				<view>我创建的任务</view>
			</view>
			<image class='right-arrow ' style="margin-right: 35rpx;" src="../../static/index/right.png"
				mode="aspectFill"></image>
		</view>
		<view class="menu flex_r_b" @click="navigateTo(2)">
			<view class="flex_r_s">
				<image class='icon' src="../../static/mine/task.png" mode="aspectFit"></image>
				<view>任务</view>
			</view>
			<image class='right-arrow ' style="margin-right: 35rpx;" src="../../static/index/right.png"
				mode="aspectFill"></image>
		</view>
		<view class="menu flex_r_b" @click="navigateTo(3)">
			<view class="flex_r_s">
				<image class='icon' src="../../static/mine/verify.png" mode="aspectFit"></image>
				<view>审核</view>
			</view>
			<image class='right-arrow' style="margin-right: 35rpx;" src="../../static/index/right.png"
				mode="aspectFill"></image>
		</view>
		<view class="menu flex_r_b" @click="navigateTo(4)">
			<view class="flex_r_s">
				<image class='icon' src="../../static/mine/change.png" mode="aspectFit"></image>
				<view>交接班记录</view>
			</view>
			<image class='right-arrow' style="margin-right: 35rpx;" src="../../static/index/right.png"
				mode="aspectFill"></image>
		</view>
		<view class="menu flex_r_b" @click="navigateTo(7)">
			<view class="flex_r_s">
				<image class='icon' src="../../static/index/tab_01.png" mode="aspectFit"></image>
				<view>大修列表</view>
			</view>
			<image class='right-arrow' style="margin-right: 35rpx;" src="../../static/index/right.png"
				mode="aspectFill"></image>
		</view>
		<view class="menu flex_r_b" @click="navigateTo(5)">
			<view class="flex_r_s">
				<image class='icon' src="../../static/index/tab_09.png" mode="aspectFit"></image>
				<view>安全环保任务</view>
			</view>
			<image class='right-arrow' style="margin-right: 35rpx;" src="../../static/index/right.png"
				mode="aspectFill"></image>
		</view>
		<view class="menu flex_r_b" @click="navigateTo(6)">
			<view class="flex_r_s">
				<image class='icon' src="../../static/index/tab_09.png" mode="aspectFit"></image>
				<view>安全环保列表</view>
			</view>
			<image class='right-arrow' style="margin-right: 35rpx;" src="../../static/index/right.png"
				mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import {
		DEBUG
	} from '../../util/config.js'
	let app = getApp()
	export default {
		data() {
			return {
				userInfo: {},
				isOpen: 0
			}
		},
		onLoad() {
			this.userInfo = getApp().globalData.userInfo
			this.isOpen = this.userInfo.notice
			// console.log(this.userInfo);
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
			// 消息推送开启/关闭
			async openRemind() {
				this.isOpen = !this.isOpen
				getApp().globalData.userInfo.notice = this.isOpen
				let res = await request.get(request.USER.UPDATE_NOTICE, {
					type: this.isOpen ? 1 : 0
				})
				DEBUG && console.log('修改结果', res.data)
				if (res.data.statusCode != 200) {
					util.showModal(res.data.errmsg)
				}
			},
			// 个人信息
			toPersonInfo() {
				util.navigate('/pages/user_detail/user_detail')
			},
			// tab跳转
			navigateTo(idx) {
				idx == 1 && util.navigate('/pages/message/message')
				idx == 2 && util.navigate('/pages/task/task')
				idx == 3 && util.navigate('/pages/verify/verify')
				idx == 4 && util.navigate('/pages/change_record/change_record')
				idx == 5 && util.navigate('/pages/safe_envir/safe_envir')
				idx == 6 && util.navigate('/pages/safe_list/safe_list')
				idx == 7 && util.navigate('/pages/overhaul/overhaul')
				idx == 8 && util.navigate('/pages/task_create/task_create')
			}
		}
	}
</script>

<style scoped>
	.user-info {
		width: 100%;
		height: 267rpx;
		background-color: #333333;
	}

	.head-url {
		width: 79rpx;
		height: 79rpx;
		margin: 0 29rpx;
	}

	.username {
		font-size: 32rpx;
		color: #fff;
		margin-top: -15rpx;
	}

	.desc {
		font-size: 20rpx;
		color: #fff;
		margin-top: 10rpx;
	}

	.right-arrow {
		width: 17rpx;
		height: 30rpx;
		margin-right: 79rpx;
	}

	.right-arrow1 {
		width: 134rpx;
		height: 79rpx;
		margin-right: 20rpx;
	}

	.menu {
		width: 100%;
		height: 193rpx;
		font-size: 31rpx;
		border-bottom: 1rpx solid #F2F2F2;
	}

	.icon {
		width: 57rpx;
		height: 57rpx;
		margin: 0 33rpx 0 44rpx;
	}
</style>

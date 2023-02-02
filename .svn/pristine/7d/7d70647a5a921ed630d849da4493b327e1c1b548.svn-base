<template>
	<view class='container'>
		<view class="top flex_r_b">
			<view class="flex_r_s">
				<image class='head-url' :src="userInfo.Photo||'../../static/mine/head_url.png'" mode="aspectFill"></image>
				<view class="name line1">{{userInfo.Name||''}}</view>
			</view>
			<!-- <image src="../../static/index/right.png" mode="aspectFill" class='right-arrow'></image> -->
		</view>
		<view style="width: 100%;height: 23rpx;background-color: #F0F0F0;"></view>
		<view class="info flex_r_b">
			<view>手机号</view>
			<view class="flex_r_s">
				<view style="margin-right: 10rpx;">{{userInfo.Mobilephone||'无'}}</view>
				<!-- <image src="../../static/index/right.png" mode="aspectFill" style="width: 17rpx;height: 30rpx;margin-right: 30rpx;"></image> -->
			</view>
		</view>
		<view class="info flex_r_b">
			<view>职务</view>
			<view class="flex_r_s">
				<view style="margin-right: 10rpx;">无</view>
				<!-- <image src="../../static/index/right.png" mode="aspectFill" style="width: 17rpx;height: 30rpx;margin-right: 30rpx;"></image> -->
			</view>
		</view>
		<view class="info flex_r_b">
			<view>部门</view>
			<view v-if="userInfo.Department" class="flex_r_s">
				<view style="margin-right: 10rpx;">{{userInfo.Department||'无'}}</view>
				<!-- <image src="../../static/index/right.png" mode="aspectFill" style="width: 17rpx;height: 30rpx;margin-right: 30rpx;"></image> -->
			</view>
		</view>
		<view class="info flex_r_b">
			<view>版本更新</view>
			<view class="flex_r_s">
				<view style="margin-right: 10rpx;">v{{cfg.VERSION||'1.0.1'}}</view>
				<!-- <image src="../../static/index/right.png" mode="aspectFill" style="width: 17rpx;height: 30rpx;margin-right: 30rpx;"></image> -->
			</view>
		</view>
		<view class="btn" @click="loginout">退出登录</view>
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
				isSelected: 1,
				userInfo: {},
				cfg: {}
			}
		},
		onLoad() {
			this.userInfo = getApp().globalData.userInfo
			this.cfg = getApp().globalData.setting
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
			async loginout() {
				DEBUG && console.log('退出登录');
				// let res = await request.get(request.USER.LOGIN_OUT)
				// DEBUG && console.log(res.data);
				uni.removeStorage({
					key: 'USER',
					complete: function(res) {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				});
			}
		}
	}
</script>

<style>
	.top {
		width: 100%;
		height: 225rpx;
	}

	.right-arrow {
		width: 17rpx;
		height: 30rpx;
		margin-right: 75rpx;
	}

	.head-url {
		width: 121rpx;
		height: 121rpx;
		margin: 0 36rpx 0 30rpx;
	}

	.name {
		font-size: 32rpx;
		width: 400rpx;
		/* border: 1rpx solid red; */
	}

	.info {
		width: 661rpx;
		height: 125rpx;
		font-size: 32rpx;
		border-bottom: 1rpx solid #E7E7E7;
	}

	.btn {
		width: 463rpx;
		height: 66rpx;
		background-color: #128BF1;
		text-align: center;
		line-height: 66rpx;
		color: #fff;
		font-size: 31rpx;
		margin-top: 128rpx;
	}
</style>

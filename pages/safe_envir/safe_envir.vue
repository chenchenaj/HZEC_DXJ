<template>
	<view class='container'>
		<view class="tab flex_r_c">
			<view class="tab-item" :style="{'border-bottom':typeIdx==0?'2rpx solid #5786F7':'',color:typeIdx==0?'#5786F7':''}"
			 @click='changeType(0)'>未完成</view>
			<view class="tab-item" :style="{'border-bottom':typeIdx==1?'2rpx solid #5786F7':'',color:typeIdx==1?'#5786F7':''}"
			 style="margin-left: 150rpx;" @click='changeType(1)'>已完成</view>
		</view>
		<view class='flex_c_c' style="width: 100%;margin-top: 110rpx;">
			<view v-if="list[0]" class='type-content-item flex_r_b' v-for="(item,index) in list" :key="index" :style="{'margin-bottom':index==list.length-1?'40rpx':''}"
			 @click="toDetail(item.id)">
				<view class="flex_c_b" style="margin-left: 19rpx; width: 600rpx;height: 117rpx;font-size: 27rpx;">
					<view class="line1" style="width: 100%;height: 35rpx;" :style="{color:typeIdx==0?'red':'#5786F7'}">文件名称：{{item.fileName}}</view>
					<view class="line1" style="width: 100%;height: 35rpx;">发布人：{{item.createdUser}}</view>
					<view class="line1" style="width: 100%;height: 35rpx;">下发时间：{{item.createdTime}}</view>
				</view>
				<image class='' style="width: 13rpx;height: 25rpx;margin-right: 32rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
			<view v-if="!list||!list[0]" style="font-size: 32rpx;">暂无数据</view>
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
	let page = 0
	let limit = 1000
	export default {
		data() {
			return {
				SERVER_URL,
				IMAGE_URL,
				list: [],
				typeIdx: 0
			}
		},
		onLoad() {

		},
		onShow() {
			this.getSafeList()
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
			toDetail(id) {
				util.navigate('/pages/safe_verify/safe_verify', {
					id
				})
			},
			// 更换类别
			changeType(idx) {
				if (this.typeIdx != idx) {
					page = 0
					this.typeIdx = idx
					this.getSafeList()
				}
			},
			// 环保列表
			async getSafeList() {
				let res = await request.get(request.USER.SAFE_ENVIR, {
					page,
					limit,
					type: this.typeIdx
				})
				DEBUG && console.log('安全环保列表', res.data);
				if (res.data.statusCode == 200) {
					this.list = res.data.list
				} else {
					util.showModal(res.data.errmsg)
				}
			}
		}
	}
</script>

<style scoped>
	.tab {
		position: fixed;
		background-color: #fff;
		top: 0;
		left: 0;
		width: 100%;
		height: 92rpx;
		background-color: #fff;
		z-index: 99;
	}

	.tab-item {
		width: 200rpx;
		height: 92rpx;
		line-height: 92rpx;
		font-size: 27rpx;
		text-align: center;
	}

	.list-item {
		width: 100%;
		height: 100rpx;
		font-size: 27rpx;
		margin-top: 120rpx;
		border-bottom: 1rpx solid #C8C7CC;
	}

	.type-content-item {
		width: 697rpx;
		height: 177rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1rpx 27rpx 0px rgba(0, 0, 0, 0.09);
		border-radius: 20rpx;
		margin-top: 45rpx;
	}
</style>

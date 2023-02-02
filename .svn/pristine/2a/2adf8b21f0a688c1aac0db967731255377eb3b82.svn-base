<template>
	<view class='container'>
		<view v-for="(item,index) in list" :key="index" class='list-item flex_r_b'>
			<view class="flex_r_s" style="margin-left: 50rpx;">
				<image v-if="item.fileType=='docx'||item.fileType=='doc'" style="width: 67rpx;height:90rpx" src="../../static/word.png"
				 mode="aspectFill"></image>
				<image v-if="item.fileType=='xls'||item.fileType=='xlsx'" style="width: 67rpx;height:90rpx" src="../../static/excel.png"
				 mode="aspectFill"></image>
				<image v-if="item.fileType=='pdf'" style="width: 67rpx;height:90rpx" src="../../static/pdf.png" mode="aspectFill"></image>
				<view class="flex_c_b_s" style=" height: 90rpx;margin-left: 10rpx;">
					<view class="line1" style="width: 420rpx;">{{item.fileName}}</view>
					<view class="line1" style="width: 420rpx;">{{item.createdTime}}</view>
				</view>
			</view>
			<view class='flex_c_b_e' style="height: 90rpx; margin-right: 50rpx;color: #007AFF;" @click="download(index)">
				<view>下载</view>
				<view>{{item.fileSize}}</view>
			</view>
		</view>
		<view v-if="!list||!list[0]" style="font-size: 32rpx;margin-top: 40rpx;">暂无数据</view>
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
				list: []
			}
		},
		onLoad() {},
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
			// 下载
			download(idx) {
				if (!this.list[idx].file) {
					util.showModal('下载文件不存在')
					return
				}
				let file = SERVER_URL + '/' + this.list[idx].file
				commons.download(file, app)
			},
			// 环保列表
			async getSafeList() {
				let res = await request.get(request.USER.SAFE_ENVIR, {
					page,
					limit,
					type: 2
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
	.list-item {
		width: 100%;
		height: 100rpx;
		font-size: 27rpx;
		border-bottom: 1rpx solid #C8C7CC;
	}
</style>

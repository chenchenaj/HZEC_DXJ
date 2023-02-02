<template>
	<view class='container'>
		<view class='flex_c_c' style="width: 100%;margin-top: 10rpx;">
			<view v-if="list[0]" class='type-content-item flex_r_b' v-for="(item,index) in list" :key="index" :style="{'margin-bottom':index==list.length-1?'40rpx':''}"
			 @click="toDetail(index)">
				<view class="flex_c_b" style="margin-left: 19rpx; width: 600rpx;height: 117rpx;font-size: 27rpx;">
					<view class="line1" style="width: 100%;height: 35rpx;" :style="{color:item.isDone?'green':'red'}">环节名称：{{item.title}}</view>
					<view class="line1" style="width: 100%;height: 35rpx;">优先级：{{(item.priority==0&&'正常')||(item.priority==1&&'重要')||(item.priority==2&&'紧急重要')}}</view>
					<view class="line1" style="width: 100%;height: 35rpx;">创建时间：{{item.createdTime}}</view>
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
	import {
		DEBUG,
		SERVER_URL,
		IMAGE_URL
	} from '../../util/config.js'
	let app = getApp()
	let page = 0
	let limit = 10
	let hasNextPage
	export default {
		data() {
			return {
				SERVER_URL,
				IMAGE_URL,
				list: []
			}
		},
		onLoad() {},
		onUnload() {
			// 清除大修信息
			app.globalData.overhaulInfo = {}
		},
		onShow() {
			this.getMyTask()
		},
		// 到底了
		onReachBottom() {
			if (hasNextPage) {
				page += 1
				this.getMyTask()
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
			// 去详情
			toDetail(idx) {
				let data = this.list[idx]
				// 如果未完成就保存数据
				if (!data.isDone || data.isDone < 1) {
					app.globalData.overhaulInfo = {
						overhaulId: data.overhaulId,
						isShow: 1
					}
				}
				util.navigate('/pages/overhaul_verify/overhaul_verify', {
					id: data.id
				})
			},
			// 获取任务/审批列表数量
			async getMyTask() {
				util.showLoading()
				let res = await request.get(request.USER.OVERHAUL, {
					page,
					limit
				})
				DEBUG && console.log('大修列表', res.data);
				if (res.data.statusCode == 200) {
					hasNextPage = res.data.list.length >= limit
					if (page == 0) {
						this.list = res.data.list
					} else {
						this.list.push(...res.data.list)
					}
				} else {
					util.showModal(res.data.errmsg)
				}
				util.hideLoading()
			}
		}
	}
</script>

<style scoped>
	.type-content-item {
		width: 697rpx;
		height: 177rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1rpx 27rpx 0px rgba(0, 0, 0, 0.09);
		border-radius: 20rpx;
		margin-top: 45rpx;
	}
</style>

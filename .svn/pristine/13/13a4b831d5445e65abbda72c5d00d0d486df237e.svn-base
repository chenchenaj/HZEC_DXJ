<template>
	<view class='container'>
		<view class="tab flex_r_c">
			<view class="tab-item" :style="{'border-bottom':typeIdx==0?'2rpx solid #5786F7':'',color:typeIdx==0?'#5786F7':''}"
			 @click='changeType(0)'>临时性</view>
			<view class="tab-item" :style="{'border-bottom':typeIdx==1?'2rpx solid #5786F7':'',color:typeIdx==1?'#5786F7':''}"
			 style="margin-left: 150rpx;" @click='changeType(1)'>周期性</view>
		</view>
		<view class='flex_c_c' style="width: 100%;margin-top: 110rpx;">
			<view v-if="list[0]" class='type-content-item flex_r_b' v-for="(item,index) in list" :key="index" :style="{'margin-bottom':index==list.length-1?'40rpx':''}"
			 @click="toDetail(item.id,item.uid,index)">
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
		DEBUG
	} from '../../util/config.js'
	let app = getApp()
	let page = 0
	let limit = 10
	let hasNextPage = false
	export default {
		data() {
			return {
				list: [],
				typeIdx: 0,
				shixian: 0
			}
		},
		onLoad() {},
		onShow() {
			page = 0
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
			// 任务详情 0,1点巡检;2,3维修;4,5保养,润滑;6隐患
			toDetail(id, uid, idx) {
				// DEBUG && console.log('跳转详情', id, uid, idx);
				if (this.list[idx].type < 2) {
					util.navigate('/pages/check_verify/check_verify', {
						id,
						uid,
						isCreate:1
					})
				} else if (this.list[idx].type < 4) {
					util.navigate('/pages/repair_verify/repair_verify', {
						id,
						uid,
						isCreate:1
					})
				} else if (this.list[idx].type == 4 || this.list[idx].type == 5) {
					util.navigate('/pages/maintain_verify/maintain_verify', {
						id,
						uid,
						isCreate:1,
						isMaintain: this.list[idx].type == 4 ? 1 : 0
					})
				} else if (this.list[idx].type == 6) {
					util.navigate('/pages/danger_detail/danger_detail', {
						id,
						uid,
						isCreate:1
					})
				}
			},
			// 更换类别
			changeType(idx) {
				if (this.typeIdx != idx) {
					page = 0
					this.typeIdx = idx
					this.getMyTask()
				}
			},
			// 获取临时性/周期性任务
			async getMyTask() {
				util.showLoading()
				let res = await request.get(request.USER.CYCLETASK, {
					isCycle: this.typeIdx,
					page,
					limit
				})
				DEBUG && console.log('我创建的任务列表', res.data);
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
		width: 240rpx;
		line-height: 92rpx;
		font-size: 27rpx;
		text-align: center;
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

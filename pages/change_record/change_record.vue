<template>
	<view class='container'>
		<view class="tab flex_r_c">
			<view class="tab-item" :style="{'border-bottom':typeIdx==0?'2rpx solid #5786F7':'',color:typeIdx==0?'#5786F7':''}"
			 @click='changeType(0)'>我发起的</view>
			<view class="tab-item" :style="{'border-bottom':typeIdx==1?'2rpx solid #5786F7':'',color:typeIdx==1?'#5786F7':''}"
			 style="margin-left: 150rpx;" @click='changeType(1)'>我收到的</view>
		</view>
		<view class='flex_c_c' style="width: 100%;margin-top: 110rpx;">
			<view v-if="list[0]" class='type-content-item flex_r_b' v-for="(item,index) in list" :key="index" @click="toDetail(item.id)"
			 :style="{'margin-bottom':index==list.length-1?'40rpx':''}">
				<view class="flex_c_b" style="margin-left: 19rpx;padding:20rpx 0; width: 600rpx;height: 160rpx;font-size: 26rpx;">
					<view class="line1" style="width: 100%;height: 35rpx;">环节名称：{{item.title}}</view>
					<view class="line1" style="width: 100%;height: 35rpx;">交班人：{{item.createdUser}}</view>
					<view class="line1" style="width: 100%;height: 35rpx;">接班人：{{item.changer}}</view>
					<view class="line1" style="width: 100%;height: 35rpx;">接班备注：{{item.content}}</view>
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
			}
		},
		onLoad() {
			this.getChangeRecodes()
		},
		onShow() {

		},
		// 到底了
		onReachBottom() {
			DEBUG && console.log('到底了');
			if (hasNextPage) {
				page += 1
				this.getChangeRecodes()
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
			toDetail(id) {
				util.navigate('/pages/change_record_detail/change_record_detail', {
					id
				})
			},
			// 记录的类别选择
			changeType(index) {
				if (index != this.typeIdx) {
					this.typeIdx = index
					page = 0
					this.getChangeRecodes()
				}
			},
			// 获取交接班记录
			async getChangeRecodes() {
				let res = await request.get(request.USER.CHANGE_RECORED, {
					type: this.typeIdx,
					page,
					limit
				})
				DEBUG && console.log('交接班列表', res.data);
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

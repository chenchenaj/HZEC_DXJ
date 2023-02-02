<template>
	<view class='container'>
		<view class="tab flex_r_b">
			<view class="tab-item" style="margin-left: 31rpx;" :style="{'border-bottom':typeIdx==0?'2rpx solid #5786F7':'',color:typeIdx==0?'#5786F7':''}"
			 @click='changeType(0)'>我发起的 <text v-if="num[0]&&num[0]>0" style="font-size: 22rpx;color: red;">({{num[0]}})</text></view>
			<view class="tab-item" :style="{'border-bottom':typeIdx==1?'2rpx solid #5786F7':'',color:typeIdx==1?'#5786F7':''}"
			 @click='changeType(1)'>我参与的 <text v-if="num[1]&&num[1]>0" style="font-size: 22rpx;color: red;">({{num[1]}})</text></view>
			<view class="tab-item" :style="{'border-bottom':typeIdx==2?'2rpx solid #5786F7':'',color:typeIdx==2?'#5786F7':''}"
			 style="margin-right: 31rpx;" @click='changeType(2)'>抄送我的 <text v-if="num[2]&&num[2]>0" style="font-size: 22rpx;color: red;">({{num[2]}})</text></view>
		</view>
		<view class='flex_c_c' style="width: 100%;margin-top: 110rpx;">
			<view v-if="list[0]" class='type-content-item flex_r_b' v-for="(item,index) in list" :key="index" @click="toDetail(index)"
			 :style="{'margin-bottom':index==list.length-1?'40rpx':''}">
				<view class="flex_c_b" style="margin-left: 19rpx; width: 600rpx;height: 117rpx;font-size: 27rpx;">
					<view class="line1" style="width: 100%;height: 35rpx;" :style="{color:item.isDone?'green':'red'}">环节名称：{{item.title}}</view>
					<view v-if="item.isTask" class="line1" style="width: 100%;height: 35rpx;">优先级：{{(item.priority==0&&'正常')||(item.priority==1&&'重要')||(item.priority==2&&'紧急重要')}}</view>
					<view v-else class="line1" style="color: red; width: 100%;height: 35rpx;" :style="{color:item.isDone?'green':'red'}">审批结果：{{item.result||'审核中'}}</view>
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
	let verify=['执行', '暂缓', '忽略', '大修处理', '无法确定']
	let verifyRepair=['同意','不同意']
	export default {
		data() {
			return {
				list: [],
				typeIdx: 0,
				hasNextPage,
				num:[0,0,0]
			}
		},
		onLoad() {

		},
		onShow() {
			page = 0
			this.getVerifyList()
		},
		// 到底了
		onReachBottom() {
			// if (hasNextPage) {
			// 	page += 1
			// 	this.getVerifyList()
			// }
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
				// 如果是任务则跳转任务详情
				if (data.isTask) {
					if (data.type < 2) {
						util.navigate('/pages/check_verify/check_verify', {
							id: data.id,
							uid: data.uid
						})
					} else if (data.type < 4) {
						util.navigate('/pages/repair_verify/repair_verify', {
							id: data.id,
							uid: data.uid
						})
					} else if (data.type == 4 || data.type == 5) {
						util.navigate('/pages/maintain_verify/maintain_verify', {
							id: data.id,
							uid: data.uid
						})
					} else if (data.type == 6) {
						util.navigate('/pages/danger_detail/danger_detail', {
							id: data.id,
							uid: data.uid
						})
					}
				} else {
					util.navigate('/pages/verify_detail/verify_detail', {
						id: data.id
					})
				}
			},
			// 更换类别
			changeType(idx) {
				if (this.typeIdx != idx) {
					this.typeIdx = idx
					page = 0
					this.getVerifyList()
				}
			},
			// 审批列表
			async getVerifyList() {
				DEBUG && console.log('审批参数', page, limit, this.typeIdx);
				let res = await request.get(request.USER.VERIFY_LIST, {
					page,
					limit,
					type: this.typeIdx
				})
				DEBUG && console.log('审批列表', res.data);
				if (res.data.statusCode == 200) {
					hasNextPage = res.data.list.length >= limit
					this.hasNextPage = hasNextPage
					this.num=res.data.undone
				res.data.list.forEach((item)=>{
					if(item.result.length==0){
					item.result=''	
					}else{
					item.result=item.result.map(itm=>{
						if(item.tasktype==2){
							return verifyRepair[itm]
						}else{
							return verify[itm]
						}
					}).join('->')	
					}
				})
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
		width: 200rpx;
		height: 92rpx;
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

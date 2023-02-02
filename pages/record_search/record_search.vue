<template>
	<view class='container'>
		<view class="tab flex_r_b">
			<view class="tab-item" v-for="(item,index) in typeList" :key='index' :style="{'border-bottom':typeIdx==index?'2rpx solid #5786F7':'',color:typeIdx==index?'#5786F7':''}"
			 @click='changeType(index)'>{{item}}<text v-if="num[index]&&num[index]>0" style="font-size: 22rpx;color: red;">({{num[index]}})</text></view>
		</view>
		<view class="search flex_r_s">
			<image class='search-icon' src="../../static/search.png" mode="aspectFill"></image>
			<input class='search-input' placeholder="请输入环节名称" @input="inputName" placeholder-style="color: #C8C8C8;" type="text"
			 :value="name" />
		</view>
		<view class="flex_r_s" style="width: 100%; margin-bottom: 30rpx;">
			<view class="flex_c_s_s">
				<!-- 开始时间/结束时间 -->
				<view class='flex_r_s' style="width:500rpx;font-size: 27rpx; margin-top: 23rpx;">
					<view style="color: #006ace;margin-left: 40rpx;">开始日期 :</view>
					<picker mode='date' @change="start" class='picker' style="width: 250rpx;">
						<view class='flex_r_c' style="height: 60rpx;" :class='{active:startDate}'>
							<view class='line1'>{{startDate||'请选择'}}</view>
						</view>
					</picker>
				</view>
				<!-- 结束时间 -->
				<view class='flex_r_s' style="width: 95%;font-size: 27rpx;margin-top: 23rpx;">
					<view style="color: #006ace;margin-left: 40rpx;">结束日期 :</view>
					<picker mode='date' @change="end" class='picker' style="width: 250rpx;">
						<view class='flex_r_c' style="height: 60rpx;" :class='{active:endDate}'>
							<view class='line1'>{{endDate||'请选择'}}</view>
						</view>
					</picker>
				</view>
			</view>
			<view class="btn" @click="reset">重置</view>
		</view>
		<scroll-view scroll-y="true" class='type-content'>
			<view class='flex_c_c' style="width: 100%;">
				<view v-if="contentList[0]" class='type-content-item flex_r_b' v-for="(item,index) in contentList" :key="index"
				 :style="{'margin-bottom':index==contentList.length-1?'40rpx':''}" @click="toDetail(item.id,item.uid,index)">
					<view class="flex_c_b" style="margin-left: 19rpx; width: 600rpx;height: 117rpx;font-size: 27rpx;">
						<view class="line1" style="width: 100%;height: 35rpx;" :style="{color:item.isDone||item.isAudit?'green':'red'}">环节名称：{{item.title}}</view>
						<view class="line1" style="width: 100%;height: 35rpx;">优先级：{{(item.priority==0&&'正常')||(item.priority==1&&'重要')||(item.priority==2&&'紧急重要')}}</view>
						<view class="line1" style="width: 100%;height: 35rpx;">创建时间：{{item.createdTime}}</view>
					</view>
					<image style="width: 13rpx;height: 25rpx;margin-right: 32rpx;" src="../../static/index/right.png" mode=""></image>
				</view>
				<view v-if="hasNextPage" class="loading" @click="loadMore">加载更多</view>
				<view v-if="!contentList||!contentList[0]" style="font-size: 32rpx;">暂无数据</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import {
		DEBUG
	} from '../../util/config.js'
	let app = getApp()
	// 环节名称
	let name = ''
	let page = 0
	let limit = 10
	let hasNextPage = false
	export default {
		data() {
			return {
				typeIdx: 0,
				contentList: [],
				typeList: ['点检', '巡检', '维修', '保养', '润滑', '隐患'],
				num: [],
				startDate: '',
				endDate: '',
				name,
				hasNextPage
			}
		},
		onLoad() {
			page = 0
			this.getMyTask()
			this.getMyTaskCount()
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
			// 任务详情 0,1点巡检;2,3维修;4,5保养,润滑;6隐患
			toDetail(id, uid, idx) {
				if (this.contentList[idx].type < 2) {
					util.navigate('/pages/check_verify/check_verify', {
						id,
						uid
					})
				} else if (this.contentList[idx].type < 4) {
					util.navigate('/pages/repair_verify/repair_verify', {
						id,
						uid
					})
				} else if (this.contentList[idx].type == 4 || this.contentList[idx].type == 5) {
					util.navigate('/pages/maintain_verify/maintain_verify', {
						id,
						uid,
						isMaintain: this.contentList[idx].type == 4 ? 1 : 0
					})
				}
			},
			// 加载更多
			loadMore() {
				if (hasNextPage) {
					page += 1
					this.getMyTask()
				}
			},
			// 类别切换
			changeType(idx) {
				if (this.typeIdx != idx) {
					this.typeIdx = idx
					this.getMyTask()
				}
			},
			// 环节名称
			inputName(e) {
				name = e.detail.value
				this.name = name
			},
			// 开始日期
			start(e) {
				this.startDate = e.detail.value
				this.getMyTask()
			},
			// 结束日期
			end(e) {
				this.endDate = e.detail.value
				this.getMyTask()
			},
			// 重置条件
			reset() {
				page = 0
				name = ''
				this.startDate = ''
				this.endDate = ''
				this.name = name
				this.getMyTask()
			},
			// 获取任务/审批列表数量
			async getMyTaskCount() {
				let res = await request.get(request.USER.TASK_COUNT)
				DEBUG && console.log('任务数量', res.data);
				if (res.data.statusCode == 200) {
					this.num = res.data.count
				} else {
					util.showModal(res.data.errmsg)
				}
			},
			// 获取任务/审批列表
			async getMyTask() {
				let type = this.typeIdx
				if (type > 2) {
					type += 1
				}
				let res = await request.get(request.USER.MY_TASK, {
					page,
					limit,
					type,
					startDate: this.startDate,
					endDate: this.endDate,
					name
				})
				DEBUG && console.log('任务列表', res.data);
				if (res.data.statusCode == 200) {
					hasNextPage = res.data.list.length >= limit
					this.hasNextPage = hasNextPage
					if (page == 0) {
						this.contentList = res.data.list
					} else {
						this.contentList.push(...res.data.list)
					}
				} else {
					util.showModal(res.data.errmsg)
				}
			}
		}
	}
</script>

<style scoped>
	.tab-item {
		width: 120rpx;
		line-height: 92rpx;
		font-size: 27rpx;
		text-align: center;
	}

	.type-content {
		width: 100%;
		height: 700rpx;
	}

	.type-content-item {
		width: 697rpx;
		height: 177rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1rpx 27rpx 0px rgba(0, 0, 0, 0.09);
		border-radius: 20rpx;
		margin-top: 45rpx;
	}

	.search {
		width: 679rpx;
		height: 70rpx;
		border-radius: 97rpx;
		background-color: #EFEFF4;
		margin: 45rpx 0 25rpx;
	}

	.search-icon {
		width: 33rpx;
		height: 33rpx;
		margin: 0 35rpx 0 41rpx;
	}

	.search-input {
		width: 525rpx;
		height: 100%;
		line-height: 70rpx;
		font-size: 27rpx;
	}

	.active {
		color: #000;
	}

	.picker {
		min-width: 100rpx;
		height: 60rpx;
		color: #B7B7B7;
		font-size: 26rpx;
		margin-left: 10rpx;
		box-shadow: -1px 3px 7px 0px rgba(0, 0, 0, 0.1);
		/* border: 1rpx solid red; */
	}

	.btn {
		width: 150rpx;
		height: 53rpx;
		background-color: #5786F7;
		line-height: 53rpx;
		font-size: 27rpx;
		color: #fff;
		text-align: center;
	}

	.loading {
		width: 300rpx;
		height: 50rpx;
		line-height: 53rpx;
		color: #fff;
		text-align: center;
		background-color: #5786F7;
		font-size: 27rpx;
		margin-bottom: 20rpx;
	}
</style>

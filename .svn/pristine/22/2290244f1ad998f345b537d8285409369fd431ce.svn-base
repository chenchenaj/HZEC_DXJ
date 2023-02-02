<template>
	<view class='container'>
		<view class="search flex_r_s">
			<image class='search-icon' src="../../static/search.png" mode="aspectFill"></image>
			<input class='search-input' placeholder="请输入系统名称" @input="inputSys" placeholder-style="color: #C8C8C8;" type="text"
			 value="" />
		</view>
		<view v-for="(item,index) in list" :key="item.ID" class='list flex_r_s' @tap='toDevice(index)'>
			<view class="name line1">{{item.systemName}}</view>
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
	let name = ''
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.systemList()
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
			// 选择设备
			toDevice(idx) {
				if (app.globalData.deviceInfo[this.list[idx].ID] && Object.keys(app.globalData.deviceInfo[this.list[idx].ID].device)
					.length > 0) {
					app.globalData.deviceInfo[this.list[idx].ID] = {
						system: this.list[idx].ID,
						systemName: this.list[idx].systemName,
						device: app.globalData.deviceInfo[this.list[idx].ID].device
					}
				} else {
					app.globalData.deviceInfo[this.list[idx].ID] = {
						system: this.list[idx].ID,
						systemName: this.list[idx].systemName,
						device: {}
					}
				}
				console.log('系统选择', app.globalData.deviceInfo);
				// console.log('系统id', this.list[idx].ID);
				util.navigate('/pages/device_choose/device_choose', {
					sysId: this.list[idx].ID
				})
			},
			// 系统名称
			inputSys(e) {
				name = e.detail.value
				this.systemList()
			},
			// 系统列表
			async systemList() {
				let res = await request.get(request.USER.SYSTEM_LIST, {
					name,
					page: 0,
					limit: 500,
					type: app.globalData.isPoint
				})
				DEBUG && console.log('系统列表', res.data);
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
	.search {
		width: 679rpx;
		height: 97rpx;
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
		font-size: 27rpx;
	}

	.list {
		width: 100%;
		height: 113rpx;
		border-bottom: 1rpx solid #F2F2F2;
	}

	.name {
		font-size: 31rpx;
		font-weight: bold;
		width: 620rpx;
		height: 100%;
		line-height: 113rpx;
		margin-left: 66rpx;
	}
</style>

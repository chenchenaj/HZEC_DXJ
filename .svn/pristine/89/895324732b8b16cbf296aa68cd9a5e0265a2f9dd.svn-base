<template>
	<view class='container'>
		<view class="search flex_r_s">
			<image class='search-icon' src="../../static/search.png" mode="aspectFill"></image>
			<input class='search-input' @input="inputDevice" placeholder="请输入系统名称" placeholder-style="color: #C8C8C8;" type="text"
			 value="" />
		</view>
		<view v-for="(item,index) in list" :key="item.ID" class='list flex_r_s' @tap='toDevice(index)'>
			<view class="name line1">{{item.Name}}</view>
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
	// 搜索名称
	let name = ''
	// 系统id
	let sysId = ''
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(params) {
			sysId = params.sysId
			if (!sysId) {
				util.goBack()
				return
			}
			this.deviceList()
		},
		onShow() {

		},
		// 到底了
		onReachBottom() {

		},
		// 页面滚动
		onPageScroll() {

		},
		methods: {
			// 选择设备
			toDevice(idx) {
				console.log('当前系统已经选择过的主设备', app.globalData.deviceInfo[sysId]);
				if (app.globalData.deviceInfo[sysId].device[this.list[idx].ID] && app.globalData.deviceInfo[sysId].device[this.list[
						idx].ID].child) {
					app.globalData.deviceInfo[sysId].device[this.list[idx].ID] = {
						parent: this.list[idx].ID,
						parentName: this.list[idx].Name,
						child: app.globalData.deviceInfo[sysId].device[this.list[idx].ID].child
					}
				} else {
					app.globalData.deviceInfo[sysId].device[this.list[idx].ID] = {
						parent: this.list[idx].ID,
						parentName: this.list[idx].Name
					}
				}

				util.navigate('/pages/element_choose/element_choose', {
					deviceId: this.list[idx].ID,
					sysId
				})
			},
			// 系统名称
			inputDevice(e) {
				name = e.detail.value
				this.deviceList()
			},
			// 系统下主设备列表
			async deviceList() {
				let res = await request.get(request.USER.SUBJECT_DEVICE_LIST, {
					systemId: sysId,
					name,
					page: 0,
					limit: 500,
					type: app.globalData.isPoint
				})
				DEBUG && console.log('主设备列表', res.data);
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

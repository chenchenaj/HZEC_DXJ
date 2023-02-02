<template>
	<view class='container'>
		<view v-for="(item,index) in list" :key="item.ID" class='list' :style="{'margin-bottom':index==list.length-1?'150rpx':''}">
			<view class="flex_r_b_s" style="width: 100%; margin: 55rpx 0;" @click="select(index)">
				<image class='list-icon' :src="item.select? '../../static/login/selected.png':'../../static/login/unselected.png'"
				 mode="aspectFill"></image>
				<view class="name">{{item.Name}}</view>
				<view class="detail" @click.stop="toDetail(item.ID)">查看详情</view>
			</view>
		</view>
		<view class="submit" @click="submit">提交</view>
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import {
		DEBUG
	} from '../../util/config.js'
	let app = getApp()
	// 系统
	let sysId = ''
	// 主设备id
	let deviceId = ''
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(params) {
			sysId = params.sysId
			deviceId = params.deviceId
			if (!deviceId || !sysId) {
				util.goBack()
				return
			}
			this.childDeviceList()
		},
		onShow() {},
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
			// 多选
			select(idx) {
				this.list[idx].select = !this.list[idx].select
			},
			// 默认全未选中
			handleList(arr) {
				arr.forEach((item, index) => {
					item.select = false
				})
			},
			// 部件详情
			toDetail(id) {
				util.navigate('/pages/element_detail/element_detail', {
					componentId: id
				})
			},
			// 提交
			submit() {
				let child = []
				this.list.forEach(item => {
					DEBUG && console.log('子设备', item);
					if (item.select) {
						child.push({
							name: item.Name,
							id: item.ID
						})
					}
				})
				// console.log(child.length);
				if (child.length < 1) {
					util.showModal("请选择检查设备")
					return
				}
				// 如果是大修
				// if (app.globalData.overhaulInfo.isShow) {
				// 	console.log('大修。。。');
				// 	app.globalData.submitDeviceInfo[0].device[0].child = child
				// 	util.goBack()
				// } else {
				DEBUG && console.log('子设备选择', sysId, deviceId, app.globalData.deviceInfo);
				app.globalData.deviceInfo[sysId].device[deviceId].child = child
				let data = app.globalData.deviceInfo
				for (let key in data) {
					if (Object.keys(data[key].device).length == 0) {
						delete data[key]
					} else {
						let data1 = data[key].device
						for (let key1 in data1) {
							if (!data1[key1].child) {
								delete data1[key1]
							}
						}
						if (Object.keys(data1).length == 0) {
							delete data[key]
						}
					}
					DEBUG && console.log('子设备选择2', app.globalData.deviceInfo);
				}
				let temp = Object.values(JSON.parse(JSON.stringify(app.globalData.deviceInfo)))
				if (temp[0]) {
					// app.globalData.detailInfo = ''
					temp.forEach((item) => {
						item.device = Object.values(item.device)
					})
					app.globalData.submitDeviceInfo = temp
				}
				// 如果是点巡检维修
				if (app.globalData.isSpotCheckRepair == 1) {
					util.goBack({
						delta: 2
					})
				} else {
					util.goBack({
						delta: 3
					})
				}
				// }
			},
			// 主设备下子设备列表
			async childDeviceList() {
				let res = await request.get(request.USER.CHILD_DEVICE_LIST, {
					deviceId,
					page: 0,
					limit: 500,
					type: app.globalData.isPoint
				})
				DEBUG && console.log('子设备列表', res.data);
				if (res.data.statusCode == 200) {
					this.handleList(res.data.list)
					this.list = res.data.list
				} else {
					util.showModal(res.data.errmsg)
				}
			}
		}
	}
</script>

<style scoped>
	.list {
		min-height: 100rpx;
		width: 100%;
		font-size: 29rpx;
		border-bottom: 1rpx solid #F2F2F2;
	}

	.list-icon {
		width: 32rpx;
		height: 32rpx;
		margin-left: 34rpx;
	}

	.name {
		width: 450rpx;
		font-weight: bold;
	}

	.detail {
		color: #5786F7;
		margin-right: 34rpx;
	}

	.submit {
		position: fixed;
		bottom: 64rpx;
		left: 175rpx;
		width: 400rpx;
		height: 73rpx;
		background-color: #5786F7;
		line-height: 73rpx;
		text-align: center;
		font-size: 27rpx;
		color: #fff;
	}
</style>

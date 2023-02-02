<template>
	<view class='container'>
		<view v-for="(item,index) in detail" :key='index' class="info flex_r_b">
			<view class="name">{{item.name}}</view>
			<view class="content">{{item.value}}</view>
		</view>
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	let app = getApp()
	import {
		DEBUG
	} from '../../util/config.js'
	// 子设备id
	let componentId = ''
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad(params) {
			componentId = params.componentId
			if (!componentId) {
				util.goBack()
				return
			}
			this.childDeviceDetail()
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
			// 系统下主设备列表
			async childDeviceDetail() {
				let res = await request.get(request.USER.CHILD_DEVICE_DETAIL, {
					type: app.globalData.isPoint,
					componentId,
					childType: app.globalData.childType || 0
				})
				DEBUG && console.log('子设备详情', res.data);
				if (res.data.statusCode == 200) {
					this.detail = res.data.detail
				} else {
					util.showModal(res.data.errmsg)
				}
			}
		}
	}
</script>

<style scoped>
	.info {
		width: 100%;
		height: 139rpx;
		border-bottom: 1rpx solid #F2F2F2;
	}

	.name {
		width: 260rpx;
		font-size: 31rpx;
		font-weight: bold;
		margin-left: 31rpx;
	}

	.content {
		width: 400rpx;
		font-size: 28rpx;
		text-align: right;
		margin-right: 31rpx;
		color: #626262;
	}
</style>

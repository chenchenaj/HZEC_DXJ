<template>
	<view class='container'>
		<view class="flex_r_c" style="width: 100%; margin:41rpx 0rpx;">
			<view style="font-size: 30rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">部门选择</view>
			<picker class='cycle' mode="selector" :range="departRange" @change="departSelect">
				<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
					<view style="min-width: 50rpx;text-align: center; color: red;margin: 0 10rpx;">
						{{departRange[departIdx]||'请选择'}}
					</view>
					<image style="width: 20rpx;height: 12rpx;margin-right: 10rpx;"
						src="../../static/check/down_arrow.png" mode="aspectFit"></image>
				</view>
			</picker>
			<view style="font-size: 30rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">角色选择</view>
			<picker class='cycle' mode="selector" :range="roleRange" @change="roleSelect">
				<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
					<view style="min-width: 50rpx;text-align: center; color: red;margin: 0 10rpx;">
						{{roleRange[roleIdx]||'请选择'}}
					</view>
					<image style="width: 20rpx;height: 12rpx;margin-right: 10rpx;"
						src="../../static/check/down_arrow.png" mode="aspectFit"></image>
				</view>
			</picker>
		</view>
		<view v-if="choseList[0]" style="font-size: 30rpx;margin-bottom: 50rpx;">已选人员</view>
		<view :class="[choseList.length<4?'flex_r_c':'flex_row_start']" style="width: 90%;">
			<view v-for="(item,index) in choseList" :key="index" class='user flex_c_c' @click="select(item.account)"
				:style="{'margin-right':(index==choseList.length-1)||((index+1>3)&&(index+1)%4==0)?'':'58rpx'}">
				<view class="" style="font-size:24rpx;color: #fff; ">{{item.username}}</view>
			</view>
		</view>
		<view style="font-size: 30rpx;margin-top: 50rpx;margin-bottom: 50rpx;">{{roleRange[roleIdx]||'所有'}}人员列表</view>
		<view :class="[userList.length<4?'flex_r_c':'flex_row_start']" style="width: 90%;margin-bottom: 200rpx;">
			<view v-for="(item,index) in userList" :key="index" class='user1 flex_c_c'
				@click="select(item.account,item.username)"
				:style="{'margin-right':(index==userList.length-1)||(index+1)%4==0?'':'58rpx','background-color':choseInfo[item.account]?'#007AFF':''}">
				<view class="" style="font-size:24rpx;" :style="{color:choseInfo[item.account]?'#fff':'#007AFF'}">
					{{item.username}}
				</view>
			</view>
		</view>
		<view class="submit" @click="submit">确定</view>
	</view>
</template>

<script>
	import request from '../../util/request'
	// import util from '../../util/util'
	import {
		DEBUG
	} from '../../util/config.js'
	let app = getApp()
	// 完整的角色列表
	let roleList = []
	let departList = []
	// 执行人/协助人..
	let key = ''
	// 子设备审批人等
	let id = ''
	export default {
		data() {
			return {
				roleRange: [],
				roleIdx: -1,
				departRange: [],
				departIdx: -1,
				userList: [],
				choseList: [],
				choseInfo: {}
			}
		},
		onLoad(params) {
			key = params.type
			id = params.id
			if (!key) {
				util.goBack()
				return
			}
			if (id) {
				DEBUG && console.log('全局子设备数据', id, app.globalData.userChoseInfo[key]);
				// 判断当前人员类别在全局有没有
				if (app.globalData.userChoseInfo[key] && app.globalData.userChoseInfo[key][id] && app.globalData
					.userChoseInfo[key]
					[id].choseInfo) {
					this.choseInfo = app.globalData.userChoseInfo[key][id].choseInfo
					this.choseList = Object.values(this.choseInfo)
				}
			} else {
				// 判断当前人员类别在全局有没有
				if (app.globalData.userChoseInfo[key] && app.globalData.userChoseInfo[key].choseInfo) {
					this.choseInfo = app.globalData.userChoseInfo[key].choseInfo
					this.choseList = Object.values(this.choseInfo)
				}
			}
			this.getUserList()
			this.roleList()
			this.departList()
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
			submit() {
				util.goBack()
			},
			// 人员选择
			select(account, username) {
				DEBUG && console.log('选择/删除的人员', account, this.choseInfo);
				if (!this.choseInfo[account]) {
					this.choseInfo[account] = {
						username: username,
						account: account
					}
					// 如果是子设备选择
					if (id) {
						if (app.globalData.userChoseInfo[key]) {
							app.globalData.userChoseInfo[key][id] = {
								choseInfo: this.choseInfo
							}
						} else {
							app.globalData.userChoseInfo[key] = {
								[id]: {
									choseInfo: this.choseInfo
								}
							}
						}
					} else {
						app.globalData.userChoseInfo[key].choseInfo = this.choseInfo
					}
					this.choseList = Object.values(this.choseInfo)
				} else {
					delete this.choseInfo[account]
					// 如果是子设备选择
					if (id) {
						if (app.globalData.userChoseInfo[key]) {
							app.globalData.userChoseInfo[key][id] = {
								choseInfo: this.choseInfo
							}
						} else {
							app.globalData.userChoseInfo[key] = {
								[id]: {
									choseInfo: this.choseInfo
								}
							}
						}
					} else {
						app.globalData.userChoseInfo[key].choseInfo = this.choseInfo
					}
					this.choseList = Object.values(this.choseInfo)
				}
				this.userList = JSON.parse(JSON.stringify(this.userList))
			},
			// 角色选择
			async roleSelect(e) {
				let idx = e.detail.value
				this.roleIdx = idx
				let roleId = roleList[e.detail.value].Code
				// 如果全局已经有了则用全局的
				// if (app.globalData.userChoseInfo[key] && app.globalData.userChoseInfo[key][roleId]) {
				// 	this.userList = app.globalData.userChoseInfo[key][roleId]
				// 	DEBUG && console.log('全局数据', app.globalData.userChoseInfo);
				// } else {
				let res = await request.get(request.USER.USER_LIST_BY_ROLE, {
					roleId,
					department: (departList[this.departIdx] && departList[this.departIdx].id) || ''
				})
				DEBUG && console.log('角色用户列表', res.data);
				if (res.data.statusCode == 200) {
					// if (res.data.list.length > 0) {
					// 	app.globalData.userChoseInfo[key] = {
					// 		...(app.globalData.userChoseInfo[key] || {}),
					// 		[roleId]: res.data.list
					// 	}
					// }
					this.userList = res.data.list
				} else {
					util.showModal(res.data.errmsg)
				}
				// }
			},
			// 部门选择
			async departSelect(e) {
				let idx = e.detail.value
				this.departIdx = idx
				let department = departList[e.detail.value].id
				// 如果全局已经有了则用全局的
				// if (app.globalData.userChoseInfo[key] && app.globalData.userChoseInfo[key][roleId]) {
				// 	this.userList = app.globalData.userChoseInfo[key][roleId]
				// 	DEBUG && console.log('全局数据', app.globalData.userChoseInfo);
				// } else {
				let res = await request.get(request.USER.USER_LIST_BY_ROLE, {
					roleId: (roleList[this.roleIdx] && roleList[this.roleIdx].Code) || '',
					department
				})
				DEBUG && console.log('角色用户列表', res.data);
				if (res.data.statusCode == 200) {
					// if (res.data.list.length > 0) {
					// 	app.globalData.userChoseInfo[key] = {
					// 		...(app.globalData.userChoseInfo[key] || {}),
					// 		[roleId]: res.data.list
					// 	}
					// }
					this.userList = res.data.list
				} else {
					util.showModal(res.data.errmsg)
				}
				// }
			},
			// 角色列表
			async roleList() {
				let res = await request.get(request.USER.ROLE_LIST)
				DEBUG && console.log('角色列表', res.data);
				if (res.data.statusCode == 2) {
					roleList = res.data.list
					this.roleRange = res.data.list.map(item => {
						return item.Text
					})
					console.log(this.roleRange);
				} else {
					util.showModal(res.data.errmsg)
				}
			},
			async departList() {
				let res = await request.get(request.USER.DEPARTMENT)
				DEBUG && console.log('角色列表', res.data);
				if (res.data.statusCode == 200) {
					departList = res.data.list
					this.departRange = res.data.list.map(item => {
						return item.name
					})
					// console.log(this.roleRange);
				} else {
					util.showModal(res.data.errmsg)
				}
			},
			async getUserList() {
				let res = await request.get(request.USER.USER_LIST_BY_ROLE)
				DEBUG && console.log('所有角色用户列表', res.data);
				if (res.data.statusCode == 200) {
					if (res.data.list.length > 0) {
						app.globalData.userChoseInfo[key] = {
							...(app.globalData.userChoseInfo[key] || {})
						}
					}
					this.userList = res.data.list
				} else {
					util.showModal(res.data.errmsg)
				}
			}
		}
	}
</script>

<style>
	.user {
		width: 120rpx;
		height: 100rpx;
		margin-bottom: 20rpx;
		background-color: #007AFF;
		border: 1rpx solid #C0C0C0;
	}

	.user1 {
		width: 120rpx;
		height: 100rpx;
		margin-bottom: 20rpx;
		/* border: 1rpx solid #C0C0C0; */
		border: 1rpx solid #007AFF;
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

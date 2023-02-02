/* 
路由 
 */
import {
	SERVER_URL
} from './config.js'
module.exports = {
	/******业务api******/
	PUBLIC: {
		// 登录
		LOGIN: SERVER_URL + '/public/login',
		// 配置列表
		SETTING: SERVER_URL + '/public/setting'
	},
	USER: {
		// 首页获取任务/审批列表
		MY_TASK: SERVER_URL + '/user/getMyTask',
		// 所有系统列表
		SYSTEM_LIST: SERVER_URL + '/user/getSystemList',
		// 系统下的所有主设备列表
		SUBJECT_DEVICE_LIST: SERVER_URL + '/user/getDeviceList',
		//主设备下的所有子设备
		CHILD_DEVICE_LIST: SERVER_URL + '/user/getComponentList',
		// 子设备详情
		CHILD_DEVICE_DETAIL: SERVER_URL + '/user/checkDetail',
		// 我下发的任务
		MY_CREATED_TASK: SERVER_URL + '/user/myAuditList',
		// 任务详情
		TASK_DETAIL: SERVER_URL + '/user/taskDetail',
		// 所有角色列表
		ROLE_LIST: SERVER_URL + '/user/roles',
		// 角色下的所有用户
		USER_LIST_BY_ROLE: SERVER_URL + '/user/getUserList',
		// 交接班列表
		CHANGE_RECORED: SERVER_URL + '/user/handover',
		// 交接班详情
		CHANGE_RECORED_DETAIL: SERVER_URL + '/user/handoverDetail',
		// 任务数量
		TASK_COUNT: SERVER_URL + '/user/getTaskCount',
		// 结束任务
		END_TASK: SERVER_URL + '/user/endTask',
		// 审批列表
		VERIFY_LIST: SERVER_URL + '/user/auditList',
		// 审批详情
		VERIFY_DETAIL: SERVER_URL + '/user/auditDetail',
		// 提交审批
		VERIFY_SUBMIT: SERVER_URL + '/user/audit',
		// 退出登录
		LOGIN_OUT: SERVER_URL + '/user/logout',
		// 我的页面任务列表
		MINE_TASK: SERVER_URL + '/user/getTasksByType',
		// 安全环保
		SAFE_ENVIR: SERVER_URL + '/user/safe',
		// 消息列表
		MESSAGE: SERVER_URL + '/user/messages',
		// 消息阅读
		READ_MESSAGE: SERVER_URL + '/user/readMessage',
		// 安全环保详情
		SAFE_DETAIL: SERVER_URL + '/user/safeDetail',
		// 大修列表
		OVERHAUL: SERVER_URL + '/user/overhaul',
		// 临时性/周期性任务列表
		CYCLETASK: SERVER_URL + '/user/cycleTask',
		// 暂停任务
		PAUSE_TASK: SERVER_URL + '/user/pauseTask',
		// 继续任务
		CONTINUE_TASK: SERVER_URL + '/user/continueTask',
		// 删除任务
		DEL_TASK: SERVER_URL + '/user/delTask',
		// 开启/关闭 紧急任务消息推送
		UPDATE_NOTICE: SERVER_URL + '/user/updateNotice',
		// 消息一键
		READ_ALL: SERVER_URL + '/user/readAllMessage',
		// 部门列表
		DEPARTMENT: SERVER_URL + '/user/department',
		// 部门下的用户
		USER_BY_DEPARTMENT: SERVER_URL + '/user/getUserListByDepartment',
		// 审批数量
		AUDIT_NUM: SERVER_URL + '/user/auditNum'
	},
	TOKEN: '',
	/******业务api******/
	get(url, data) {
		console.log(url, data);
		return new Promise((resolve, reject) => {
			uni.request({
				url,
				data: handleData(url, data),
				header: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.TOKEN}`
				},
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err)
				}

			});
		})
	},
	post(url, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url,
				data: handleData(url, data),
				method: 'POST',
				header: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.TOKEN}`
				},
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err)
				}

			});
		})
	}
}
// 处理query数据
function handleData(url, data) {
	let app = getApp()
	data = data || {}
	// if (!data.username) {
	// 	if (!app.globalData.isLogin) {
	// 		console.log('用户未登录,无法请求/user/接口')
	// 		return
	// 	}
	// 	data.username = app.globalData.userInfo.userName
	// }
	for (let key in data) {
		if (data[key] == null || typeof data[key] == 'undefined') {
			delete data[key]
		}
	}
	return data
}

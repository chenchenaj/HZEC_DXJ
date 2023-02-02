/* 
 *各种路由跳转
 */
module.exports = {
	// 返回
	goBack(data) {
		// if (getCurrentPages().length > 1) {
		// 	uni.navigateBack(data)
		// } else {
		// 	uni.reLaunch({
		// 		url: '/pages/message/message.vue'
		// 	})
		// }
		uni.navigateBack(data)
	},
	goHome() {
		uni.switchTab({
			url: '/pages/mine/mine'
		})
	},
	goMine() {
		uni.switchTab({
			url: '/pages/mine/mine'
		})
	},
	navigate(url, data) {
		uni.navigateTo({
			url: urlQueryFmt(url, data)
		})
	},

	redirect(url, data) {
		uni.redirectTo({
			url: urlQueryFmt(url, data)
		})
	},

	switchTab(url) {
		uni.switchTab({
			url
		})
	}
}

function urlQueryFmt(url, data) {
	if (data instanceof Object) {
		let queryStr = Object.keys(data)
			.map(key => {
				return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
			})
			.join('&')
		url += `${url.indexOf('?') == -1 ? '?' : '&'}${queryStr}`
	}
	return url
}

/* 
 *各种弹窗提示
 */
let timeTarget
module.exports = {
	showLoading(title, timeout) {
		clearTimeout(timeTarget)
		uni.showLoading({
			title: title || '加载中...',
			mask: true
		})

		// timeTarget = setTimeout(function() {
		// 	hideLoading()
		// }, timeout || 10000)
	},

	hideLoading,

	showTips(tips, type, duration) {
		let icon = ''
		let image = ''
		switch (type) {
			case 1:
				icon = 'loading'
				break
			case 4:
				icon = 'none'
				break
			default:
				icon = 'success'
				break
		}
		uni.showToast({
			title: tips,
			icon,
			image,
			duration: duration || 1000,
			mask: true
		})
	},

	showModal(param, cb, showCancel, cb1) {
		let content = ''
		let title = '提示'
		if (typeof param == 'string') {
			content = param
		} else if (typeof param == 'object') {
			content = param.content || content
			title = param.title || title
		} else {
			console.error('第一个参数必须为 字符串 或 对象')
			return
		}
		uni.showModal({
			title,
			content,
			showCancel: showCancel || false,
			success: function(res) {
				if (res.confirm) {
					cb && cb()
				} else {
					cb1 && cb1()
				}
			}
		})
	},

	showModalAsk(content, cb, confirmText, cancelText) {
		uni.showModal({
			title: '提示',
			content: content,
			showCancel: true,
			cancelText: cancelText || '取消',
			confirmText: confirmText || '确认',
			success: function(res) {
				cb && cb(!!res.confirm)
			}
		})
	}
}

function hideLoading(title, timeout) {
	clearTimeout(timeTarget)
	uni.hideLoading()
}

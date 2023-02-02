let app
import request from './request'
import {
	goHome,
	getDistance,
	showLoading,
	hideLoading,
	navigate,
	redirect,
	showTips,
	num2k,
	showModal,
	sleep
} from './util'
import {
	DEBUG,
	LOCAL_DATA_KEY,
	OFFLINE_KEY,
	SERVER_URL
} from './config'
let hasReLogin = false //是否已重新登录
let userSetting = null //缓存setting记录
let isLoadingSetting = false //是否正在getSetting
let userInfoCB = []
let isLogining = false // 是否正在登陆中，防止重复登录


// 读取本地缓存
function loadStorage(_app) {
	app = _app
	// console.log(app)
	try {
		const value = uni.getStorageSync(LOCAL_DATA_KEY);
		if (value) {
			console.log('读取localData信息成功')
			app.globalData.localData = value
		} else {
			console.log('本地没有localData信息')
		}
	} catch (e) {
		console.log('加载localData信息失败', e)
	}
}
// 获取配置列表
async function getSetting(_app) {
	let res = await request.get(request.PUBLIC.SETTING)
	DEBUG && console.log('配置列表', res.data)
	if (res.data.statusCode == 200) {
		_app.globalData.setting = res.data.list
		update(res.data.list.VERSION, res.data.list.VERSIONURL)
	} else {
		showModal(res.data.errmsg)
	}
}
// 保存本地配置
function saveStorage() {
	uni.setStorage({
		key: LOCAL_DATA_KEY,
		data: app.globalData.localData,
		success: function() {
			console.log('localData信息保存成功');
		}
	});
}
// 读取离线数据
function readOffline(_app) {
	if (!app) {
		app = _app
	}
	try {
		const value = uni.getStorageSync(OFFLINE_KEY);
		if (value) {
			console.log('本地数据', value);
			app.globalData.offlineInfo = value
			// 读取后就删除本地缓存数据
			uni.removeStorage({
				key: OFFLINE_KEY
			});
			showModal('您有未提交的表单,是否前往重新提交?', () => {
				// 确定
				navigate(value.appUrl)
			}, true)
		} else {
			DEBUG && console.log('本地没有离线数据')
		}
	} catch (e) {
		DEBUG && console.log('加载localData信息失败', e)
	}
}

function toDownWord(file) {
	uni.showLoading({
		title: '下载中。。。'
	})
	//文件名称可以在上传时进行保存，下载时取出，当文件名称中存在单双引号时，要做好处理，否则会报错
	//item.fileUrl 为线上文件下载路径

	let abc = file.split('/')
	let name = abc[abc.length - 1];
	let dtask = plus.downloader.createDownload(file, {
		filename: "_downloads/" + name //利用保存路径，实现下载文件的重命名
	}, function(d, status) {
		console.log('下载状态', status, d);
		//d为下载的文件对象
		if (status == 200) {
			uni.hideLoading()
			//下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
			let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
			DEBUG && console.log('绝对路径', fileSaveUrl);
			plus.runtime.openFile(fileSaveUrl); //选择软件打开文件
		} else {
			uni.hideLoading()
			//下载失败
			plus.downloader.clear(); //清除下载任务
		}
	})
	dtask.start();
}

function download(file, app) {
	uni.showLoading({
		title: '下载中。。。'
	})
	uni.downloadFile({
		url: file, //下载地址接口返回
		success: (data) => {
			uni.hideLoading()
			DEBUG && console.log('下载返回', data);
			if (data.statusCode === 200) {
				//文件保存到本地
				uni.saveFile({
					tempFilePath: data.tempFilePath, //临时路径
					success: function(res) {
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '文件已保存：' + res.savedFilePath, //保存路径
							duration: 2000,
						});
						setTimeout(() => {
							if (app.globalData.platform == 'ios') {
								plus.runtime.openFile(res.savedFilePath);
							} else {
								//打开文档查看
								uni.openDocument({
									filePath: res.savedFilePath,
									success: function(res) {
										// console.log('打开文档成功');
									}
								});
							}
						}, 1000)
					},
					fail: function(err) {
						console.log('保存文件失败', err);
					}
				});
			} else {
				uni.showToast({
					icon: 'none',
					mask: true,
					title: '下载失败,请重新下载',
				});
			}
		},
		fail: (err) => {
			uni.hideLoading()
			console.log(err);
			uni.showToast({
				icon: 'none',
				mask: true,
				title: '失败请重新下载',
			});
		},
	});
}
// 热更新 (版本,更新包url)
function update(version, url) {
	// 热更新
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		console.log('热更新', widgetInfo);
		if (version > widgetInfo.version && url) {
			showModal('发现新版本,是否立即更新', () => {
				showLoading('更新中...')
				uni.downloadFile({
					url: SERVER_URL + '/' + url,
					success: (downloadResult) => {
						if (downloadResult.statusCode === 200) {
							hideLoading()
							plus.runtime.install(downloadResult.tempFilePath, {
								force: false
							}, function() {
								util.showTips('更新成功', 4)
								plus.runtime.restart();
							}, function(e) {
								util.showTips('更新失败', 4)
							});
						}
					},
					fail: (err) => {
						util.showTips('下载失败', 4)
						hideLoading()
					}
				});
			}, true)
		}
	});
}
// 导出
module.exports = {
	download,
	toDownWord,
	readOffline,
	update,
	getSetting,
	saveStorage,
	loadStorage,
	//获取app配置
	async reqGameCfg(_app) {
		app = _app
		let res = await request.get(request.PUBLIC.APP_CFG, {
			type: 5
		})
		if (res.data.errcode == 0) {
			let cfg = res.data.data
			console.log('小程序配置', cfg)
			try {} catch (error) {
				console.log(error)
			}
			app.globalData.gameConfig = cfg
			return cfg
		}
	}
}

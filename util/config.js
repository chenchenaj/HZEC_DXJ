// 控制本地环境还是线上环境，true为本地环境
const DEBUG = true
// 项目全称(英文)
const APP_LETTER_NAME = 'snc_second'
// 项目全称中文
const APP_NAME = '水泥厂二期'
// 开发环境(本地)
const devUrl = `http://10.23.32.9:9103`
// 生产环境(线上)
// const prodUrl = `https://api.wx.wxfxz.cn/cement`
const prodUrl = 'http://120.69.0.66:9103'
// 根据配置选择本地或线上环境
const SERVER_URL = DEBUG ? devUrl : prodUrl
const IMAGE_URL = SERVER_URL
const OFFLINE_KEY = 'offline' //离线的数据保存
module.exports = {
	OFFLINE_KEY,
	IMAGE_URL,
	SERVER_URL,
	DEBUG,
	APP_NAME,
	APP_LETTER_NAME,
	IMG_SUFFIX: `?ts=${Date.now()}` // 图片后缀
}

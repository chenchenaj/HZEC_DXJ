import {
	goBack,
	goHome,
	goMine,
	navigate,
	redirect,
	switchTab
} from './route'
import {
	showLoading,
	hideLoading,
	showTips,
	showModal,
	showModalAsk
} from './tipTools'
/**倒计时计时器函数 全局单例  */
class countDownCounter {
	static endTs = 0;
	static timeFlag = '';
	static tickerCB = null;
	static timeFlag1 = ''
	static tickerCB1 = null
	/**开始计时  */
	static begin(fmt, endTS, cb) {
		clearInterval(this.timeFlag)
		this.tickerCB = cb
		this.endTs = endTS
		this.timeFlag = setInterval(() => {
			let remainTS = this.endTs - Date.now()
			let isEnd = remainTS <= 0
			let remainTime = timeFmt(fmt, 0)
			if (isEnd) {
				this.stop()
			} else {
				remainTime = timeFmt(fmt, remainTS)
			}
			this.tickerCB && this.tickerCB(remainTime, isEnd)
		}, 200)
	}
	/**抽奖列表倒计时  */
	static begin1(time, cb) {
		clearInterval(this.timeFlag1)
		this.tickerCB1 = cb
		this.timeFlag1 = setInterval(() => {
			this.tickerCB1 && this.tickerCB1()
		}, time || 10000)
	}
	/**停止  */
	static stop(sec, cb) {
		clearInterval(this.timeFlag)
		clearInterval(this.timeFlag1)
	}
}

/**
 * 時間格式化
 * ts:剩余毫秒数
 */
function timeFmt(fmt, ts) {
	var o = {
		'd+': Math.floor(ts / 1000 / 60 / 60 / 24), //日
		'h+': Math.floor((ts / 1000 / 60 / 60) % 24), //小时
		'm+': Math.floor((ts / 1000 / 60) % 60), //分
		's+': Math.floor((ts / 1000) % 60), //秒
		'S+': Math.floor((ts % 1000) / 10) //耗秒
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length))
		}
	}
	return fmt
}
//日期格式化
function dateFtt(fmt, date) {
	var o = {
		'y+': date.getFullYear(), //年
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		'S+': date.getMilliseconds() //毫秒
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ('0000' + o[k]).substr(-RegExp.$1.length))
		}
	}
	return fmt
}
/**
 * 获取周几
 */
let weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

function getWeek(date) {
	let weekNum = date.getDay()
	return weekList[weekNum]
}
//取a-b的随机数，左闭右开
function rand(a, b) {
	return Math.floor(Math.random() * (b - a)) + a
}

async function sleep(delay) {
	return new Promise(resolve => {
		let flag = setTimeout(() => {
			resolve(flag)
		}, delay || 1000)
	})
}

/**数字转换*/
function num2k(m) {
	if (m >= 1000) {
		return (m / 1000).toFixed(1) + 'k'
	}
	return m
}

/**
 * 获取今天0点时间戳
 */
function today24HourTS() {
	return new Date().setHours(23, 59, 59).valueOf()
}

function fmtBoradcast(item) {
	if (item.user_name) {
		item.userName = Base64.decode(item.user_name).replace(/(.).*(.)/, '$1**$2')
	}
	if (item.created_time || item.success_time) {
		let ts = Date.now() - (item.created_time || item.success_time)
		let s = Math.floor(ts / 1000)
		let m = Math.floor(s / 60)
		let h = Math.floor(m / 60)
		let pastTime = s + '秒前'
		if (h) {
			pastTime = h + '小时前'
		} else if (m) {
			pastTime = m + '分钟前'
		}
		item.pastTime = pastTime
	}
	return item
}

/**获取两个pos距离  */
function getDistance(lat1, lng1, lat2, lng2) {
	if (!lat1 || !lng1 || !lat2 || !lng2) {
		return 0
	}
	var radLat1 = (lat1 * Math.PI) / 180.0
	var radLat2 = (lat2 * Math.PI) / 180.0
	var a = radLat1 - radLat2
	var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
	var s =
		2 *
		Math.asin(
			Math.sqrt(
				Math.pow(Math.sin(a / 2), 2) +
				Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
			)
		)
	s = s * 6378.137
	s = Math.round(s * 10000) / 10
	return s
}
// 将一个一维数组换算成一个二维数组
function sliceArray(array, size) {
	let result = []
	for (let x = 0; x < Math.ceil(array.length / size); x++) {
		let start = x * size
		let end = start + size
		result.push(array.slice(start, end))
	}
	return result
}
// 将数组打乱
function shuf(arr) {
	// let len = arr.length;
	//首先从最大的数开始遍历，之后递减
	for (var i = arr.length - 1; i >= 0; i--) {
		//随机索引值randomIndex是从0-arr.length中随机抽取的
		var randomIndex = Math.floor(Math.random() * (i + 1))
		//下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置
		var itemIndex = arr[randomIndex]
		arr[randomIndex] = arr[i]
		arr[i] = itemIndex
	}
	//每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）
	return arr
}

/*
 *思路：每次随机从数组抽出一个数放进新的数组，然后将这个数从原数组中剔除，这个就不会抽到重复的数了
 */
function makeRandomArr(arrList, correctAnswer) {
	let newArray = JSON.parse(JSON.stringify(arrList))
	// 如果有正确答案则选择随机位置插入
	if (correctAnswer) {
		// 随机一个位置插入正确答案
		let random = Math.floor(Math.random() * arrList.length)
		let temp = newArray[random]
		newArray[random] = correctAnswer
		newArray.push(temp)
	}
	let len = newArray.length
	//首先从最大的数开始遍历，之后递减
	for (let i = len - 1; i >= 0; i--) {
		//随机索引值randomIndex是从0-arr.length中随机抽取的
		let randomIndex = Math.floor(Math.random() * (i + 1))
		//下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置
		let itemIndex = newArray[randomIndex]
		newArray[randomIndex] = newArray[i]
		newArray[i] = itemIndex
	}
	//每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）
	return newArray
}
module.exports = {
	goBack,
	goHome,
	goMine,
	navigate,
	redirect,
	switchTab,
	showLoading,
	hideLoading,
	showTips,
	showModal,
	showModalAsk,
	getDistance,
	fmtBoradcast,
	today24HourTS,
	num2k,
	countDownCounter,
	timeFmt,
	encode: str => Base64.encode(str),
	decode: str => Base64.decode(str),
	sleep,
	dateFtt,
	rand,
	sliceArray,
	shuf,
	getWeek
}

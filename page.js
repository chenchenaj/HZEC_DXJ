/**
 * Created by wn on 2018/6/28.
 * 主要用于快速创建主文件，模板为./temp/index/index.vue
 */

let fs = require('fs');
let basepath = 'temp/index/';
let cptName = process.argv.splice(2)[0];
let path = cptName.split('/');
let name = path[path.length - 1];
let bepath = 'pages/'
let despath = `pages/${name}/`;
let writes = [`${name}.vue`];
let reads = [`${basepath}index.vue`];
let file = [];
let author = require('os').homedir().split('\\').pop();

//检测是否存在文件夹
let exists = function() {
	return new Promise((res, rej) => {
		(async function() {
			if (!fs.existsSync(despath)) {
				fs.mkdirSync(despath);
			}
			for (let a of writes) {
				if (fs.existsSync(despath + a)) {
					rej(`${a}文件已存在`)
				}
			}
			res();
		})()
	})
}
//读取模板文件内容，并替换为目标组件
let readFile = function() {
	return new Promise((res) => {
		for (let a of reads) {
			let text = fs.readFileSync(a).toString();
			// 替换内容
			text = text.replace(/TEP_NAME/g, fmtName(name))
			file.push(text)
		}
		res(file);
	})
}

function fmtName(name) {
	let arr = name.split('_')
	let res = '';
	arr.forEach(n => {
		res += replaceReg(n)
	})
	return res
}

function replaceReg(str) {
	var reg = /\b(\w)|\s(\w)/g;
	str = str.toLowerCase();
	return str.replace(reg, function(m) {
		return m.toUpperCase()
	})
}
//生成文件，并填入之前读取的文件内容
let writeFile = function(file) {
	return new Promise((res, rej) => {
		(async function() {
			for (let a of writes) {
				await fs.writeFile(`${despath}${a}`,
					a == writes[0] ? file[0] : a == writes[1] ? file[1] : a == writes[2] ? file[2] : '', (err) => {
						if (err) rej(err)
					})
			}
			res('succ');
		})()
	})
}
async function creatCpt() {
	try {
		await exists();
		await readFile()
		await writeFile(await readFile());
		return console.log(`Successfully created ${name}`)
	} catch (err) {
		console.error(err);
	}
}
creatCpt();

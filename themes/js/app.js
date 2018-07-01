/* 新的写法 */
var goWin = function(id, urls, title) {
	mui.openWindow({
		url: urls,
		id: id,
		styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
			bounce: 'vertical',				
			titleNView: { // 窗口的标题栏控件
				homeButton:false,//可取值： "true" - 显示Home按钮； "false" - 不显示Home按钮。 默认值为"false"。 Home按钮的颜色为窗口标题文字颜色，按下时颜色自动调整透明度为0.3。 点击Home按钮的逻辑为关闭所有非首页窗口，显示首页窗口。
				autoBackButton:true,
				titleText: title, // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
				titleColor: "#FFFFFF", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
				titleSize: "16px", // 字体大小,默认17px
				backgroundColor: "#FF6D6F", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
				/*progress: { // 标题栏控件的进度条样式
					color: "#00FF00", // 进度条颜色,默认值为"#00FF00"  
					height: "2px" // 进度条高度,默认值为"2px"         
				},*/
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#FF6D6F", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				},
				type:'default' //可取值： "default" - 默认样式，顶部停靠显示，挤压Webview页面内容显示区域； "transparent" - 透明样式，顶部沉浸式显示覆盖Webview页面内容，标题栏上内容（除按钮外）全部透明，当页面滚动时透明度逐渐变化，直到不透明显示。 默认值为"default"。
			}
		},
		show: {
			event: "loaded"
		},
		waiting: {
			autoShow: false
		}
	},{
		
	});
}
/**
 * 获得存储在本地的json
 * @param {key} key : 键
 * @param {boolean} wa : 是否显示等待框
 * @param {boolean} ns : 是否不自动显示
 * @param {JSON} ws : Webview窗口属性
 */
function GetSession(key) {
	var obj = localStorage.getItem(key);
	if(obj != null) {
		return JSON.parse(obj);
	}
	return null;
}
/**
 * 保存存储在本地的json
 * @param {key} key : 键
 * @param {options} json : 保存的参数
 */
function SetSession(key, options) {
	localStorage.setItem(key, JSON.stringify(options));
}

/**
 * 删除键值对json
 * @param {key} key : 键
 */
function SessionRemove(key) {
	localStorage.removeItem(key);
}

function log(data) {
	console.log(JSON.stringify(data));
}

var httpUrl = "http://oa.feiyit.com";
var timeouts = 20000; //超时请求时间为10秒
(function(w) {
	//公共ajax方法
	w.baseAjax = function(url, options, callFun) {
			//var data = getdata(options, 'com.feiyit.yl.gcomment');
			mui.ajax(httpUrl + url, {
				data: options,
				async: true,
				crossDomain: true, 
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: timeouts, //超时时间设置为10秒；
				success: function(data) {
					callFun(data);
				},
				error: function(xhr, type, errorThrown) {
					if(type == 'timeout') {
						mui.toast('连接超时，请稍后重试！');
					} else if(type == 'error') {
						mui.toast('连接异常，请稍后重试！');
					}
				}
			});
		}		
})(window);
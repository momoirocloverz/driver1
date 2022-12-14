// 注册监听
if (window.addEventListener) {
    //为window注册message事件并绑定监听函数
    window.addEventListener('message', receiveMsg, false);
}else {
    window.attachEvent('message', receiveMsg);
}

// 监听函数，接收一个参数--Event事件对象
function receiveMsg(e) {
    let obj = e.data;
	// gisLayerMessage
	if(obj.type == "gisLayerMessage"){
		switch(obj.data.key){
			case "changeFeaturesByName":
				if(obj.data.value) changeFeaturesByName(obj.data.value.name);
				break;
			case "changeLayerByOption":
				if(obj.data.value) changeLayerByOption(obj.data.value.option);
				break;
			case "highLight":
				if(obj.data.value) highLight(obj.data.value.highLight);
				break;
			case "changeAreaByName":
				if(obj.data.value) changeAreaByName(obj.data.value.name);
				break;
			default:
				return;
		}
	}
}

// 发送消息
function sendMessage(type,data){
	// 向父页面传递消息
	if(window.parent != window){
		window.parent.postMessage({type: type, data: data}, '*');
	}
}
function onPutKind() {
	var request = webOS.service.request("luna://com.palm.db", {
		method: "putKind",
		parameters: {
			"id":"com.chillaxwebos.app:1",
			"owner":"com.chillaxwebos.app",
			"schema":{
				"properties":{
					"prop_name1":{
						"type":"string",
						"optional":true,
						"description":"foo string"
					},
					"prop_name2":{
						"type":"string",
						"description":"bar string"
					}
				},
				"indexes":[{
					"name":"index_name1",
					"props":[{"name":"prop_name1"},{"name":"prop_name2"}]
				},{
					"name":"index_name2",
					"props":[{"name":"prop_name2"}]
				}]
			}
		},
		onComplete: getPutKindResponse
	});

	request.send();
}

function getPutKindResponse(inResponse) {
	var success = inResponse.returnValue;
	if (!success){
		document.getElementById('testResultPutKind').innerText = "Failed to putKind";
		return true;
	}
	
	document.getElementById('testResultPutKind').innerText = "excuted putKind";
	return true;
}

function onPut() {

	var request = webOS.service.request("luna://com.webos.service.db", {
		method: "put",
		parameters: {
			"objects":[{
				"_kind":"test.db-api:1",
				"prop_name1":"foo1",
				"prop_name2":"bar1"
			},{
				"_kind":"test.db-api:1",
				"prop_name1":"foo2",
				"prop_name2":"bar2"
			},{
				"_kind":"test.db-api:1",
				"prop_name1":"foo3",
				"prop_name2":"bar3"
			},{
				"_kind":"test.db-api:1",
				"prop_name1":"foo4",
				"prop_name2":"bar4"
			}]
		},
		onComplete: getPutResponse
	});

	request.send();
}

function getPutResponse(inResponse) {
	var success = inResponse.returnValue;
	if (!success){
		document.getElementById('testResultPut').innerText = "Failed to put items";
		document.getElementById('idOfItems').innerHTML = "can't access to Kind";
		return true;
	}
	
	document.getElementById('testResultPut').innerText = "excuted put Items";
	var str = "<table>";
	for(i in inResponse.results){
		str += "<tr>";
		str += "<td>";
		str += inResponse.results[i].id;;
		str += "</td>";
		str += "</tr>"
	}
	str +="</table>";
	document.getElementById('idOfItems').innerHTML = str;

	return true;
}

function onFind() {

	var request = webOS.service.request("luna://com.webos.service.db", {
		method: "find",
		parameters: {
			"query":{
				"from":"test.db-api:1"
			}
		},
		onComplete: getFindResponse
	});

	request.send();
}

function getFindResponse(inResponse) {
	var success = inResponse.returnValue;
	if (!success){
		document.getElementById('testResultFind').innerText = "Failed to Find items";
		document.getElementById('itemPanel').innerHTML = "can't access to Kind";
		return true;
	}
	
	document.getElementById('testResultFind').innerText = "excuted Find Items";
	var str = "";
	str = "<table>";
	for (var i=0; i < 4; i++){
		str += "<tr>";
		str += "<td>";
		str += inResponse.results[i].prop_name1;
		str += "</td>";
		str += "<td>";
		str += inResponse.results[i].prop_name2;
		str += "</td>";
		str += "</tr>";
	}
	str +="</table>";
	document.getElementById('itemPanel').innerHTML = str;
		
	return true;
}

function onDelKind() {

	var request = webOS.service.request("luna://com.webos.service.db", {
		method: "delKind",
		parameters: {
			"id" : "test.db-api:1"
		},
		onComplete: getDelKindResponse
	});

	request.send();
}

function getDelKindResponse(inResponse) {
	var success = inResponse.returnValue;
	if (!success){
		document.getElementById('testResultDelKind').innerText = "Failed to delKind";
		return true;
	}
	document.getElementById('testResultDelKind').innerText = "excuted delKind";
	return true;
}
var appId = "com.chillaxwebos.app";
var kindId = appId + ":1";
var callerId = "com.chillaxwebos.app.*";

// function printLog(content) {
//     document.querySelector("#log").innerHTML += content + "<br>";
// }
// function clearLog() {
//     document.querySelector("#log").innerHTML = "";
// }
// function printDB(content) {
//     document.querySelector("#db").innerHTML = content;
// }

function initPage() {
    putKind();
    // refreshDB();

    // document.querySelector("#putKind").addEventListener("click", function () {
    //     clearLog();
    //     putKind();
    //     refreshDB();
    // });
    // document.querySelector("#delKind").addEventListener("click", function () {
    //     clearLog();
    //     delKind();
    //     refreshDB();
    // });
}

function putKind() {
	webOS.service.request("luna://com.webos.service.db", {
		method: "putKind",
		parameters: {
			id: kindId,
			owner: appId,
            schema: {
                id: kindId, 
                type: "object", 
                properties : {
                    "_kind" : {
                        "type": "string",
                        "value": kindId
                    }, 
                    "number": {
                        "type": "integer",
                        "description": "movie id"
                    }, 
                    "watched": {
                        "type": "boolean", 
                        "description": "movie is in watched"
                    },
                    "watchlist": {
                        "type": "boolean", 
                        "description" : "movie is in watchlist"
                    }
                }
            },
			indexes: [
				{ 
					"name": "index0",
					"props": [
                        {"name": "number"}
                    ]
                },
                {
                    "name": "index1",
                    "props": [
                        {"name": "watched"}
                    ]
                },
                {
                    "name": "index2",
                    "props": [
                        {"name": "watchlist"}
                    ]
                }
			]
		},
		onSuccess: function (res) {
            // printLog("[putKind] onSuccess");
		},
		onFailure: function (res) {
            // printLog("[putKind] onFailure");
            // printLog("(" + res.errorCode + ") " + res.errorText);
            console.log("[putKind] onFailure", res);
			return;
		}
	});
}

function delKind() {
	webOS.service.request("luna://com.webos.service.db", {
		method: "delKind",
		parameters: { 
			id: kindId
		},
		onSuccess: function (res) {
			// printLog("[delKind] onSuccess");
		},
		onFailure: function (res) {
            // printLog("[delKind] onFailure");
            // printLog("(" + res.errorCode + ") " + res.errorText);
			return;
		}
	});
}


function put(number, watched, watchlist) {
    webOS.service.request("luna://com.webos.service.db", {
        method: "put",
        parameters: { 
            "objects":[
                {
                    "_kind": kindId,
                    "number": number,
                    "watched": watched,
                    "watchlist": watchlist
                }
            ]
        },
        onSuccess: function (res) {
            // printLog("[put] onSuccess: " + number + ", " + watched + ", " + watchlist);
        },
        onFailure: function (res) {
            // printLog("[put] onFailure: " + number + ", " + watched + ", " + watchlist);
            // printLog("(" + res.errorCode + ") " + res.errorText);
            return;
        }
    });
}

function del(id) {
    var findQuery = [
        [
            {"prop":"number", "op":"=", "val":id}
        ]
    ];
    webOS.service.request("luna://com.webos.service.db", {
        method: "del",
        parameters: {
            "query" : { 
                "from" : kindId,
                "where": findQuery[0]
            }
        },
        onSuccess: function (res) {
            // printLog("[del] onSuccess: deleted " + res.count + " object(s).");
        },
        onFailure: function (res) {
            // printLog("[del] onFailure");
            // printLog("(" + res.errorCode + ") " + res.errorText);
            return;
        }
    });
}

function find(query) {
    webOS.service.request("luna://com.webos.service.db", {
        method: "find",
        parameters: { 
            "query": {
                "from": kindId,
                "where": query,
            }
        },
        onSuccess: function (res) {
            var result = res.results;
            // printLog("[find] onSuccess: found " + result.length + " object(s).");
            // printLog("number / watched / watchlist / _id / _rev");
            for (var i in result) {
                // printLog(result[i].number + " / " + result[i].watched + " / " + result[i].watchlist + " / " + result[i]._id + " / " + result[i]._rev);
                getMovies('https://api.themoviedb.org/3/movie/'+ result[i].number +'?api_key=7f5719644de5f05dfc066ec0484d202c&language=en-US');
            }
            console.log("[find] onSuccess:", result);
        },
        onFailure: function (res) {
            // printLog("[find] onFailure");
            // printLog("(" + res.errorCode + ") " + res.errorText);
            return;
        }
    });
}

function RefreshDB(){
    delKind();
}

// function refreshDB() {
//     webOS.service.request("luna://com.webos.service.db", {
//         method: "find",
//         parameters: { 
//             "query": {
//                 "from": kindId,
//                 "where": [
//                     {"prop":"number", "op":">", "val":0}
//                 ]
//             }
//         },
//         onSuccess: function (res) {
//             var result = res.results;
//             var content = "[DB Total: " + result.length + "] number / watched / watchlist / _id / _rev<br>"
//             for (var i in result) {
//                 content +=result[i].number + " / " + result[i].watched + " / " + result[i].watchlist + " / " + result[i]._id +  " / " + result[i]._rev + "<br>";
//             }
//             printDB(content);
//             console.log("[refreshDB] onSuccess:", result);
//         },
//         onFailure: function (res) {
//             printDB("[refreshDB] onFailure");
//             printDB("(" + res.errorCode + ") " + res.errorText);
//             return;
//         }
//     });
// }
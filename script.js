(function () {

	var consoleElem = document.getElementById("console");
	var rows = document.getElementsByClassName("row");
	var singleRow;
	var errorLog = document.getElementById("errorLog");
	document.addEventListener("load", initConsole, true);
	consoleElem.addEventListener("click", toLastRow, true);

	//Display error toast notification
	function displayError(error) {
		errorLog.innerHTML = error;
		errorLog.className = "errorReported";
		setTimeout(function () { errorLog.className = ""; errorLog.innerHTML = ""; }, 5000);
	}
	//Toast function
	function toast(txt) {
		errorLog.className = "errorReported";
		errorLog.innerHTML = txt;
		setTimeout(function () { errorLog.className = ""; errorLog.innerHTML = ""; }, 5000);
	}
	//Replace all function

	function replaceAll(find, replace, str) {
		return str.replace(new RegExp(find, 'g'), replace);
	}

	//Custom print 
	function print(value) {
		if (typeof value == "string") {
			newRowPrint(value);
		} else {
			newRowPrint(JSON.stringify(value, null, 4));
		}
	}

	//New row
	function newRow(content, editable) {
		var newRow = document.createElement('div');
		newRow.className = "row";
		if (editable == true) {
			newRow.setAttribute("contenteditable", editable);
		};
		newRow.innerHTML = content;
		consoleElem.appendChild(newRow);
		newRow.focus();
		return newRow;
	}

	//New print row
	function newRowPrint(content) {
		var newRowAlert = document.createElement('div');
		newRowAlert.className = "row print-row";
		newRowAlert.innerHTML = "&nbsp;&nbsp;&nbsp;" + content;
		consoleElem.appendChild(newRowAlert);
	}

	//Focus the last row

	function toLastRow() {
		rows[rows.length - 1].focus();
	}

	//Function help
	function help(something) {
		switch (something) {
			case "print":
				newRowPrint(" The print(message) function <br> prints a variable, an object or a string. <br> Example: print(\"Hello, World!\")");
				break;
			case "prompt":
				newRowPrint(" The propmt(message?, default?) function <br> reads a string from user input through a prompt window. <br> Example: var x = prompt() ");
				break;
			default:
				newRowPrint(" HELP <br> A simple Javascript console that excecutes code entered still has bug that are not fixed. The main approach is to support mobile browsers. To see help enter help('something'). <br> Example: help('print');");
		}
	}

	//BASIC CONSOLE funcion, that excecutes code, adds rows, detects ENTER key
	function initConsole() {

		function onKeyDown(key) {
			if (key.keyCode == 13) {
				var singleRow = rows[rows.length - 1];
				singleRow.removeAttribute("contenteditable");
				var singleRowTxt = singleRow.textContent;
				var scriptResult = undefined;
				var success = false;
				try {
					scriptResult = (0, eval)(singleRowTxt);
					success = true;
				} catch (err) {
					displayError(err);
					var errorRow = document.createElement('pre');
					errorRow.className = "inline-error";
					errorRow.innerHTML = "⚠&nbsp;" + err;
					singleRow.appendChild(errorRow);
				}
				if (success) {
					var resultRow = newRow("🡠&nbsp;" + JSON.stringify(scriptResult), false);
					resultRow.className += " code-row";
				}
				var newInputRow = newRow("", true);
				newInputRow.className += " input-row";
			}

		}

		consoleElem.addEventListener("keydown", onKeyDown, true);
	}

	// Global exports.
	window["print"] = print;
	window["help"] = help;


	//Cookies
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) != -1) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function checkCookie() {
		var jsconsoleCookie = getCookie("jsconsole");
		if (jsconsoleCookie != "visited") {
			setCookie("jsconsole", "visited", 7);
			toast("To get started, try using the help() function.");
		}
	};
	checkCookie();

})();
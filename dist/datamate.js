(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Datamate"] = factory();
	else
		root["Datamate"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Datamate)
});

;// CONCATENATED MODULE: ./src/core/DatamateFileLoader.js
/*
*
*	DatamateFileLoader.js
*	2021 scripted by t.mashimo
*
*/

class DatamateFileLoader
{
	constructor()
	{
		this.filePaths = new Array();
		this.isAvailable = false;
		this.callback = null;
		this.dataset = new Array();
	}

	clear()
	{
		this.filePaths = new Array();
		this.dataset = new Array();
	}

	count()
	{
		return this.filePaths.length;
	}

	showFileSelectionButton()
	{
		this.selectionViewElement = window.document.createElement("div");
		this.selectionViewElement.innerHTML = this.template();
		window.document.body.appendChild(this.selectionViewElement);

		const fileElement = this.selectionViewElement.querySelector("#file-select");
		fileElement.addEventListener("change", function (_e) {
			const files = fileElement.files;
			for (let i=0; i<files.length; i++) {
				const file = files[i];
				const filePath = window.URL.createObjectURL(file);
				this.addFilePath(filePath);
			}
			this.selectionViewElement.remove();
			this.load();
		}.bind(this));

		const closeboxElement = this.selectionViewElement.querySelector("#closebox");
		closeboxElement.addEventListener("mousedown", function (_e) {
			this.selectionViewElement.remove();
		}.bind(this));
	}

	addFilePath(_filePath)
	{
		this.filePaths.push(_filePath);
	}

	loadSync()
	{
		// Load all //
		for (let i=0; i<this.filePaths.length; i++) {
			const filePath = this.filePaths[i];					// Extract a file path
			const xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open('get', filePath, false);
			xmlHttpRequest.setRequestHeader('Content-Type', 'text/plane');
			xmlHttpRequest.send(null);
			let responseText = xmlHttpRequest.responseText;		// Extract text data from response.
			responseText = responseText.replace(/\"/g, "");		// Replace escaped double-quatations to empty
			this.dataset.push(responseText);					// Store the result of loading.
			console.log("DatamateFileLoader: Loaded Sync:", filePath, "\n", responseText);
		}

		// Loading complete //
		this.isAvailable = true;
		console.log("DatamateFileLoader: Load Completed:");

		// Call function if the callback is set. //
		if (this.callback)
			this.callback();

		if (window.loadedDatamate)
			window.loadedDatamate();
	}

	async load()
	{
		// Load all //
		for (let i=0; i<this.filePaths.length; i++) {
			const filePath = this.filePaths[i];					// Extract a file path
			const response = await fetch(filePath);				// Fetch given file response.
			let responseText = await response.text();			// Extract text data from response.
			responseText = responseText.replace(/\"/g, "");		// Replace escaped double-quatations to empty
			this.dataset.push(responseText);					// Store the result of loading.
			console.log("DatamateFileLoader: Loaded:", filePath, response);
		}

		// Loading complete //
		this.isAvailable = true;
		console.log("DatamateFileLoader: Load Completed:");

		// Call function if the callback is set. //
		if (this.callback)
			this.callback();

		if (window.loadedDatamate)
			window.loadedDatamate();
	}

	template()
	{
		return `
		<style>
			@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap');
			#filedialog {
				margin: 0px;
				padding: 0px;
				text-decoration: none;
				white-space: nowrap;
				list-style: none;
				box-sizing: border-box;

				width: 100%;
				height: 100%;
				color: white;
				font-size: 13px;
				background-color: rgba(0, 0, 0, 0.8);

				position: fixed;
				top: 0px;
				left: 0px;
				font-family: 'Roboto Condensed', sans-serif;

				display: flex;
			    flex-direction: column;
			    justify-content: center;
			    align-items: center;
			}
			#file-select {
				display: none;
			}
			#file-select-button {
				cursor: pointer;
				display: block;
				margin: auto;
				border: 1px solid white;
				border-radius: 10px;
				text-align: center;
				padding: 20px 60px;
				background-color: gray;
				box-shadow: 1px 1px 10px 10px rgba(255,255,255,0.2);
			}
			#closebox {
				position: fixed;
				top: 50px;
				right: 50px;
				padding: 10px 30px;
				cursor: pointer;
				border: 1px solid gray;
				border-radius: 10px;
			}
		</style>
		<div id="filedialog">
			<div>
				<input id="file-select" type="file" value="SELECT CSV" multiple="multiple" accept=".csv">
				<label id="file-select-button" for="file-select">
					<h1>SELECT CSVs</h1>
				</label>
			<div>
			<div id="closebox">CLOSE</div>
		</div>`;
	}
}

;// CONCATENATED MODULE: ./src/utils/DatamateMath.js
/**
*
*	DatamateMath.js
*	2022 scripted by mashimo,T.
*
*/

class DatamateMath
{
    static uuid4() {
        //const start = performance.now();
        const r1 = Math.random().toString(16).substring(2, 2+8);
        const r2 = Math.random().toString(16).substring(2, 2+4);
        const r3 = Math.random().toString(16).substring(2, 2+3);
        const y = Math.floor(Math.random() * 16) & 0x03;
        const r4 = Math.random().toString(16).substring(2, 2+3);
        const r5a = Math.random().toString(16).substring(2, 2+6);
        const r5b = Math.random().toString(16).substring(2, 2+6);
        let uuid = "";
        uuid += r1 + "-";
        uuid += r2 + "-";
        uuid += "4" + r3 + "-";
        uuid += y + r4 + "-";
        uuid += r5a + r5b;
        // const base = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        // const uuid = base.replace(/[xy]/g, function(_string) {
        //     let random = Math.floor(Math.random() * 16);
        //     let value = (_string=="x") ? random : (random&0x03)|0x08;
        //     console.log(Math.random().toString(16).substring(2));
        //     return value.toString(16);
        // });
        //const stop = performance.now();
        //console.log("DatamateMath.js: elapsed time (ms):", start, stop, stop - start);
        return uuid;
    }



    //----------------------------------------------------------
    // Numerial controls
    //----------------------------------------------------------
    static round(_value, _decimal=0)
    {
        // if (_decimal<=0)
        //     return Math.round(_value);
        // const divide =  Math.pow(10, _decimal);
        // return Math.round(_value * divide) / divide;
        return parseFloat(_value.toFixed(_decimal));
    }

    //----------------------------------------------------------
    // Limitation controls
    //----------------------------------------------------------
    static clamp(_value, _min, _max)
    {
        return Math.max(_min, Math.min(_max, _value));
    }

    static step(_value, _min, _max)
    {
        const range = max - min;
        const steps = Math.floor(_value / range);
        return _value - (range * steps) + min;
    }

    static loop(_value, _min, _max)
    {
        const range = _max - _min;
        let rate = (_value - _min) / range;
        rate -= Math.floor(rate);
        return rate * range + _min;
    }

    //----------------------------------------------------------
    // Radians Conversions
    //----------------------------------------------------------
    static radians(_degree)
    {
        return _degree * (Math.PI / 180.0);
    }

    static degrees(_radian)
    {
        return _radian * (180.0 / Math.PI);
    }

    //----------------------------------------------------------
    // Color Conversions
    //----------------------------------------------------------
	static RGB(color)
    {
        var rgb = new Object();
        rgb.red = ((color>>16)&0xFF) / 255.0;
        rgb.green = ((color>>8)&0xFF) / 255.0;
        rgb.blue = ((color>>0)&0xFF) / 255.0;
        return rgb;
    }

    static styleFromRGB(_rgb, _alpha=1.0)
    {
        const red = _rgb.red * 255.0;
        const green = _rgb.green * 255.0;
        const blue = _rgb.blue * 255.0;
        return "rgba(" + red + "," + green + "," + blue + "," + _alpha + ")";
    }
		
	// The given RGB should be set as normalized value as 0.0 to 1.0, the return HSB will be set as 0.0 - 1.0 //
	static HSBFromRGB(rgb)
    {
        var max = Math.max(Math.max(rgb.red, rgb.green), rgb.blue);
        var min = Math.min(Math.min(rgb.red, rgb.green), rgb.blue);
        
        var hsb = new Object();
        hsb.hue = 0;
        hsb.brightness = max;
        hsb.saturation = (max==0) ? 0 : (max - min) / max;
        if (hsb.saturation > 0.0) {
            if (max==rgb.red) hsb.hue = 60 * (rgb.green - rgb.blue)/(max - min) + 360;
            if (max==rgb.green) hsb.hue = 60 * (rgb.blue - rgb.red)/(max - min) + 120;
            if (max==rgb.blue) hsb.hue = 60 * (rgb.red - rgb.green)/(max - min) + 240;
            if (hsb.hue < 0) hsb.hue += 360;
            if (hsb.hue > 360) hsb.hue -= 360;
        }
        
        return hsb;
	}
		
    // The hsb object should be had hue, brightnes and saturation property //
    // The given HSB should be set as normalized value as 0.0 to 1.0, the return RGB will be set as 0.0 - 1.0 //
	static RGBFromHSB(hsb)
    {
        var rgb = new Object();
        
        // If saturation is 0.0, return same brightness rgb //
        if (hsb.saturation==0.0) {
            rgb.red = hsb.brightness;
            rgb.green = hsb.brightness;
            rgb.blue = hsb.brightness;
            return rgb;
        }
        
        var hueIndex = Math.floor(hsb.hue / 60.0) % 6;
        var difference = (hsb.hue / 60.0) - Math.floor(hsb.hue / 60.0);
        var valueA = hsb.brightness * (1.0 - hsb.saturation);
        var valueB = hsb.brightness * (1.0 - hsb.saturation * difference);
        var valueC = hsb.brightness * (1.0 - hsb.saturation * (1.0 - difference));
        
        switch (hueIndex) {
            case 0: // 0-60, Red
                rgb.red = hsb.brightness; 
                rgb.green = valueC; 
                rgb.blue = valueA;
                break;
            case 1:  // 60-120, Green
                rgb.red = valueB; 
                rgb.green = hsb.brightness; 
                rgb.blue = valueA;
                break;
            case 2:  // 120-180, Green
                rgb.red = valueA; 
                rgb.green = hsb.brightness; 
                rgb.blue = valueC;
                break;
            case 3:  // 180-240, Blue 
                rgb.red = valueA; 
                rgb.green = valueB; 
                rgb.blue = hsb.brightness;
                break;
            case 4:  // 240-300, Blue 
                rgb.red = valueC; 
                rgb.green = valueA; 
                rgb.blue = hsb.brightness;
                break;
            case 5:   // 300-360, Red
                rgb.red = hsb.brightness; 
                rgb.green = valueA; 
                rgb.blue = valueB;
                break;
        }
        return rgb;
    }
}
;// CONCATENATED MODULE: ./src/utils/DatamateMapper.js
/**
*
*	DatamateMapper.js
*	2022 Scripted by mashimo,T.
*
*/

class DatamateMapper
{
	static map(_value, _sourceMin, _sourceMax, _targetMin, _targetMax, _isClamp)
	{
		var range = (_sourceMax - _sourceMin);
		if (range==0)
			return _targetMin;
		var rate = (_value - _sourceMin) / range;
		if (_isClamp) rate = Math.max(0.0, Math.min(1.0, rate));
		return (_targetMax - _targetMin) * rate + _targetMin;
	}

	constructor(_smin, _smax, _tmin, _tmax, _isClamp)
	{
		this.sourceMin = _smin;
		this.sourceMax = _smax;
		this.targetMin = _tmin;
		this.targetMax = _tmax;
		this.isClamp = _isClamp;
	}

	map(_value)
	{
		var range = (self.sourceMax - self.sourceMin);
		if (range==0)
			return self.targetMin;
		var rate = (_value - self.sourceMin) / range;
		if (self.isClamp) rate = Math.max(0.0, Math.min(1.0, rate));
		return (self.targetMax - self.targetMin) * rate + self.targetMin;
	}
}

;// CONCATENATED MODULE: ./src/core/DatamateColumn.js
/*
*
*	DatamateTable.js
*	2021 scripted by t.mashimo
*
*/




class DatamateColumn
{
	constructor(_table, _tableIndex)
	{
		this.table = _table;
		this.rows = new Map();
		this.uuid = DatamateMath.uuid4();
		this.sum = 0;
		this.min = Infinity;
		this.max = -Infinity;
	}

	get isHeader()
	{
		return (this.table.headerColumnEnabled && this.index==0);
	}

	get name()
	{
		return this.headerName;
	}
	
	get headerName()
	{
		if (!this.table.headerRowEnabled)
			return null;
		const row = this.rows.get(0);
		return (row!=null) ? row.value : null;
	}

	get index()
	{
		return this.table.columns.indexOf(this);
	}

	get dataIndex()
	{
		const index = this.table.columns.indexOf(this);
		return (this.table.headerColumnEnabled) ? index - 1 : index;
	}

	values(_nullReplacement=null)
	{
		const count = this.table.rowCount();
		const values = [];
		for (let i=0; i<count; i++) {
			const data = this.rows.get(i);
			values.push((data!=null) ? data.value : _nullReplacement);
		}
		return values;
	}

	intValues(_nullReplacement=NaN)
	{
		const count = this.table.rowCount();
		const values = [];
		for (let i=0; i<count; i++) {
			const data = this.rows.get(i);
			values.push((data!=null) ? data.intValue() : _nullReplacement);
		}
		return values;
	}

	floatValues(_nullReplacement=NaN)
	{
		const count = this.table.rowCount();
		const values = [];
		for (let i=0; i<count; i++) {
			const data = this.rows.get(i);
			values.push((data!=null) ? data.floatValue() : _nullReplacement);
		}
		return values;
	}

	stringValues(_nullReplacement="")
	{
		const count = this.table.rowCount();
		const values = [];
		for (let i=0; i<count; i++) {
			const data = this.rows.get(i);
			values.push((data!=null) ? data.stringValues() : _nullReplacement);
		}
		return values;
	}

	value(_key, _tmin=0, _tmax=0)
	{
		const index = (typeof(_key)=="string") ? this.table.indexOfDataRowName(_key) : _key;
		let value = this.valueAtDataIndex(index);
		if (_tmin!=_tmax)
			value = DatamateMapper.map(value, this.min, this.max, _tmin, _tmax);
		return value;
	}

	rate(_key, _tmin=0, _tmax=0)
	{
		let value = this.value(_key);
		value = value / this.sum;
		if (_tmin!=_tmax)
			value = DatamateMapper.map(value, 0, 1, _tmin, _tmax);
		return value;
	}

	valueAtIndex(_index)
	{
		const data = this.rows.get(_index);
		return (data!=null) ? data.value : _nullReplacement;
	}

	valueAtDataIndex(_index)
	{
		const index = (this.table.headerRowEnabled) ? _index + 1 : _index;
		return this.valueAtIndex(index);
	}

	dataAtIndex(_index)
	{
		return this.rows.get(_index);
	}

	dataAtDataIndex(_index)
	{
		const index = (this.table.headerRowEnabled) ? _index + 1 : _index;
		return this.dataAtIndex(index);
	}

	setData(_data)
	{
		const key = _data.row.index;
		this.rows.set(key, _data);
	}

	update()
	{
		this.sum = 0;
		this.average = 0;
		this.min = Infinity;
		this.max = -Infinity;

		const values = this.rows.values();
		for (let data of values) {
			const value = data.floatValue();
			if (!isNaN(value)) {
				this.sum += value;
				this.average = this.sum / this.rows.size;
				this.min = Math.min(value, this.min);
				this.max = Math.max(value, this.max);
			}
		}

		// console.log("Column:", this.headerName, this.sum);
	}
}

;// CONCATENATED MODULE: ./src/core/DatamateRow.js
/*
*
*	DatamateTable.js
*	2021 scripted by t.mashimo
*
*/




class DatamateRow
{
	constructor(_table, _tableIndex)
	{
		this.table = _table;
		this.columns = new Map();
		this.uuid = DatamateMath.uuid4();
		this.sum = 0;
		this.min = Infinity;
		this.max = -Infinity;
	}

	get isHeader()
	{
		return (this.table.headerRowEnabled && this.index==0);
	}

	get name()
	{
		return this.headerName;
	}

	get headerName()
	{
		if (!this.table.headerColumnEnabled)
			return null;
		const column = this.columns.get(0);
		return (column!=null) ? column.value : null;
	}

	get index()
	{
		return this.table.rows.indexOf(this);
	}

	get dataIndex()
	{
		const index = this.table.rows.indexOf(this);
		return (this.table.headerColumnEnabled) ? index - 1 : index;
	}

	values(_nullReplacement=null)
	{
		const count = this.table.columnCount();
		const values = [];
		for (let i=0; i<count; i++) {
			const data = this.columns.get(i);
			values.push((data!=null) ? data.value : _nullReplacement);
		}
		return values;
	}

	intValues(_nullReplacement=NaN)
	{
		const count = this.table.columnCount();
		const values = [];
		for (let i=0; i<count; i++) {
			const data = this.columns.get(i);
			values.push((data!=null) ? data.intValue() : _nullReplacement);
		}
		return values;
	}

	floatValues(_nullReplacement=NaN)
	{
		const count = this.table.columnCount();
		const values = [];
		for (let i=0; i<count; i++) {
			const data = this.columns.get(i);
			values.push((data!=null) ? data.floatValue() : _nullReplacement);
		}
		return values;
	}

	stringValues(_nullReplacement="")
	{
		const count = this.table.columnCount();
		const values = [];
		for (let i=0; i<count; i++) {
			const data = this.columns.get(i);
			values.push((data!=null) ? data.stringValues() : _nullReplacement);
		}
		return values;
	}

	value(_key, _tmin=0, _tmax=0)
	{
		const index = (typeof(_key)=="string") ? this.table.indexOfDataColumnName(_key) : _key;
		let value = this.valueAtDataIndex(index);
		if (_tmin!=_tmax)
			value = DatamateMapper.map(value, this.min, this.max, _tmin, _tmax);
		return value;
	}

	rate(_key, _tmin=0, _tmax=0)
	{
		let value = this.value(_key);
		value = value / this.sum;
		if (_tmin!=_tmax)
			value = DatamateMapper.map(value, 0, 1, _tmin, _tmax);
		return value;
	}

	valueAtIndex(_index)
	{
		const data = this.columns.get(_index);
		return (data!=null) ? data.value : _nullReplacement;
	}

	valueAtDataIndex(_index)
	{
		const index = (this.table.headerColumnEnabled) ? _index + 1 : _index;
		return this.valueAtIndex(index);
	}

	dataAtIndex(_index)
	{
		return this.columns.get(_index);
	}

	dataAtDataIndex(_index)
	{
		const index = (this.table.headerColumnEnabled) ? _index + 1 : _index;
		return this.dataAtIndex(index);
	}

	setData(_data)
	{
		const key = _data.column.index;
		this.columns.set(key, _data);
	}

	update()
	{
		this.sum = 0;
		this.average = 0;
		this.min = Infinity;
		this.max = -Infinity;

		const values = this.columns.values();
		for (let data of values) {
			const value = data.floatValue();
			if (!isNaN(value)) {
				this.sum += value;
				this.average = this.sum / this.columns.size;
				this.min = Math.min(value, this.min);
				this.max = Math.max(value, this.max);
			}
		}
		// console.log("Row:", this.headerName, this.sum);
	}
}

;// CONCATENATED MODULE: ./src/core/DatamateData.js
/*
*
*	DatamateData.js
*	2021 scripted by t.mashimo
*
*/



class DatamateData
{
	constructor(_value)
	{
		this.area = null;
		this.value = _value;		// Set value
		this.table = null;
		this.column = null;
		this.row = null;
	}

	// Bind this data to given column and row //
	bind(_table, _column, _row)
	{
		// Bind column and row //
		this.table = _table;		// Store the table of current belonged.
		this.column = _column;		// Set column that this data is stored.
		this.row = _row;			// Set row that this data is stored.
		this.column.setData(this);	// Register this data to column
		this.row.setData(this);		// Register this data to row
		this.column.update();
		this.row.update();
		// this.table.datatable.set(this.column.index + "-" + this.row.index);
		//console.log("DatamateData.js: bind", _column, _row);
	}

	get columnIndex()
	{
		return this.column.index;
	}

	get rowIndex()
	{
		return this.row.index;
	}

	get columnDataIndex()
	{
		return this.column.dataIndex;
	}

	get rowDataIndex()
	{
		return this.row.dataIndex;
	}

	get columnMin()
	{
		return this.column.min;
	}

	get columnMax()
	{
		return this.column.max;
	}

	get rowMin()
	{
		return this.row.min;
	}

	get rowMax()
	{
		return this.row.max;
	}

	isNumber()
	{
		return !isNaN(this.value);
	}

	intValue()
	{
		return (this.value!==null) ? Math.floor(Number(this.value)) : 0;
	}

	floatValue()
	{
		return (this.value!==null) ? Number(this.value) : 0;
	}

	stringValue()
	{
		return (this.value!==null) ? this.value.toString() : "";
	}
}

;// CONCATENATED MODULE: ./src/core/DatamateTransition.js
/*
*
*	DatamateTransition.js
*	2022 scripted by Mashimo,T.
*
*/



class DatamateTransition
{
	constructor(_id)
	{
		this.id = _id;
		this.startValue = 0;
		this.startTime = 0;
		this.rate = 0.0;
		this.duration = 1.0;
		this.min = 0;
		this.max = 1;
		this.loopEnabled = false;
		this.isPlaying = false;
	}

	forward(_value=1)
	{
		this.move(this.currentValue + _value);
	}

	backward(_value=1)
	{
		this.move(this.currentValue - _value);
	}

	move(_value)
	{
		this.startValue = (this.loopEnabled) ? DatamateMath.loop(_value, this.min ,this.max) : DatamateMath.clamp(_value, this.min ,this.max);
		if (this.isPlaying)
			this.start(this.rate);
	}

	pause()
	{
		this.startValue = this.currentValue;
		this.isPlaying = false;
	}

	stop()
	{
		this.rate = 0.0;
		this.isPlaying = false;
	}

	start(_rate=1.0)
	{
		// Reset rate and if the rate is 0, return with stopping. //
		this.rate = Math.max(0, _rate);
		if (this.rate==0)
			return this.stop();

		// If the rate is above 0, start transition. //
		this.startTime = (new Date()).getTime() / 1000.0;
		this.isPlaying = true;
	}

	restart()
	{
		this.start(this.rate);
	}

	setRate(_rate=1.0)
	{
		this.rate = Math.max(0, _rate);
		(this.rate > 0) ? this.start(this.rate) : this.stop();
	}

	setRange(_min, _max)
	{
		this.min = _min;
		this.max = _max;
		(this.isPlaying) ? this.start(this.rate) : this.stop();
	}

	progress()
	{
		if (!this.isPlaying || this.rate==0.0)
			return 0;
		const currentTime = (new Date()).getTime() / 1000.0;
		const elapsedTime = currentTime - this.startTime;
		const fps = 1.0 / this.rate;
		return (elapsedTime / fps);
	}

	value(_offset=0, _lerp=false)
	{
		let value = this.currentValue + _offset;
		value = (this.loopEnabled) ? DatamateMath.loop(value, this.min, this.max) : DatamateMath.clamp(value, this.min, this.max);
		// console.log("DatamateTransition:", this.id, value, this.min, this.max);
		return (_lerp) ? value : Math.floor(value);
	}

	get currentValue()
	{
		const currentValue = this.progress() + this.startValue;
		let value = (this.loopEnabled) ? DatamateMath.loop(currentValue, this.min, this.max) : DatamateMath.clamp(currentValue, this.min, this.max);
		if (!this.loopEnabled && value==this.max) {
			this.startValue = value;
			this.isPlaying = false;
		}
		// console.log("DatamateTransition:", this.id, value, this.min, this.max);
		return value;
	}

	get currentIndex()
	{
		return Math.floor(this.currentValue);
	}
}

;// CONCATENATED MODULE: ./src/core/DatamateCursor.js
/*
*
*	DatamateCursor.js
*	2022 scripted by Mashimo,T.
*
*/





class DatamateCursor
{
	constructor(_table)
	{
		this.table = _table;
		this.transitionX = new DatamateTransition("x");
		this.transitionY = new DatamateTransition("y");
	}

	update()
	{
		this.transitionX.setRange(0, this.table.columnDataCount() - 1);
		this.transitionY.setRange(0, this.table.rowDataCount() - 1);
	}

	get x()
	{
		return this.transitionX.currentValue;		// Return with float index
		// return this.transitionX.currentIndex;
	}

	get y()
	{
		return this.transitionY.currentValue;		// Return with float index
		// return this.transitionY.currentIndex;
	}

	get isPlaying()
	{
		return this.transitionX.isPlaying || this.transitionY.isPlaying;
	}

	columnIndex(_offset=0, _lerp=false)
	{
		return this.transitionX.value(_offset, _lerp);
	}

	rowIndex(_offset=0, _lerp=false)
	{
		return this.transitionY.value(_offset, _lerp);
	}

	toggle()
	{
		(this.isPlaying) ? this.pause() :this.start();
	}

	pause()
	{
		this.transitionX.pause();
		this.transitionY.pause();
	}

	stop()
	{
		this.transitionX.stop();
		this.transitionY.stop();
	}

	start(_rateX=1.0, _rateY=0.0)
	{
		this.transitionX.start(_rateX);
		this.transitionY.start(_rateY);
	}

	origin()
	{
		this.transitionX.move(0);
		this.transitionY.move(0);
	}

	move(_x, _y)
	{
		this.transitionX.move(_x);
		this.transitionY.move(_y);
	}

	right(_steps=1)
	{
		this.transitionX.forward(_steps);
	}

	left(_steps=1)
	{
		this.transitionX.backward(_steps);
	}

	up(_steps=1)
	{
		this.transitionY.backward(_steps);
	}

	down(_steps=1)
	{
		this.transitionY.forward(_steps);
	}
}

;// CONCATENATED MODULE: ./src/core/DatamateTable.js
/*
*
*	DatamateTable.js
*	2021 scripted by t.mashimo
*
*/








class DatamateTable
{
	static COLUMN = "COLUMN";
	static ROW = "ROW";

    constructor(_headerRowEnabled=true, _headerColumnEnabled=true)
    {
        this.columns = new Array();
        this.rows = new Array();
        this.datatable = new Map();
        this.headerRowEnabled = _headerRowEnabled;
        this.headerColumnEnabled = _headerColumnEnabled;

        this.dataset = new Map();
		this.isAvailable = false;
		this.min = Infinity;
		this.max = -Infinity;
        this.sum = 0;
        this.average = 0;

        // ver1.2.5, cursor control //
        this.cursor = new DatamateCursor(this);
    }

    clear()
    {
		this.columns = new Array();
		this.rows = new Array();
        this.dataset = new Map();
		this.isAvailable = false;
		this.min = Infinity;
		this.max = -Infinity;
        this.sum = 0;
        this.average = 0;
    }

    update()
    {
        this.min = Infinity;
        this.max = -Infinity;
        this.sum = 0;
        for (let i=0; i<this.columns.length; i++) {
            const column = this.columns[i];
            column.update();
            this.min = Math.min(this.min, column.min);
            this.max = Math.max(this.max, column.max);
            this.sum += column.sum;
        }
        if (this.columns.length > 0)
            this.average = this.sum / this.columns.length;

        // console.log("DatamateTable: update properties:");
        // console.log("	min: ", this.min);
        // console.log("	max: ", this.max);
        // console.log("	column-count", this.columns.length);
        // console.log("	row-count:", this.rows.length);

        this.cursor.update();
 
        this.isAvailable = true;
    }

	/**
	 * Parse given CSV text.
	 * @param {String} _csv CSV string.
	 */
	parseCSV(_csv)
	{
		// Extract Rows from CSV. and the 1st row for extracting header if it's needed.  //
		_csv = _csv.replace(/\r\n/g, "\n");
		_csv = _csv.replace(/\r/g, "\n");
		const csvRows = _csv.split("\n");
        
		// Initialize headers and columns //
        this.clear();

        // Add all rows into this table. //
        for (let i=0; i<csvRows.length; i++) {
            const csvRow = csvRows[i];
			const csvValues = csvRow.split(",");
            if (csvValues.length > 1) {
                this.addRowValues(csvValues);
                //console.log(csvValues);
            }
        }

		this.update();	// Update column and row heaers
	}

	/**
	 * Copy given table into this table.
	 * @param {DatamateTable} _subtable DatamateTable object to be merged.
	 */
    copy(_subTable)
    {
        // Copy all rows //
        const subTableRowCount = _subTable.rowCount();
        for (let i=0; i<subTableRowCount; i++) {
            const values = _subTable.valuesAtRowIndex(i);
            this.addRowValues(values);
        }
		this.update();	// Update column and row heaers
    }

    transpose()
    {
        // Copy current table into subtable. //
        const subtable = new DatamateTable();
        subtable.setHeaderEnables(this.headerRowEnabled, this.headerColumnEnabled);
        subtable.copy(this);

        // Copy all rows as columns. //
        this.clear();
        const subTableRowCount = subtable.rowCount();
        for (let i=0; i<subTableRowCount; i++) {
            const values = subtable.valuesAtRowIndex(i);
            this.addColumnValues(values);
        }

        // Update. //
        this.update();
    }

	/**
	 * Merge given sub table data to bottom of this table.
	 * @param {DatamateTable} _subtable DatamateTable object to be merged.
	 */
	merge(_subTable)
	{
        // If columns is blank, copy subtable into this table. //
        if (this.columns.length==0)
            return this.copy(_subTable);

        // Extract sub table counts. //
        const subTableColumnCount = _subTable.columnCount();
        const subTableRowCount = _subTable.rowCount();

        // First Index after appended rows and columns. It only use when the header is disable. //
        const colIndex = this.columnCount();    // It will use when headerRowEnabled is disable.
        const rowIndex = this.rowCount();       // It will use when headerColumnEnabled is disable.

        // Add columns when headerRowEnabled is disable. //
        if (!this.headerRowEnabled) {
            const count = (this.headerColumnEnabled) ? subTableColumnCount - 1 : subTableColumnCount;
            for (let i=0; i<count; i++) 
                this.addColumn();
        }

        // Add rows when headerColumnEnabled is disable. //
        if (!this.headerColumnEnabled) {
            const count = (this.headerRowEnabled) ? subTableRowCount - 1 : subTableRowCount;
            for (let i=0; i<count; i++) 
                this.addRow();
        }

        // Make New Headers when headerRowEnabled is enabled.  //
        if (this.headerRowEnabled) {
            for (let i=0; i<subTableColumnCount; i++) {
                const subcolumn = _subTable.columnAtIndex(i);
                const row = this.rowAtIndex(0);                     // Extract header row.
                if (!this.hasColumnName(subcolumn.headerName)) {    // If the header is new, append the header into this table.
                    const column = this.addColumn();
                    const value = subcolumn.headerName;
                    const data = new DatamateData(value);
                    data.bind(this, column, row);
                    //console.log("ADD COL:", row, subcolumn.headerName);
                }
            }
        }

        // Make New Headers when headerRowEnabled is enabled.  //
        if (this.headerColumnEnabled) {
            for (let i=0; i<subTableRowCount; i++) {
                const subrow = _subTable.rowAtIndex(i);
                const column = this.columnAtIndex(0);               // Extract header column    
                if (!this.hasRowName(subrow.headerName)) {          // If the header is new, append the header into this table.
                    const row = this.addRow();
                    const value = subrow.headerName;
                    const data = new DatamateData(value);
                    data.bind(this, column, row);
                    //console.log("ADD ROW:", subrow.headerName);
                }
            }
        }

        // Append new data into this table. 
        // When headers are enabled, append the data refer to the header name.
        // When headers are disbaled, append the data refer to offset index. 

        // Reset column index offset //
        let colIndexOffset = colIndex;
        for (let i=0; i<subTableColumnCount; i++) {

            // Skip the first column when row header is enabled, Because the column has alraedy set previous process. //
            if (this.headerColumnEnabled && i==0)
                continue;

            // Extract sub column at i, and obtain a column of this table by name or index. //
            const subcolumn = _subTable.columnAtIndex(i);
            const column = (this.headerRowEnabled) ? this.columnByName(subcolumn.headerName) : this.columnAtIndex(colIndexOffset);

            // Reset row index offset //
            let rowIndexOffset = rowIndex;
            for (let ii=0; ii<subTableRowCount; ii++) {

                // Skip the first row when column header is enabled. Because the row has already set previous process. //
                if (this.headerRowEnabled && ii==0)
                    continue;

                // Extract sub row at i, and obtain a row of this table by name or index. //
                const subrow = _subTable.rowAtIndex(ii);
                const row = (this.headerColumnEnabled) ? this.rowByName(subrow.headerName) : this.rowAtIndex(rowIndexOffset);

                // Extract value and make a new data and set into this table. //
                const value = subcolumn.valueAtIndex(ii);
                const data = new DatamateData(value);
                data.bind(this, column, row);
                console.log("       Row:",  row.headerName, column.headerName, row.index, column.index);

                // Increment row index //
                rowIndexOffset++;
            }

            // Increment column index //
            colIndexOffset++;
        }
        // console.log("DatamateTable: merge");
        // console.log("   col headers:", this.columns.length, this.columnHeaderNames());
        // console.log("   row headers:", this.rows.length, this.rowHeaderNames());

		this.update();	// Update column and row heaers
	}

    setHeaderEnables(_headerRowEnabled=true, _headerColumnEnabled=true)
    {
        this.headerRowEnabled = _headerRowEnabled;
        this.headerColumnEnabled = _headerColumnEnabled;
    }

    //-------------------------------------------------------------------//
    // Internal data cursor controls //
    //-------------------------------------------------------------------//
    play(_rateX=1.0, _rateY=0.0)
    {
        this.cursor.start(_rateX, _rateY);
    }

    stop()
    {
        this.cursor.stop();
    }

    origin()
    {
        this.cursor.origin();
    }

    move(_x, _y)
    {
        this.cursor.move(_x, _y);
    }

    right(_steps=1)
    {
        this.cursor.right(_steps);
    }

    left(_steps=1)
    {
        this.cursor.left(_steps);
    }

    up(_steps=1)
    {
        this.cursor.up(_steps);
    }

    down(_steps=1)
    {
        this.cursor.down(_steps);
    }

    focusX(_offset=0, _lerp=false)
    {
        return DatamateMath.round(this.cursor.columnIndex(_offset, _lerp), 4);
    }

    focusY(_offset=0, _lerp=false)
    {
        return DatamateMath.round(this.cursor.rowIndex(_offset, _lerp), 4);
    }

    //-------------------------------------------------------------------//
    // Return value controls //
    //-------------------------------------------------------------------//
    dataAtIndexes(_colIndex, _rowIndex)
    {
        const row = this.rowAtIndex(_rowIndex);
        return (row!=null) ? row.dataAtIndex(_colIndex) : null;
    }

    dataAtDataIndexes(_colIndex, _rowIndex)
    {
        const row = this.rowAtDataIndex(_rowIndex);
        return (row!=null) ? row.dataAtDataIndex(_colIndex) : null;
    }

    valueAtIndexes(_colIndex, _rowIndex)
    {
        const data = this.dataAtIndexes(_colIndex, _rowIndex);
        return data.value;
    }

    valueAtDataIndexes(_colIndex, _rowIndex)
    {
        const data = this.dataAtDataIndexes(_colIndex, _rowIndex);
        return data.value;
    }

    intValueAtIndexes(_colIndex, _rowIndex)
    {
        const data = this.dataAtIndexes(_colIndex, _rowIndex);
        return data.intValue();
    }

    intValueAtDataIndexes(_colIndex, _rowIndex)
    {
        const data = this.dataAtDataIndexes(_colIndex, _rowIndex);
        return data.intValue();
    }

    floatValueAtIndexes(_colIndex, _rowIndex)
    {
        const data = this.dataAtIndexes(_colIndex, _rowIndex);
        return data.floatValue();
    }

    floatValueAtDataIndexes(_colIndex, _rowIndex)
    {
        const data = this.dataAtDataIndexes(_colIndex, _rowIndex);
        return data.floatValue();
    }

    // ver1.2.6a, return interpolated value calculated from given float index. //
    lerpValueAtIndexees(_colIndex, _rowIndex)
    {
        // Extract current col/row data count for clamping //
        const colMaxIndex = this.columnCount() - 1;
        const rowMaxIndex = this.rowCount() - 1;

        // Extract given index, floor and ceil index clamped in range. //
        const colIndex = DatamateMath.clamp(_colIndex, 0, colMaxIndex);
        const rowIndex = DatamateMath.clamp(_rowIndex, 0, rowMaxIndex);
        const colIndexL = DatamateMath.clamp(Math.floor(colIndex), 0, colMaxIndex);
        const colIndexH = DatamateMath.clamp(Math.ceil(colIndex), 0, colMaxIndex);
        const rowIndexL = DatamateMath.clamp(Math.floor(rowIndex), 0, rowMaxIndex);
        const rowIndexH = DatamateMath.clamp(Math.ceil(rowIndex), 0, rowMaxIndex);

        // Extract total 2 data. //
        const dataA = this.dataAtIndexes(colIndexL, rowIndexL);
        const dataB = this.dataAtIndexes(colIndexH, rowIndexH);

        // If the data is the same, or is not numerical value, return value of given indexes //
        if (dataA.value==dataB.value || isNaN(dataA.value) || isNaN(dataB.value)) 
            return dataA.value;

        // Extract normalized distance between 2 indexes //
        const colRange = colIndexH - colIndexL;
        const rowRange = rowIndexH - rowIndexL;
        const distance = Math.sqrt(colRange * colRange + rowRange * rowRange);
        const colRate = colIndex - colIndexL;
        const rowRate = rowIndex - rowIndexL;
        const rate = (distance!=0) ? Math.sqrt(colRate * colRate + rowRate * rowRate) / distance : 0.0;

        const valueA = dataA.floatValue();
        const valueB = dataB.floatValue();
        const difference = valueB - valueA;
        const value = valueA + difference * rate;

		// console.log(rate, colIndexL, rowIndexL, colIndexH, rowIndexH);

        return value;
    }

    lerpValueAtDataIndexes(_colIndex, _rowIndex)
    {
        const colIndex = (this.headerColumnEnabled) ? _colIndex + 1 : _colIndex;
        const rowIndex = (this.headerRowEnabled) ? _rowIndex + 1 : _rowIndex;
        return this.lerpValueAtIndexees(colIndex, rowIndex);
    }

    //-------------------------------------------------------------------//
    // Return multiple values controls //
    //-------------------------------------------------------------------//
    valuesAtColumnIndex(_index)
    {
        const column = this.columnAtIndex(_index);
        if (column==null) return null;
        return column.values();
    }

    valuesAtColumnDataIndex(_index)
    {
        const index = (this.headerColumnEnabled) ? _index + 1 : _index;
        const column = this.columnAtIndex(index);
        if (column==null) return null;
        const values = column.values();
        if (this.headerRowEnabled)
            values.shift();
        return values;
    }

    valuesAtRowIndex(_index)
    {
        const row = this.rowAtIndex(_index);
        if (row==null) return null;
        return (row) ? row.values() : null;
    }

    valuesAtRowDataIndex(_index)
    {
        const index = (this.headerRowEnabled) ? _index + 1 : _index;
        const row = this.rowAtIndex(index);
        if (row==null) return null;
        const values = row.values();
        if (this.headerColumnEnabled)
            values.shift();
        return values;
    }

    //-------------------------------------------------------------------//
    // Return table components controls //
    //-------------------------------------------------------------------//
    columnHeaderNames()
    {
        if (!this.headerRowEnabled)
            return null;
        return this.valuesAtRowIndex(0);
    }

    columnDataHeaderNames()
    {
        if (!this.headerRowEnabled)
            return null;
        const headers = this.valuesAtRowIndex(0);
        if (this.headerColumnEnabled)
            headers.shift();
        return headers;
    }

    columnHeaderNameAtIndex(_index)
    {
        const headerNames = this.columnHeaderNames();
        if (headerNames==null)
            return null;
        return (_index < headerNames.length) ? headerNames[_index] : null;
    }

    columnDataHeaderNameAtIndex(_index)
    {
        const headerNames = this.columnDataHeaderNames();
        if (headerNames==null)
            return null;
        return (_index < headerNames.length) ? headerNames[_index] : null;
    }

    rowHeaderNames()
    {
        if (!this.headerColumnEnabled)
            return null;
        return this.valuesAtColumnIndex(0);
    }

    rowDataHeaderNames()
    {
        if (!this.headerColumnEnabled)
            return null;
        const headers = this.valuesAtColumnIndex(0);
        if (this.headerRowEnabled)
            headers.shift();
        return headers;
    }

    rowHeaderNameAtIndex(_index)
    {
        const headerNames = this.rowHeaderNames();
        if (headerNames==null)
            return null;
        return (_index < headerNames.length) ? headerNames[_index] : null;
    }

    rowDataHeaderNameAtIndex(_index)
    {
        const headerNames = this.rowDataHeaderNames();
        if (headerNames==null)
            return null;
        return (_index < headerNames.length) ? headerNames[_index] : null;
    }

    hasColumnName(_name)
    {
        return (this.indexOfColumnName(_name)>=0);
    }

    hasRowName(_name)
    {
        return (this.indexOfRowName(_name)>=0);
    }

    columnByName(_name)
    {
        const names = this.columnHeaderNames();
        if (names==null)
            return null;
        const index = names.indexOf(_name);
        return (index < 0) ? null : this.columnAtIndex(index);
    }

    rowByName(_name)
    {
        const names = this.rowHeaderNames();
        if (names==null)
            return null;
        const index = names.indexOf(_name);
        return (index < 0) ? null : this.rowAtIndex(index);
    }

    indexOfColumnName(_name)
    {
        const names = this.columnHeaderNames();
        if (names==null)
            return -1;
        return names.indexOf(_name);
    }

    indexOfDataColumnName(_name)
    {
        let index = this.indexOfColumnName(_name);
        if (index >= 0 && this.headerColumnEnabled) 
            index -= 1;
        return index;
    }

    indexOfRowName(_name)
    {
        const names = this.rowHeaderNames();
        if (names==null)
            return -1;
        return names.indexOf(_name);
    }

    indexOfDataRowName(_name)
    {
        let index = this.indexOfRowName(_name);
        if (index >= 0 && this.headerRowEnabled) 
            index -= 1;
        return index;
    }

    columnAtIndex(_index)
    {
        return (_index < this.columns.length) ? this.columns[_index] : null;
    }

    columnAtDataIndex(_index)
    {
        const index = (this.headerColumnEnabled) ? _index + 1 : _index;
        return this.columnAtIndex(index);
    }

    rowAtIndex(_index)
    {
        return (_index < this.rows.length) ? this.rows[_index] : null;
    }

    rowAtDataIndex(_index)
    {
        const index = (this.headerRowEnabled) ? _index + 1 : _index;
        return this.rowAtIndex(index);
    }

    columnCount()
    {
        return this.columns.length;
    }

    columnDataCount()
    {
        return (this.headerColumnEnabled) ? Math.max(0, this.columns.length - 1) : this.columns.length;
    }

    rowCount()
    {
        return this.rows.length;
    }

    rowDataCount()
    {
        return (this.headerRowEnabled) ?  Math.max(0, this.rows.length - 1) : this.rows.length;
    }
    
    columnIndexes()
    {
        return Array.from(this.columns.keys());
    }

    columnDataIndexes()
    {
        const indexes = this.columnIndexes();
        if (this.headerColumnEnabled)
            indexes.pop();
        return indexes;
    }

    rowIndexes()
    {
        return Array.from(this.rows.keys());
    }

    rowDataIndexes()
    {
        const indexes = this.rowIndexes();
        if (this.headerRowEnabled)
            indexes.pop();
        return indexes;
    }

    row(_key)
    {
		const index = (typeof(_key)=="string") ? this.indexOfRowName(_key) : _key;
		return this.rowAtIndex(index);
    }

    column(_key)
    {
		const index = (typeof(_key)=="string") ? this.indexOfColumnName(_key) : _key;
		return this.columnAtIndex(index);
    }

    //-------------------------------------------------------------------//
    // Managing table components controls //
    //-------------------------------------------------------------------//
    setHeaderNames(_values)
    {
        const row = (this.rows.length==0) ? this.addRow() : this.insertRowAtIndex(0);
        for (let i=0; i<_values.length; i++) {
            const column = (i < this.columns.length) ? this.columns[i] : this.addColumn();
            const value = _values[i];
            const data = new DatamateData(value);
            data.bind(this, column, row);
            // console.log("DatamateTable: addRowValues: ", column.rawTableIndex, row.rawTableIndex);
        }
        this.update();
    }

    addColumn(_headerValue=null)
    {
        const index = this.columns.length;
        const column = new DatamateColumn(this, index);
        this.columns.push(column);
        // console.log("DatamateTable: Add Column: ", _headerValue);

        if (_headerValue!==null) {
            const row = (this.rows.length > 0) ? this.rowAtIndex(0) : this.addRow();
            const data = new DatamateData(_headerValue);
            data.bind(this, column, row);
            // console.log("   data: ", column.headerName, row.headerName);
        }

        return column;
    }

    addRow(_headerValue=null)
    {
        const index = this.rows.length;
        const row = new DatamateRow(this, index);
        this.rows.push(row);
        // console.log("DatamateTable: Add Row: ", _headerValue);

        if (_headerValue!==null) {
            const column = (this.columns.length > 0) ? this.columnAtIndex(0) : this.addColumn();
            const data = new DatamateData(_headerValue);
            data.bind(this, column, row);
            // console.log("   data: ", column.headerName, row.headerName);
        }

        return row;
    }

    insertColumnAtIndex(_index)
    {
        if (_index >= this.columns.length)
            return;
        const column = new DatamateColumn(this, _index);
        this.columns.splice(_index, 0, column);
        return column;
    }

    insertColumnAtDataIndex(_index)
    {
        const index = (this.headerColumnEnabled) ? _index + 1 : _index;
        return this.insertColumn(index);
    }

    insertRowAtIndex(_index)
    {
        if (_index >= this.rows.length)
            return;
        const row = new DatamateRow(this, _index);
        this.rows.splice(_index, 0, row);
        return row;
    }

    insertRowAtDataIndex(_index)
    {
        const index = (this.headerRowEnabled) ? _index + 1 : _index;
        return this.insertRow(index);
    }

    swapColumns(_sindex, _dindex)
    {
        if (_sindex >= this.rows.length || _dindex >= this.rows.length)
            return;
        const scol = this.columns[_sindex];
        const dcol = this.columns[_dindex];
        scol.index = _dindex;
        dcol.index = _sindex;
        this.columns[_sindex] = dcol;
        this.columns[_dindex] = scol;
    }

    swapDataColumns(_sindex, _dindex)
    {
        const sindex = (this.headerColumnEnabled) ? _sindex + 1 : _sindex;
        const dindex = (this.headerColumnEnabled) ? _dindex + 1 : _dindex;
        this.swapColumns(sindex, dindex);
    }

    swapRows(_sindex, _dindex)
    {
        if (_sindex >= this.rows.length || _dindex >= this.rows.length)
            return;
        const srow = this.rows[_sindex];
        const drow = this.rows[_dindex];
        srow.index = _dindex;
        drow.index = _sindex;
        this.rows[_sindex] = drow;
        this.rows[_dindex] = srow;
    }

    swapDataRows(_sindex, _dindex)
    {
        const sindex = (this.headerRowEnabled) ? _sindex + 1 : _sindex;
        const dindex = (this.headerRowEnabled) ? _dindex + 1 : _dindex;
        this.swapRows(sindex, dindex);
    }

    //-------------------------------------------------------------------//
    // Managing table contents controls //
    //-------------------------------------------------------------------//
    setValueWithNames(_value, _columnName=null, _rowName=null)
    {
        // Try to extract column and row by names. //
        let column = (_columnName) ? this.columnByName(_columnName) : null;
        let row = (_rowName) ? this.rowByName(_rowName) : null;

        // If column and row are null, make new one. //
        if (column==null) column = this.addColumn();
        if (row==null) row = this.addRow();

        // Set value as a datum. //
        const data = new DatamateData(_value);
        data.bind(this, column, row);
       // console.log("DatamateTable: setValueWithNames: ", column.index, row.index);
    }

    setValueAtIndexes(_value, _columnIndex=Infinity, _rowIndex=Infinity)
    {
        let column = (_columnIndex>=0 && _columnIndex < this.columns.length) ? this.columnAtIndex(_columnIndex) : this.addColumn();
        let row = (_rowIndex>=0 && _rowIndex < this.rows.length) ? this.rowAtIndex(_rowIndex) : this.addRow();

       // console.log("DatamateTable: setValueAtIndexes: ", _columnIndex, _rowIndex, column, row);

        const data = new DatamateData(_value);
        data.bind(this, column, row);
    }

    setColumnValuesAtIndex(_values, _index)
    {
        if (_index >= this.columns.length)
            return;

        const column = this.columns[_index];
        for (let i=0; i<_values.length; i++) {
            const row = (i < this.rows.length) ? this.rows[i] : this.addRow();
            const value = _values[i];
            const data = new DatamateData(value);
            data.bind(this, column, row);
            // console.log("DatamateTable: addColumnValues: ", column.rawTableIndex, row.rawTableIndex);
        }
        this.update();
    }

    setRowValuesAtIndex(_values, _index)
    {
        if (_index >= this.rows.length)
            return;

        const row = this.rows[_index];
        for (let i=0; i<_values.length; i++) {
            const column = (i < this.columns.length) ? this.columns[i] : this.addColumn();
            const value = _values[i];
            const data = new DatamateData(value);
            data.bind(this, column, row);
            // console.log("DatamateTable: addRowValues: ", column.rawTableIndex, row.rawTableIndex);
        }
        this.update();
    }

    setColumnValuesAtDataIndex(_values, _index)
    {
        const index = (this.headerColumnEnabled) ? _index + 1 : _index;
        this.setColumnValuesAtIndex(_values, index);
    }

    setRowValuesAtDataIndex(_values, _index)
    {
        const index = (this.headerColumnEnabled) ? _index + 1 : _index;
        this.setRowValuesAtIndex(_values, index);
    }

    setColumnValuesAtName(_values, _name)
    {
        const index = this.indexOfColumnName(_name);
        if (index < 0)
            return;
        this.setColumnValuesAtIndex(_values, index);
    }

    setRowValuesAtName(_values, _name)
    {
        const index = this.indexOfRowName(_name);
        if (index < 0)
            return;
        this.setRowValuesAtIndex(_values, index);
    }

    addColumnValues(_values)
    {
        const column = this.addColumn();
        this.setColumnValuesAtIndex(_values, column.index);
    }

    addRowValues(_values)
    {
        const row = this.addRow();
        this.setRowValuesAtIndex(_values, row.index);
    }

    formatTable()
    {
        // Create Column header values //
        const columnHeaders = this.columnHeaderNames();

        // Create row header values //
        const dataRows = this.rows.concat();
        if (this.headerRowEnabled)
            dataRows.shift();

        const rows = new Array();
        for (let i=0; i<dataRows.length; i++) {
            const row = dataRows[i];            // Extract row without header row.
            const values = row.values("-");       // Extract row values.
            rows.push(values);
        }

        const formatTable = new Map();
        formatTable.set("headers", columnHeaders);
        formatTable.set("rows", rows);

        return formatTable;
    }

}
;// CONCATENATED MODULE: ./src/core/DatamateArea.js
/*
*
*	DatamateArea.js
*	2021 scripted by mashimo,T.
*
*/

// Import utils //


class DatamateArea
{
	constructor(_x=0, _y=0, _width=1, _height=1, _xBlocks=1, _yBlocks=1, _xBlockIndex=0, _yBlockIndex=0)
	{
		this.reset(_x, _y, _width, _height, _xBlocks, _yBlocks, _xBlockIndex, _yBlockIndex);
	}

	reset(_x=0, _y=0, _width=1, _height=1, _xBlocks=1, _yBlocks=1, _xBlockIndex=0, _yBlockIndex=0, _index=0)
	{
		this.index = _index;
		this.name = "";
		this.areaX = _x;
		this.areaY = _y;
		this.areaWidth = _width;
		this.areaHeight = _height;
		this.xBlocks = Math.max(1, _xBlocks);
		this.yBlocks = Math.max(1, _yBlocks);
		this.xBlockIndex = _xBlockIndex;
		this.yBlockIndex = _yBlockIndex;

		// Block positions //
		this.width = this.areaWidth / this.xBlocks;
		this.height = this.areaHeight / this.yBlocks;
		this.x = DatamateMapper.map(this.xBlockIndex, 0, this.xBlocks, this.areaX, this.areaWidth);
		this.y = DatamateMapper.map(this.yBlockIndex, 0, this.yBlocks, this.areaY, this.areaHeight);
		this.left = DatamateMapper.map(0, 0, 1, this.x, this.x + this.width);
		this.centerX = DatamateMapper.map(0.5, 0, 1, this.x, this.x + this.width);
		this.right = DatamateMapper.map(1, 0, 1, this.x, this.x + this.width);
		this.top = DatamateMapper.map(0, 0, 1, this.y, this.y + this.height);
		this.centerY = DatamateMapper.map(0.5, 0, 1, this.y, this.y + this.height);
		this.bottom = DatamateMapper.map(1, 0, 1, this.y, this.y + this.height);
		//console.log("DatamateArea:", this);
	}

	block(_xBlockIndex, _yBlockIndex, _index=0)
	{
		return new DatamateArea(this.areaX, this.areaY, this.areaWidth, this.areaHeight, this.xBlocks, this.yBlocks, _xBlockIndex, _yBlockIndex, _index);
	}
}

;// CONCATENATED MODULE: ./src/ui/DatamatePlotter.js
/*
*
*	DatamatePlotter.js
*	2021 scripted by t.mashimo
*
*/




class DatamatePlotter
{
	constructor(_frameWidth=1000)
	{
		this.scale = 1.0;
		this.frameWidth = _frameWidth;
		this.plotWidth = this.frameWidth * this.scale;
		this.plotCenter = 0;
		this.setScale(this.scale);
	}

	resize(_frameWidth)
	{
		this.frameWidth = _frameWidth;
		this.plotWidth = this.frameWidth * this.scale;
	}

	setScale(_scale)
	{
		// Extract current scale, current left and right in case of original size //
		const currentScale = this.scale;
		const originalCenter = this.plotCenter / this.scale;

		// Reset new scale and plot width and left. //
		this.scale = _scale;
		this.plotWidth = this.frameWidth * this.scale;
		this.plotCenter = originalCenter * this.scale;
		this.movableRange = (this.plotWidth - this.frameWidth) * 0.5;
		this.plotCenter = Math.max(-this.movableRange, Math.min(this.movableRange, this.plotCenter));
	}

	moveBy(_translate)
	{
		this.plotCenter += _translate;
		this.movableRange = (this.plotWidth - this.frameWidth) * 0.5;
		this.plotCenter = Math.max(-this.movableRange, Math.min(this.movableRange, this.plotCenter));
	}

	moveToIndex(_index, _dataTotal)
	{
		this.plotCenter = (this.movableRange==0) ? 0 : DatamateMapper.map(_index, 0, _dataTotal, this.plotWidth * -0.5, this.plotWidth * 0.5) * -1;
		this.plotCenter = Math.max(-this.movableRange, Math.min(this.movableRange, this.plotCenter));
		//console.log("==", this.plotCenter);
	}

	indexFromFrameX(_frameX, _dataTotal)
	{
		const plotLeft = this.plotCenter - (this.plotWidth * 0.5);
		const plotRight = this.plotCenter + (this.plotWidth * 0.5);
		const frameX = _frameX - (this.frameWidth * 0.5);
		return Math.floor(DatamateMapper.map(frameX, plotLeft, plotRight, 0, _dataTotal));
		/*
		const index = Math.floor(DatamateMapper.map(frameX, plotLeft, plotRight, 0, _dataTotal));
		const stride = Math.round(_dataTotal / this.plotWidth);
		const fixedIndex = (scale > 1) ? Math.floor(index / stride) * stride : index;
		return fixedIndex;
		*/
	}
}

;// CONCATENATED MODULE: ./src/utils/DatamateDataFilter.js
/**
*
*	DatamateDataFilter.js
*	2020 Scripted by T.Mashimo
*
*/

class DatamateDataFilter
{
	static clamp(_value, _min, _max)
	{
		return Math.max(_min, Math.min(_value, _max));
	}
	
	static easeFilter(_value, _min, _max, _index)
	{
		let range = _max - _min;
		let progress = (_value - _min) / range;
		progress = Math.min(1.0, Math.max(0.0, progress));
		progress = (progress < 0.5) ? Math.pow(progress * 2, _index) * 0.5 : 1.0 - (Math.pow((1.0 - progress) * 2, _index) * 0.5);
		return (_max - _min) * progress + _min;
	}

	static easeInFilter(_value, _min, _max, _index)
	{
		let range = _max - _min;
		let progress = (_value - _min) / range;
		progress = Math.min(1.0, Math.max(0.0, progress));
		progress = Math.pow(progress, _index);
		return (_max - _min) * progress + _min;
	}

	static easeOutFilter(_value, _min, _max, _index)
	{
		let range = _max - _min;
		let progress = (_value - _min) / range;
		progress = Math.min(1.0, Math.max(0.0, progress));
		progress = 1.0 - Math.pow(1.0 - progress, _index);
		return (_max - _min) * progress + _min;
	}

	static easeInOutFilter(_value, _min, _max, _index, _offset)
	{
		let range = _max - _min;
		let progress = (_value - _min) / range;
		let offset2 = 1.0 - _offset;
		let rate1 = (_offset > 0) ? 1.0 / _offset : 0.0;
		let rate2 = (offset2 > 0) ? 1.0 / offset2 : 0.0;
		progress = Math.min(1.0, Math.max(0.0, progress));
		progress = (progress < _offset) ? Math.pow(progress * rate1, _index) * _offset : 1.0 - (Math.pow((1.0 - progress) * rate2, _index) * offset2);
		return (_max - _min) * progress + _min;
	}

	static easeOutInFilter(_value, _min, _max, _index, _offset)
	{
		let range = _max - _min;
		let progress = (_value - _min) / range;
		let offset2 = 1.0 - _offset;
		let rate1 = (_offset > 0) ? 1.0 / _offset : 0.0;
		let rate2 = (offset2 > 0) ? 1.0 / offset2 : 0.0;
		progress = Math.min(1.0, Math.max(0.0, progress));
		progress = (progress < _offset) ? _offset - Math.pow((_offset - progress) * rate1, _index) * _offset : _offset + (Math.pow((progress - _offset) * rate2, _index) * offset2);
		return (_max - _min) * progress + _min;
	}
}

;// CONCATENATED MODULE: ./src/ui/DatamateChart.js
/*
*
*	DatamateChart.js
*	2021 scripted by t.mashimo
*
*/





class DatamateChart
{
    static CHART_TYPE_BAR = "CHART_TYPE_BAR";
    static CHART_TYPE_LINE = "CHART_TYPE_LINE";
    static CHART_TYPE_PIE = "CHART_TYPE_PIE";

	constructor()
    {
        this.context = null;
		this.element = null;
		this.canvas = null;
        this.type = DatamateChart.CHART_TYPE_BAR;
        this.table = null;
        this.min = 0;
        this.max = 200;
		this.width = 1000;
		this.height = 400;
		this.plotter = null;
    }

	clear()
	{
        this.table = null;
	}

    draw(_table, _rowIndex=0, _colIndex=0)
    {
        if (_table==null || this.context==null)
            return;
            
        switch (this.type) {
            case DatamateChart.CHART_TYPE_BAR: this.drawBarChart(_table, _rowIndex, _colIndex); break;
            case DatamateChart.CHART_TYPE_LINE: this.drawLineChart(_table, _rowIndex); break;
            case DatamateChart.CHART_TYPE_PIE: this.drawPieChart(_table, _rowIndex); break;
        }
    }

	resize(_width, _height)
	{
		this.width = _width;
		this.height = _height;
		this.canvas.width = _width;
		this.canvas.height = _height;
	}

    // Draw Line Chart //
    drawLineChart(_table, _rowIndex=0)
    {
		if (this.plotter==null)
			this.plotter = new DatamatePlotter();
		this.plotter.resize(this.width);

		const columnCount = _table.columnCount();
		const rowCount = _table.rowCount();

		if (columnCount==0 || rowCount==0)
			return;

		const min = this.min;
		const max = this.max;

        // Clear Context //
		this.context.clearRect(0, 0, this.width, this.height);

		this.context.strokeWeight = 1;
		//this.context.fillStyle = 'black';
		//this.context.fillRect(0, 0, 1000, 400);

		const columnHeaders = _table.columnHeaderNames();
		const rowHeaders = _table.rowHeaderNames();

		for (let i=0; i<columnHeaders.length; i++) {
			const header = columnHeaders[i];
			this.context.beginPath();
			// this.context.strokeStyle = (i==this.highlightColIndex) ? this.highlightColor : this.graphColors[i%this.graphColors.length];
			this.context.strokeStyle = "white";
			this.context.lineWidth = (i==this.highlightColIndex) ? "2" : "1";
			let prevIndex = -1;
			let highlightX = -1;
			let isLineClosed = true;
			for (let ii=0; ii<this.plotter.frameWidth; ii++) {

				// Check row index is in range of column //
				const rowIndex = this.plotter.indexFromFrameX(ii, rowCount);
				if (rowIndex >= rowCount || rowIndex < 0 || rowIndex==prevIndex)
					continue;

				// Check highlihgt x //
				const row = _table.rowAtIndex(rowIndex);
				if (this.highlightRowIndex > prevIndex && this.highlightRowIndex <= rowIndex)
					highlightX = ii;
				prevIndex = rowIndex;

				// Check data is valid //
				//const data = row[header];
				const rowHeader = rowHeaders[rowIndex];
				// const data = _table.data(header, rowHeader);
				const data = _table.dataAtIndexes(i, ii);
				if (!data) {
					isLineClosed = true;
					continue;
				}

				// Draw next line //
				const value = data.floatValue();
				const x = DatamateMapper.map(ii/this.plotter.frameWidth, 0, 1, 0, this.width);
				const y = DatamateMapper.map(value, min, max, this.height, 0);
				(ii==0 || isLineClosed) ? this.context.moveTo(x, y) : this.context.lineTo(x, y);


				isLineClosed = false;
			}
			this.context.stroke();

			if (highlightX >= 0) {
				this.context.beginPath();
				this.context.strokeStyle = "orange";
				this.context.lineWidth = "1";
				this.context.moveTo(highlightX, 0);
				this.context.lineTo(highlightX, 400);
				this.context.stroke();
			}
		}
    }

	drawPieChart(_table, _rowIndex=0)
	{
		_table.update();

        const columnCount = _table.columnDataCount();
		const rowCount = _table.rowDataCount();

        // Clear Context //
		this.context.clearRect(0, 0, this.width, this.height);

		// Set default stroke weight //
		this.context.strokeWeight = 1;

		// Extract basic table data //
		const columnHeaders = _table.columnDataHeaderNames();
		const columnIndexes = _table.columnDataIndexes();
        const rowIndex = DatamateDataFilter.clamp(_rowIndex, 0, rowCount);
		const row = _table.rowAtDataIndex(rowIndex);
		const min = row.min;
		const max = row.max;
		const sum = row.sum;

		// Calculate bar position //
		const minY = this.height - 50;
		const maxY = 0;

		const circleX = this.width * 0.5;
		const circleY = this.height * 0.5;
		const radius = Math.min(this.width, this.height) * 0.45;

		let availableValues = [];
		for (let i=0; i<columnCount; i++) {
			const columnName = (columnHeaders) ? columnHeaders[i] : columnIndexes[i];

			// Extract a data at given column name. //
			const data = row.dataAtDataIndex(i);
			console.log("DatamateChart: Pie Chart: ", i, columnName, data);

			// Extract a value from the data. //
			if (data==null || !data.isNumber())
				continue;

			const value = data.floatValue();
			availableValues.push(value);
		}

		let totalRate = 0;
		let totalValues = 0;
		const availableCount = availableValues.length;
		for (let i=0; i<availableCount; i++) {

			const value = availableValues[i];
			const rate = 1.0 * value / sum;
			const colorAngle = (1.0 * i / availableCount) * 360.0;

			const startAngle = totalRate * 360.0 - 90;
			const endAngle = (totalRate + rate) * 360.0 - 90;
			const startRadians = DatamateMath.radians(startAngle);
			const endRadians = DatamateMath.radians(endAngle);
			const rgb = DatamateMath.RGBFromHSB({hue: colorAngle, saturation: 1.0, brightness: 1.0});
			const rgbStyle = DatamateMath.styleFromRGB(rgb);
			this.context.strokeStyle = "black";
			this.context.lineWidth = 2;
			this.context.fillStyle = rgbStyle;
			this.context.beginPath();
            this.context.moveTo(circleX, circleY);
			this.context.arc(circleX, circleY, radius, startRadians, endRadians);
            this.context.lineTo(circleX, circleY);
			this.context.stroke();
			this.context.fill();
			this.context.closePath();

			totalRate += rate;
			totalValues += value;

			// console.log(totalRate, colorAngle, startAngle, endAngle);
			// console.log("DatamateChart: Pie Chart: ", i, availableCount, totalValues, sum, startAngle, endAngle);
		}
	}

    // Draw Bar Chart //
    drawBarChart(_table, _rowIndex=0, _colIndex=-1)
    {
		// Update table //
		// _table.update();

		// Extract column and row count //
        const columnCount = _table.columnDataCount();
		const rowCount = _table.rowDataCount();

		if (columnCount==0 || rowCount==0)
			return;

        // Clear Context //
		this.context.clearRect(0, 0, this.width, this.height);

		this.context.strokeWeight = 1;

		// Extract basic table data //
		const columnHeaders = _table.columnDataHeaderNames();
		const columnIndexes = _table.columnDataIndexes();
        const rowIndex = DatamateDataFilter.clamp(_rowIndex, 0, rowCount - 1);
		const row = _table.rowAtDataIndex(rowIndex);
		const colIndex = (_table.columnHeaderEnabled) ? _colIndex - 1 : _colIndex;

		// Calculate bar position //
		const minY = this.height - 60;
		const maxY = 0;

		const min = _table.min;
		const max = _table.max;
		const sum = row.sum;

        let chartIndex = 0;
		for (let i=0; i<columnCount; i++) 
        {
			const columnName = (columnHeaders) ? columnHeaders[i] : columnIndexes[i];

            // Extract a data at given column name. //
            const data = row.dataAtDataIndex(i);

            // Extract a value from the data. //
			const stringValue = (data) ? data.stringValue() : "n/a";
            const value = (data) ? data.floatValue() : "n/a";
			const isValueAvailable = !isNaN(value);

			// Extract current row min, max and sum. //
			const rate = (isValueAvailable && sum!=0) ? value / sum : 0;

            const x = DatamateMapper.map(chartIndex, -1, columnCount, 30, this.width - 30);
            const y0 = minY;
            const y1 = DatamateMapper.map(value, min, max, minY, maxY);
			// console.log(i, y0, y1);

            // Determine stroke and fill color //
			const color =  (i!=colIndex) ? "white" : "orange";
			this.context.strokeStyle = color;
            this.context.fillStyle = color;	// In safari, stroke is also should be set fillStyle.

            // Draw chart //
			this.context.lineWidth = 2;
			this.context.beginPath();
            this.context.moveTo(x, y0);
            this.context.lineTo(x, y1);
			this.context.stroke();
			// this.context.closePath();

			let text = "";
			if (_table.headerColumnEnabled) {
				text += row.name;
				text += "\n";
			}
			if (_table.headerRowEnabled) {
				text += columnName;
				text += "\n";
			}
			text += (isValueAvailable) ? value : stringValue;
			text += "\n";
			text += (isValueAvailable) ? DatamateMapper.map(rate, 0, 1, 0, 100).toFixed(4) + "%" : "-";

			this.context.textAlign = "center";
			this.drawMultilineText(text, x, this.height - 60, 10);

            chartIndex++;
		}
	}

	drawMultilineText(_text, _x, _y, _fontSize, _fontType="serif", lineHeight=1.5)
	{
		this.context.font  = _fontSize + " " + _fontType;

		const lines = _text.split('\n');
		for (let i=0; i<lines.length; i++) {
			const line = lines[i];
			const y = _y + ((i + 1) * _fontSize * lineHeight);
			this.context.fillText(line, _x, y);
		}
	}
}
;// CONCATENATED MODULE: ./src/ui/DatamatePanel.js
/*
*
*	DatamatePlotter.js
*	2021 scripted by t.mashimo
*
*/






class DatamatePanel
{
	static version = "1.0.0";

	constructor(_name="DatamatePanel", _shortCutEnabled=true)
	{
		this.name = _name;
		this.isLoaded = false;
		this.isVisible = false;
		this.isDataAvailable = false;

		this.table = null;
		this.min = 0;
		this.max = 100;

		this.scalableMin = 1;
		this.scalableMax = 10;
		this.graphScale = 1;
		this.pixelOffset = 0;
		this.graphColors = ["rgba(255,255,255,0.8)"];

		this.highlightColIndex = -1;
		this.highlightRowIndex = 0;
		this.highlightTR = null;

		// Custom panel styles that will be set into #panel, #control, #contents //
		this.styles = {color:"white", background:"rgba(20, 20, 2	0, 0.75)"};
		this.barColor = "white";
		this.highlightColor = "orange";
		
		// File selection callback, it will be set in Datamate instance. //
		this.fileSelectionCallback = null;
		this.transposeSelectionCallback = null;

		this.chart = new DatamateChart();
		this.plotter = new DatamatePlotter();

		// Load //
		this.load();
	}

	//-----------------------------------------------------------------//
	// Load basic UIs, graph and table containers. //
	//-----------------------------------------------------------------//
	load()
	{
		// If already opened, return with nothing //
		if (this.isLoaded)
			return;

		// Create interval for rendering plot //
		this.shouldUpdate = true;
		if (this.interval)
			clearInterval(this.interval);
		this.interval = setInterval(this.update.bind(this), 1000.0/30.0);

		//-----------------------------------------------------//
		// Create a new panel from template, and append it into body //
		//-----------------------------------------------------//
		this.panelContainerElement = window.document.createElement("div");
		this.panelContainerElement.innerHTML = this.template();				// Set template into panel element.
		window.document.body.appendChild(this.panelContainerElement);

		// Extract panel element //
		this.panelElement = this.panelContainerElement.querySelector("#panel");
		this.panelElement.style.top = "-100%";
		this.panelElement.addEventListener("transitionend", function (_e) {
			if (this.panelElement.style.top=="-100%")
				this.panelElement.style.visibility = "hidden";
		}.bind(this));

		// Add event listener to file select element for selecting CSVs. //
		// After selected, pass it to object has callback. //
		const fileElement = this.panelElement.querySelector("#file-select");
		fileElement.addEventListener("change", function (_e) {
			const files = fileElement.files;
			const filePaths = new Array();
			for (let i=0; i<files.length; i++) {
				const file = files[i];
				const filePath = window.URL.createObjectURL(file);	// Make temporary local file path
				filePaths.push(filePath);
			}
			// Send to callback //
			if (this.fileSelectionCallback)
				this.fileSelectionCallback(filePaths);
		}.bind(this));

		// Clear button element for closing this panel. //
		const transposeButtonElement = this.panelElement.querySelector("#transposebutton");
		transposeButtonElement.addEventListener("mousedown", function (_e) {
			if (this.transposeSelectionCallback)
				this.transposeSelectionCallback();
		}.bind(this));

		// Clear button element for closing this panel. //
		const clearButtonElement = this.panelElement.querySelector("#clearbutton");
		clearButtonElement.addEventListener("mousedown", function (_e) {
			this.clearAll();
		}.bind(this));

		// Close element for closing this panel. //
		const closeboxElement = this.panelElement.querySelector("#closebox");
		closeboxElement.addEventListener("mousedown", function (_e) {
			this.hide();
		}.bind(this));

		//-----------------------------------------------------//
		// UIs //
		//-----------------------------------------------------//
		let element = null;	// Tempolary variable for placing elements.

		element = this.panelElement.querySelector("#min input");
		if (element) {
			element.value = this.min;
			element.addEventListener("change", function (_e) {
				this.min = parseFloat(_e.currentTarget.value);
				this.shouldUpdate = true;
				//this.updateGraph();
			}.bind(this));
		}

		element = this.panelElement.querySelector("#max input");
		if (element) {
			element.value = this.max;
			element.addEventListener("change", function (_e) {
				this.max = parseFloat(_e.currentTarget.value);
				this.shouldUpdate = true;
				//this.updateGraph();
			}.bind(this));
		}

		if (element) {
			element = this.panelElement.querySelector("#scale input");
			element.min = this.scalableMin;
			element.max = this.scalableMax;
			element.addEventListener("input", function (_e) {
				const statusElement = this.panelElement.querySelector("#scale .status");
				statusElement.innerHTML = _e.currentTarget.value;
				this.plotter.setScale(_e.currentTarget.value);
				this.shouldUpdate = true;
				//this.updateGraph();
			}.bind(this));
		}

		//-----------------------------------------------------//
		// Extract canvas and set event listeners. //
		//-----------------------------------------------------//
		// Extract graph width and height. //
		element = this.panelElement.querySelector("#graph");
		const rect = element.getBoundingClientRect();

		// ver1.2.6a, safari failed to get the correct rect.height at the first load.
		// So, if the rect.height is not the same with half winodw innerHeight, set it into the rect.height.
		if (rect.height!=window.innerHeight/2)
			rect.height = window.innerHeight/2;

		// Extract canvas and reseize and event listeners. //
		element = this.panelElement.querySelector("#graph canvas");
		if (element) {

			//-----------------------------------------------------//
			// Make context for drawing plot //
			//-----------------------------------------------------//
			const DISPLAY_SCALE = window.devicePixelRatio;
			this.context = element.getContext('2d');
			this.context.scale(DISPLAY_SCALE, DISPLAY_SCALE);
			this.chart.context = this.context;
			this.chart.canvas = element;
			this.chart.canvas.width = rect.width * DISPLAY_SCALE;
			this.chart.canvas.height = rect.height * DISPLAY_SCALE;
			this.chart.resize(rect.width, rect.height);
			console.log("DatamatePanel: window resize:", window.innerHeight/2, rect.height);
			
			//-----------------------------------------------------//
			// Make context for drawing plot //
			//-----------------------------------------------------//
			element.addEventListener("mousedown", function(_e) {
				if (!this.isDataAvailable)
					return;
				_e.currentTarget.isMouseDown = true;
				_e.currentTarget.offsetX = _e.offsetX;
				if (_e.currentTarget.isMouseDown && !_e.shiftKey) {
					const columnLastIndex = this.table.columnDataCount();
					const rect = _e.currentTarget.getBoundingClientRect();
					this.highlightColIndex = parseInt(DatamateMapper.map(_e.offsetX, 30, rect.width - 30, 0, columnLastIndex));
					this.highlightColumn(true);
				}
				if (_e.currentTarget.isMouseDown && _e.shiftKey) {
					const lastIndex = this.table.rowDataCount();
					const rect = _e.currentTarget.getBoundingClientRect();
					this.highlightRowIndex = parseInt(DatamateMapper.map(_e.offsetY, 10, rect.height - 10, 0, lastIndex));
					this.highlightRow(true);
					console.log("DatamatePanel:", this.highlightRowIndex, _e.offsetY, lastIndex);
				}
				// const rowCount = this.table.rowCount();
				// if (_e.currentTarget.isMouseDown && !_e.shiftKey) {
				// 	const rect = _e.currentTarget.getBoundingClientRect();
				// 	const x = _e.offsetX * (this.plotter.frameWidth / rect.width);
				// 	this.highlightRowIndex = this.plotter.indexFromFrameX(x, rowCount);
				// 	this.highlightRow();
				// 	this.shouldUpdate = true;
				// }
			}.bind(this));
			element.addEventListener("mouseup", function(_e) {
				_e.currentTarget.isMouseDown = false;
			}.bind(this));
			element.addEventListener("mouseout", function(_e) {
				_e.currentTarget.isMouseDown = false;
			}.bind(this));
			element.addEventListener("mousemove", function(_e) {
				if (!this.isDataAvailable)
					return;
				if (_e.currentTarget.isMouseDown && !_e.shiftKey) {
					const lastIndex = this.table.columnDataCount();
					const rect = _e.currentTarget.getBoundingClientRect();
					this.highlightColIndex = parseInt(DatamateMapper.map(_e.offsetX, 30, rect.width - 30, 0, lastIndex));
					this.highlightColumn(true);
				}
				if (_e.currentTarget.isMouseDown && _e.shiftKey) {
					const lastIndex = this.table.rowDataCount();
					const rect = _e.currentTarget.getBoundingClientRect();
					this.highlightRowIndex = parseInt(DatamateMapper.map(_e.offsetY, 10, rect.height - 10, 0, lastIndex));
					this.highlightRow(true);
					console.log("DatamatePanel:", this.highlightRowIndex, _e.offsetY, lastIndex);
				}
				// const rowCount = this.table.rowCount();
				// if (_e.currentTarget.isMouseDown && !_e.shiftKey) {
				// 	const rect = _e.currentTarget.getBoundingClientRect();
				// 	const x = _e.offsetX * (this.plotter.frameWidth / rect.width);
				// 	this.highlightRowIndex = this.plotter.indexFromFrameX(x, rowCount);
				// 	this.highlightRow(true);
				// 	this.shouldUpdate = true;
				// }
				// if (_e.currentTarget.isMouseDown && _e.shiftKey) {
				// 	this.plotter.moveBy(_e.offsetX - _e.currentTarget.offsetX);
				// 	_e.currentTarget.offsetX = _e.offsetX;
				// 	this.shouldUpdate = true;
				// }
			}.bind(this));

			// this.chart.canvas.width = rect.width;
			// this.chart.canvas.height = rect.height;
			// this.chart.width = rect.width;
			// this.chart.height = rect.height;
		}

		//-----------------------------------------------------//
		// Add resize event handler for updating width and height //
		//-----------------------------------------------------//
		window.addEventListener("resize", this.windowResizeHandler.bind(this));

		// isLoaded flag set //
		this.isLoaded = true;

		this.updatePanelTooltips();
		this.update();

		//this.applyCusromStyles();
	}

	//-----------------------------------------------------------------//
	// Unload //
	//-----------------------------------------------------------------//
	// Unload and dispose all elements. //
	unload()
	{
		if (!this.isLoaded)
			return;

		// Clear interval //
		if (this.interval)
			clearInterval(this.interval);
		this.interval = null;

		// Remove panel //
		if (this.panelContainerElement)
			this.panelContainerElement.remove();
		this.panelContainerElement = null;

		this.isLoaded = false;
	}

	//-----------------------------------------------------------------//
	// Load basic UIs, graph and table containers. //
	//-----------------------------------------------------------------//
	windowResizeHandler(_e)
	{
		if (!this.isLoaded)
			return;

		const element = this.panelElement.querySelector("#graph");
		const rect = element.getBoundingClientRect();
		const DISPLAY_SCALE = window.devicePixelRatio;
		this.context.scale(DISPLAY_SCALE, DISPLAY_SCALE);
		this.chart.resize(rect.width, rect.height);
		console.log("DatamatePanel: window resize:", window.innerHeight/2, rect.height);

		// element.width = 1000 * DISPLAY_SCALE;
		// element.height = 400 * DISPLAY_SCALE;
		// this.chart.width = rect.width;
		// this.chart.height = rect.height;
		// this.chart.canvas.width = rect.width;
		// this.chart.canvas.height = rect.height;

		this.updateGraph();
	}

	//-----------------------------------------------------------------//
	// Panel controls //
	//-----------------------------------------------------------------//
	// Show panel with animation. //
	show()
	{
		if (!this.isLoadeded)
			this.load();

		// Show the panel with animation //
		this.isVisible = true;
		this.panelElement.style.visibility = "";
		this.panelElement.style.transition = "top 0.5s ease-in-out";

		// This is for the delay to reflect transition at first load. //
		setTimeout(function (_e) {
			this.panelElement.style.top = "0px";
		}.bind(this), 1);
		console.log("DatamatePanel: show");
	}

	// Hide panel with animation. //
	hide()
	{
		// If panel is not open, return with nothing. //
		if (!this.isLoaded)
			return;

		// Hide the panel with animation.. //
		this.isVisible = false;
		this.panelElement.style.top = "-100%";
		console.log("DatamatePanel: hide");
	}

	applyCusromStyles()
	{
		const styleElement = this.panelElement.querySelector("#custom_style");
		console.log(styleElement, this.styles);

		let styleText = "";
		if (this.styles["color"]) styleText += `color: ${this.styles["color"]};`;
		if (this.styles["color"]) styleText += `border-color: ${this.styles["color"]};`;
		if (this.styles["background"]) styleText += `background-color: ${this.styles["background"]};`;

		let styles = `
		#panel, #controls, #contents, #table thead th, #buttons > div, #buttons > label  {
			${styleText}
		}`;
		styleElement.innerHTML = styles;
	}

	applyHeaderStyles()
	{
		const styleElement = this.panelElement.querySelector("#header_style");
		console.log(styleElement, this.graphColors);

		const columnCount = this.table.columnCount();
		let styles = "";
		for (let i=0; i<columnCount; i++) {
			const nthIndex = i + 1;
			const colorIndex = i % this.graphColors.length;
			const color = this.graphColors[colorIndex];
			styles += `#table thead th:nth-of-type(${nthIndex}) {
				color: ${color};
			}`;
		}
		styleElement.innerHTML = styles;
		console.log("DatamatePanel: header styles: ", styles, styleElement);
	}

	// Make ranbow color for all graphs //
	rainbow()
	{
		// Make coloring //
		const columnCount = this.table.columnCount();
		this.graphColors = [];
		for (let i=0; i<columnCount; i++) {
			const hue = (1.0 * i / columnCount) * 360;
			const rgb = DatamateColor.RGBFromHSB(hue, 1, 1);
			const hex = DatamateColor.HEXFromRGB(rgb.red, rgb.green, rgb.blue);
			this.graphColors.push(hex);
		}
	}

	clearAll()
	{
		// Clear table data //
		this.table = null;
		this.isDataAvailable = false;

		// Clear table elements //
		if (this.isLoaded) {
			let element = this.panelElement.querySelector("#table");
			element.innerHTML = "";

			// Clear plot graph //
			this.context.clearRect(0, 0, this.chart.width, this.chart.height);
		}
	}

	//-----------------------------------------------------------------//
	// Panel updating //
	//-----------------------------------------------------------------//
	update()
	{
		if (!this.isLoaded || !this.isDataAvailable || !this.isVisible || !this.shouldUpdate)
			return;
		this.updatePanelInfo();
		this.updateHighlights();
		this.updateGraph();
		this.shouldUpdate = true;
	}

	updatePanelTooltips()
	{
		const pairs = [];

		pairs.push(["#count-row", "title", "the number of rows without header row."]);
		pairs.push(["#count-col", "title", "the number of columns without header column."]);
		pairs.push(["#value-cell", "title", "current value of indicated by mouse."]);
		pairs.push(["#index-cell", "title", "current data indexes of indicated by mouse. <row:column>."]);

		for (let index in pairs) {
			const pair = pairs[index];
			const query = pair[0];
			const title = pair[1];
			const value = pair[2];
			const element = this.panelElement.querySelector(query);
			if (element)
				element.setAttribute(title, value);
		}
	}

	updatePanelInfo() 
	{
		const pairs = [];

		const colCount = this.table.columnDataCount();
		const rowCount = this.table.rowDataCount();
		pairs.push(["#min input", this.table.min]);
		pairs.push(["#max input", this.table.max]);
		pairs.push(["#sum input", this.table.sum]);
		pairs.push(["#avg input", this.table.average]);
		pairs.push(["#count-row input", rowCount]);
		pairs.push(["#count-col input", colCount]);

		pairs.push(["#index-cell input", this.highlightRowIndex + ":" + this.highlightColIndex]);
		
		const data = this.table.dataAtDataIndexes(this.highlightColIndex, this.highlightRowIndex);
		if (data) {
			// pairs.push(["#name-cell input", data.row.name + " – " +  data.column.name]);
			pairs.push(["#value-cell input", data.value]);

			pairs.push(["#name-row input", data.row.name]);
			pairs.push(["#min-row input", data.row.min]);
			pairs.push(["#max-row input", data.row.max]);
			pairs.push(["#sum-row input", data.row.sum]);
			pairs.push(["#avg-row input", data.row.average]);

			pairs.push(["#name-col input",  data.column.name]);
			pairs.push(["#min-col input", data.column.min]);
			pairs.push(["#max-col input", data.column.max]);
			pairs.push(["#sum-col input", data.column.sum]);
			pairs.push(["#avg-col input", data.column.average]);
		}

		for (let index in pairs) {
			const pair = pairs[index];
			const query = pair[0];
			const value = pair[1];
			const element = this.panelElement.querySelector(query);
			if (element)
				element.value = (isNaN(value)) ? value : value;
		}
	}

	updateTable(_table=null)
	{
		// Reset new table //
		if (_table!=null)
			this.table = _table;

		this.isDataAvailable = true;
		this.min = this.table.min;
		this.max = this.table.max;

		//-----------------------------------------------------//
		// Reflect current table info. //
		//-----------------------------------------------------//
		this.updatePanelInfo();

		//-----------------------------------------------------//
		// Extract table container and set new table //
		//-----------------------------------------------------//
		// Prepare the HTML //
		let element = this.panelElement.querySelector("#table");
		const tableElement = window.document.createElement("table");
		tableElement.cellSpacing = "0px";
		tableElement.cellPadding = "0px";

		// Extract only data table (without header)
		// const columnCount = this.table.columnCount(false);		// Column count only data table
		// const rowCount = this.table.rowCount(false);			// Row count only data table.
		// const columnHeaders = this.table.columnHeaders(false);	// header will be the first row values, or indices of columns.
		// const rowHeaders = this.table.rowHeaders(false);		// header will be the first column values, or indices of rows.

		const formatTable = this.table.formatTable();
		//console.log("DatamatePanel: ", formatTable);

		// Table Header //
		const thead = window.document.createElement("thead");
		
		const columnIndices = formatTable.get("indices");
		if (columnIndices) {
			const tr1 = window.document.createElement("tr");
			// console.log("DatamatePanel: ", columnIndices);
			for (let i=0; i<columnIndices.length; i++) {
				const header = columnIndices[i];
				const th = window.document.createElement("th");
				th.innerHTML = header;

				th.addEventListener("mouseover", function(_e) {
					// this.highlightColIndex = parseInt(_e.currentTarget.colIndex);
					this.highlightRow(false);
					this.shouldUpdate = true;
				}.bind(this));

				tr1.appendChild(th);
			}
			thead.appendChild(tr1);
		}

		const columnHeaders = formatTable.get("headers");
		if (columnHeaders) {
			const tr2 = window.document.createElement("tr");
			// console.log("DatamatePanel: ", columnHeaders);
			for (let i=0; i<columnHeaders.length; i++) {
				const header = columnHeaders[i];
				const th = window.document.createElement("th");
				th.classList.add("row-header");
				// If the first header and header enabled both row and column, set corner-header for indicating at top. //
				if (i==0 && this.table.headerColumnEnabled && this.table.headerRowEnabled)
					th.classList.add("corner-header");
				th.innerHTML = header;

				th.addEventListener("mouseover", function(_e) {
					// this.highlightColIndex = parseInt(_e.currentTarget.colIndex);
					this.highlightRow(false);
					this.shouldUpdate = true;
				}.bind(this));

				tr2.appendChild(th);
			}
			thead.appendChild(tr2);
		}
		tableElement.appendChild(thead);

		// Table Body //
		const tbody = window.document.createElement("tbody");
		const rows = formatTable.get("rows");
		
		for (let i=0; i<rows.length; i++) {

			// Extract row as complete table index. //
			const row = rows[i];
			const tr = window.document.createElement("tr");

			// Make column data cells //
			for (let ii=0; ii<row.length; ii++) {

				//const data = row.dataAtIndex(ii, false);
				const value = row[ii];
				const td = window.document.createElement((ii==0 && this.table.headerColumnEnabled) ? "th" : "td");
				if (ii==0 && this.table.headerColumnEnabled)
					td.classList.add("col-header");
				td.innerHTML = value;//(data) ? data.value : "";
				td.rowIndex = i;
				td.colIndex = ii + ((ii!=0 && this.table.headerColumnEnabled) ? -1 : 0);

				td.addEventListener("mousedown", function(_e) {
					this.highlightRowIndex = parseInt(_e.currentTarget.rowIndex);
					this.highlightColIndex = parseInt(_e.currentTarget.colIndex);
					this.plotter.moveToIndex(this.highlightRowIndex, row.length);
					this.table.cursor.move(this.highlightColIndex, this.highlightRowIndex);
					this.highlightRow(false);
					this.highlightColumn();
					// this.updateGraph();
					this.shouldUpdate = true;	// Update in main thread.
					// console.log(this.highlightRowIndex, this.highlightColIndex);
				}.bind(this));

				td.addEventListener("mouseover", function(_e) {
					this.highlightRowIndex = parseInt(_e.currentTarget.rowIndex);
					this.highlightColIndex = parseInt(_e.currentTarget.colIndex);
					this.plotter.moveToIndex(this.highlightRowIndex, row.length);
					this.highlightRow(false);
					this.highlightColumn();
					// this.updateGraph();
					this.shouldUpdate = true;	// Update in main thread.
					// console.log("DatamatePanel:", this.highlightRowIndex, this.highlightColIndex);
				}.bind(this));
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		
		tableElement.appendChild(tbody);
		element.appendChild(tableElement);

		//this.applyHeaderStyles();
		this.updateGraph();
	}

	updateHighlights()
	{
		this.highlightColumn(false);
		this.highlightRow(false);
	}

	highlightColumn(_isScroll=false)
	{
		// If the data is not available, return with nothing. //
		if (!this.isDataAvailable)
			return;

		// ver1.2.6a, extract cursor position and highlight it on table. //
		const cursorX = this.table.cursor.rowIndex() + 1;
		const cursorY = this.table.cursor.columnIndex() + 1;

		// shape indexes to the indexes for nth-of-type() (1 base index) //
		const highlightColIndex = this.highlightColIndex + 1;
		const highlightRowIndex = this.highlightRowIndex + 1;

		// Update style for highlight //
		const highlightStyle = this.panelElement.querySelector("#highlight_style");
		const style = `
			#table tbody tr:nth-of-type(${cursorX}) > td:nth-of-type(${cursorY}) {
				border: 1px solid red;
				border-collapse: collapse;
			}
			#table tbody tr:nth-of-type(${highlightRowIndex}) > td:nth-of-type(${highlightColIndex}) {
				border: 1px solid orange;
				border-collapse: collapse;
			}
		`;
		highlightStyle.innerHTML = style;

		// If scroll flag is set, scroll table to the highlight row. //
		if (_isScroll) {
			// Extract highlight th or td //
			const ths = this.panelElement.querySelectorAll("thead th, thead td");
			const highlightTH = ths[this.highlightColIndex];

			// 
			const containerElement =  this.panelElement.querySelector("#table");
			const containerWidth = containerElement.offsetWidth;
			const colCount = this.table.columnCount();

			// Scroll container top to highlight TR top. //
			containerElement.scrollLeft = highlightTH.offsetLeft;

			// If scroll is not the bottom, scroll with offset for the header //
			// if (this.highlightColIndex < colCount - 1) 
			// 	containerElement.scrollLeft = containerElement.scrollLeft - containerWidth;
		}
	}

	highlightRow(_isScroll=false)
	{
		// If the data is not available, return with nothing. //
		if (!this.isDataAvailable)
			return;

		// If highlight row index is not valid, return with nothing. //
		const rowCount = this.table.rowCount();
		if (this.highlightRowIndex < 0 || this.highlightRowIndex >= rowCount)
			return;

		// If highlight tr is set, it is the latest highlight tr, so remove highlight attribute //
		if (this.highlightTR)
			this.highlightTR.removeAttribute("data-highlight");

		// Extract an highlight TR from all TRs, and set an attribute. //
		const trs = this.panelElement.querySelectorAll("tbody tr");
		this.highlightTR = trs[this.highlightRowIndex];
		this.highlightTR.setAttribute("data-highlight", true);

		// If scroll flag is set, scroll table to the highlight row. //
		if (_isScroll) {
			const containerElement =  this.panelElement.querySelector("#table");
			const trElement = this.panelElement.querySelector("thead tr");
			const trHeight = trElement.offsetHeight;

			// Scroll container top to highlight TR top. //
			containerElement.scrollTop = this.highlightTR.offsetTop;

			// If scroll is not the bottom, scroll with offset for the header //
			if (this.highlightRowIndex < rowCount - 1)
				containerElement.scrollTop = containerElement.scrollTop - trHeight;
		}

	}

	updateGraph()
	{
		if (!this.isDataAvailable)
			return;
		
		this.chart.draw(this.table, this.highlightRowIndex, this.highlightColIndex);

		// const columnCount = this.table.columnCount();
		// const rowCount = this.table.rowCount();
		// const min = this.min;
		// const max = this.max;

		// this.context.clearRect(0, 0, 1000, 400);

		// this.context.strokeWeight = 1;
		// //this.context.fillStyle = 'black';
		// //this.context.fillRect(0, 0, 1000, 400);

		// const columnHeaders = this.table.columnHeaders();
		// const rowHeaders = this.table.rowHeaders();

		// for (let i=0; i<columnHeaders.length; i++) {
		// 	const header = columnHeaders[i];
		// 	this.context.beginPath();
		// 	this.context.strokeStyle = (i==this.highlightColIndex) ? this.highlightColor : this.graphColors[i%this.graphColors.length];
		// 	this.context.lineWidth = (i==this.highlightColIndex) ? "2" : "1";
		// 	let prevIndex = -1;
		// 	let highlightX = -1;
		// 	let isLineClosed = true;
		// 	for (let ii=0; ii<this.plotter.frameWidth; ii++) {

		// 		// Check row index is in range of column //
		// 		const rowIndex = this.plotter.indexFromFrameX(ii, rowCount);
		// 		if (rowIndex >= rowCount || rowIndex < 0 || rowIndex==prevIndex)
		// 			continue;

		// 		// Check highlihgt x //
		// 		const row = this.table.rowAtIndex(rowIndex);
		// 		if (this.highlightRowIndex > prevIndex && this.highlightRowIndex <= rowIndex)
		// 			highlightX = ii;
		// 		prevIndex = rowIndex;

		// 		// Check data is valid //
		// 		//const data = row[header];
		// 		const rowHeader = rowHeaders[rowIndex];
		// 		const data = this.table.getData(header, rowHeader);
		// 		if (!data) {
		// 			isLineClosed = true;
		// 			continue;
		// 		}

		// 		// Draw next line //
		// 		const value = data.floatValue();
		// 		(ii==0 || isLineClosed) ? this.context.moveTo(ii, DatamateMapper.map(value, min, max, 400, 0)) : this.context.lineTo(ii, DatamateMapper.map(value, min, max, 400, 0));


		// 		isLineClosed = false;
		// 	}
		// 	this.context.stroke();

		// 	if (highlightX >= 0) {
		// 		this.context.beginPath();
		// 		this.context.strokeStyle = "orange";
		// 		this.context.lineWidth = "1";
		// 		this.context.moveTo(highlightX, 0);
		// 		this.context.lineTo(highlightX, 400);
		// 		this.context.stroke();
		// 	}
		// }
	}

	// Return template contents //
	template()
	{
		return `
		<div id="panel">
			<!-- template part begin -->
			<style>
				/* @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap');*/
				@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@100;200;300;400&display=swap');

				* {
					margin: 0px;
					padding: 0px;
					box-sizing: border-box;
				}
				
				/* ------------------------------ */
				/* panel */
				/* ------------------------------ */
				#panel, #controls, #contents {
					background-color: rgba(0,0,0, 0.75);
				}
				#panel {
					position: fixed;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100%;
					color: white;
					font-size: 13px;
					font-weight: 400;
					font-family: 'Barlow Condensed', 'Roboto Condensed', sans-serif;
				}
				
				/* ------------------------------ */
				/* controls */
				/* ------------------------------ */
				#controls {
					position: absolute;
					padding: 10px;
					top: 0px;
					left: 0px;
					width: 200px;
					height: 100%;
					border-right: 1px solid gray;
				}
				#title {
					font-size: 1.2em;
					font-weight: bold;
					padding: 20px 0px;
				}

				#controls hr {
					margin: 4px 0px;
					border: 0px solid gray;
					border-bottom: 1px solid gray;
				}

				/* ------------------------------ */
				/* controls */
				/* ------------------------------ */
				#values,
				#values input {
					font-size: 0.9em;
				}
				#values > div {
					display: inline-block;
					width: 100%;
					cursor: pointer;
				}
				#values > div > span {
					display: inline-block;
					width: 80px;
				}
				#values > div > span.status {
					width: 20px;
				}
				input {
					display: inline-block;
					color: rgba(255,255,255,0.9);
					margin: 0px 0px;
					padding: 2px 0px;
					width: 80px;
					border: none;
				}
				input[readonly] {
					background-color: rgba(255,255,255,0.0);
				}
				#name-row span,
				#name-col span,
				#value-cell span, 
				#index-cell span {
					color: orange !important;
				} 

				/* ------------------------------ */
				/* buttons */
				/* ------------------------------ */
				#buttons {
					position: absolute;
					width: 100%;
					bottom: 0px;
					left: 0px;
					padding: 20px 10px;
				}
				#buttons > div,
				#buttons > label {
					display: block;
					padding: 10px 20px;
					margin: 10px 0px;
					border: 1px solid white;
					text-align: center;
					background-color: rgba(255,255,255,0.1);
					border-radius: 6px;
					cursor: pointer;
				}
				#buttons > label {
					margin-bottom: 30px;
				}
				#buttons > div:hover,
				#buttons > label:hover {
					background-color: rgba(255,255,255,0.4);
				}
				#buttons > input {
					display: none;
				}

				/* ------------------------------ */
				/* contents */
				/* ------------------------------ */
				#contents {
					position: absolute;
					top: 0px;
					left: 200px;
					width: calc(100% - 200px);
					height: 100%;
				}
				#graph {
					width: 100%;
					height: 50%;
				}
				#graph canvas {
					cursor: move;
					width: 100%;
					height: 100%;
					padding: 20px 10px;
				}

				/* ------------------------------ */
				/* table */
				/* ------------------------------ */
				#table {
					width: 100%;
					height: 50%;
					color: white;
					overflow: scroll;
				}
				#table table {
					width: 100%;
					border: 1px solid gray;
					word-wrap: break-word;
				}
				#table tr {
					border: 1px solid gray;
				}
				#table td, #table th {
					width: 100px;
					min-width: 100px;
					max-width: 100px;
					padding: 2px 10px;
					border: 1px solid gray;
				}
				thead th, tbody th {
					text-align: left;
					color: white;
				}
				#table td:hover {
					color: white;
					cursor: pointer;
				}
				#table th {
					color: rgba(255, 255, 255, 0.75);
					background: rgba(50, 50, 50, 0.75);
				}
				#table th:nth-of-type(1) {
					border-right: 1px solid gray;
				}

				#table tr th.row-header {
					text-align: left;
					position: -webkit-sticky;
					position: sticky;
					top: 0px;
					cursor: pointer;
				}
				#table tr th.col-header {
					position: -webkit-sticky;
					position: sticky;
					left: 0px;
				}
				#table tr th.corner-header {
					position: -webkit-sticky;
					position: sticky;
					left: 0px;
					top: 0px;
					z-index: 999;
				}

				[data-highlight=true] {
					background-color: rgba(255,200,0,0.2);
				}
				.cursor-position {
				}

				#values > #scale {
					display: none;
				}
			</style>
			<style id="custom_style">
			/* the styles will be set by script. */
			</style>
			<style id="header_style">
			/* the styles will be set by script. */
			</style>
			<style id="highlight_style">
			/* the styles will be set by script. */
			</style>

			<div id="controls">
				<div id="title">datamate.js<p style="font-size:0.8em;">ver.${Datamate.version}a</p></div>
				<div id=values>
					<div id="index-cell"><span>INDEXES</span><input type="text" value="0" readonly></div>
					<div id="name-row"><span>ROW</span><input type="text" value="Row Name" readonly></div>
					<div id="name-col"><span>COL</span><input type="text" value="Column Name" readonly></div>
					<div id="value-cell"><span>VALUE</span><input type="text" value="0" readonly></div>
					<hr>
					<div id="count-row"><span>ROW COUNT</span><input type="text" value="0" readonly></div>
					<div id="count-col""><span>COL COUNT</span><input type="text" value="0" readonly></div>
					<hr>
					<div id="min-row"><span>ROW MIN.</span><input type="text" value="0" readonly></div>
					<div id="max-row"><span>ROW MAX.</span><input type="text" value="0" readonly></div>
					<div id="sum-row"><span>ROW SUM</span><input type="text" value="0" readonly></div>
					<div id="avg-row"><span>ROW AVG.</span><input type="text" value="0" readonly></div>
					<hr>
					<div id="min-col"><span>COL MIN.</span><input type="text" value="0" readonly></div>
					<div id="max-col"><span>COL MAX.</span><input type="text" value="0" readonly></div>
					<div id="sum-col"><span>COL SUM</span><input type="text" value="0" readonly></div>
					<div id="avg-col"><span>COL AVG.</span><input type="text" value="0" readonly></div>
					<hr>
					<div id="min"><span>TOTAL MIN.</span><input type="text" value="0" readonly></div>
					<div id="max"><span>TOTAL MAX.</span><input type="text" value="0" readonly></div>
					<div id="sum"><span>TOTAL SUM</span><input type="text" value="0" readonly></div>
					<div id="avg"><span>TOTAL AVG.</span><input type="text" value="0" readonly></div>
					<div id="scale"><span>SCALE:</span><input type="range" min="1" max="10" step="0.01" value="1"><span class="status">1</span></div>
				</div>
				<div id="buttons">
					<input id="file-select" type="file" multiple='multiple' accept=".csv" />
					<label id="file-select-label" for="file-select">SELECT CSVs</label>
					<div id="transposebutton">TRANSPOSE</div>
					<div id="clearbutton">CLEAR ALL</div>
					<div id="closebox">CLOSE</div>
				</div>
			</div>
			<div id="contents">
				<div id="graph"><canvas></canvas></div>
				<div id="table"></div>
			</div>
		</div>`;
	}
}

;// CONCATENATED MODULE: ./src/node/DatamateNode.js
/*
*
*	DatamateNode.js
*	2022 scripted by Mashimo,T.
*
*/



class DatamateNode
{
	constructor()
	{
		// Node basic properties //
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.mass = 1;
		this.angle = 0;
		this.velocity = 0;
		this.rvelocity = 0;
		this.friction = 0.99;
		this.rfriction = 0.0;

		// Node geometrical controllers. //
		this.gravities = [];
		this.fields = [];
		this.engines = [];

		// Relevent to table properties. //
		this.value = 0;
		this.data = null;
		this.column = null;
		this.row = null;
	}

	map(_tmin, _tmax)
	{
		const numberValue = Number(this.value);

		// If number value is NaN, return raw value //
		if (isNaN(numberValue))
			return value;

		const column = this.data.column;
		return (_tmin==_tmax) ? _tmin : DatamateMapper.map(numberValue, column.min, column.max, _tmin, _tmax);
	}

	force(_force, _rotation=0)
	{
		this.rvelocity += _rotation;
		this.velocity += _force / this.mass;
	}

	update()
	{
		this.angle += this.rvelocity;
		const radian = this.angle * (Math.PI / 180.0);
		this.x += Math.cos(radian) * this.velocity;
		this.y += Math.sin(radian) * this.velocity;
		this.velocity *= this.friction;
	}

	current(_tmin=0, _tmax=0)
	{

	}

	offset(_index=0, _tmin=0, _tmax=0)
	{

	}
}

;// CONCATENATED MODULE: ./src/Datamate.js
/*
*
*	Datamate
*	2021 scripted by t.mashimo
*	This is main class and also the entrypoint for webpack.
*
*/

// Import core //





// Import ui //



// Import utils //




/**
*
*	@module Datamate
*
*/
class Datamate
{
	//-------------------------------------------------------------------------//
	// Singleton controls
	//-------------------------------------------------------------------------//
	static version = "1.2.7.2";
	static COLUMN = "COLUMN";
	static ROW = "ROW";
	static ALL = "ALL";

	// Private shared instance. it can be accessed via sharedInstance() method //
	// The instance will be instantiated when the first access to the method. //
	static singleton = null;

	/**
	 * Return Datamate singleton instance.
	 * @return {Datamate} return Datamate singleton instance.
	 */
	static sharedInstance()
	{
		if (Datamate.singleton==null)
			Datamate.singleton = new Datamate();
		return Datamate.singleton;
	}

	/**
	 * Return the datamate dataset is avilable or not.
	 * @return {boolean} return loading data is availabe or not. If true, data is available.
	 */
	static get isAvailable()
	{
		const datamate = Datamate.sharedInstance();
		return datamate.isAvailable;
	}

	static uuid4()
	{
		return DatamateMath.uuid4();
	}
	
	//-------------------------------------------------------------------------//
	// Title controls
	//-------------------------------------------------------------------------//
	/**
	 * Set table title.
	 * @param {String} _title the title of the dataset.
	 */
	static set title(_title)
	{
		const datamate = Datamate.sharedInstance();
		datamate.title = _title;
	}

	/**
	 * Return table title.
	 * @return {String} The string of current title.
	 */
	static get title()
	{
		const datamate = Datamate.sharedInstance();
		return datamate.title;
	}

	//-------------------------------------------------------------------------//
	// Making data table controls
	//-------------------------------------------------------------------------//
	/**
	 * Multipurpose function to make data table in sigleton Datamate object.
	 * If set _arg0 as a String and _arg1 is an Array, make a new row with _arg0 as its header and _arg1 as values.
	 * If set _arg0 as an Array and _arg1 is null, make a new row with the first value as its header and after second values as values.
	 * If set _arg0 as the string (or the first string in array) includes '.csv' extension, try to load the files as csv.
	 * If setTitles() function is not called, the first make row will be header row when header row is enabled.
	 * @param {String|Array} _arg0 The row header name, or data values, or single csv file string or csv files array.
	 * @param {Array} _arg1 The array of data values.
	 */
	static make(_arg0, _arg1=null)
	{
		Datamate.setData(_arg0, _arg1);
	}

	/**
	 * Make a new row in the singleton table.
	 * It is the same with make().
	 * @param {String|Array} _arg0 The row header name, or data values, or single csv file string or csv files array.
	 * @param {Array} _arg1 The array of data values.
	 */
	static setData(_arg0, _arg1=null)
	{
		const datamate = Datamate.sharedInstance();
		datamate.setData(_arg0, _arg1);
	}

	/**
	 * Set column headers in the top of the row.
	 * @param {String|Array} _arg0 The row header title string, or titles as array including the row header.
	 * @param {Array} _arg1 titles as array without the row header. 
	 */
	static setTitles(_arg0, _arg1=null)
	{
		const datamate = Datamate.sharedInstance();
		datamate.setTitles(_arg0, _arg1);
	}

	/**
	 * Set column and row header enables.
	 * @param {Boolean} _columnHeaderEnable Column header enable, default is true.
	 * @param {Boolean} _rowHeaderEnable Row header enable, default is true.
	 */
	static setHeaderEnables(_headerRowEnabled=true, _headerColumnEnabled=true)
	{
		const datamate = Datamate.sharedInstance();
		datamate.setHeaderEnables(_headerRowEnabled, _headerColumnEnabled);
	}

	/**
	 * Return a value at given row-column keys as string or index number.
	 * If the given index is float number, and the value is also numerical value, it will return lerped value between current and the next index.
	 * If the _tmin and _tmax parameters are set, the return value will be mapped in the range between min and max of the column or the row.
	 * The range will be determined by _target parameter.
	 * @param {String|Number} _rowKey row name.
	 * @param {String|Number} _colKey column name.
	 * @param {Number} _tmin the minimum value after mapped.
	 * @param {Number} _tmax the maximum value after mapped.
	 * @param {String} _target the target for calculating min/max. Default is Datamate.COLUMN.
 	 * @return {Number} the value of mapped value. If given column-row does not exist, return undefined.
	 */
	 static value(_rowKey, _colKey, _tmin=0, _tmax=0, _target=Datamate.COLUMN)
	 {
		const datamate = Datamate.sharedInstance();
		return datamate.getLerpValue(_rowKey, _colKey, _tmin, _tmax, _target);
		//  return datamate.getValue(_rowKey, _colKey, _tmin, _tmax, _target);
	 }

	/**
	 * Return the rate at the value of given column-row in all rows.
	 * If the _tmin, _tmax parameters, the return value will be mapped from rate to given _tmin/_tmax range.
	 * @param {String|Number} _rowKey row name.
	 * @param {String|Number} _colKey column name.
	 * @param {Number} _tmin the minimum value after mapped.
	 * @param {Number} _tmax the maximum value after mapped.
	 * @param {String} _target row name.
	 * @return {Number} the raw value of mapped value. If given column-row does not exist, return undefined.
	 */
	static rate(_rowKey, _colKey, _tmin=0, _tmax=1, _target=Datamate.COLUMN)
	{
		const datamate = Datamate.sharedInstance();
		return datamate.getRate(_rowKey, _colKey, _tmin, _tmax, _type);
	}

	/**
	 * Get DatamateData at given row-column names or indexes.
	 * @param {String|Number} _columnName column name.
	 * @param {String|Number} _rowName row name.
	 * @return {DatamateData} return DatamateData. If column-row is not found, return null.
	 */
	static data(_rowKey, _colKey)
	{
		const datamate = Datamate.sharedInstance();
		return datamate.getData(_rowKey, _colKey);
	}

	/**
	 * Show a default plotter UI on browser screen.
	 */
	static plot()
	{
		const datamate = Datamate.sharedInstance();
		datamate.showPanel();
	}
 
	//-------------------------------------------------------------------------//
	// Loading controls
	//-------------------------------------------------------------------------//
	/**
	 * Add file path to be loaded as multiple.
	 * @param {String} _filepath Related path to be loaded.
	 */
	static addFile(_filepath)
	{
		const datamate = Datamate.sharedInstance();
		datamate.addFile(_filepath);
	}

	/**
	 * Start loading files with synchronous connection.
	 * @param {Array} _filePaths file paths, if it has already called addFile(), the file paths will be appended after the files.
	 */
	static load(_filePaths=null)
	{
		const datamate = Datamate.sharedInstance();
		datamate.load(false, _filePaths);
	}

	/**
	 * Start loading files with asynchronous connection.
	 * @param {Array} _filePaths file paths, if it has already called addFile(), the file paths will be appended after the files.
	 */
	 static loadAsync(_filePaths=null)
	 {
		 const datamate = Datamate.sharedInstance();
		 datamate.load(true, _filePaths);
	 }

	/**
	 * Callback function of completing loading files as async.
	 * @param {Function} _function Callback function.
	 */
	static set onLoad(_function)
	{
		const datamate = Datamate.sharedInstance();
		datamate.loadCompleteCallback = _function;
	}

	//-------------------------------------------------------------------------//
	// Table controls
	//-------------------------------------------------------------------------//
	/**
	 * Map given value from given column minimu/maximum to _tmin/_tmax range.
	 * @param {Number} _value the value to be mapped.
	 * @param {Number} _tmin the minimum value after mapped.
	 * @param {Number} _tmax the maximum value after mapped.
	 * @param {Number} _columnName Column name of source of mapping.
	 * @return {Number} mapped value. If column name is not found, return value not mapped.
	 */
	static map(_value, _tmin, _tmax, _target=Datamate.COLUMN)
	{
		const datamate = Datamate.sharedInstance();
		return datamate.map(_value, _tmin, _tmax, _target)
	}

	/**
	 * The minimum value of all dataset in current table.
	 * @return {Number} The minimum value in all dataset.
	 */
	static get min()
	{
		const datamate = Datamate.sharedInstance();
		return datamate.min;
	}

	/**
	 * The maximum value of all dataset in current table.
	 * @return {Number} The maximum value in all dataset.
	 */
	static get max()
	{
		const datamate = Datamate.sharedInstance();
		return datamate.max;
	}

	/**
	 * The length of rows in all dataset.
	 * @return {Number} The length in all dataset.
	 */
	static get length()
	{
		const datamate = Datamate.sharedInstance();
		return datamate.length;
	}

	/**
	 * Transpose current singleton table.
	 */
	static transpose()
	{
		const datamate = Datamate.sharedInstance();
		return datamate.transpose();
	}

	/**
	 * Return a count of all columns.
	 * @return {Number} Return DatamateColumn object or null.
	 */
	static columnCount()
	{
		const datamate = Datamate.sharedInstance();
		return datamate.columnCount();
	}

	/**
	 * Return a column name of given index.
	 * @param {Number} _index The name or index of interst column.
	 * @return {Number} Return column name at index.
	 */
	static columnName(_index)
	{
		return Datamate.columnNameAtIndex(_index);
	}

	/**
	 * Return a column of given name or index.
	 * @param {Number} _key The name or index of interst column.
	 * @return {Number} Return DatamateColumn object or null.
	 */
	static column(_key)
	{
		const datamate = Datamate.sharedInstance();
		return datamate.column(_key);
	}

	/**
	 * Return a count of all rows.
	 * @return {Number} Return DatamateRow object or null.
	 */
	static rowCount()
	{
		const datamate = Datamate.sharedInstance();
		return datamate.rowCount();
	}

	/**
	 * Return a row name of given index.
	 * @param {Number} _index The name or index of interst row.
	 * @return {String} Return row name at index.
	 */
	static rowName(_index)
	{
		return Datamate.rowNameAtIndex(_index);
	}

	/**
	 * Return a row of given name or index.
	 * @param {Number} _key The name or index of interest row.
	 * @return {Number} Return DatamateRow object or null.
	 */
	static row(_key)
	{
		const datamate = Datamate.sharedInstance();
		return datamate.row(_key);
	}

	//-------------------------------------------------------------------------//
	// Area controls
	//-------------------------------------------------------------------------//
	/**
	* Initialize singleton DatamateArea following with given parameters.
	* DatamateArea class provides rectangle areas divided by the number of given xy blocks.
	* We can extract a specific DatamateArea by area() method with the index of blocks.
	* The DatamateArea object has an information about the parameters related to the arranged rectangle,
	* such as x, y, width, height, left, right, top, bottom, centerX and centerY.
	* We can also call bindAreas() to assign the block to prefer index to each block.
	* @param {Number} _x The left position of whole area rectangle.
	* @param {Number} _y The top position of whole area rectangle.
	* @param {Number} _width The width of the size of whole area rectangle.
	* @param {Number} _height The height of the size of whole area rectangle.
	* @param {Number} _xArea The number of blocks to be divided horizontally.
	* @param {Number} _yArea The number of blocks to be divided vertically.
	*/
	static makeAreas(_x, _y, _width, _height, _xArea=1, _yArea=1)
	{
		const datamate = Datamate.sharedInstance();
		datamate.makeAreas(_x, _y, _width, _height, _xArea, _yArea);
	}

	/**
	* Bind a divided area to given names or indexes to call area by the name or the index.
	* @param {Array} _areaIndexes The names or indexes to be assigned for each area.
	*/
	static bindAreas(_areaIndexes)
	{
		const datamate = Datamate.sharedInstance();
		datamate.bindAreas(_areaIndexes);
	}

	/**
	* Extract an area of the column of given name.
	* @param {String|Number} _key area name or index.
	* @return {DatamateArea} Return a DatamateArea object in binded the given key.
	*/
	static area(_key)
	{
		const datamate = Datamate.sharedInstance();
		return datamate.area(_key);
	}

	//-------------------------------------------------------------------//
    // Internal data cursor position controls //
    //-------------------------------------------------------------------//
	/**
	 * Move focus position to origin (x:0, y:0).
	 */
    static origin()
    {
		const datamate = Datamate.sharedInstance();
        datamate.origin();
    }

	/**
	 * Move focus position to given position (x:0, y:0).
	 * @param {Number} _x x position that means the index of column.
	 * @param {Number} _y y position that means the index of column.
	 */
	static move(_x, _y)
	{
		const datamate = Datamate.sharedInstance();
        datamate.move(_x, _y);
	}

	/**
	 * Move focus of column index to right direction.
	 * @param {Number} _steps amount of move to. Default is 1.
	 */
    static right(_steps=1)
    {
		const datamate = Datamate.sharedInstance();
		datamate.right(_steps);
    }

	/**
	 * Move focus of column index to left direction.
	 * @param {Number} _steps amount of move to. Default is 1.
	 */
	static left(_steps=1)
    {
		const datamate = Datamate.sharedInstance();
        datamate.left(_steps);
    }

	/**
	 * Move focus of row index to up direction.
	 * @param {Number} _steps amount of move to. Default is 1.
	 */
    static up(_steps=1)
    {
		const datamate = Datamate.sharedInstance();
		datamate.up(_steps);
    }

	/**
	 * Move focus of row index to down direction.
	 * @param {Number} _steps amount of move to. Default is 1.
	 */
    static down(_steps=1)
    {
		const datamate = Datamate.sharedInstance();
        datamate.down(_steps);
    }

	/**
	 * Return current focus x position that means the index of column.
	 * @param {Number} _offset The offset index from current focus position. Default is 0.
	 * @param {Number} _lerp If it's true, return interpolated value if the current index is float value. Default is false. 
	 * @return {Number} Return current focus x position. If the lerp is true, the value will be interpolated. 
	 */
    static focusX(_offset=0, _lerp=false)
    {
		const datamate = Datamate.sharedInstance();
        return datamate.focusX(_offset, _lerp);
    }

	/**
	 * Return current focus x position that means the index of column.
	 * @param {Number} _offset The offset index from current focus position. Default is 0.
	 * @param {Number} _lerp If it's true, return interpolated value if the current index is float value. Default is false. 
	 * @return {Number} Return current focus x position. If the lerp is true, the value will be interpolated. 
	 */
    static focusY(_offset=0, _lerp=false)
    {
		const datamate = Datamate.sharedInstance();
		return datamate.focusY(_offset, _lerp);
    }

	//-------------------------------------------------------------------------//
	// Internal cursor animation controls
	//-------------------------------------------------------------------------//
	/**
	 * Start cursor animation on the table with given play rate.
	 * _rateX or _rateY can be set values as seconds per moving 1 index.
	 * 1.0 means change the cursor position from current index to the next index by taking 1 seconds.
	 * 0.5 means change them by taking 0.5 seconds
	 * It will be used x (change column index) or y (change row index) direction only.
	 * @param {Number} _rateX The play rate of x direction movement. Default is 1.0.
	 * @param {Number} _rateY The play rate of x direction movement. Default is 0.0. 
	 */
	static play(_rateX=1.0, _rateY=0.0)
	{
		const datamate = Datamate.sharedInstance();
		datamate.play(_rateX, _rateY);
	}

	/**
	 * Stop cursor animation.
	 */
	static stop()
	{
		const datamate = Datamate.sharedInstance();
		datamate.stop();
	}

	/**
	 * Animation loop setting.
	 * @param {Boolean} _loopX The x direction animation will be loop when it is true.
	 * @param {Boolean} _loopY The y direction animation will be loop when it is true.
	 */
	static loop(_loopX=false, _loopY=false)
	{
		const datamate = Datamate.sharedInstance();
		datamate.loop(_loopX, _loopY);
	}
	
	//-------------------------------------------------------------------------//
	// Node controls
	//-------------------------------------------------------------------------//
	/**
	 * Make new nodes.
	 * @param {Number} _count the count of nodes to be made.
	 */
	static makeNodes(_count)
	{
		const datamate = Datamate.sharedInstance();
		datamate.makeNodes(_count);
	}

	/**
	 * Make new nodes.
	 * @param {Number} _count the count of nodes to be made.
	 */
	static bindNodes(_columnNames)
	{

	}

	static layoutNodes(_type)
	{
		switch (_type) {
			case 'grid': break;
			case 'circle': break;
			case 'random': break;
		}
	}

	/**
	 * Return node at index.
	 * @param {String|Number} _columnName column name .
	 * @param {Array} _rowName row name.
	 * @return {DatamateNode} a node of given column-row position. If the column-row does not exist, return null.
	 */
	static node(_index)
	{
		const datamate = Datamate.sharedInstance();
		return datamate.node(_index);
	}

	//-------------------------------------------------------------------------//
	// Instance constructor
	//-------------------------------------------------------------------------//
	constructor()
	{
		// Show version in console //
		console.log("Datamate.js: version:", Datamate.version);

		// Prepare file loader for loading files. //
		this.fileLoader = new DatamateFileLoader();

		// ver1.1.1, storing common block property //
		this.rootArea = new DatamateArea();
		this.areas = new Object();	// ver1.1.5, make default areas.

		// Prepare table for storing loaded data as table. //
		this.table = new DatamateTable();

		// Availble //
		this.isAvailable = false;

		// Default plotter range //
		this.plotterRange = [0, 100];

		// ver1.1.1, title //
		this.title = "Datamate.";

		// Default Panel //
		this.panel = new DatamatePanel();
		this.panel.fileSelectionCallback = this.fileSelectionCallback.bind(this);
		this.panel.transposeSelectionCallback = this.transposeSelectionCallback.bind(this);

		// Default, we can open the panel by Shift + P //
		this.keyControlEnabled = true;

		window.addEventListener("keydown", function(_e) {
            if (!this.keyControlEnabled)
                return;
			if (_e.keyCode==80 && _e.shiftKey) 
				(this.panel.isVisible) ? this.hidePanel() : this.showPanel();

        	// ver1.2.5, cursor control interaction //
            let steps = 1;
            if (_e.shiftKey)
                steps = 0.1;
            if (_e.key=="ArrowRight") 
                this.table.cursor.right(steps);
            if (_e.key=="ArrowLeft") 
                this.table.cursor.left(steps);
            if (_e.key=="ArrowUp") 
                this.table.cursor.up(steps);
            if (_e.key=="ArrowDown") 
                this.table.cursor.down(steps);
            if (_e.key==" ") 
                this.table.cursor.toggle();

		}.bind(this));

        // // ver1.2.5, cursor control interaction //
        // this.keyControlEnabled = true;
		// window.addEventListener("keyup", function(_e) {
        //     if (!this.keyControlEnabled)
        //         return;
        //     let steps = 1;
        //     if (_e.shiftKey)
        //         steps = 0.1;
        //     if (_e.key=="ArrowRight") 
        //         this.table.cursor.right(steps);
        //     if (_e.key=="ArrowLeft") 
        //         this.table.cursor.left(steps);
        //     if (_e.key=="ArrowUp") 
        //         this.table.cursor.up(steps);
        //     if (_e.key=="ArrowDown") 
        //         this.table.cursor.down(steps);
        //     if (_e.key==" ") 
        //         this.table.cursor.toggle();
		// }.bind(this));
	}

	//-------------------------------------------------------------------------//
	// Table controls
	//-------------------------------------------------------------------------//
	setData(_arg0, _arg1=null) 
	{
		// Shape as single values array including header. //
		let values = (Array.isArray(_arg0)) ? _arg0 : [_arg0];
		if (Array.isArray(_arg1))
			values = values.concat(_arg1);

		// Extract the first value and check the value is .csv path or not. //
		const strings = values[0].split(".");
		const lastIndex = strings.length - 1;

		// If the first value is a path of .csv, try to load. If not so, make a new row. //
		(strings[lastIndex]=="csv") ? this.load(false, values) : this.table.addRowValues(values);
	}

	setTitles(_arg0, _arg1=null)
	{
		// Shape as single values array including header. //
		let values = (Array.isArray(_arg0)) ? _arg0 : [_arg0];
		if (Array.isArray(_arg1))
			values = values.concat(_arg1);
		
		// Set values as header row. //
		this.table.setHeaderNames(values);
	}

	setHeaderEnables(_headerRowEnabled=true, _headerColumnEnabled=true) {
		this.table.setHeaderEnables(_headerRowEnabled, _headerColumnEnabled);
	}

	transpose()
	{
		this.table.transpose();
	}

	transposeSelectionCallback()
	{
		this.table.transpose();
		this.showPanel();
	}

	//-------------------------------------------------------------------------//
	// Loading files controls
	//-------------------------------------------------------------------------//
	set loadCompleteCallback(_callback)
	{
		this.fileLoader.callback = _callback;
	}

	addFile(_filePath)
	{
		this.fileLoader.addFilePath(_filePath);
	}

	addFiles(_filePaths)
	{
		for (let i=0; i<_filePaths.length; i++)
			this.fileLoader.addFilePath(_filePaths[i]);
	}

	async load(_isAsync=true, _filePaths=null)
	{
		// If _filePath is string, add the filepath //
		if (typeof(_filePaths)==="string" || _filePaths instanceof String)
			this.addFile(_filePaths);

		// If _filePath is Array, add the filepaths //
		if (Array.isArray(_filePaths))
			this.addFiles(_filePaths);

		// If file loader count is 0, return with nothing. //
		if (this.fileLoader.count()==0)
			return;

		// Start load as asynchronous or synchronous. //
		if (_isAsync) 
			await this.fileLoader.load() 
		else 
			this.fileLoader.loadSync();

		// Merge all tables into a single table //
		this.table.clear();		// Clear he default table. the header state is remained.
		for (let i=0; i<this.fileLoader.dataset.length; i++) {
			const dataset = this.fileLoader.dataset[i];										// Extract CSV text
			const subtable = new DatamateTable();											// Make sub table for CSV
			subtable.setHeaderEnables(this.table.headerRowEnabled, this.table.headerColumnEnabled);
			subtable.parseCSV(dataset);														// Parse the CSV text.
			this.table.merge(subtable);														// Merge table.
		}

		// Set isAvailable for using data //
		this.isAvailable = true;

		// Update built-in plotter. //
		this.panel.clearAll();
		if (this.panel.isLoaded)
			this.panel.updateTable(this.table);

		// Call callback //
		if (this.callback)
			this.callback();
	}

	fileSelectionCallback(_filePaths)
	{
		this.fileLoader.clear();
		for (let i=0; i<_filePaths.length; i++)
			this.fileLoader.addFilePath(_filePaths[i]);
		this.load(false);
	}

	//-------------------------------------------------------------------------//
	// Area controls
	//-------------------------------------------------------------------------//
	makeAreas(_x, _y, _width, _height, _xArea=1, _yArea=1)
	{
		this.rootArea = new DatamateArea(_x, _y, _width, _height, _xArea, _yArea);

		// ver1.1.5, make all blocks in advance. //
		this.isBoundArea = false;
		this.areas = new Object();
		let areaTotal = _xArea * _yArea;

		for (let i=0; i<areaTotal; i++) {
			let xIndex = Math.floor(i % _xArea);
			let yIndex = Math.floor(i / _xArea);
			const area = this.rootArea.block(xIndex, yIndex, i);
			this.areas[i] = area;
		}
	}

	// bindAreas(_columnNames)
	// {
	// 	let blockIndex = 0;
	// 	for (let i=0; i<_columnNames.length; i++) {
	// 		let columnName = _columnNames[i];
	// 		let column = this.table.getColumn(columnName);
	// 		if (column===null)
	// 			column = this.table.getColumnAtIndex(columnName);
	// 		if (column===null)
	// 			continue;
	//
	// 		//console.log('bindAreas', column, this.rootArea);
	// 		const xBlockIndex = Math.floor(blockIndex % this.rootArea.xBlocks);
	// 		const yBlockIndex = Math.floor(blockIndex / this.rootArea.xBlocks);
	// 		const area = this.rootArea.block(xBlockIndex, yBlockIndex);
	// 		column.setArea(area);
	// 		blockIndex++;
	// 	}
	// 	this.isBoundArea = true;
	// }

	bindAreas(_indexes)
	{
		this.areas = new Object();
		for (let i=0; i<_indexes.length; i++) {
			const index = _indexes[i];
			const xBlockIndex = Math.floor(i % this.rootArea.xBlocks);
			const yBlockIndex = Math.floor(i / this.rootArea.xBlocks);
			const area = this.rootArea.block(xBlockIndex, yBlockIndex, index);
			this.areas[index] = area;
		}
	}

	area(_key)
	{
		// ver1.1.5, if isBinded is false, return area at given index. //
		// if (!this.isBoundArea && !isNaN(Number(_columnName)))
		// 	return (_columnName >= 0 && _columnName < this.areas.length) ? this.areas[_columnName] : null;
		//
		// let column = this.table.getColumn(_columnName);
		// if (column===null && !isNaN(Number(_columnName)))
		// 	column = this.table.getColumnAtIndex(Number(_columnName));
		// return (column!==null) ? column.area : null;
		return this.areas[_key];
	}

	//-------------------------------------------------------------------------//
	// UI controls
	//-------------------------------------------------------------------------//
	openPanel()
	{
		this.panel.min = this.plotterRange[0];
		this.panel.max = this.plotterRange[1];
		this.panel.scale = 1;
		this.panel.load();
	}

	closePanel()
	{
		this.panel.unload();
	}

	showPanel()
	{
		this.panel.clearAll();
		if (this.table)
			this.panel.updateTable(this.table);
		this.panel.show();
	}

	hidePanel()
	{
		this.panel.hide();
	}

	foreground(_value)
	{
		this.panel.styles["color"] = _value;
	}

	background(_value)
	{
		this.panel.styles["background"] = _value;
	}

	graphColors(_colors)
	{
		this.panel.graphColors = _colors;
	}

	range(_min, _max)
	{
		this.panel.min = _min;
		this.panel.max = _max;
	}

	scalable(_min, _max)
	{
		this.panel.scalableMin = _min;
		this.panel.scalableMax = _max;
	}

	//-------------------------------------------------------------------//
    // Internal data cursor position controls //
    //-------------------------------------------------------------------//
    reset()
    {
        this.table.reset();
    }

	move(_x, _y)
	{
		this.table.move(_x, _y);
	}

    right(_steps=1)
    {
		this.table.right(_steps);
    }

    left(_steps=1)
    {
        this.table.left(_steps);
    }

    up(_steps=1)
    {
		this.table.up(_steps);
    }

    down(_steps=1)
    {
        this.table.down(_steps);
    }

    focusX(_offset=0, _lerp=false)
    {
        return this.table.focusX(_offset, _lerp);
    }

    focusY(_offset=0, _lerp=false)
    {
		return this.table.focusY(_offset, _lerp);
    }

	//-------------------------------------------------------------------------//
	// Transition controls
	//-------------------------------------------------------------------------//
	play(_rateX=1.0, _rateY=0.0)
	{
		this.table.play(_rateX, _rateY);
	}

	stop()
	{
		this.table.stop();
	}

	loop(_loopX=false, _loopY=false)
	{
		this.table.cursor.transitionX.loopEnabled = _loopX;
		this.table.cursor.transitionY.loopEnabled = _loopY;
	}

	current(_key, _tmin=0, _tmax=0, _interpolation=false)
	{
		return this.transition.current(_key, _tmin, _tmax, _interpolation);
	}

	currentIndex()
	{
		return this.transition.currentIndex();
	}

	//-------------------------------------------------------------------------//
	// Data controls
	//-------------------------------------------------------------------------//
	map(_value, _tmin, _tmax, _columnHeader=null)
	{
		const column = this.table.getColumn(_columnHeader);
		const min = (column!==null) ? column.min : this.min;
		const max = (column!==null) ? column.max : this.max;
		return DatamateMapper.map(_value, min, max, _tmin, _tmax);
	}

	get min()
	{
		return this.table.min;
	}

	get max()
	{
		return this.table.max;
	}

	get length()
	{
		return this.table.rowCount();
	}

	column(_name)
	{
		return this.table.column(_name);
	}

	columnNameAtIndex(_index)
	{
		return this.table.columnDataHeaderNameAtIndex(_index);
	}

	columnCount()
	{
		return this.table.columnDataCount();
	}

	row(_name)
	{
		return this.table.row(_name);
	}

	rowNameAtIndex(_index)
	{
		return this.table.rowDataHeaderNameAtIndex(_index);
	}

	rowCount()
	{
		return this.table.rowDataCount();
	}

	headerEnables(_columnHeaderEnabled=true, _rowHeaderEnabled=true)
	{
		if (this.table==null)
			this.table = new DatamateTable();
		this.table.setHeaderEnabled(_columnHeaderEnabled, _rowHeaderEnabled);	
	}

	addRowValues(_values)
	{
		if (this.table==null)
			this.table = new DatamateTable(true, true);
		this.table.addRowValues(_values);
	}

	setValues(_columnName, _values)
	{
		if (this.table==null)
			this.table = new DatamateTable(true, false);
		this.table.setValues(_columnName, _values);
	}

	getData(_rowKey, _colKey)
	{
		// Extract index. If given name is string, try to get the index of the name. If not, try to parse int. //
		const rowIndex = (typeof(_rowKey)=="string") ? this.table.indexOfDataRowName(_rowKey) : parseInt(_rowKey);
		const colIndex = (typeof(_colKey)=="string") ? this.table.indexOfDataColumnName(_colKey) : parseInt(_colKey);

		// If the indexes are not integer, return with undegined. //
		if (isNaN(rowIndex) || isNaN(colIndex))
			return null;

		// Extract the data. //
		return this.table.dataAtDataIndexes(colIndex, rowIndex);
	}

	getValue(_rowKey=null, _colKey=null, _tmin=0, _tmax=0, _target=Datamate.COLUMN)
	{
		const data = this.getData(_rowKey, _colKey);
		if (data==null)
			return undefined;

		// Extract the value and map if the _tmin and _tmax are different. //
		let value = data.value;
		if (_tmin!=_tmax) {
			const smin = (_target==Datamate.COLUMN) ? data.row.min : data.column.min;
			const smax = (_target==Datamate.COLUMN) ? data.row.max : data.column.max;
			value = DatamateMapper.map(value, smin, smax, _tmin, _tmax);
		}
		return value;
	}

	getLerpValue(_rowKey=null, _colKey=null, _tmin=0, _tmax=0, _target=Datamate.COLUMN)
	{
		// Get lerp value //
		let rowIndex = (typeof(_rowKey)=="string") ? this.table.indexOfDataRowName(_rowKey) : parseFloat(_rowKey);
		let colIndex = (typeof(_colKey)=="string") ? this.table.indexOfDataColumnName(_colKey) : parseFloat(_colKey);
		let value = this.table.lerpValueAtDataIndexes(colIndex, rowIndex);

		// Map if it's needed. //
		if (_tmin!=_tmax) {
			const data = this.getData(_rowKey, _colKey);
			if (data==null)
				return value;
			const smin = (_target==Datamate.COLUMN) ? data.row.min : data.column.min;
			const smax = (_target==Datamate.COLUMN) ? data.row.max : data.column.max;
			value = DatamateMapper.map(value, smin, smax, _tmin, _tmax);
		}
		return value;
	}


	getRate(_rowName, _columnName, _tmin=0, _tmax=1, _type=Datamate.ROW)
	{
		const data = this.getData(_columnName, _rowName);
		if (data===null)
			return undefined;

		let value = (_type==Datamate.COLUMN) ? data.value / data.row.sum : data.value / data.column.sum;
		// console.log(data.value, data.column.sum);
		if (_tmin!=_tmax)
			value = DatamateMapper.map(value, 0, 1, _tmin, _tmax);
		return value;
	}

	transpose()
	{
		this.table.transpose();
	}

	//-------------------------------------------------------------------------//
	// Node controls
	//-------------------------------------------------------------------------//
	makeNodes(_count)
	{
		this.nodes = [];
		for (let i=0; i<_count; i++)
			this.nodes.push(new DatamateNode());
	}

	node(_index)
	{
		return (_index < this.nodes.length) ? this.nodes[_index] : null;
	}

	width(_columnName)
	{
		const column = this.table.getColumn(_columnName);
		return column.area().width;
	}

	height(_columnName)
	{
		const column = this.table.getColumn(_columnName);
		return column.area().height;
	}

	center(_columnName)
	{
		const column = this.table.getColumn(_columnName);
		const area = column.area();
		const x = DatamateMapper.map(0.5, 0, 1, area.x, area.x + area.width);
		const y = DatamateMapper.map(0.5, 0, 1, area.y, area.y + area.height);
		return {x: x, y: y};
	}

	getNode(_columnName=null, _rowName=null)
	{
		return this.table.getNode(_columnName, _rowName);
	}
}

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
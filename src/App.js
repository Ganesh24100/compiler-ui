import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
 import Axios from 'axios';
//  import Select from 'react-select';
import {ImSpinner7} from 'react-icons/im';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HowToUse from './Components/HoeToUse';
import axios from 'axios';
function App() {

	
let code=''

	// let code="#include<stdio.h>\r\n\r\n#include<assert.h>\r\nint isArrSorted(int arr[], int size)\r\n{\r\n\r\n    int i = 1, flag = 0;\r\n    \r\n    while((arr[i-1] < arr[i]) && (i < size-1)) {\r\n        i = i + 1;\r\n    }\r\n\r\n    if(i+1 == size){\r\n        flag = 1;\r\n    }\r\n    else {\r\n        flag = 0;\r\n    }\r\n    \r\n    return flag;\r\n}\r\n void test()\n{\n\tint arr1[] = {8 ,14, 17, 25, 32, 6};\n\tassert(isArrSorted(arr1, 6) == 0);\n\tint arr2[] = {12, 7, 13, 14};\n\tassert(isArrSorted(arr2, 4) == 0);\n\tint arr3[] = {8, 14, 17, 25, 32, 40};\n\tassert(isArrSorted(arr3, 6) == 1);\n\n}\nvoid main()\n{\n\ttest();\n}"
	// let code ="#include<stdio.h>\r\n\r\n void main()\r\n {\nprintf('hello');\n}"
	const [userCode, setUserCode] = useState('');

 const [userLang, setUserLang] = useState("c");

 const [userTheme, setUserTheme] = useState("vs-dark");

 const [fontSize, setFontSize] = useState(20);

 const [userInput, setUserInput] = useState("");

 const [userOutput, setUserOutput] = useState("");
 
const [loading, setLoading] = useState(false);
const [loadingE, setLoadingE] = useState(true);
const options = {
	fontSize: fontSize,
	readOnly:false
}

// Axios.get('http://localhost:8090/api/code?exercise=CBEG7').then(res=>{
// 			setUserCode(res.data)
// 			code=res.data
// 			console.log(userCode)
// 			setLoadingE(false)

// 			// console.log(userCode)
// 		})
let EditorWindow=useMemo(()=>{
	Axios.get('http://localhost:8090/api/code?exercise=CBEG7').then(res=>{
		setUserCode(res.data)
		code=res.data
		console.log(userCode)})
		setLoadingE(false)
	
	return <Editor
	options={options}
	height="calc(100vh - 300px)"
	width="100%"
	theme={userTheme}
	language={userLang}
	defaultLanguage="python"
	defaultValue={userCode}
	onChange={(value) => { setUserCode(value) }}
/>
},[])
// useEffect(()=>{

// 	Axios.get('https://hammerhead-app-ntdmr.ondigitalocean.app/api/code?exercise=CBEG7').then(res=>{
// 		setUserCode(res.data)
// 		console.log(userCode)
// 		setLoadingE(false)
// 	})
// },[])



 function compile() {
	setLoading(true);
	if (userCode === ``) {
	return
	}
	// let assertCode=''
	// Axios.get('http://localhost:8090/api/asserts?exercise=CBEG3').then(res=>{
	// 	assertCode=res.data.assertCode
	// 	console.log(assertCode)

	// })
 

//  console.log(code.concat(assertCode))



 	// Axios.post(`http://localhost:8080/compile`, {
 	Axios.post(`http://137.184.24.208:3000/compile`, {
Code: userCode,
	language: userLang,
	input: userInput }).then((res) => {
		if(res.data.status===406)
		{
			setUserOutput(res.data.error)
		}
		else if(res.data.status===400)
		{
			setUserOutput(res.data.error)
		}
		else if(res.data.status===417)
		{
			setUserOutput(res.data.output)
		}
		else{

			setUserOutput(res.data.output);
		}
  console.log(res.data)
	}).then(() => {
	setLoading(false);
	})
} 

 function clearOutput() {
	setUserOutput("");
}



let languages=['c','python3','javascript','java']
return (
	<div className="App">
		{/* <HowToUse/> */}

	<div className="main">
		<div className="left-container"> 
    <Select options={languages} sx={{width:"300px"}} onChange={(e)=>{setUserLang(e.target.value);console.log(userLang)}}>
		{languages.map((value)=>(
			<MenuItem value={value} >{value}</MenuItem>
		))}
	</Select>
	 {loadingE ?<div>Loading....</div>:<Editor
	options={options}
	height="calc(100vh - 300px)"
	width="100%"
	theme={userTheme}
	language={userLang}
	defaultLanguage="python"
	defaultValue={userCode}
	onChange={(value) => { setUserCode(value) }}
/>}	
{/* {EditorWindow} */}
	<button className="run-btn" onClick={() => compile()}>
			Run
		</button>
		</div>
		<div className="right-container">
		<h4>Input:</h4>
		<div className="input-box">
			<textarea id="code-inp" onChange=
			{(e) => setUserInput(e.target.value)}>
			</textarea>
		</div>
		<h4>Output:</h4>
		{loading ? (
			<div className="spinner-box">
        <ImSpinner7/>
			{/* {/* <img src={ImSpinner7} alt="Loading..." /> */}
			</div>
		) : (
			<div className="output-box">
			<pre>{userOutput}</pre>
			<button onClick={() => { clearOutput() }}
				className="clear-btn">
				Clear
			</button>
			</div>
		)}
		</div>
	</div>
	</div> 
);
}

export default App;

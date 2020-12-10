import React, {useState} from "react";
import './App.css';

const dataNum = [
  {
    key : 0,
    stringNum: "0",
    id: "zero",
  },
  {
    key : 1,
    stringNum: "1",
    id: "one",
  },
  {
    key : 2,
    stringNum: "2",
    id: "two",
  },
  {
    key : 3,
    stringNum: "3",
    id: "three",
  },
  {
    key : 4,
    stringNum: "4",
    id: "four",
  },
  {
    key : 5,
    stringNum: "5",
    id: "five",
  },
  {
    key : 6,
    stringNum: "6",
    id: "six",
  },
  {
    key : 7,
    stringNum: "7",
    id: "seven",
  },
  {
    key : 8,
    stringNum: "8",
    id: "eight",
  },
  {
    key : 9,
    stringNum: "9",
    id: "nine",
  },
]



const JsCalculator = () => {

  const [display, setDisplay] = useState("0")

  const displayNum = (value) => {
    return setDisplay(display === "0" ? value : display + value)
  }

  const addNum = (item) => {
    displayNum(item.stringOp)
  }

  const substractNum = (item) => {
    displayNum()
  }

  const multiplyNum = (item) => {
    displayNum()
  }

  const divideNum = (item) => {
    displayNum()
  }

  const calculate = () => {
    const arr = display.split(/[0-9]/g)
    console.log(arr)
  }


  const dataOperators = [
    {
      stringOp: "+",
      id: "add",
      function: addNum
    },
    {
      stringOp: "-",
      id: "substract",
      function: substractNum
    },
    {
      stringOp: "x",
      id: "multiply",
      function: multiplyNum
    },
    {
      stringOp: "/",
      id: "divide",
      function: divideNum
    },
  ]


  return (
    <div id="container">

      <div id="display">{display}</div>

      <div id="numbers">
        {dataNum.map(item => (
          <button onClick={() => displayNum(item.stringNum)} class="number" id={item.id}>{item.key}</button>
        ))}
        <button id="decimal">.</button>
        <button onClick={() => setDisplay("0")} id="clear">C</button>
      </div>

      <div id="operators">
        {dataOperators.map(item => (
          <button onClick={() => {item.function(item)}} id={item.id}>{item.stringOp}</button>
        ))}
      </div>

      <button onClick={() => calculate()} id="equals">=</button>

    </div>
    
  )
}

export default JsCalculator;

import React, {useState, useRef} from "react";
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

  const dataOperators = [
    {
      stringOp: "+",
      id: "add",
    },
    {
      stringOp: "-",
      id: "subtract",
    },
    {
      stringOp: "*",
      id: "multiply",
    },
    {
      stringOp: "/",
      id: "divide",
    },
  ]

  const [display, setDisplay] = useState("0")
  const operands = useRef([])
  const operators = useRef([])
  const lastOperand = useRef("0")
  const lastOperator = useRef()
  const [forceRefresh, setForceRefresh] = useState(false)

  const reset = () => {
    operands.current = []
    lastOperand.current = "0"
    operators.current = []
    lastOperator.current = null
    setDisplay("0")
    setForceRefresh(!forceRefresh)
  }

  const calculate = () => {
    operands.current.push(lastOperand.current)

    const nums = operands.current
    const ops = operators.current

    let sum = parseFloat(nums[0])

    for (let i = 0 ; i < nums.length ; i++){
      let operator = (ops[i]) ? ops[i].substring(ops[i].length-1) : ""

      switch (operator){
        case "+":
          sum += parseFloat(nums[i+1])
          break;
        case "-":
          sum -= parseFloat(nums[i+1])
          break;
        case "*":
          sum *= parseFloat(nums[i+1])
          break;
        case "/":
          sum /= parseFloat(nums[i+1])
          break;
        default:
          break
      }
    }
    reset()
    lastOperand.current = sum
    setDisplay(sum)
  }

  const createDisplay = () => {
    let display = ""
    operands.current.forEach((item, index) => {
      display += `${item} ${operators.current[index]} `
    })
    return display
  }

  const handleOperand = (value) => {
    if (value === 0 && lastOperand.current === "0") return
    if (value === "-" && lastOperand.current === "-") return
    if (value === "." && lastOperand.current.includes(".")) return

    if(lastOperator.current === "-"){
      const index = operators.current.length - 1
      const operator = operators.current[index].replaceAll(" ", "")
      if (operator.length > 1 && operator[operator.lentgth - 2] === "-"){
        value = `-${value}`
        operators.current[index] = operator.current[index].substring(0, operator.length)
      }
    }

    lastOperator.current = null
    lastOperand.current = (lastOperand.current === "0") ? value.toString() : lastOperand.current + value.toString()
    setDisplay(lastOperand.current)
  }

  const handleOperator = (value) => {
    if (value === "C"){
      return reset()
    }
    if(lastOperand === 0){
      return
    }
    // if (value === "-"){
    //   if(lastOperand.current === "0" || lastOperator.current === value){
    //     return handleOperand("-")
    //   }
    //   if (lastOperand.current === value){
    //     return
    //   }
    // }

    lastOperator.current = value
    
    if (value === "."){
      return handleOperand(value)
    }

    if (lastOperand.current !== "0"){
      operands.current.push(lastOperand.current)
    }
    lastOperand.current = "0"
    
    const operandIndex = operands.current.length - 1
    operators.current[operandIndex] = (operators.current[operandIndex]) 
      ? operators.current[operandIndex] + " " + value 
      : value

    setDisplay("")
    setForceRefresh(!forceRefresh)
  }

  const onClickButton = (value) => {
    if (typeof(value) === "number"){
      return handleOperand(value)
    } else {
      return handleOperator(value)
    }
  }

  return (
    <div id="container">

      <div id="display">{createDisplay()}{display}</div>

      <div id="numbers">
        {dataNum.map(item => (
          <button onClick={() => onClickButton(item.key)} class="number" id={item.id}>{item.key}</button>
        ))}
        <button onClick={() => onClickButton(".")} id="decimal">.</button>
        <button onClick={() => onClickButton("C")} id="clear">C</button>
      </div>

      <div id="operators">
        {dataOperators.map(item => (
          <button onClick={() => onClickButton(item.stringOp)} id={item.id}>{item.stringOp}</button>
        ))}
      </div>

      <button onClick={() => calculate()} id="equals">=</button>

    </div>
    
  )
}

export default JsCalculator;

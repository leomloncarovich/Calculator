import React from 'react';
import { useState } from 'react';

const Calculator = () => {
  const [isOn, setIsOn] = useState(false);
  const [currentValue, setCurrentValue] = useState('0');
  const [pendingOperation, setPendingOperation] = useState(null);
  const [pendingValue, setPendingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState('');

  const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const operations = ['+', '-', '×', '÷'];

  const togglePower = () => {
    setIsOn(!isOn);
    handleClear();
  }

  const handleClick = (value) => {
    if (!isOn) return;
    setCurrentValue((prevValue) => {
      if (value === '.' && prevValue.includes('.')) {
        return prevValue;
      }
      if (prevValue === '0' && value !== '.') {
        return value;
      } else {
        return prevValue + value;
      }
    });
    setCompleteOperation((prevOperation) => prevOperation + value);
  };

  const handleOperation = (operation) => {
    if (!isOn) return;
    if (pendingOperation) {
      handleCalculate();
    }
    setPendingOperation(operation);
    setPendingValue(currentValue);
    setCompleteOperation(currentValue + ' ' + operation);
    setCurrentValue('0');
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPendingValue(null);
    setPendingOperation(null);
    setCompleteOperation('');
  };

  const handleBackspace = () => {
    if (!isOn) return;
    setCurrentValue((prevValue) =>
      prevValue.length > 1 ? prevValue.slice(0, -1) : '0'
    );
    setCompleteOperation((prevOperation) =>
      prevOperation.length > 1 ? prevOperation.slice(0, -1) : ''
    );
  };

  const handleCalculate = () => {
    if (!isOn || !pendingOperation || !pendingValue) {
      return;
    }
    const num1 = parseFloat(pendingValue);
    const num2 = parseFloat(currentValue);

    let result;

    switch (pendingOperation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        if(num2 !== 0) {
          result = num1 / num2;
        } else {
          setCurrentValue("Error");
          setCompleteOperation("Error");
          setPendingOperation(null);
          setPendingValue(null);
          return;
        }
        break;

      default:
        break;
    }
    setCompleteOperation(
      `${pendingValue} ${pendingOperation} ${currentValue} = ${result}`
    );
    setCurrentValue(result.toString());
    setPendingValue(null);
    setPendingOperation(null);
  };

  return (
    <main className='border-2 border-solid border-black p-6 bg-black/15'>
      <div className="flex flex-col items-center justify-center w-50 m-auto">
        <div className={`w-full min-h-14 border border-black border-solid mb-2.5 text-right py-4 pr-1 text-sm overflow-auto ${isOn ? 'bg-green-500/10' : 'bg-black/50'}`}>{isOn ? completeOperation : ''}</div>
        <div className={`w-full h-14 border border-black border-solid mb-2.5 text-right py-4 pr-1 ${isOn ? 'bg-green-500/10' : 'bg-black/50'}`}>{isOn ? currentValue : 'OFF'}</div>
        <div className="grid grid-cols-4 gap-2.5">
        <button className={`py-2 text-white font-bold rounded col-span-2 ${isOn ? 'bg-green-500' : 'bg-red-500'}`} onClick={togglePower}>On/Off</button>
          <button className='bg-red-500 text-white text-base font-bold px-4 rounded' onClick={handleClear} disabled={!isOn}>AC</button>
          <button className='bg-yellow-500 text-base text-white font-black align-middle rounded' onClick={handleBackspace} disabled={!isOn}>C</button>       
          {operations.map((operation) => (
            <button className='text-base bg-slate-500 text-white font-bold py-2 px-4 rounded' key={operation} onClick={() => handleOperation(operation)} disabled={!isOn}>
              {operation}
            </button>
          ))}
          {keypadNumbers.map((num) => (
            <button className='text-base font-bold py-2 px-4 rounded' key={num} onClick={() => handleClick(num)} disabled={!isOn}>
              {num}
            </button>
          ))}
          <button className='bg-green-500 text-base text-white font-bold px-4 rounded' onClick={handleCalculate} disabled={!isOn}>=</button> 
        </div>
      </div>
    </main>
  );
};

export default Calculator;

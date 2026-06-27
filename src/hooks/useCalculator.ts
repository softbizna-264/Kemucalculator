import { evaluate } from 'mathjs';
import { useState } from 'react';

import { CalculatorState } from '../types';

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>({
    expression: '',
    result: '',
    isError: false,
  });

  const updateExpression = (newExp: string) => {
    setState((prev) => {
      let result = prev.result;
      let isError = false;
      
      try {
        if (newExp.trim() === '') {
          result = '';
        } else {
          // A bit of pre-processing could go here if needed
          const evaluated = evaluate(newExp);
          if (typeof evaluated === 'number' || typeof evaluated === 'boolean') {
             // Round to avoid crazy float errors
             result = String(Math.round(Number(evaluated) * 1e10) / 1e10);
          } else {
             result = String(evaluated);
          }
        }
      } catch (e) {
        // Keep the previous result if typing a partial expression
        // e.g. "5 +" is temporarily invalid, but we don't want to show an error immediately
        // Just don't update the result.
        isError = false; 
      }

      return { ...prev, expression: newExp, result, isError };
    });
  };

  const append = (str: string) => {
    updateExpression(state.expression + str);
  };

  const clear = () => {
    setState((prev) => ({ ...prev, expression: '', result: '', isError: false }));
  };

  const backspace = () => {
    updateExpression(state.expression.slice(0, -1));
  };

  const calculate = () => {
    try {
      if (!state.expression) return;
      const evaluated = evaluate(state.expression);
      let finalResult = '';
      if (typeof evaluated === 'number') {
        finalResult = String(Math.round(evaluated * 1e10) / 1e10);
      } else {
        finalResult = String(evaluated);
      }
      setState((prev) => ({
        ...prev,
        expression: finalResult,
        result: '',
        isError: false,
      }));
    } catch (e) {
      setState((prev) => ({ ...prev, isError: true, result: 'Error' }));
    }
  };

  return {
    state,
    append,
    clear,
    backspace,
    calculate,
    setExpression: updateExpression,
  };
}

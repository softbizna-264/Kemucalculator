import { Delete } from "lucide-react";
import { useCalculator } from "../hooks/useCalculator";
import { CalcButton } from "./CalcButton";
import { cn } from "../lib/utils";

export function Calculator() {
  const {
    state,
    append,
    clear,
    backspace,
    calculate,
    setExpression,
  } = useCalculator();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    } else if (e.key === "Backspace") {
      backspace();
    } else if (e.key === "Escape") {
      clear();
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl shadow-2xl border border-slate-800">
      <div className="mb-2 px-2 flex justify-between items-center text-slate-500 text-xs font-semibold tracking-wider">
        <span>KEMU CLOUD</span>
      </div>

      <div className="bg-slate-900 p-4 rounded-2xl mb-4 border border-slate-800 min-h-[120px] flex flex-col justify-end items-end relative overflow-hidden group">
        <input
          type="text"
          value={state.expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-right text-3xl font-light tracking-tight text-slate-100 outline-none placeholder-slate-700"
          placeholder="0"
          spellCheck={false}
        />
        <div
          className={cn(
            "text-right text-lg h-7 mt-1 font-medium tracking-wide transition-colors",
            state.isError ? "text-red-400" : "text-slate-500"
          )}
        >
          {state.result ? `= ${state.result}` : ""}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {/* Row 1 */}
        <CalcButton variant="scientific" onClick={() => append("sin(")}>sin</CalcButton>
        <CalcButton variant="scientific" onClick={() => append("cos(")}>cos</CalcButton>
        <CalcButton variant="scientific" onClick={() => append("tan(")}>tan</CalcButton>
        <CalcButton variant="scientific" onClick={() => append("(")}>(</CalcButton>
        <CalcButton variant="scientific" onClick={() => append(")")}>)</CalcButton>

        {/* Row 2 */}
        <CalcButton variant="scientific" onClick={() => append("sqrt(")}>√</CalcButton>
        <CalcButton variant="scientific" onClick={() => append("^")}>x^y</CalcButton>
        <CalcButton variant="scientific" onClick={() => append("log(")}>log</CalcButton>
        <CalcButton variant="scientific" onClick={() => append("pi")}>π</CalcButton>
        <CalcButton variant="scientific" onClick={() => append("e")}>e</CalcButton>

        {/* Row 3 */}
        <CalcButton variant="action" onClick={clear} className="col-span-2">AC</CalcButton>
        <CalcButton variant="action" onClick={backspace}>
          <Delete className="w-5 h-5" />
        </CalcButton>
        <CalcButton variant="operator" onClick={() => append("%")}>%</CalcButton>
        <CalcButton variant="operator" onClick={() => append("/")}>÷</CalcButton>

        {/* Row 4 */}
        <CalcButton onClick={() => append("7")}>7</CalcButton>
        <CalcButton onClick={() => append("8")}>8</CalcButton>
        <CalcButton onClick={() => append("9")}>9</CalcButton>
        <CalcButton variant="operator" onClick={() => append("*")} className="col-span-2">×</CalcButton>

        {/* Row 5 */}
        <CalcButton onClick={() => append("4")}>4</CalcButton>
        <CalcButton onClick={() => append("5")}>5</CalcButton>
        <CalcButton onClick={() => append("6")}>6</CalcButton>
        <CalcButton variant="operator" onClick={() => append("-")} className="col-span-2">−</CalcButton>

        {/* Row 6 */}
        <CalcButton onClick={() => append("1")}>1</CalcButton>
        <CalcButton onClick={() => append("2")}>2</CalcButton>
        <CalcButton onClick={() => append("3")}>3</CalcButton>
        <CalcButton variant="operator" onClick={() => append("+")} className="col-span-2">+</CalcButton>

        {/* Row 7 */}
        <CalcButton onClick={() => append("0")} className="col-span-2">0</CalcButton>
        <CalcButton onClick={() => append(".")}>.</CalcButton>
        <CalcButton variant="equals" onClick={calculate} className="col-span-2">=</CalcButton>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useCounterGateway } from "./hooks";

const INITIAL_COUNT = 0;

function Counter() {
  // NOTE: entities store unit (counter entity)
  const [count, setCount] = useState(INITIAL_COUNT);

  // NOTE: gateway unit
  const gateway = useCounterGateway();

  // NOTE: presenter unit implemented with constants (null presenter)
  const countValue = count;
  const countStatus =
    count === 0 ? "Zero" : count > 0 ? "Positive" : "Negative";

  // NOTE: controller unit implemented with constants (null controller)
  const onIncrementButtonClick = async () => {
    const remoteCount = await gateway.incrementCount();
    setCount(remoteCount);
  };
  const onDecrementButtonClick = async () => {
    const remoteCount = await gateway.decrementCount();
    setCount(remoteCount);
  };
  const onResetButtonClick = async () => {
    const remoteCount = await gateway.resetCount();
    setCount(remoteCount);
  };
  const onCounterMount = async () => {
    const remoteCount = await gateway.getCount();
    setCount(remoteCount);
  };

  // NOTE: view unit lifecycle hook
  useEffect(() => {
    onCounterMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NOTE: view unit
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-sm w-full">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Counter App</h1>

        {/* Counter Value Display */}
        <div className="bg-gray-50 rounded-xl py-8 mb-8 border-2 border-gray-200">
          <span className="text-6xl font-bold text-indigo-600">
            {countValue}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={onDecrementButtonClick}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white text-2xl font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            -
          </button>

          <button
            onClick={onIncrementButtonClick}
            className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            +
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={onResetButtonClick}
          className="w-full py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Reset to Zero
        </button>

        {/* Simple Info */}
        <p className="text-gray-500 text-sm mt-6">
          Status: <span className={`font-semibold`}>{countStatus}</span>
        </p>
      </div>
    </div>
  );
}

export default Counter;

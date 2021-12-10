import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    countA: 0,
    countB: 0,
  },
  actions: {
    incrementA:
      () =>
      ({ setState, getState }) => {
        setState({
          countA: getState().countA + 1,
        });
      },
    incrementB:
      () =>
      ({ setState, getState }) => {
        setState({
          countB: getState().countB + 1,
        });
      },
  },
  name: "counter",
});

const getCountA = (state) => state.countA;
const useCounterA = createHook(Store, { selector: getCountA });

const getCountB = (state) => state.countB;
const useCounterB = createHook(Store, { selector: getCountB });

const getNull = () => null;
const useActions = createHook(Store, { selector: getNull });

function CounterA() {
  const [counterA, { incrementA, incrementB }] = useCounterA();
  console.log('Render CounterA');
  return (
    <div>
      <div>Counter A : {counterA}</div>
      <button onClick={incrementA}>Increment A</button>
      <button onClick={incrementB}>Increment B</button>
    </div>
  );
}

function CounterB() {
  const [counterB, { incrementA, incrementB }] = useCounterB();
  console.log('Render CounterB');
  return (
    <div>
      <div>Counter B : {counterB}</div>
      <button onClick={incrementA}>Increment A</button>
      <button onClick={incrementB}>Increment B</button>
    </div>
  );
}

function ActionsOnly() {
  const [, { incrementA, incrementB }] = useActions();
  console.log('Render ActionsOnly');
  return (
    <div>
      <button onClick={incrementA}>Increment A</button>
      <button onClick={incrementB}>Increment B</button>
    </div>
  );
}

function App() {
  return <div className="App">
    <CounterA/>
    <CounterB/>
    <ActionsOnly/>
  </div>;
}

export default App;

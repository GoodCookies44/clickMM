import React from "react";
import "./App.css";
import Counter from "../Counter/Counter";

function App() {
  return (
    <div className="App">
      <header>
        <Counter id="counter1" initialValue={0} />
        <Counter id="counter2" initialValue={0} />
        {/* Добавьте сколько угодно экземпляров Counter с разными значениями */}
      </header>
    </div>
  );
}

export default App;

import React from "react";
import Counter from "./components/Counter/Counter";
import "./MKT.css";

function MKT() {
  return (
    <div>
      <Counter id="counter1" initialValue={0} />
      <Counter id="counter2" initialValue={0} />
    </div>
  );
}
export default MKT;

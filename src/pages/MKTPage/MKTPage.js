import React from "react";
import "./MKTPage.css";
import Counter from "../../components/Counter/Counter.js";

function MKTPage() {
  return (
    <div>
      <Counter id="1" initialValue={0} />
      <h1>MKT</h1>
    </div>
  );
}
export default MKTPage;

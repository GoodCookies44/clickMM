import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {CounterContext} from "../Context/CounterContext";
import "./Counter.css";

export default function Counter({id, targetIds, showSum}) {
  const {counters, addCounterId, updateCounterValue} = useContext(CounterContext);
  const [isRotated, setIsRotated] = useState(false);
  const counter = counters.find((counter) => counter.id === id);

  useEffect(() => {
    if (!counter) {
      addCounterId(id);
    }
  }, [id, counter, addCounterId]);

  const [count, setCount] = useState(counter ? counter.value : 0);

  useEffect(() => {
    if (counter) {
      setCount(counter.value);
    }
  }, [counter]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState("");

  const [targetCount, setTargetCount] = useState(0);

  useEffect(() => {
    if (showSum) {
      const sum = targetIds.reduce((acc, targetId) => {
        const targetCounter = counters.find((counter) => counter.id === targetId);
        return acc + (targetCounter ? targetCounter.value : 0);
      }, 0);
      setTargetCount(sum);
      updateCounterValue(id, sum);
    } else {
      setTargetCount(0);
    }
  }, [counters, targetIds, showSum]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCounterValue(id, newCount);

    if (targetIds && targetIds.length > 0) {
      targetIds.forEach((targetId) => {
        const targetCounter = counters.find((counter) => counter.id === targetId);
        if (targetCounter) {
          updateCounterValue(targetId, targetCounter.value + 1);
        }
      });
    }
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount < 0 ? 0 : newCount);
    updateCounterValue(id, newCount < 0 ? 0 : newCount);

    if (targetIds && targetIds.length > 0) {
      targetIds.forEach((targetId) => {
        const targetCounter = counters.find((counter) => counter.id === targetId);
        if (targetCounter && targetCounter.value > 0) {
          updateCounterValue(targetId, targetCounter.value - 1);
        }
      });
    }
  };

  const reset = () => {
    setCount(0);
    updateCounterValue(id, 0);
    setIsRotated(true);
    setTimeout(() => setIsRotated(false), 1000);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditedValue(showSum ? targetCount.toString() : count.toString());
  };

  const handleEditChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleEditBlur = () => {
    setIsEditing(false);
    const newValue = parseInt(editedValue);
    if (!isNaN(newValue)) {
      if (showSum) {
        setTargetCount(newValue);
        targetIds.forEach((targetId) => {
          updateCounterValue(targetId, newValue);
        });
      } else {
        setCount(newValue);
        updateCounterValue(id, newValue);
      }
    }
  };

  return (
    <div className="counter__container">
      <div className="counter_value" onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <input
            type="text"
            value={editedValue}
            onChange={handleEditChange}
            onBlur={handleEditBlur}
            autoFocus
            className="custom-input"
          />
        ) : showSum ? (
          targetCount
        ) : (
          count
        )}
      </div>{" "}
      <div className="button__container">
        <button onClick={increment} className="counter__button">
          {/* Иконка Плюс */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 0C12.6627 0 13.2 0.537258 13.2 1.2V22.8C13.2 23.4627 12.6627 24 12 24C11.3373 24 10.8 23.4627 10.8 22.8V1.2C10.8 0.537258 11.3373 0 12 0Z"
              fill="#F6F6F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0 12C0 11.3373 0.537258 10.8 1.2 10.8H22.8C23.4627 10.8 24 11.3373 24 12C24 12.6627 23.4627 13.2 22.8 13.2H1.2C0.537258 13.2 0 12.6627 0 12Z"
              fill="#F6F6F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button onClick={decrement} className="counter__button">
          {/* Иконка Минус */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="2"
            viewBox="0 0 24 2"
            fill="none"
          >
            <path
              d="M0 1C0 0.447715 0.537258 0 1.2 0L22.8 0C23.4627 0 24 0.447715 24 1C24 1.55228 23.4627 2 22.8 2L1.2 2C0.537258 2 0 1.55228 0 1Z"
              fill="#F6F6F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button onClick={reset} className="counter__button">
          {/* Иконка Сброс */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`reset__button ${isRotated ? "rotate" : ""}`}
          >
            <path
              d="M17.7507 4.04225C15.9264 2.72388 13.7044 2.07237 11.457 2.19685C9.2096 2.32133 7.0732 3.21424 5.40561 4.72603C4.95924 5.13069 4.26934 5.09689 3.86468 4.65052C3.46001 4.20415 3.49382 3.51426 3.94019 3.10959C5.97835 1.26185 8.58951 0.170517 11.3364 0.018374C14.0832 -0.133769 16.7989 0.662515 19.0287 2.27387C21.2584 3.88522 22.8668 6.21378 23.5845 8.86957C24.3021 11.5254 24.0855 14.3471 22.9708 16.8622C21.8561 19.3773 19.9111 21.433 17.4615 22.6851C15.0119 23.9372 12.2064 24.3096 9.51502 23.7399C6.82361 23.1702 4.40965 21.693 2.67745 19.5558C0.945255 17.4186 0 14.751 0 12C0 11.3975 0.488417 10.9091 1.09091 10.9091C1.6934 10.9091 2.18182 11.3975 2.18182 12C2.18182 14.2509 2.95521 16.4334 4.37246 18.182C5.78972 19.9307 7.76477 21.1392 9.96684 21.6053C12.1689 22.0715 14.4643 21.7668 16.4685 20.7424C18.4727 19.7179 20.0641 18.036 20.9761 15.9782C21.8881 13.9204 22.0654 11.6117 21.4782 9.43874C20.891 7.26582 19.5751 5.36063 17.7507 4.04225Z"
              fill="#F6F6F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.36364 0C4.96613 0 5.45455 0.488417 5.45455 1.09091V4.36364C5.45455 4.96613 4.96613 5.45455 4.36364 5.45455C3.76114 5.45455 3.27273 4.96613 3.27273 4.36364V1.09091C3.27273 0.488417 3.76114 0 4.36364 0Z"
              fill="#F6F6F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.27273 4.36364C3.27273 3.76114 3.76114 3.27273 4.36364 3.27273H7.63636C8.23886 3.27273 8.72727 3.76114 8.72727 4.36364C8.72727 4.96613 8.23886 5.45455 7.63636 5.45455H4.36364C3.76114 5.45455 3.27273 4.96613 3.27273 4.36364Z"
              fill="#F6F6F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

Counter.propTypes = {
  id: PropTypes.string.isRequired,
  targetIds: PropTypes.arrayOf(PropTypes.string),
  showSum: PropTypes.bool,
};

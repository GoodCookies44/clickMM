/* eslint-disable */
import React, {createContext, useState, useEffect} from "react";
import PropTypes from "prop-types";

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
  const [isImageCheckEnabled, setImageCheckEnabled] = useState(
    JSON.parse(localStorage.getItem("isImageCheckEnabled")) || false
  );
  const [isSquareImageCheckEnabled, setSquareImageCheckEnabled] = useState(
    JSON.parse(localStorage.getItem("isSquareImageCheckEnabled")) || false
  );
  const [isCheckboxFunctionEnabled, setCheckboxFunctionEnabled] = useState(
    JSON.parse(localStorage.getItem("isCheckboxFunctionEnabled")) || false
  );
  const [isTextCheckEnabled, setTextCheckEnabled] = useState(
    JSON.parse(localStorage.getItem("isTextCheckEnabled")) || false
  );

  useEffect(() => {
    localStorage.setItem("isImageCheckEnabled", JSON.stringify(isImageCheckEnabled));
    chrome.runtime.sendMessage({type: "toggleImageChecking", isEnabled: isImageCheckEnabled});
  }, [isImageCheckEnabled]);

  useEffect(() => {
    localStorage.setItem("isSquareImageCheckEnabled", JSON.stringify(isSquareImageCheckEnabled));
    chrome.runtime.sendMessage({
      type: "toggleSquareImageChecking",
      isEnabled: isSquareImageCheckEnabled,
    });
  }, [isSquareImageCheckEnabled]);

  useEffect(() => {
    localStorage.setItem("isCheckboxFunctionEnabled", JSON.stringify(isCheckboxFunctionEnabled));
    chrome.runtime.sendMessage({
      type: "toggleCheckboxFunction",
      isEnabled: isCheckboxFunctionEnabled,
    });
  }, [isCheckboxFunctionEnabled]);

  useEffect(() => {
    localStorage.setItem("isTextCheckEnabled", JSON.stringify(isTextCheckEnabled));
    chrome.runtime.sendMessage({
      type: "toggleTextCheck",
      isEnabled: isTextCheckEnabled,
    });
  }, [isTextCheckEnabled]);

  return (
    <SettingsContext.Provider
      value={{
        isImageCheckEnabled,
        toggleImageCheck: () => setImageCheckEnabled(!isImageCheckEnabled),
        isSquareImageCheckEnabled,
        toggleSquareImageCheck: () => setSquareImageCheckEnabled(!isSquareImageCheckEnabled),
        isCheckboxFunctionEnabled,
        toggleCheckboxFunction: () => setCheckboxFunctionEnabled(!isCheckboxFunctionEnabled),
        isTextCheckEnabled,
        toggleTextCheck: () => setTextCheckEnabled(!isTextCheckEnabled),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
/* eslint-enable */

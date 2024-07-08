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

  return (
    <SettingsContext.Provider
      value={{
        isImageCheckEnabled,
        toggleImageCheck: () => setImageCheckEnabled(!isImageCheckEnabled),
        isSquareImageCheckEnabled,
        toggleSquareImageCheck: () => setSquareImageCheckEnabled(!isSquareImageCheckEnabled),
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

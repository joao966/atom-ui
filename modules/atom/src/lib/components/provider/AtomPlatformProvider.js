import React, { useEffect, createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import WebFont from "webfontloader";
import theme from "../../theme";
import "../../atom-ui.css";

export const AtomPlatformContext = createContext(null);
export const withAtomPlatform = (Component) => {
  return (props) => {
    const state = useContext(AtomPlatformContext);
    return <Component {...props} {...state} />;
  };
};

export const AtomPlatformProvider = ({ children }) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Source Sans Pro:300,400,600", "sans-serif"],
      },
    });
  }, []);

  return (
    <AtomPlatformContext.Provider value={{ theme: theme }}>
      <AtomPlatformContext.Consumer>
        {(props) => {
          return <ThemeProvider theme={props.theme}>{children}</ThemeProvider>;
        }}
      </AtomPlatformContext.Consumer>
    </AtomPlatformContext.Provider>
  );
};

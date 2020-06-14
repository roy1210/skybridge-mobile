import React, { useState } from "react";
import configureStore from "./store";
import { Provider } from "react-redux";
import { App } from "./src/index";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";

const Root = () => {
  enableScreens();
  const fetchFonts = () => {
    return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
  };
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  const initialState = (window as any).initialReduxState;
  const store = configureStore(initialState);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;

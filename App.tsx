import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
// import { AppLoading } from "expo";
// import * as Font from "expo-font";
import React from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { App } from "./src/index";
import configureStore from "./store";
import { default as theme } from "./src/data/theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { IconRegistry } from "@ui-kitten/components";
import {
  AppearanceProvider,
  Appearance,
  useColorScheme,
} from "react-native-appearance";

const Root = () => {
  enableScreens();
  // const fetchFonts = () => {
  //   return Font.loadAsync({
  //     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  //     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  //   });
  // };
  // const [fontLoaded, setFontLoaded] = useState(false);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontLoaded(true)}
  //     />
  //   );
  // }

  const initialState = (window as any).initialReduxState;
  const store = configureStore(initialState);
  Appearance.getColorScheme();
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <AppearanceProvider>
        {colorScheme === "dark" ? (
          <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <App />
          </ApplicationProvider>
        ) : (
          <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            {/* <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}> */}
            <App />
          </ApplicationProvider>
        )}
      </AppearanceProvider>
    </Provider>
  );
};

export default Root;

// import { AppLoading } from "expo";
// import * as Font from "expo-font";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { App } from "./src";
import { default as theme } from "./src/data/theme.json";
import configureStore from "./store";
import SearchInput from "./src/components/explorer/SearchInput";
const Root = () => {
  enableScreens();

  const initialState = (window as any).initialReduxState;
  const store = configureStore(initialState);
  // Appearance.getColorScheme();
  // const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      {/* <SearchInput /> */}
      {/* <App /> */}
      {/* </PaperProvider> */}
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <App />
        {/* <SearchInput /> */}
        {/* <SwapScreen */}
      </ApplicationProvider>
    </Provider>
  );
};

export default Root;
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

// <IconRegistry icons={EvaIconsPack} />
// <AppearanceProvider>
//   {colorScheme === "dark" ? (
//     <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
//       <App />
//     </ApplicationProvider>
//   ) : (
//     <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
//       {/* <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}> */}
//       <App />
//     </ApplicationProvider>
//   )}
// </AppearanceProvider>

// import { AppLoading } from "expo";
// import * as Font from "expo-font";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { default as theme } from "./src/data/theme.json";
import Navigator from "./src/Navigator";
import configureStore from "./store";
import { rootSaga } from "./src/state/configureStore";

const App = () => {
  enableScreens();

  const initialState = (window as any).initialReduxState;
  const store = configureStore(initialState);
  // @ts-ignore
  store.runSaga(rootSaga);

  const themeMode = { ...eva.dark, ...theme };

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={themeMode}>
        <Navigator />
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
// const fetchFonts = () => {
//   return Font.loadAsync({
//     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
// };
// const [fontLoaded, setFontLoaded] = useState(false);
// Appearance.getColorScheme();
// const colorScheme = useColorScheme();
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

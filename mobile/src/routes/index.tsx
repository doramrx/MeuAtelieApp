import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { DrawerRoutes } from "./DrawerRoutes/index";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Screen name="signIn" component={SignIn} />
        <Screen name="signUp" component={SignUp} />
        <Screen name="homeDrawerRoutes" component={DrawerRoutes} />
      </Navigator>
    </NavigationContainer>
  );
}

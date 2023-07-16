import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabNavigator } from "./TabNavigator";

import { Inaugural } from "../screens/Inaugural";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { TailoredClothService } from "../screens/Order/CreateOrder/TailoredClothService";
import { AdjustService } from "../screens/Order/CreateOrder/AdjustService";
import { OrderDetail } from "../screens/Order/OrderDetail";
import { OrderContextProvider } from "../contexts/OrderContext";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="inaugural"
          component={Inaugural}
        />
        <Screen
          name="signIn"
          component={SignIn}
        />
        <Screen
          name="signUp"
          component={SignUp}
        />
        <Screen
          name="tabNavigatorRoutes"
          component={TabNavigator}
        />
        <Screen name="tailoredClothService">
          {() => {
            return (
              <OrderContextProvider>
                <TailoredClothService />
              </OrderContextProvider>
            );
          }}
        </Screen>
        <Screen name="adjustService">
          {() => {
            return (
              <OrderContextProvider>
                <AdjustService />
              </OrderContextProvider>
            );
          }}
        </Screen>
        <Screen
          name="orderDetail"
          component={OrderDetail}
        />
      </Navigator>
    </NavigationContainer>
  );
}

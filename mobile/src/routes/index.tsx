import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabNavigator } from "./TabNavigator";

import { Inaugural } from "../views/Inaugural";
import { SignIn } from "../views/SignIn";
import { SignUp } from "../views/SignUp";
import { TailoredClothService } from "../views/Order/CreateOrder/TailoredClothService";
import { AdjustService } from "../views/Order/CreateOrder/AdjustService";
import { OrderDetail } from "../views/Order/OrderDetail";
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
        <Screen name="orderDetail">
          {() => {
            return (
              <OrderContextProvider>
                <OrderDetail />
              </OrderContextProvider>
            );
          }}
        </Screen>
      </Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabNavigator } from "./TabNavigator";

import { Inaugural } from "../views/Inaugural";
import { SignIn } from "../views/SignIn";
import { SignUp } from "../views/SignUp";
import { TailoredCloth } from "../views/Order/CreateOrder/TailoredCloth";
import { AdjustOrder } from "../views/Order/CreateOrder/Adjust";
import { OrderDetail } from "../views/Order/OrderDetail";
import { OrderContextProvider } from "../contexts/OrderContext";
import { AuthContextProvider } from "../contexts/AuthContext";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
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
                  <TailoredCloth />
                </OrderContextProvider>
              );
            }}
          </Screen>
          <Screen name="adjustService">
            {() => {
              return (
                <OrderContextProvider>
                  <AdjustOrder />
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
      </AuthContextProvider>
    </NavigationContainer>
  );
}

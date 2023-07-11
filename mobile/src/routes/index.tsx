import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContextProvider } from "../contexts/AuthContext";

import { TabNavigator } from "./TabNavigator";

import { Inaugural } from "../screens/Inaugural";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { Customers } from "../screens/Customers";
import { TailoredClothes } from "../screens/TailoredClothes";
import { RepairOrAdjustment } from "../screens/RepairOrAdjustment";
import { OrderDetail } from "../screens/OrderDetail";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
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
          <Screen
            name="customers"
            component={Customers}
          />
          <Screen
            name="tailoredClothes"
            component={TailoredClothes}
          />
          <Screen
            name="repairOrAdjustment"
            component={RepairOrAdjustment}
          />
          <Screen
            name="orderDetail"
            component={OrderDetail}
          />
        </Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

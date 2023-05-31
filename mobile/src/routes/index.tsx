import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Inaugural } from "../screens/Inaugural";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { Customers } from "../screens/Customers";
import { CustomerDetail } from "../screens/CustomerDetail";
import { TabNavigator } from "./TabNavigator";
import { SuccessScreen } from "../components/shared/SuccessScreen";
import { AuthContextProvider } from "../contexts/AuthContext";
import { TailoredClothes } from "../screens/TailoredClothes";

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
                        name="successScreen"
                        component={SuccessScreen}
                    />
                    <Screen
                        name="customers"
                        component={Customers}
                    />
                    <Screen
                        name="customersDetail"
                        component={CustomerDetail}
                    />
                    <Screen
                        name="tailoredClothes"
                        component={TailoredClothes}
                    />
                </Navigator>
            </NavigationContainer>
        </AuthContextProvider>
    );
}

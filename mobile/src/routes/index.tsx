import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { DrawerRoutes } from "./DrawerRoutes/index";
import { NewDressMaker } from "../screens/NewDressMaker";
import { SuccessScreen } from "../components/shared/SuccessScreen";
import { ShowDressMaker } from "../screens/ShowDressmaker";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Screen
                    name="signIn"
                    component={SignIn}
                />
                <Screen
                    name="signUp"
                    component={SignUp}
                />
                <Screen
                    name="homeDrawerRoutes"
                    component={DrawerRoutes}
                />
                <Screen
                    name="newDressMaker"
                    component={NewDressMaker}
                />
                <Screen
                    name="showDressMaker"
                    component={ShowDressMaker}
                />
                <Screen
                    name="successScreen"
                    component={SuccessScreen}
                />
            </Navigator>
        </NavigationContainer>
    );
}

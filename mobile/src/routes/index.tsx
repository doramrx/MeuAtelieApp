import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Inaugural } from "../screens/Inaugural";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { TabNavigator } from "./TabNavigator";
import { NewDressMaker } from "../screens/NewDressMaker";
import { SuccessScreen } from "../components/shared/SuccessScreen";
import { ShowDressMaker } from "../screens/ShowDressmaker";
import { EditDressMaker } from "../screens/EditDressMaker";
import { AuthContextProvider } from "../contexts/AuthContext";

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
                        name="newDressMaker"
                        component={NewDressMaker}
                    />
                    <Screen
                        name="showDressMaker"
                        component={ShowDressMaker}
                    />
                    <Screen
                        name="editDressMaker"
                        component={EditDressMaker}
                    />
                    <Screen
                        name="successScreen"
                        component={SuccessScreen}
                    />
                </Navigator>
            </NavigationContainer>
        </AuthContextProvider>
    );
}

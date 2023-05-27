import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Orders } from "../../screens/Orders";
import { ListDressMakers } from "../../screens/ListDressMakers";
import { Customers } from "../../screens/Customers";

import ShoppingBagIcon from "../../assets/icons/shopping-bag-icon.svg";
import SewingMachineIcon from "../../assets/icons/sewing-machine-icon.svg";
import UsersIcon from "../../assets/icons/users-icon.svg";
import CalendarIcon from "../../assets/icons/calendar-icon.svg";
import UserIcon from "../../assets/icons/user-icon.svg";

import { THEME } from "../../theme";
import { Profile } from "../../screens/Profile";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="orders"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 55,
                    paddingBottom: 3,
                },
            }}
        >
            <Tab.Screen
                name="orders"
                component={Orders}
                options={{
                    tabBarLabel: "Pedido",
                    tabBarActiveTintColor: THEME.COLORS.PINK.V1,
                    tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
                    tabBarIcon: ({ focused }) => (
                        <ShoppingBagIcon
                            style={
                                {
                                    color: focused
                                        ? THEME.COLORS.PINK.V1
                                        : THEME.COLORS.GRAY.MEDIUM.V2,
                                } as any
                            }
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="customers"
                component={Customers}
                options={{
                    tabBarLabel: "Clientes",
                    tabBarActiveTintColor: THEME.COLORS.PINK.V1,
                    tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
                    tabBarIcon: ({ focused }) => (
                        <UsersIcon
                            style={
                                {
                                    color: focused
                                        ? THEME.COLORS.PINK.V1
                                        : THEME.COLORS.GRAY.MEDIUM.V2,
                                } as any
                            }
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="listDressMakers"
                component={ListDressMakers}
                options={{
                    tabBarLabel: "Costureiras",
                    tabBarActiveTintColor: THEME.COLORS.PINK.V1,
                    tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
                    tabBarIcon: ({ focused }) => (
                        <SewingMachineIcon
                            style={
                                {
                                    color: focused
                                        ? THEME.COLORS.PINK.V1
                                        : THEME.COLORS.GRAY.MEDIUM.V2,
                                } as any
                            }
                        />
                    ),
                }}
            />
            {/* <Tab.Screen 
        name="agenda" 
        component={Inaugural} 
        options={{
          tabBarLabel: 'Agenda',
          tabBarActiveTintColor: THEME.COLORS.PINK.V1,
          tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
          tabBarIcon: ({focused}) => (
            <CalendarIcon style={{
              color: focused 
                  ? THEME.COLORS.PINK.V1 
                    : THEME.COLORS.GRAY.MEDIUM.V2
            }}
          />
          )
        }}
      />
      */}
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarLabel: "Perfl",
                    tabBarActiveTintColor: THEME.COLORS.PINK.V1,
                    tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
                    tabBarIcon: ({ focused }) => (
                        <UserIcon
                            style={
                                {
                                    color: focused
                                        ? THEME.COLORS.PINK.V1
                                        : THEME.COLORS.GRAY.MEDIUM.V2,
                                } as any
                            }
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

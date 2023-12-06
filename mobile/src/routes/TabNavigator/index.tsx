import { ViewStyle } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { THEME } from "../../theme";
import ShoppingBagIcon from "../../assets/icons/shopping-bag-icon.svg";
import UsersIcon from "../../assets/icons/users-icon.svg";
import UserIcon from "../../assets/icons/user-icon.svg";
import AgendaIcon from "../../assets/icons/Agenda.svg";

import { ProfileView } from "../../views/Profile";
import { Orders } from "../../views/Order/OrderList";
import { Customers } from "../../views/Customers";
import { Agenda } from "../../views/Agenda";

export function TabNavigator() {
  const Tab = createBottomTabNavigator();

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
                } as ViewStyle
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
                } as ViewStyle
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="agenda"
        component={Agenda}
        options={{
          tabBarLabel: "Agenda",
          tabBarActiveTintColor: THEME.COLORS.PINK.V1,
          tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
          tabBarIcon: ({ focused }) => (
            <AgendaIcon
              style={
                {
                  color: focused
                    ? THEME.COLORS.PINK.V1
                    : THEME.COLORS.GRAY.MEDIUM.V2,
                } as ViewStyle
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileView}
        options={{
          tabBarLabel: "Perfil",
          tabBarActiveTintColor: THEME.COLORS.PINK.V1,
          tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
          tabBarIcon: ({ focused }) => (
            <UserIcon
              style={
                {
                  color: focused
                    ? THEME.COLORS.PINK.V1
                    : THEME.COLORS.GRAY.MEDIUM.V2,
                } as ViewStyle
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

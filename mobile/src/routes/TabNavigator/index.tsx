import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Orders } from '../../screens/Orders';
import { ListDressMakers } from '../../screens/ListDressMakers';
import { Inaugural } from '../../screens/Inaugural';

import OrdersIcon from '../../assets/icons/pedidos-icon-navigator.svg';
import DressMakersIcon from '../../assets/icons/costureiras-icon-navigator.svg';
import CustomersIcon from '../../assets/icons/clientes-icon-navigator.svg';
import AgendaIcon from '../../assets/icons/agenda-icon-navigator.svg';
import ProfileIcon from '../../assets/icons/perfil-icon-navigator.svg';

import { THEME } from '../../theme';
import { styles } from '../DrawerRoutes/styles';


const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator 
      initialRouteName='orders'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 55,
        paddingBottom: 3}
    }}
      
    >
      <Tab.Screen 
        name="orders" 
        component={Orders} 
        options={{
          tabBarLabel: 'Pedido',
          tabBarActiveTintColor: THEME.COLORS.PINK.V1,
          tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
          tabBarIcon: ({focused}) => (
            <OrdersIcon style={{
                color: focused 
                  ? THEME.COLORS.PINK.V1 
                    : THEME.COLORS.GRAY.MEDIUM.V2
              }}
            />
          )
        }}
      />
      {/* <Tab.Screen 
        name="customers" 
        component={ListDressMakers} 
        options={{
          tabBarLabel: 'Clientes',
          tabBarActiveTintColor: THEME.COLORS.PINK.V1,
          tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
          tabBarIcon: ({focused}) => (
            <CustomersIcon style={{
              color: focused 
                  ? THEME.COLORS.PINK.V1 
                    : THEME.COLORS.GRAY.MEDIUM.V2
            }}
          />
          )
        }}
      /> */}
      <Tab.Screen 
        name="listDressMakers" 
        component={ListDressMakers} 
        options={{
          tabBarLabel: 'Costureiras',
          tabBarActiveTintColor: THEME.COLORS.PINK.V1,
          tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
          tabBarIcon: ({focused}) => (
            <DressMakersIcon style={{
              color: focused 
                  ? THEME.COLORS.PINK.V1 
                    : THEME.COLORS.GRAY.MEDIUM.V2
            }}
          />
          )
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
            <AgendaIcon style={{
              color: focused 
                  ? THEME.COLORS.PINK.V1 
                    : THEME.COLORS.GRAY.MEDIUM.V2
            }}
          />
          )
        }}
      />
      <Tab.Screen 
        name="profile" 
        component={Inaugural} 
        options={{
          tabBarLabel: 'Perfl',
          tabBarActiveTintColor: THEME.COLORS.PINK.V1,
          tabBarInactiveTintColor: THEME.COLORS.GRAY.MEDIUM.V2,
          tabBarIcon: ({focused}) => (
            <ProfileIcon style={{
              color: focused 
                  ? THEME.COLORS.PINK.V1 
                    : THEME.COLORS.GRAY.MEDIUM.V2
            }}
          />
          )
        }}
      /> */}
    </Tab.Navigator>
  );
}
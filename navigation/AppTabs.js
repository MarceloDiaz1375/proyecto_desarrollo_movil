import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Para usar iconos
// import Pacientes from '../screens/Pacientes';
// Importa otras pantallas que quieras en el menú inferior
// import Perfil from '../screens/Perfil'; 
// import Citas from '../screens/Citas';
import Home from '../screens/Home';
import Home2 from '../screens/Home_copy';

const Tab = createBottomTabNavigator();

// Este es el menú inferior que solo aparece DESPUÉS del login
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } 
          // Agrega más rutas y sus iconos aquí si las tienes
          else if (route.name === 'Home_copy') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Puedes retornar cualquier componente
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue', // Color del icono y texto activo
        tabBarInactiveTintColor: 'gray', // Color del icono y texto inactivo
        headerShown: false, // Opcional: para que las pantallas internas no muestren el header
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Home_copy" component={Home2} />
      {/* <Tab.Screen name="Perfil" component={Perfil} /> */}
    </Tab.Navigator>
  );
}

export default AppTabs;
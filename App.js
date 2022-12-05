import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { SesionProvider } from './providers/SesionProvider';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViajesScreen from './screens/ViajesScreen';
import { ViajeProvider } from './providers/ViajeProvider';
import { Button, DefaultTheme, List, MD2DarkTheme, MD3DarkTheme } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import MapScreen from './screens/MapScreen';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (

    <SesionProvider>
      <ViajeProvider>
        <PaperProvider theme={{
          dark: true,
          ...MD2DarkTheme
        }}>
          <NavigationContainer theme={DarkTheme} >
            <Stack.Navigator initialRouteName='login'  >
              <Stack.Screen name="login" component={LoginScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }} />
              <Stack.Screen name="viaje" component={ViajesScreen}
                options={{
                  headerBackTitle: 'Volver',
                  title: 'Viajes', 
                }}
              />
              <Stack.Screen name="map" component={MapScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen name="perfil" component={ProfileScreen}

                options={{
                  headerBackTitle: 'Volver',
                  title: 'Perfil',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ViajeProvider>
    </SesionProvider>
  );
} 
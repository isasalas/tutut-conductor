import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { SesionProvider } from './providers/SesionProvider';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViajeProvider } from './providers/ViajeProvider';
import { Button, DefaultTheme, List, MD2DarkTheme, MD3DarkTheme } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import InternoScreen from './screens/socio/InternoScreen';
import { InternoProvider } from './providers/InternoProvider';
import ViajeScreen from './screens/conductor/ViajeScreen';
import RolesScreen from './screens/RolesScreen';


export default function App() {
  const Stack = createNativeStackNavigator();
  const theme = {
    ...MD2DarkTheme,
    colors: {
      ...MD2DarkTheme.colors,
      //onPrimaryContainer:'#355746'
      primary: '#2b724a',
      card: '#2b724a',
      surface: '#121212',
      onSurface: '#e3a92b',
      accent: '#2b724a',
    },
  }
  //console.log(MD2DarkTheme.colors)
  return (

    <SesionProvider>
      <ViajeProvider>
        <InternoProvider>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme} >
              <Stack.Navigator initialRouteName='login'  >
                <Stack.Screen name="login" component={LoginScreen}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }} />
                <Stack.Screen name="viaje" component={RolesScreen}

                  options={{
                    gestureEnabled: false,
                    headerShown: false,
                    headerBackTitle: 'Volver',
                    title: 'Viajes',
                  }}
                />
                <Stack.Screen name="map" component={ViajeScreen}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen name="perfil" component={ProfileScreen}

                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen name="interno" component={InternoScreen}

                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </InternoProvider>
      </ViajeProvider>
    </SesionProvider>
  );
} 
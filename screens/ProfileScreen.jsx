import { View, Text } from 'react-native'
import React from 'react'
import { Appbar, List } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SesionContext } from '../providers/SesionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViajeContext } from '../providers/ViajeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }) {
  const { setSesion, sesion } = React.useContext(SesionContext)
  const { setViaje, viaje } = React.useContext(ViajeContext)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212"}}>
     
      <List.Item
        title="Editar Perfil"
        description="Edita caracteristias de tu perdi"
        left={props => <List.Icon {...props} icon="account-box" />}
        onPress={() => { }}
      />
      <List.Item
        title="Cambiar Contrase;a"
        description="por una comtrase;a m[as segura"
        left={props => <List.Icon {...props} icon="key-change" />}
        onPress={() => { }}
      />
      
    </SafeAreaView>
  )
}
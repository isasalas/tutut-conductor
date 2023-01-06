import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper'
import { SesionContext } from '../providers/SesionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViajeContext } from '../providers/ViajeProvider';

export default function FloatinMenu({ navigation }) {

    const [expandedMenu, setExpandedMenu] = React.useState(false);
    const { setSesion, sesion } = React.useContext(SesionContext)
    const handlePressMenu = () => setExpandedMenu(!expandedMenu);
    const { viaje, setViaje } = React.useContext(ViajeContext)

 
    return (
        <FAB.Group
            fabStyle={{
                backgroundColor: '#272727',
                marginBottom: 30, 

            }}
            open={expandedMenu}
            visible
            icon={expandedMenu ? 'close' : 'menu'}
            actions={[
                {
                    icon: 'exit-to-app',
                    label: 'Cerrar Sesión',
                    onPress: () => {
                        AsyncStorage.removeItem('sesion')
                        setSesion(null)
                        setViaje(null)
                        navigation.push('login')
                    },
                },
                {
                    icon: 'account-circle',
                    label: 'Perfil',
                    onPress: () => navigation.push('perfil'),
                },
                {
                    icon: 'routes',
                    label: 'Cambiar Viaje',
                    onPress: () => {
                        setViaje(null)
                        navigation.push('viaje')},
                },

            ]}
            onStateChange={handlePressMenu}
            onPress={() => {
                if (expandedMenu) {
                    // do something if the speed dial is open
                }
            }}
        />
    )
}
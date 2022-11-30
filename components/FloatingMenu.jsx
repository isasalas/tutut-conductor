import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper'

export default function FloatinMenu({ navigation }) {

    const [expandedMenu, setExpandedMenu] = React.useState(false);

    const handlePressMenu = () => setExpandedMenu(!expandedMenu);

 
    return (
        <FAB.Group
            fabStyle={{
                backgroundColor: '#121212CF',
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
                    onPress: () => navigation.push('viaje'),
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
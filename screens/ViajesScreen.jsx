import { View, Text } from 'react-native'
import React from 'react'
import { Appbar, List } from 'react-native-paper'
import { ViajeContext } from '../providers/ViajeProvider';
import { urlApi, urlViaje } from '../utils/apiData';
import axios from 'axios'
import { SesionContext } from '../providers/SesionProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViajesScreen({ navigation }) {

    const [viajes, setViajes] = React.useState([]);
    const { sesion } = React.useContext(SesionContext);
    const { setViaje, viaje } = React.useContext(ViajeContext)

    React.useEffect(() => {
        actualizarViajes()

        //setViajes()
    }, [])
    React.useEffect(() => {
    }, [viajes])

    const actualizarViajes = () => {
        axios.get(urlApi + urlViaje)
            .then((re) => {
                var vue = re.data.filter((dat) => {
                    if (dat.userId === sesion.id
                        && new Date(dat.ida.origin.time).toDateString() === new Date().toDateString()) {
                        return dat
                    }
                })
                //console.log(vue[0].id);
                setViajes(vue)
            })
    }

    if (viajes.length <= 0) {
        return <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
            <List.Item
                onPress={() => {
                    actualizarViajes()
                }} 
                title={'Aun no tienes viajes'}
                description={'Preciona para refrescar'} 
                left={props => <List.Icon {...props} icon="briefcase-off" />} 
                right={props => <List.Icon {...props} icon="refresh" />}
            />
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>

            {viajes.map((dat) => (
                <List.Item
                    onPress={() => {
                        setViaje(dat);
                        navigation.push('map');
                    }}
                    key={dat.id}
                    title={new Date(dat.ida.origin.time).getHours().toString().padStart(2, '0') + ":" + new Date(dat.ida.origin.time).getMinutes().toString().padStart(2, '0')
                        + ' - ' + new Date(dat.vuelta.destination.time).getHours().toString().padStart(2, '0') + ":" + new Date(dat.vuelta.destination.time).getMinutes().toString().padStart(2, '0')}
                    description={'Interno ' + dat.interno.name + ' - ' + dat.interno.linea.name}

                    left={props => <List.Icon {...props} icon="map-clock" />}

                    right={props => <List.Icon {...props} icon="arrow-right" />}
                />
            ))}
            <List.Item
                onPress={() => {
                    actualizarViajes()
                }}  
                description={'Preciona para refrescar'} 
            />

        </SafeAreaView>
    )
}
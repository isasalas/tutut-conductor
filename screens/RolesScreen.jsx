import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Appbar, Button, Card, List, Paragraph, Title } from 'react-native-paper'
import { ViajeContext } from '../providers/ViajeProvider';
import { urlApi, urlInterno, urlUser, urlViaje } from '../utils/apiData';
import axios from 'axios'
import { SesionContext } from '../providers/SesionProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InternoModelJson } from '../utils/models';
import { InternoContext } from '../providers/InternoProvider';

export default function RolesScreen({ navigation }) {

    const [viajes, setViajes] = React.useState([]);
    const [internos, setInternos] = React.useState([]);
    const [pagina, setPagina] = React.useState(true);
    const { interno, setInterno } = React.useContext(InternoContext);
    const { setSesion, sesion } = React.useContext(SesionContext)
    const { setViaje, viaje } = React.useContext(ViajeContext)

    React.useEffect(() => {
        refreshViajes()
        refreshInternos()
        //setViajes()
    }, [])
    React.useEffect(() => {
    }, [viajes, internos])

    const logout = () => {
        AsyncStorage.removeItem('sesion')
        setSesion(null)
        navigation.push('login')
    }
    const refreshViajes = () => {
        axios.get(urlApi + urlViaje)
            .then((re) => {
                var vue = re.data.filter((dat) => {
                    //console.log(new Date().toDateString())
                    if (dat.userId === sesion.id
                        && new Date(dat.ruta.ida.origin.time).toDateString() === new Date().toDateString()) {
                        return dat.ruta
                    }
                })
                //console.log(vue);
                setViajes(vue)
            })
    }
    const refreshInternos = () => {
        axios.get(urlApi + urlInterno + urlUser + "/" + sesion.id)
            .then((re) => {
                //console.log(re.data);
                setInternos(re.data)
            })
    }

    const cambioPagina = () => {
        if (pagina) setPagina(false)
        else setPagina(true)
    }

    if (!sesion) return null
    return (

        pagina ?
            <View style={{ flex: 1, backgroundColor: "#121212" }}>
                <Appbar.Header>
                    <Appbar.Action icon="login-variant" style={{ transform: [{ rotate: "180deg" }] }} onPress={logout} />
                    <Appbar.Content title="Viajes" subtitle={'Escoge el viaje'} />
                    <Appbar.Action animated icon="refresh" onPress={refreshViajes} />
                    {internos.length < 1 ? null : <Appbar.Action icon="bus" onPress={cambioPagina} />}
                </Appbar.Header>
                <ScrollView>
                    {viajes.length < 1 ?
                        <List.Item
                            onPress={refreshViajes}
                            title={'No tienes viajes asignados'}
                            description={'Intenta más tarde'}
                            left={props => <List.Icon {...props} icon="briefcase-remove" />}
                        /> : viajes.map((dat) => (
                            <List.Item
                                onPress={() => {
                                    setViaje(dat);
                                    navigation.push('map');
                                }}
                                key={dat.id}
                                title={new Date(dat.ruta.ida.origin.time).getHours().toString().padStart(2, '0') + ":" + new Date(dat.ruta.ida.origin.time).getMinutes().toString().padStart(2, '0')
                                    + ' - ' + new Date(dat.ruta.vuelta.destination.time).getHours().toString().padStart(2, '0') + ":" + new Date(dat.ruta.vuelta.destination.time).getMinutes().toString().padStart(2, '0')}
                                description={'Interno ' + dat.interno.name + ' - ' + dat.interno.linea.name}

                                left={props => <List.Icon {...props} icon="briefcase-clock" />}

                                right={props => <List.Icon {...props} icon="arrow-right" />}
                            />
                        ))
                    }
                </ScrollView>
            </View> :
            <View style={{ flex: 1, backgroundColor: "#121212" }}>
                <Appbar.Header>
                    <Appbar.Action icon="login-variant" style={{ transform: [{ rotate: "180deg" }] }} onPress={logout} />
                    <Appbar.Content title="Internos" subtitle={'Escoge el interno'} />
                    <Appbar.Action animated icon="refresh" onPress={refreshInternos} />
                    {internos.length < 1 ? null : <Appbar.Action icon="briefcase-clock" onPress={cambioPagina} />}
                </Appbar.Header>
                <ScrollView>
                    {internos.map((inter) => (

                        <List.Item
                            onPress={() => {
                                setInterno(inter);
                                navigation.push('interno');
                            }}
                            key={inter.id}
                            title={"Interno " + inter.name}
                            description={inter.linea.name}

                            left={props => <List.Icon {...props} icon="bus" />}

                            right={props => <List.Icon {...props} icon="arrow-right" />}
                        />


                    ))
                    }
                </ScrollView>

            </View>
    )
}
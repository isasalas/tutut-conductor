import { View, SafeAreaView, StyleSheet, ViewBase } from 'react-native'
import React from 'react'
import { Button, Snackbar, Text, TextInput, } from 'react-native-paper';
import { SesionContext } from '../providers/SesionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { urlApi, urlUser } from '../utils/apiData';

export default function LoginScreen({ navigation }) {

    /*const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');*/
    const { setSesion, sesion } = React.useContext(SesionContext)
    const [login, setLogin] = React.useState({
        id: null,
        name: "",
        lastname: "",
        phone: "",
        email: null,
        password: null,
        admin: "",
        lineaId: ""
    });

    const [snackbar, setSnackbar] = React.useState({
        message: '',
        visible: false
    });

    const onToggleSnackBar = (message) => setSnackbar({ ...snackbar, visible: true, message: message });

    const onDismissSnackBar = () => setSnackbar({ ...snackbar, visible: false });

    const SesionCompro = (login) => {
        if (!login) return
        axios.post(urlApi + urlUser + "/login", login)
            .then((res) => {
                if (res.data.admin === false && res.data.lineaId === null) {
                    AsyncStorage.setItem('sesion', JSON.stringify(login))
                    setSesion(login)
                   
                    navigation.push('viaje');
                    //onToggleSnackBar('Sesion Iniciada.');
                } else {
                    onToggleSnackBar('Ese conductor no existe.');
                }
            })
            .catch((e) => { onToggleSnackBar(JSON.stringify(e.response.data.message)); }) 
    }

    React.useEffect(() => {
        AsyncStorage.getItem('sesion').then((value) => { SesionCompro(JSON.parse(value)); });
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor:"#121212"
        }}>
            <SafeAreaView
                style={{
                    padding: 20,
                    margin: 30,
                }}
            >

                <Text
                    children='Iniciar Sesion'
                    style={{
                        textAlign: 'center',
                        fontSize: 35,
                        fontWeight: 'bold',
                        marginBottom: 20
                    }}

                />

                <TextInput
                    style={{ marginBottom: 10 }}
                    label="Usuario"
                    keyboardType='email-address'
                    value={login.id}
                    onChangeText={text => setLogin({ ...login, id: text })}
                />
                <TextInput
                    style={{ marginBottom: 20 }}
                    label="Contraseña"
                    secureTextEntry={true}
                    value={login.password}
                    onChangeText={text => setLogin({ ...login, password: text })}
                />

                <Button
                    mode='contained'
                    children='Iniciar Sesion'
                    onPress={
                        (e) => {
                            if (!login.id || !login.password) { return onToggleSnackBar('Intruzca los datos'); }
                            SesionCompro(login);
                            /* axios.post(urlApi + urlUser + "/login", login)
                                 .then((res) => {
                                     console.log(JSON.stringify(res.data))
 
                                     if (res.data.admin === false && res.data.lineaId === null) {
                                         //window.localStorage.setItem('sesion', JSON.stringify(res.data));
                                         SesionCompro()
                                     } else {
                                         onToggleSnackBar('Ese conductor no existe.');
                                     }
                                 })
                                 .catch((e) => { onToggleSnackBar(JSON.stringify(e.response.data.message)); })*/
                        }
                    }
                />

            </SafeAreaView>
            <Snackbar
                visible={snackbar.visible}
                duration={2000}
                children={snackbar.message}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'ok',
                    onPress: () => { },
                }} />
        </SafeAreaView>
    )
}


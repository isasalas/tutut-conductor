import { View, SafeAreaView, StyleSheet, ViewBase, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import { Button, Snackbar, Text, TextInput, } from 'react-native-paper';
import { SesionContext } from '../providers/SesionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { urlApi, urlUser } from '../utils/apiData';
import imagePng from '../assets/logo.png';
import { UserModelJson } from '../utils/models';

export default function LoginScreen({ navigation }) {

    /*const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');*/
    const { setSesion, sesion } = React.useContext(SesionContext)
    const [login, setLogin] = React.useState(UserModelJson);

    const [snackbar, setSnackbar] = React.useState({
        message: '',
        visible: false
    });

    const onToggleSnackBar = (message) => setSnackbar({ ...snackbar, visible: true, message: message });

    const onDismissSnackBar = () => setSnackbar({ ...snackbar, visible: false });

    React.useEffect(() => {
        AsyncStorage.getItem('sesion').then((value) => {
            //console.log(value)
            if(value)
            {setSesion(JSON.parse(value));
            navigation.push('viaje')}
        });

    }, [])

    const SesionCompro = (e) => {

        if (!login.id || !login.password) return onToggleSnackBar('Intruzca todos los datos');
        axios.post(urlApi + urlUser + "/login", login)
            .then((res) => {
                if (res.data.admin === false) {
                    AsyncStorage.setItem('sesion', JSON.stringify(res.data))
                    setSesion(res.data)
                    //console.log(res.data)
                    navigation.push('viaje')
                } else { onToggleSnackBar('Ese usuario no existe.') }
            })
            .catch((e) => { onToggleSnackBar(JSON.stringify(e.response.data.message)); })
    }

    const iniciarSesion = (e) => {

        if (!login.id || !login.password) { return onToggleSnackBar('Intruzca todos los datos'); }
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
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{
                flex: 1, justifyContent: "center",
                textAlign: 'center',
            }} >
                <View style={{ padding: 10, margin: 20, }} >

                    <Image style={{ width: '100%', height: 125, resizeMode: 'contain', marginBottom: 20 }} source={require('../assets/logo.png')} />
                    <Text
                        children='TuTuT'
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
                        children='Iniciar Sesión'
                        onPress={SesionCompro}
                    />

                </View>
                <Snackbar
                    visible={snackbar.visible}
                    duration={2000}
                    children={snackbar.message}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'ok',
                        onPress: () => { },
                    }} />
            </ScrollView>
        </KeyboardAvoidingView>


    )
}


import { View, ScrollView } from 'react-native'
import React from 'react'
import { Appbar, Button, Dialog, Snackbar, Portal, TextInput, Text } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SesionContext } from '../providers/SesionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViajeContext } from '../providers/ViajeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { urlApi, urlUser } from '../utils/apiData';

export default function ProfileScreen({ navigation }) {
  const { setSesion, sesion } = React.useContext(SesionContext)
  const { setViaje, viaje } = React.useContext(ViajeContext)
  const [perfil, setPerfil] = React.useState(sesion)
  const [pass, setPass] = React.useState({ pass: null, newPass: null, newPassV: null })

  const [visibleCambios, setVisibleCambios] = React.useState(false)
  const [visibleContra, setVisibleContra] = React.useState(false)

  const [snackbar, setSnackbar] = React.useState({
    message: '',
    visible: false
  });





  const onToggleSnackBar = (message) => setSnackbar({ ...snackbar, visible: true, message: message });
  const onDismissSnackBar = () => setSnackbar({ ...snackbar, visible: false });


  const hideDialog = () => {
    setPerfil(sesion)
    setPass({ pass: null, newPass: null, newPassV: null })
    setVisibleCambios(false)
    setVisibleContra(false)
  };


  const guardarCambios = () => {

    axios.post(urlApi + urlUser + "/login", { id: perfil.id, password: pass.pass })
      .then((res) => {
        axios.put(urlApi + urlUser + "/" + perfil.id, { name: perfil.name, lastname: perfil.lastname, phone: perfil.phone })
          .then((re) => {
            setSesion({ ...sesion, name: re.data.name, lastname: re.data.lastname, phone: re.data.phone })
            AsyncStorage.setItem('sesion', JSON.stringify({ ...sesion, name: re.data.name, lastname: re.data.lastname, phone: re.data.phone }))
            hideDialog();
            onToggleSnackBar("Datos editados con exito");
          })
          .catch((e) => { onToggleSnackBar(JSON.stringify(e.response.data.message)); });
      })
      .catch((e) => {
        //enqueueSnackbar(JSON.stringify(e.response.data.message), { variant: 'error' }) 
        onToggleSnackBar('Contraseña incorrecta')
      })
  }

  const cambiarContraseña = () => {
console.log(pass)
    if (!pass.pass || !pass.newPass || !pass.newPassV) return onToggleSnackBar("No deje espacios en blanco");
    if (pass.newPass !== pass.newPassV) return onToggleSnackBar("La nueva contraseña esta mal repetida");
    axios.post(urlApi + urlUser + "/login", { id: perfil.id, password: pass.pass })
      .then((res) => {
        axios.put(urlApi + urlUser + "/" + perfil.id, { password: pass.newPass })
          .then((response) => {
            hideDialog();
            AsyncStorage.removeItem('sesion')
            setSesion(null)
            setViaje(null)
            navigation.push('login')
            onToggleSnackBar("Contraseña editada con exito");
          })
          .catch((e) => { onToggleSnackBar(JSON.stringify(e.response.data.message)); });
      })
      .catch((e) => {
        //enqueueSnackbar(JSON.stringify(e.response.data.message), { variant: 'error' }) 
        onToggleSnackBar('Contraseña incorrecta.')
      })



  }
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Perfil'} subtitle={'Edita tus datos'} />
      </Appbar.Header>
      <View style={{ padding: 10, margin: 20, }}>

        <TextInput
          style={{ marginBottom: 10 }}
          label="Nombre"
          keyboardType='default'
          value={perfil.name}
          onChangeText={text => setPerfil({ ...perfil, name: text })}
        />
        <TextInput
          style={{ marginBottom: 10 }}
          label="Apellidos"
          keyboardType='default'
          value={perfil.lastname}
          onChangeText={text => setPerfil({ ...perfil, lastname: text })}
        />
        <TextInput
          style={{ marginBottom: 10 }}
          label="Telefono"
          keyboardType='phone-pad'
          value={perfil.phone}
          onChangeText={text => setPerfil({ ...perfil, phone: text })}
        />
        <Button
          mode='contained'
          children='Guardar Cambios'
          onPress={() => {
            console.log(perfil);
            if (!perfil.name || !perfil.lastname || !perfil.phone) { return onToggleSnackBar("No deje espacios en blanco") };
            setVisibleCambios(true)
          }}
        />
        <Button
          style={{ marginTop: 8 }}
          mode='contained'
          children='Cambiar Contraseña'
          onPress={() => {

            setVisibleContra(true)
          }}
        />
      </View>
      <Portal>
        <Dialog visible={visibleCambios} onDismiss={hideDialog}
          style={{
            backgroundColor: "#121212", padding: 8,
          }}
        >
          <Dialog.Title>Guardar Cambios</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView >
              <Text style={{ color: '#959595', marginBottom: 8 }} children={'Introduce la contraseña para confirmar tus cambios'} />
              <TextInput
                style={{ marginBottom: 10 }}
                label="Contraseña"
                keyboardType='visible-password'
                value={pass.pass}
                onChangeText={text => setPass({ ...pass, pass: text })}
              />
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={guardarCambios}>Guardar</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={visibleContra} onDismiss={hideDialog}
          style={{
            backgroundColor: "#121212", padding: 8,
          }}
        >
          <Dialog.Title>Cambiar Contraseña</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView >
              <Text style={{ color: '#959595', marginBottom: 8 }} children={'Introduce la contraseña para confirmar tus cambios'} />
              <TextInput
                style={{ marginBottom: 10 }}
                label="Antigua Contraseña"
                secureTextEntry={true}
                value={pass.pass}
                onChangeText={text => setPass({ ...pass, pass: text })}
              />
              <TextInput
                style={{ marginBottom: 10 }}
                label="Nueva Contraseña"
                secureTextEntry={true}
                value={pass.newPass}
                onChangeText={text => setPass({ ...pass, newPass: text })}
              />
              <TextInput
                style={{ marginBottom: 10 }}
                label="Confirmar Nueva Contraseña"
                secureTextEntry={true}
                value={pass.newPassV}
                onChangeText={text => setPass({ ...pass, newPassV: text })}
              />
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={cambiarContraseña}>Cambiar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={snackbar.visible}
        duration={2000}
        children={snackbar.message}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'ok',
          onPress: () => { },
        }} />
    </View>
  )
}
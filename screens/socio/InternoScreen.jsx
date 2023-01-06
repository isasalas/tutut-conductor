import { View, Text, Dimensions, Platform, ScrollView } from 'react-native'
import React from 'react'
import { InternoContext } from '../../providers/InternoProvider';
import { Appbar, Button, Divider, List, Switch } from 'react-native-paper';
import axios from 'axios';
import { mapStyleDark } from '../../utils/MapStyle';
import MapView, { Marker, Polyline } from 'react-native-maps';
import socket from '../../components/Socket.io';
import { urlApi, urlGps, urlViaje } from '../../utils/apiData';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { RutaModelJson, ViajeModelJson } from '../../utils/models';

export default function InternoScreen({ navigation }) {
  const { interno, setInterno } = React.useContext(InternoContext);
  const [gps, setGps] = React.useState()
  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [viajes, setViajes] = React.useState([])
  const [viaje, setViaje] = React.useState(ViajeModelJson)
  const [ruta, setRuta] = React.useState(RutaModelJson)
  const [polyline, setPolyline] = React.useState([])

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const [labelAppBar, setLabelAppBar] = React.useState('Ruta de Ida');
  const [history, setHistory] = React.useState([])



  React.useEffect(() => {
    socket.on("gps", gpsNew => { if (interno != null && gpsNew.internoId === interno.id) { setGps(gpsNew) } })
    return () => { socket.off() }
  }, [interno, gps])

  React.useEffect(() => {
    axios.get(urlApi + urlViaje)
      .then((re) => {
        var vue = re.data.filter((dat) => {
          //console.log(new Date().toDateString())
          if (dat.internoId === interno.id
            && new Date(dat.ruta.ida.origin.time).toDateString() === new Date(date).toDateString()) {
            return dat.ruta
          }
        })
        //console.log(vue);
        setViajes(vue)
      })
  }, [date])

  React.useEffect(() => { dibujarPolyline() }, [isSwitchOn, viaje])

  const onToggleSwitch = () => { setIsSwitchOn(!isSwitchOn) };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn(date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear() );
    setDate(date)
    hideDatePicker();
  };

  const goViajes = () => {
    setInterno(null)
    navigation.push('viaje')
  }

  const refresh = () => {
    axios.get(urlApi + urlViaje)
      .then((re) => {
        var vue = re.data.filter((dat) => {
          //console.log(new Date().toDateString())
          if (dat.userId === sesion.id
            && new Date(dat.ruta.ida.origin.time).toDateString() === new Date().toDateString()) {
            return dat.ruta
          }
        })
        //console.log(vue[0].id);
        setViajes(vue)
      })
  }

  const refreshViajes = () => {
    axios.get(urlApi + urlViaje)
      .then((re) => {
        var vue = re.data.filter((dat) => {
          //console.log(new Date().toDateString())
          if (dat.internoId === interno.id
            && new Date(dat.ruta.ida.origin.time).toDateString() === new Date(date).toDateString()) {
            return dat.ruta
          }
        })
        //console.log(vue);
        setViajes(vue)
      })
  }



  const dibujarPolyline = () => {
    //console.log(viaje.id)

    if (isSwitchOn) {
      setRuta(viaje.ruta.ida)
      setLabelAppBar('Viaje de Ida')
      var cord = viaje.ruta.ida.route.map((e) => { return { latitude: e.lat, longitude: e.lng } })
      if (viaje.id) {
        axios.get(urlApi + urlGps + '/' + viaje.internoId)
          .then((re) => {
            var datito = []
            re.data.map((loc) => {
              if (new Date(loc.location.timestamp) >= new Date(viaje.ruta.ida.origin.time)
                && new Date(loc.location.timestamp) < new Date(viaje.ruta.ida.destination.time)) {
                datito.push({ latitude: loc.location.latitude, longitude: loc.location.longitude })
              }
            })
            setHistory(datito)
          }).catch((e) => { console.log(e) })
      }
    }
    else {
      setRuta(viaje.ruta.vuelta)
      setLabelAppBar('Viaje de Vuelta')
      var cord = viaje.ruta.vuelta.route.map((e) => { return { latitude: e.lat, longitude: e.lng } })
      //cord.push({ latitude: viaje.ruta.vuelta.destination.location.lat, longitude: viaje.ruta.vuelta.destination.location.lng })
      //console.log(cord)
      if (viaje.id) {
        axios.get(urlApi + urlGps + '/' + viaje.internoId)
          .then((re) => {
            var datito = []
            re.data.map((loc) => {
              if (new Date(loc.location.timestamp) >= new Date(viaje.ruta.vuelta.origin.time)
                && new Date(loc.location.timestamp) < new Date(viaje.ruta.vuelta.destination.time)) {
                datito.push({ latitude: loc.location.latitude, longitude: loc.location.longitude })
              }
            })
            setHistory(datito)
          }).catch((e) => { console.log(e) })
      }
    }
    setPolyline(cord) 

  }


  return (
    !interno ? null :
      <View style={{ paddingBottom: '20%' }}>
        <Appbar.Header>
          <Appbar.Action icon="arrow-left" onPress={goViajes} />
          <Appbar.Content title={"Interno " + interno.name} subtitle={interno.linea.name} />
          <Appbar.Action  icon="account-circle" onPress={() => navigation.push('perfil')} />
        </Appbar.Header>
        <ScrollView style={{ height: '100%' }}>
          <View style={{ padding: 12, marginHorizontal: 12, marginTop: 12, borderRadius: 5, backgroundColor: '#272727' }}>
            <Text
              style={{ color: '#bdbdbd', fontSize: 18, textAlign: 'center', paddingBottom: 5 }}
              children='Ubicación en tiempo real' />
            <MapView
              showsUserLocation={false}
              initialRegion={{
                latitude: -17.783390,
                longitude: -63.180249,
                latitudeDelta: 0.1022,
                longitudeDelta: 0.0521,
              }}
              userInterfaceStyle={'dark'}
              style={{
                height: 250,
                borderRadius: 5,
                padding: 15
              }}
              customMapStyle={mapStyleDark}
            >

              {gps != null && interno != null ?
                <Marker
                  title={interno.name}
                  //icon={{ url: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png', scaledSize: { width: 35, height: 35 } }}
                  coordinate={{ latitude: gps.location.latitude, longitude: gps.location.longitude }}
                  pinColor='#ffffff'
                /> : null}
            </MapView>
          </View>


          <View style={{ padding: 12, marginHorizontal: 12, marginVertical: 12, borderRadius: 5, backgroundColor: '#272727' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#bdbdbd', fontSize: 18, textAlign: 'center', paddingTop: 6, width: '50%' }} children='Historial de Viajes:' />

              <Button
                children={date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}
                onPress={showDatePicker}
                mode='contained'
                style={{ marginBottom: 12, width: '50%', alignItems: 'center' }} />


            </View>

            <DateTimePickerModal
              buttonTextColorIOS='#2b724a'
              cancelTextIOS='Cancelar'
              confirmTextIOS='Cambiar'
              style={{ height: 200, }}
              date={date}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            {viajes.length > 0 ? <Divider /> : null}
            {viajes.map((dat) => (
              <List.Item
                style={{ marginVertical: 6, borderRadius: 5, }}
                onPress={() => { setViaje(dat); }}
                key={dat.id}
                title={new Date(dat.ruta.ida.origin.time).getHours().toString().padStart(2, '0') + ":" + new Date(dat.ruta.ida.origin.time).getMinutes().toString().padStart(2, '0')
                  + ' - ' + new Date(dat.ruta.vuelta.destination.time).getHours().toString().padStart(2, '0') + ":" + new Date(dat.ruta.vuelta.destination.time).getMinutes().toString().padStart(2, '0')}
                description={dat.user.name + ' ' + dat.user.lastname + ' - ' + dat.interno.linea.name}

                left={props => <List.Icon {...props} icon="map-clock" />}

                right={props => viaje.id === dat.id ? <List.Icon {...props} icon="check" /> : null}
              />
            ))}


            {!viaje.id ? null :
              <View>
                <Divider />
                <View style={{ flexDirection: 'row', marginBottom: 6, alignItems: 'center' }}>

                  <Text style={{ color: '#bdbdbd', textAlign: 'center', paddingTop: 6, width: '70%' }}
                    children={
                      new Date(viaje.ruta.ida.origin.time).getDate() + '/' + new Date(viaje.ruta.ida.origin.time).getMonth() + '/' + new Date(viaje.ruta.ida.origin.time).getFullYear() + ' ' +
                      new Date(viaje.ruta.ida.origin.time).getHours().toString().padStart(2, '0') + ":" + new Date(viaje.ruta.ida.origin.time).getMinutes().toString().padStart(2, '0')
                      + ' - ' + new Date(viaje.ruta.vuelta.destination.time).getHours().toString().padStart(2, '0') + ":" + new Date(viaje.ruta.vuelta.destination.time).getMinutes().toString().padStart(2, '0')
                      + '\n' + viaje.user.name + ' ' + viaje.user.lastname + '\n' + viaje.interno.linea.name}
                  />
                  <View style={{ color: '#bdbdbd', textAlign: 'center', alignItems: 'center', paddingTop: 6, width: '30%' }}>
                    <Text style={{ color: '#bdbdbd', textAlign: 'center', paddingBottom: 6 }}
                      children={labelAppBar} />
                    <Switch
                      style={{ height: 31 }}
                      value={isSwitchOn}
                      onValueChange={onToggleSwitch} />
                  </View>
                </View>
                <Divider />
                <MapView
                  showsUserLocation={false}
                  initialRegion={{
                    latitude: -17.783390,
                    longitude: -63.180249,
                    latitudeDelta: 0.1022,
                    longitudeDelta: 0.0521,
                  }}
                  userInterfaceStyle={'dark'}
                  style={{
                    height: 250,
                    borderRadius: 5,
                    padding: 15,
                    marginTop: 6
                  }}
                  customMapStyle={mapStyleDark}>
                  <Polyline
                    coordinates={polyline}
                    strokeColor="#4c8ff5"
                    //fillColor="rgba(255, 0, 0, 0.5)"
                    strokeWidth={4}
                  />
                  {history[0] ?
                    <Polyline
                      coordinates={history}
                      strokeColor="#f72525"
                      strokeWidth={4}>
                    </Polyline> : null}

                  <Marker

                    coordinate={{
                      latitude: ruta.origin.location.lat,
                      longitude: ruta.origin.location.lng
                    }}
                    title={
                      new Date(ruta.origin.time).getHours().toString().padStart(2, '0') + ":"
                      + new Date(ruta.origin.time).getMinutes().toString().padStart(2, '0')
                    }
                  >
                  </Marker>
                  {ruta.waypoints.map((mark) => (
                    (mark.waypoint.stopover === true) ?
                      <Marker
                        key={mark.waypoint.location.lat}
                        coordinate={{
                          latitude: mark.waypoint.location.lat,
                          longitude: mark.waypoint.location.lng
                        }}
                        title={
                          new Date(mark.time).getHours().toString().padStart(2, '0') + ":"
                          + new Date(mark.time).getMinutes().toString().padStart(2, '0')
                        }
                        pinColor='#ffd70d'
                      /> : null

                  )
                  )}
                  <Marker
                    pinColor='#2b724a'
                    coordinate={{
                      latitude: ruta.destination.location.lat,
                      longitude: ruta.destination.location.lng
                    }}
                    title={
                      new Date(ruta.destination.time).getHours().toString().padStart(2, '0') + ":"
                      + new Date(ruta.destination.time).getMinutes().toString().padStart(2, '0')
                    }
                  />
                </MapView>
                {
                  /*
                  new Date(ruta.origin.marked).getHours().toString().padStart(2, '0') + ":"
                        + new Date(ruta.origin.marked).getMinutes().toString().padStart(2, '0')
                   */
                }
                <View style={{ marginVertical: 6, }} >
                  <List.Item
                    title={
                      !ruta.origin.marked ? '--' :
                        Math.round((new Date(ruta.origin.time).getTime() - new Date(ruta.origin.marked).getTime()) / 1000 / 60) + ' m.'
                    }
                    description={'Hora: '
                      + new Date(ruta.origin.time).getHours().toString().padStart(2, '0') + ":"
                      + new Date(ruta.origin.time).getMinutes().toString().padStart(2, '0')
                      + '\nMarcado: '
                      + (!ruta.origin.marked ? '--' : new Date(ruta.origin.marked).getHours().toString().padStart(2, '0') + ":"
                        + new Date(ruta.origin.marked).getMinutes().toString().padStart(2, '0'))

                    }
                    left={props => <List.Icon {...props} icon="map-clock" />}
                  />
                  {ruta.waypoints.map((dat) => (
                    (dat.waypoint.stopover === true) ?
                      <List.Item
                        key={dat.waypoint.location.lat}
                        title={
                          !dat.marked ? '--' :
                            Math.round((new Date(dat.time).getTime() - new Date(dat.marked).getTime()) / 1000 / 60) + ' m.'}
                        description={'Hora: '
                          + new Date(dat.time).getHours().toString().padStart(2, '0') + ":"
                          + new Date(dat.time).getMinutes().toString().padStart(2, '0')
                          + '\nMarcado: '
                          + (!dat.marked ? '--' :
                            +new Date(dat.marked).getHours().toString().padStart(2, '0') + ":"
                            + new Date(dat.marked).getMinutes().toString().padStart(2, '0'))}
                        left={props => <List.Icon {...props} icon="map-clock" />}
                      /> : null
                  ))}

                  <List.Item
                    title={
                      !ruta.destination.marked ? '--' :
                        Math.round((new Date(ruta.destination.time).getTime() - new Date(ruta.destination.marked).getTime()) / 1000 / 60) + ' m.'

                    }
                    description={'Hora: '
                      + new Date(ruta.destination.time).getHours().toString().padStart(2, '0') + ":"
                      + new Date(ruta.destination.time).getMinutes().toString().padStart(2, '0')
                      + '\nMarcado: '
                      + (!ruta.destination.marked ? '--' :
                        + new Date(ruta.destination.marked).getHours().toString().padStart(2, '0') + ":"
                        + new Date(ruta.destination.marked).getMinutes().toString().padStart(2, '0'))}
                    left={props => <List.Icon {...props} icon="map-clock" />}
                  /></View>
              </View>
            }
          </View>

        </ScrollView>
      </View>
  )
}
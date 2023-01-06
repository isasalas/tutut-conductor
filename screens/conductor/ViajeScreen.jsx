import * as React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { LineaModelJson } from '../../utils/models';
import axios from 'axios'
import { urlApi, urlGps, urlLinea, urlViaje } from '../../utils/apiData';
import { SesionContext } from '../../providers/SesionProvider';
import { ViajeContext } from '../../providers/ViajeProvider';

import * as Location from 'expo-location';
import { Appbar, Banner, Dialog, FAB, List, MD3Colors, Portal, Switch } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { mapStyleDark } from '../../utils/MapStyle';
import socket from '../../components/Socket.io';
import FloatinMenu from '../../components/FloatingMenu';


export default function ViajeScreen({ navigation }) {
  const { sesion } = React.useContext(SesionContext)
  const { viaje, setViaje } = React.useContext(ViajeContext)

  const [ruta, setRuta] = React.useState()
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const [polyline, setPolyline] = React.useState([])
  const [location, setLocation] = React.useState(null);
  const [labelAppBar, setLabelAppBar] = React.useState('Ruta de Ida');
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {

    dibujarPolyline()

    Location.requestForegroundPermissionsAsync().then((e) => {
      if (e.status !== 'granted') {
        return;
      }
      Location.getCurrentPositionAsync({}).then((loc) => {
        setLocation(loc.coords);
      })
    });
  }, [isSwitchOn])


  const dibujarPolyline = () => {
    //console.log(viaje.ruta.ida)
    if (isSwitchOn) {
      setRuta(viaje.ruta.ida)
      setLabelAppBar('Viaje de Ida')
      var cord = viaje.ruta.ida.route.map((e) => {
        return { latitude: e.lat, longitude: e.lng }
      })
    }
    else {
      setRuta(viaje.ruta.vuelta)
      setLabelAppBar('Viaje de Vuelta')
      var cord = viaje.ruta.vuelta.route.map((e) => {
        return { latitude: e.lat, longitude: e.lng }
      })
    }
    setPolyline(cord)
  }

  const saveLocation = async (loc) => {
    //console.log(new Date());
    /* console.log( new Date(viaje.ida.origin.time));
     console.log( new Date(viaje.vuelta.destination.time));*/
    //if (new Date() >= new Date(viaje.ruta.ida.origin.time) && new Date() <= new Date(viaje.ruta.vuelta.destination.time)) {
    if (viaje) {
      /*console.log('----------------------')
      console.log(loc.latitude.toFixed(3))
      console.log(viaje.ruta.ida.origin.location.lat.toFixed(3))
      console.log('----------------------')
      console.log(loc.longitude.toFixed(3))
      console.log(viaje.ruta.ida.origin.location.lng.toFixed(3))*/

      //console.log(new Date(viaje.ruta.ida.origin.time.setMinutes(viaje.ruta.ida.origin.time.getMinutes() + 5)).toISOString())
      /*console.log(new Date(new Date(viaje.ruta.ida.origin.time)
        .setMinutes(new Date(viaje.ruta.ida.origin.time)
          .getMinutes() + 15)))*/
      //console.log(new Date().getHours() + ':' + new Date().getMinutes())
      //console.log(viaje.ruta.ida.waypoints)

      //ida
      //console.log(viaje.ruta.ida.origin.marked)
      if (!viaje.ruta.ida.origin.marked
        && loc.latitude.toFixed(3) === viaje.ruta.ida.origin.location.lat.toFixed(3)
        && loc.longitude.toFixed(3) === viaje.ruta.ida.origin.location.lng.toFixed(3)
        && new Date() > new Date(new Date(viaje.ruta.ida.origin.time)
          .setMinutes(new Date(viaje.ruta.ida.origin.time)
            .getMinutes() - 5))
        && new Date() < new Date(new Date(viaje.ruta.ida.origin.time)
          .setMinutes(new Date(viaje.ruta.ida.origin.time)
            .getMinutes() + 5))

      ) {
        viaje.ruta.ida.origin.marked = new Date(loc.timestamp)
        //console.log(viaje.ruta.ida.origin.marked)
        await axios.put(urlApi + urlViaje+'/'+viaje.id, viaje)
        .then((re) => {
          //console.log('ida origen actualizado');
        }).catch((e) => { console.log(e) })
      }


      //console.log(viaje.ruta.ida.waypoints)
      viaje.ruta.ida.waypoints = viaje.ruta.ida.waypoints.map(e => {
        if (!e.marked
          && loc.latitude.toFixed(3) === e.waypoint.location.lat.toFixed(3)
          && loc.longitude.toFixed(3) === e.waypoint.location.lng.toFixed(3)
          && new Date() > new Date(new Date(e.time)
            .setMinutes(new Date(e.time)
              .getMinutes() - 10))
          && new Date() < new Date(new Date(e.time)
            .setMinutes(new Date(e.time)
              .getMinutes() + 10))
          && e.waypoint.stopover === true
        ) {
          e.marked = new Date(loc.timestamp)
          //console.log('se guarda ida way')
          return e
        }
        return e
      })
      //console.log(viaje.ruta.ida.waypoints)

      if (!viaje.ruta.ida.destination.marked
        && loc.latitude.toFixed(3) === viaje.ruta.ida.destination.location.lat.toFixed(3)
        && loc.longitude.toFixed(3) === viaje.ruta.ida.destination.location.lng.toFixed(3)
        && new Date() > new Date(new Date(viaje.ruta.ida.destination.time)
          .setMinutes(new Date(viaje.ruta.ida.destination.time)
            .getMinutes() - 10))
        && new Date() < new Date(new Date(viaje.ruta.ida.destination.time)
          .setMinutes(new Date(viaje.ruta.ida.destination.time)
            .getMinutes() + 10))
      ) {
        viaje.ruta.ida.destination.marked = new Date(loc.timestamp)
        //console.log('se guarda ida llegada')

      }
      //vuelta


      /*console.log('----------------------')
      console.log(loc.latitude)
      console.log(viaje.ruta.ida.origin.location.lat)
      console.log('----------------------')
      console.log(loc.longitude)
      console.log(viaje.ruta.ida.origin.location.lng)*/

      //console.log(new Date(loc.timestamp))

      var data = {
        internoId: viaje.internoId,
        location: loc
      }
      socket.emit("location", data)
      await axios.post(urlApi + urlGps, data)
        .then((re) => {
          //console.log('se esta actualizando');
        }).catch((e) => { console.log(e) })
    }
    //}
  };

  const hideDialog = () => setVisible(false);

  const onToggleSwitch = () => { setIsSwitchOn(!isSwitchOn) };



  if (!ruta) return <View></View>
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}  >

      <View style={{
        flex: 1,
        backgroundColor: "#121212",
        flexDirection: 'column',
        alignSelf: 'flex-end',
        opacity: 0,
        zIndex: -1
      }}>

      </View>

      <Appbar
        style={{
          //paddingLeft: 10,
          opacity: 1,
          elevation: 0,
          zIndex: 5,
          backgroundColor: "#272727",
          //shadowOpacity: 0.5,
          //shadowRadius:5,
          borderRadius: 100,
          marginRight: 85,
          marginLeft: 15,
          marginBottom: 30,
          alignItems: 'center',
        }}>
        <Appbar.Action style={{
          flex: 1,
        }} icon="map-search" onPress={() => {
          setVisible(true)
        }} />
        <Appbar.Content
          style={{ zIndex: 4, flex: 4, }}
          titleStyle={{ fontSize: 17 }}
          title={labelAppBar} />
        <Switch
          style={{ flex: 2 }}
          value={isSwitchOn}
          onValueChange={onToggleSwitch} />


      </Appbar>

      <FloatinMenu navigation={navigation} />


      <MapView
        showsUserLocation={true}
        initialRegion={{
          latitude: location ? location.latitude : -17.783390,
          longitude: location ? location.longitude : -63.180249,
          latitudeDelta: 0.1022,
          longitudeDelta: 0.0521,
        }}
        onUserLocationChange={(e) => {
          sesion ? saveLocation(e.nativeEvent.coordinate) : null
        }}
        userInterfaceStyle={'dark'}
        customMapStyle={mapStyleDark}
        style={{
          zIndex: -1,
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >

        <Polyline
          coordinates={polyline}
          strokeColor="#4c8ff5"
          //fillColor="rgba(255, 0, 0, 0.5)"
          strokeWidth={4}
        ></Polyline>

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
        {ruta.waypoints.map(marker => (
          (marker.waypoint.stopover === true) ?
            <Marker
              key={marker.waypoint.location.lat}
              coordinate={{
                latitude: marker.waypoint.location.lat,
                longitude: marker.waypoint.location.lng
              }}
              title={
                new Date(marker.time).getHours().toString().padStart(2, '0') + ":"
                + new Date(marker.time).getMinutes().toString().padStart(2, '0')
              }
              pinColor='#ff860d'
            /> : null

        )
        )}
        <Marker
          pinColor='#ffd70d'
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

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}
          style={{
            backgroundColor: "#121212b3", padding: 15,
          }}
        >
          <Dialog.Title>Horarios de ruta</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView >
              <List.Item
                title={
                  new Date(ruta.origin.time).getHours().toString().padStart(2, '0') + ":"
                  + new Date(ruta.origin.time).getMinutes().toString().padStart(2, '0')
                }
                description="Inicio"
                left={props => <List.Icon {...props} icon="map-marker-circle" color='#ff210d' />}

              /> 
              {ruta.waypoints.map(marker => (
                (marker.waypoint.stopover === true) ?
                  <List.Item
                    key={marker.waypoint.location.lat}
                    title={
                      new Date(marker.time).getHours().toString().padStart(2, '0') + ":"
                      + new Date(marker.time).getMinutes().toString().padStart(2, '0')
                    }
                    description="Parada"
                    left={props => <List.Icon {...props} icon="map-marker-circle" color='#ff860d' />}
                  />
                  : null

              )
              )}
              <List.Item
                title={
                  new Date(ruta.destination.time).getHours().toString().padStart(2, '0') + ":"
                  + new Date(ruta.destination.time).getMinutes().toString().padStart(2, '0')
                }
                description="Final"
                left={props => <List.Icon {...props} icon="map-marker-circle" color='#ffd70d' />}

              />
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>

    </SafeAreaView>
  )
}


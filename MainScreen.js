import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableNativeFeedback,
  Dimensions,
  TextInput,
  PermissionsAndroid,
  Button
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CARD_WIDTH = (screenWidth * 0.8);

Geocoder.init("AIzaSyD2oqHl_llg79GSg5_-e5Ne4qtYPZ1tuA0")

const mapStyle = [
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]



const MainScreen = () =>  {
  const [ address, setAddress ] = useState('Swagat Apartment, Anand Mahal Road, Adajan, Surat, Gujarat');
  // const [ address, setAddress ] = useState('');
  async function requestLocationPermission() {
    const checkLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (checkLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      alert("You've access for the location");
    } else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'App requires Location permission',
            'message': 'We required Location permission in order to show mearby restaurants '
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              console.log(position.coords.longitude, position.coords.latitude);
              // Geocoder.from(41.89, 12.49)
              // .then(json => {
              //   var addressComp = json.results[0].address_components[0];
              //   console.log(addressComp);
              // })
              // .catch(err => console.log(err))
            },
            (error) => {
              console.log(error.message);
            },
            {  
              enableHighAccuracy: true, 
              timeout: 15000, 
              maximumAge: 10000  }
            );
        } else {
          alert("You don't have access for the location");
        }
      } catch (err) {
        alert(err)
      }
    }
  };

  useEffect(() => {
    const granted = false;
    requestLocationPermission();

    // Geolocation.getCurrentPosition((position) => {
    //   console.log(position)
    // },
    // (err) => {
    //   console.log(err.code, err.message)
    // },
    // {
    //   enableHighAccuracy: true,
    //   timeout: 10000,
    //   maximumAge: 10000
    // }
    // )

    return console.log("done")
  }, [])


  return (
    <View style={styles.mainAppStackView}>
      <StatusBar 
        translucent={true}
        barStyle="dark-content"
        backgroundColor="#ffffff00"
      />
      <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={mapStyle}
        
      >
      </MapView>


      {/* <View style={styles.searchBarContainer} /> */}
      {/* <LinearGradient 
        style={styles.bottomGrad}
        colors={['#ffffff00', '#ffffff75','#ffffff']}
      /> */}

      <View style={styles.searchBarMainContainer}>
        <Text 
          style={styles.userAddressText}
          numberOfLines={1}
        >
          {address}
        </Text>
      </View>
      <View 
        style={styles.cardsViewContainer}
      >
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingRight: (screenWidth - (screenWidth * 0.9)) / 2,
            paddingLeft: 10
          }}
          snapToInterval={  CARD_WIDTH + 20 }
          snapToAlignment="center"

        >
          <View style={styles.mainCardViewContainer}>
            <View style={styles.cardDistanceContainer} />
            <View style={styles.mainCard} />
          </View>
          <View style={styles.mainCardViewContainer}>
            <View style={styles.cardDistanceContainer} />
            <View style={styles.mainCard} />
          </View>
          <View style={styles.mainCardViewContainer}>
            <View style={styles.cardDistanceContainer} />
            <View style={styles.mainCard} />
          </View>
          <View style={styles.mainCardViewContainer}>
            <View style={styles.cardDistanceContainer} />
            <View style={styles.mainCard} />
          </View>
          <View style={styles.mainCardViewContainer}>
            <View style={styles.cardDistanceContainer} />
            <View style={styles.mainCard} />
          </View>
        </ScrollView>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainAppStackView: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // searchBarContainer: {
  //   width: screenWidth * 0.9,
  //   height: 60,
  //   position: 'absolute',
  //   zIndex: 10,
  //   backgroundColor: '#fff',
  //   top: StatusBar.currentHeight + ((screenWidth - (screenWidth * 0.9)) / 2),
  //   marginLeft: (screenWidth - (screenWidth * 0.9)) / 2,
  //   marginRight: (screenWidth - (screenWidth * 0.9)) / 2,
  //   elevation: 8,
  //   borderRadius: 8
  // },
  bottomGrad: {
    width: screenWidth,
    height: 300,
    position: 'absolute',
    bottom: 0,
    zIndex: 1
  },
  cardsViewContainer: {
    // backgroundColor: 'transparent',
    // backgroundColor: 'red',
    width: screenWidth,
    height: 'auto',
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    paddingBottom: 20,
    // paddingBottom: (screenWidth - (screenWidth * 0.9)) / 2,
  },
  searchBarMainContainer: {
    // height: StatusBar.currentHeight + 65,
    height: 65,
    width: screenWidth * 0.9,
    backgroundColor: '#fff',
    elevation: 8,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    top: StatusBar.currentHeight + 10,
    left: (screenWidth - (screenWidth * 0.9)) / 2,
    right: (screenWidth - (screenWidth * 0.9)) / 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25
  },
  userAddressText: {
    fontFamily: 'Product-Sans-Regular',
    fontSize: 17,
    color: '#333'
  },
  mainCardViewContainer: {
    width: CARD_WIDTH + 20,
    // backgroundColor: 'red',
    height: 315,
    flexDirection: 'column',
    alignItems: 'center'
  },
  mainCard: {
    height: 200,
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#eee',
    elevation: 5
  },
  cardDistanceContainer: {
    height: 90,
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#eee',
    elevation: 5,
    marginBottom: 15
  }
})

export default MainScreen;
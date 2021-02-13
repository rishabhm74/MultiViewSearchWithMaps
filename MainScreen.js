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
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';
import uuid from 'react-native-uuid';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import SearchListBlock from './components/SearchListBlock';
import MapSearchCardsBlock from './components/MapSearchCardsBlock';
import RestaurantData from './models/RestaurantData';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CARD_WIDTH = (screenWidth * 0.7);

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
  const [ listView, setListView ] = useState(!true);
  // const [ address, setAddress ] = useState('');





  const viewChangeHandler = (listView) => {
    setListView(!listView)
  }
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
              Geocoder.from(41.89, 12.49)
              .then(json => {
                var addressComp = json.results[0].address_components[0];
                console.log(addressComp);
              })
              .catch(err => console.log(err))
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
    // requestLocationPermission();

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


  const searchListBlockEls = RestaurantData.map(item => 
    <SearchListBlock 
      key = {item.restaurantId}
      restaurantName = {item.restaurantName}
      restaurantData = {item.restaurantData}
    />
  )

  const mapCardsBlocksEls = RestaurantData.map(item => 
    <MapSearchCardsBlock 
      key = {item.restaurantId}
      restaurantName = {item.restaurantName}
      restaurantData = {item.restaurantData}
    />
  )


  return (
    <View style={styles.mainAppStackView}>
      <StatusBar 
        translucent={true}
        barStyle="dark-content"
        backgroundColor="#ffffff00"
      />

      <View style={styles.searchBarMainContainer}>
        <Text 
          style={styles.userAddressText}
          numberOfLines={1}
        >
          {address}
        </Text>
      </View>

      <TouchableNativeFeedback
        onPress={() => viewChangeHandler(listView)}
      >
        <View 
          style={[styles.viewChangerContainer, {
            bottom: listView === true ? (screenWidth - (screenWidth * 0.9)) / 2 : 360

          }]}
        >
          {
            listView === true ?
            <Image 
              source={require('./assets/icons/mapView4.png')}
              style={[styles.viewChangerImg, { height: 28, width: 28 }]}
            /> : 
            <Image 
              source={require('./assets/icons/menuView.png')}
              style={[styles.viewChangerImg, { height: 25, width: 25 }]}
            /> 
            
          }
        </View>
      </TouchableNativeFeedback>


      
      {
        listView === true ?
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: StatusBar.currentHeight + 105
          }}
        >
          <View style={styles.searchBlocksViewContainer}>
            {searchListBlockEls}
          </View>
        </ScrollView> :
        <>
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
          />
          <View style={styles.mapSearchCardsContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 20
              }}
            >
              {mapCardsBlocksEls}
            </ScrollView>
          </View>
        </>
        
        
      }
      

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
  searchBarMainContainer: {
    // height: StatusBar.currentHeight + 65,
    height: 62.5,
    width: screenWidth * 0.9,
    backgroundColor: '#fff',
    elevation: 8,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    top: StatusBar.currentHeight + 20,
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
  viewChangerContainer: {
    position: 'absolute',
    zIndex: 5,
    // bottom: (screenWidth - (screenWidth * 0.9)) / 2,
    // bottom: 355,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
    right: (screenWidth - (screenWidth * 0.9)) / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewChangerImg: {
    height: 30,
    width: 30
  },
  searchBlocksViewContainer: {
    width: screenWidth,
    height: 'auto',
    // backgroundColor: 'red',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 0
  },
  mapSearchCardsContainer: {
    width: screenWidth,
    height: 340,
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: 0
  },
  mapsCardBackgroundGrad: {
    height: '100%',
    width: '100%'
  },

})

export default MainScreen;
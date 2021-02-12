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
  TouchableOpacity
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
  const [ listView, setListView ] = useState(true);
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
        <View style={styles.viewChangerContainer}>
          {
            listView === true ?
            <Image 
              source={require('./assets/icons/mapView.png')}
              style={styles.viewChangerImg}
            /> : 
            <Image 
              source={require('./assets/icons/menuView.png')}
              style={styles.viewChangerImg}
            /> 
            
          }
        </View>
      </TouchableNativeFeedback>


      
      {
        listView === true ?
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: StatusBar.currentHeight + 10 + 65 + 20
          }}
        >
          <View style={styles.searchBlocksViewContainer}>

            <View style={styles.mainSearchBlockView}>
              <View style={styles.searchBlock}>
                <View style={styles.searchBlockLeft}>
                  <View style={styles.restaurantImgView}>
                    <Image 
                      source={require('./assets/images/restaurants/1.jpg')}
                      style={styles.restaurantImg}
                    />
                  </View>
                </View>
                <View style={styles.searchBlockCenter}>
                  <Text style={styles.restaurantName}>
                    Dil Se Re Restaurant
                  </Text>
                  <Text style={styles.specialitiesTitle}>
                    Specialities
                  </Text>
                  <View style={styles.specialitiesBlocksContainer}>
                  
                  </View> 
                </View>
                <View style={styles.searchBlockRight}>
                  <Image 
                    source={require('./assets/icons/heartInactive.png')}
                    style={styles.heartImg}
                  />
                </View>
              </View>
              <View style={styles.borderBottomSearchBlock} />
            </View>

            <View style={styles.mainSearchBlockView}>
              <View style={styles.searchBlock}>
                <View style={styles.searchBlockLeft}>
                  <View style={styles.restaurantImgView}>
                    <Image 
                      source={require('./assets/images/restaurants/2.jpg')}
                      style={styles.restaurantImg}
                    />
                  </View>
                </View>
                <View style={styles.searchBlockCenter}>
                  <Text style={styles.restaurantName}>
                    Dil Se Re Restaurant
                  </Text>
                  <Text style={styles.specialitiesTitle}>
                    Specialities
                  </Text>
                  <View style={styles.specialitiesBlocksContainer}>
                  
                  </View> 
                </View>
                <View style={styles.searchBlockRight}>
                  <Image 
                    source={require('./assets/icons/heartInactive.png')}
                    style={styles.heartImg}
                  />
                </View>
              </View>
              <View style={styles.borderBottomSearchBlock} />
            </View>

            <View style={styles.mainSearchBlockView}>
              <View style={styles.searchBlock}>
                <View style={styles.searchBlockLeft}>
                  <View style={styles.restaurantImgView}>
                    <Image 
                      source={require('./assets/images/restaurants/3.jpg')}
                      style={styles.restaurantImg}
                    />
                  </View>
                </View>
                <View style={styles.searchBlockCenter}>
                  <Text style={styles.restaurantName}>
                    Dil Se Re Restaurant
                  </Text>
                  <Text style={styles.specialitiesTitle}>
                    Specialities
                  </Text>
                  <View style={styles.specialitiesBlocksContainer}>
                  
                  </View> 
                </View>
                <View style={styles.searchBlockRight}>
                  <Image 
                    source={require('./assets/icons/heartInactive.png')}
                    style={styles.heartImg}
                  />
                </View>
              </View>
              <View style={styles.borderBottomSearchBlock} />
            </View>

            <View style={styles.mainSearchBlockView}>
              <View style={styles.searchBlock}>
                <View style={styles.searchBlockLeft}>
                  <View style={styles.restaurantImgView}>
                    <Image 
                      source={require('./assets/images/restaurants/4.jpg')}
                      style={styles.restaurantImg}
                    />
                  </View>
                </View>
                <View style={styles.searchBlockCenter}>
                  <Text style={styles.restaurantName}>
                    Dil Se Re Restaurant
                  </Text>
                  <Text style={styles.specialitiesTitle}>
                    Specialities
                  </Text>
                  <View style={styles.specialitiesBlocksContainer}>
                  
                  </View> 
                </View>
                <View style={styles.searchBlockRight}>
                  <Image 
                    source={require('./assets/icons/heartInactive.png')}
                    style={styles.heartImg}
                  />
                </View>
              </View>
              <View style={styles.borderBottomSearchBlock} />
            </View>

            <View style={styles.mainSearchBlockView}>
              <View style={styles.searchBlock}>
                <View style={styles.searchBlockLeft}>
                  <View style={styles.restaurantImgView}>
                    <Image 
                      source={require('./assets/images/restaurants/5.jpg')}
                      style={styles.restaurantImg}
                    />
                  </View>
                </View>
                <View style={styles.searchBlockCenter}>
                  <Text style={styles.restaurantName}>
                    Dil Se Re Restaurant
                  </Text>
                  <Text style={styles.specialitiesTitle}>
                    Specialities
                  </Text>
                  <View style={styles.specialitiesBlocksContainer}>
                  
                  </View> 
                </View>
                <View style={styles.searchBlockRight}>
                  <Image 
                    source={require('./assets/icons/heartInactive.png')}
                    style={styles.heartImg}
                  />
                </View>
              </View>
              <View style={styles.borderBottomSearchBlock} />
            </View>

            <View style={styles.mainSearchBlockView}>
              <View style={styles.searchBlock}>
                <View style={styles.searchBlockLeft}>
                  <View style={styles.restaurantImgView}>
                    <Image 
                      source={require('./assets/images/restaurants/6.jpg')}
                      style={styles.restaurantImg}
                    />
                  </View>
                </View>
                <View style={styles.searchBlockCenter}>
                  <Text style={styles.restaurantName}>
                    Dil Se Re Restaurant
                  </Text>
                  <Text style={styles.specialitiesTitle}>
                    Specialities
                  </Text>
                  <View style={styles.specialitiesBlocksContainer}>
                  
                  </View> 
                </View>
                <View style={styles.searchBlockRight}>
                  <Image 
                    source={require('./assets/icons/heartInactive.png')}
                    style={styles.heartImg}
                  />
                </View>
              </View>
              <View style={styles.borderBottomSearchBlock} />
            </View>

          </View>
        </ScrollView> :
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
  },
  viewChangerContainer: {
    position: 'absolute',
    zIndex: 5,
    bottom: (screenWidth - (screenWidth * 0.9)) / 2,
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
    paddingTop: 10
  },
  searchBlock: {
    width: screenWidth * 0.9,
    height: 105,
    backgroundColor: 'red',
    // borderRadius: 8,
    backgroundColor: '#fff',
    // elevation: 5,
    // marginBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
   
  },
  borderBottomSearchBlock: {
    width: screenWidth * 0.75,
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchBlockLeft: {
    height: '100%',
    // backgroundColor: 'red',
    width: '30%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 7
  },
  searchBlockCenter: {
    height: '100%',
    // backgroundColor: 'green',
    width: '55%'
  },
  searchBlockRight: {
    height: '100%',
    width: '15%',
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  restaurantImgView: {
    width: (screenWidth* 0.20),
    height: (screenWidth* 0.20),
    backgroundColor: '#ccc',
    borderRadius: (screenWidth* 0.20) * 0.15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  restaurantImg: {
    height: '100%',
    width: '100%'
  },
  heartImg: {
    height: 25,
    width: 25,
    opacity: 0.3
  },
  restaurantName: {
    fontFamily: 'Product-Sans-Regular',
    fontSize: 18,
    color: '#333',
    marginBottom: 5
  },
  specialitiesTitle: {
    fontFamily: 'Product-Sans-Regular',
    fontSize: 12,
    color: '#ccc',
    marginBottom: 8
  },
  specialitiesBlocksContainer: {
    flexDirection: 'row',
    // overflow: 'hidden',
    width: '100%'
  },
  mainSearchBlockView: {
    marginBottom: 45
  }
})

export default MainScreen;
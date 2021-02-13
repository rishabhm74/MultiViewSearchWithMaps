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
            paddingTop: StatusBar.currentHeight + 115
          }}
        >
          <View style={styles.searchBlocksViewContainer}>

            <View style={styles.mainSearchBlockView}>
              <View style={styles.searchBlock}>
                <View style={styles.searchBlockLeft}>
                  <Image 
                    source={require('./assets/images/restaurants/1.jpg')}
                    style={styles.restaurantImage}
                  />
                </View>
                <View style={styles.searchBlockRight}>
                  <View style={styles.restaurantNameContainer}>
                    <Text
                      style={styles.restaurantNameText}
                      numberOfLines={1}
                    >
                      Dil Se Re Restaurant
                    </Text>
                  </View>
                  <View style={styles.restaurantDataContainer}>
                    <View style={styles.restaurantDataContainerLeft}>
                      <Text style={styles.specialityTitle}>
                        Speciality
                      </Text>
                      <View style={styles.specialitiesBlockContainer}>
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                        >
                          <View style={styles.specialityBlockView}>
                            <Text style={styles.specialityBlockViewText}>
                              Gujarati
                            </Text>
                          </View>
                          <View style={styles.specialityBlockView}>
                            <Text style={styles.specialityBlockViewText}>
                              Maharastrian
                            </Text>
                          </View>
                          <View style={styles.specialityBlockView}>
                            <Text style={styles.specialityBlockViewText}>
                              Madwadi
                            </Text>
                          </View>
                          <View style={styles.specialityBlockView}>
                            <Text style={styles.specialityBlockViewText}>
                              Chinese
                            </Text>
                          </View>
                        </ScrollView>
                      </View>
                      <View style={styles.restaurantCurrentStateView}>
                        <Text style={styles.currentStateText}>
                          Open
                        </Text>
                        <View style={styles.timingBreakView} />
                        <Text style={styles.closesText}>
                          Closes 9 PM
                        </Text>
                      </View>
                      <View style={styles.reviewsContainer}>
                        <Text style={styles.ratingValueText}>
                          4
                        </Text>
                        <View style={styles.ratingStarsContainer}>
                          <Image 
                            source={require('./assets/icons/star.png')}
                            style={styles.starImg}
                          />
                          <Image 
                            source={require('./assets/icons/star.png')}
                            style={styles.starImg}
                          />
                          <Image 
                            source={require('./assets/icons/star.png')}
                            style={styles.starImg}
                          />
                          <Image 
                            source={require('./assets/icons/star.png')}
                            style={styles.starImg}
                          />
                        </View>
                        <Text style={styles.totalReviews}> 
                          (45)
                        </Text>
                      </View>
                    </View>
                    <View style={styles.restaurantDataContainerRight}>
                      <Image 
                        source={require('./assets/icons/heartActive.png')}
                        style={styles.heartImg}
                      />
                    </View>
                  </View>
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
  mainSearchBlockView: {
    marginBottom: 45,
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'flex-end',
    flexDirection: 'column',
  },
  searchBlock: {
    width: screenWidth * 0.9,
    height: 'auto',
    // minHeight: (( screenWidth * 0.9) * 0.35) + 20,
    minHeight: 150,
    // backgroundColor: 'grey',
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 15
  },
  borderBottomSearchBlock: {
    width: screenWidth * 0.8,
    // width: screenWidth * 0.65,
    height: 1,
    backgroundColor: '#eee',
    // marginRight: 5
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
  searchBlockLeft: {
    height: '100%',
    // backgroundColor: 'grey',
    width: '37%',
    // paddingTop: 10,
    justifyContent: 'center'
  },
  searchBlockRight: {
    height: '100%',
    // backgroundColor: 'blue',
    width: '63%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  restaurantImage: {
    // height: ( screenWidth * 0.9) * 0.30,
    // width: ( screenWidth * 0.9) * 0.30,
    // borderRadius: ( screenWidth * 0.9) * 0.02
    height: 120,
    width: 120,
    borderRadius: 10
  },
  restaurantNameContainer: {
    width: '100%',
    height: 30,
    // backgroundColor: 'green'
  },
  restaurantNameText: {
    color: '#333',
    fontFamily: 'Product-Sans-Regular',
    fontSize: 20
  },
  restaurantDataContainer: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  restaurantDataContainerLeft: {
    height: '100%',
    width: '85%',
    // backgroundColor: 'red'
  },
  restaurantDataContainerRight: {
    height: '100%',
    width: '15%',
    // backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 25
  },
  specialityTitle: {
    fontSize: 13,
    color: '#ccc',
    fontFamily: 'Product-Sans-Regular'
  },
  heartImg: {
    height: 20,
    width: 20
  },
  specialitiesBlockContainer: {
    height: 45,
    width: '100%',
    // backgroundColor: 'red',
    paddingTop: 6
  },
  specialityBlockView: {
    justifyContent: 'center',
    alignItems:'center',
    borderWidth: 1,
    // borderColor: '#333',
    borderColor: 'orange',
    backgroundColor: 'orange',
    paddingLeft: 16,
    paddingRight: 16,
    height: 38,
    borderRadius: 5,
    marginRight: 7
  },
  specialityBlockViewText: {
    fontSize: 16,
    color: '#fff',
    // color: '#555',
    fontFamily: 'Product-Sans-Regular'
  },
  restaurantCurrentStateView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8
  },
  timingBreakView: {
    height: 5,
    width: 5,
    backgroundColor: '#ccc',
    borderRadius:10,
    marginLeft: 7,
    marginRight: 7
  },
  currentStateText: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'Product-Sans-Regular'
  },
  closesText: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'Product-Sans-Regular'
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 2.5
  },
  starImg: {
    height: 20,
    width: 20,
    marginRight: 2.5,
  }
})

export default MainScreen;
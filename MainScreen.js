import React, { useState, useEffect, useRef } from 'react';
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
  FlatList,
  Animated
} from 'react-native';
import uuid from 'react-native-uuid';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import SearchListBlock from './components/SearchListBlock';
import MapSearchCardsBlock from './components/MapSearchCardsBlock';
import RestaurantData from './models/RestaurantData';
import MapStyle from './src/MapStyle';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CARD_WIDTH = (screenWidth * 0.7);

Geocoder.init("key")




const MainScreen = () =>  {
  const [ address, setAddress ] = useState('Swagat Apartment, Anand Mahal Road, Adajan, Surat, Gujarat');
  const [ listView, setListView ] = useState(true);
  // const [ address, setAddress ] = useState('');

  const initialRegion = {
    latitude: 22.62938671242907,
    longitude: 88.4384486029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta:0.040142817690068,
  }

  let listViewHandlerBottomValue = new Animated.Value(20)
  const [ listViewHandlerBottomState, setListViewHandlerBottomState ] = useState(true);

  const listViewHandlerAnimation = () => {
    if ( listViewHandlerBottomState == true ) {
      Animated.timing(listViewHandlerBottomValue, {
        toValue : 360,
        timing : 0,
        useNativeDriver: false
      }).start(() => {
        setListViewHandlerBottomState(false)
      })
    } else {
      Animated.timing(listViewHandlerBottomValue, {
        toValue : 20,
        timing : 0,
        useNativeDriver: false
      }).start(() => {
        setListViewHandlerBottomState(true)
      })
    }
  }


  const listViewHandlerBottomAnimatedStyle = {
    bottom: listViewHandlerBottomValue
  }



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

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      // console.log(index)
      if ( index >= RestaurantData.length ) {
        console.log(index)
        index = RestaurantData.length - 1;
      } 
      if ( index <= 0 ) {
        index = 0
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          // console.log(" mapIndex ", mapIndex)
          const { coordinate } = RestaurantData[index];
           _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: initialRegion.latitudeDelta,
                longitudeDelta: initialRegion.longitudeDelta
              },
              350
           );
        }
      }, 10)
    })
  });


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

  const interpolations = RestaurantData.map(( marker, index ) => {
    const inputRange = [
      (index - 1 ) + CARD_WIDTH,
      index + CARD_WIDTH,
      ((index + 1) + CARD_WIDTH)
    ];
    
    const scale = mapAnimation.interpolate({
      inputRange: inputRange,
      outputRange: [ 1, 1.5, 1],
      extrapolate: 'clamp'
    });

    return { scale };
  })

  
  const onMarkerPress = (mapEventData) => {
    const markerId = mapEventData._targetInst.return.key;
    let x = (markerId * CARD_WIDTH) + ( markerId * 20 );
    _scrollView.current.scrollTo({ x: x, y:0, animated: true })
    // console.log("marker id ", markerId)
    // console.log("x ", x)
    // console.log("_scrollview ", _scrollView.current)
  }

  const _map = useRef(null);
  // var _scrollView = React.createRef(null);
  const _scrollView = useRef(null);



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
        // onPress={() => listViewHandlerAnimation()}
      >
        <View 
          style={styles.viewChangerContainer}
        >
        {/* <Animated.View 
          style={[styles.viewChangerContainer, listViewHandlerBottomAnimatedStyle]}
        > */}
          {
            // listViewHandlerBottomState === true ?
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
        {/* </Animated.View> */}
      </TouchableNativeFeedback>


      
      {
        // listViewHandlerBottomState === true ?
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
            region={initialRegion}
            customMapStyle={MapStyle}
            ref={_map}
          >
            <Marker 
              coordinate={{
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude
              }}
            >
              <Image 
                source={require('./assets/icons/markerCircle.png')}
                resizeMode="contain"
                style={{ height: 25,width: 25 }}
              />
            </Marker>
            {
              RestaurantData.map(( marker, index ) => {
                const scaleStyle = {
                  transform: [
                    {
                      scale: interpolations[index].scale,
                    },
                  ],
                }
                return (
                  <MapView.Marker 
                    key={index} 
                    coordinate={marker.coordinate} 
                    onPress={(e) => onMarkerPress(e)}
                  >
                    <Animated.View style={[styles.markerWrap]}>
                      <Animated.Image 
                        source={require('./assets/icons/restaurantMarker.png')}
                        style={[styles.marker, scaleStyle]}
                        resizeMode="cover"
                      />
                    </Animated.View>
                  </MapView.Marker>
                )
              })
            }

          </MapView>
          <View style={styles.mapSearchCardsContainer}>
            <Animated.ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 20
              }}
              scrollEventThrottle={1}
              pagingEnabled
              snapToInterval={CARD_WIDTH + 20}
              snapToAlignment="center"
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: mapAnimation,
                      }
                    }
                  }
                ],
                {
                  useNativeDriver: true
                }
              )}
              ref={_scrollView}
            >
              {/* {mapCardsBlocksEls} */}
              {
                RestaurantData.map(item => 
                  <MapSearchCardsBlock 
                    key = {item.restaurantId}
                    restaurantName = {item.restaurantName}
                    restaurantData = {item.restaurantData}
                  />
                )
              }
            </Animated.ScrollView>
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
    // right: (screenWidth - (screenWidth * 0.9)) / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20
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
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  },
  marker: {
    height: 25,
    width: 25
  }

})

export default MainScreen;

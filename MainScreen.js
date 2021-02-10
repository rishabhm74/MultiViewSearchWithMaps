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
  TextInput
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CARD_WIDTH = (screenWidth * 0.6);

const MainScreen = () =>  {


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
        
      >
      </MapView>


      <View style={styles.searchBarContainer} />
      {/* <LinearGradient 
        style={styles.bottomGrad}
        colors={['#ffffff00', '#ffffff75','#ffffff']}
      /> */}
      <View 
        style={styles.cardsViewContainer}
      >
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingRight: (screenWidth - (screenWidth * 0.9)) / 2
          }}
          snapToInterval={ (screenWidth * 0.5)  }
          snapToAlignment="center"

        >
          <View style={styles.mainCard} />
          <View style={styles.mainCard} />
          <View style={styles.mainCard} />
          <View style={styles.mainCard} />
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
    backgroundColor: '#141414',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBarContainer: {
    width: screenWidth * 0.9,
    height: 60,
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#fff',
    top: StatusBar.currentHeight + ((screenWidth - (screenWidth * 0.9)) / 2),
    marginLeft: (screenWidth - (screenWidth * 0.9)) / 2,
    marginRight: (screenWidth - (screenWidth * 0.9)) / 2,
    elevation: 8,
    borderRadius: 8
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
    paddingBottom: (screenWidth - (screenWidth * 0.9)) / 2
  },
  mainCard: {
    height: 300,
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: (screenWidth - (screenWidth * 0.9)) / 2,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 8
  }
})

export default MainScreen;
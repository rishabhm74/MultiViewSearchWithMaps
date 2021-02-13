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
import LinearGradient from 'react-native-linear-gradient';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CARD_WIDTH = (screenWidth * 0.7);



const MapSearchCardsBlock = (props) => {
  const starNumbers = props.restaurantData.restaurantRating;
  let stars = [];

  const restaurantSpecialitiesListEls = props.restaurantData.restaurantSpecialities.map(restaurantSpeciality => 
    <View 
      style={styles.specialityBlockView} 
      key={uuid.v4()}
    >
      <Text style={styles.specialityBlockViewText}>
        {restaurantSpeciality}
      </Text>
    </View>
  );

  for (var i = 1; i <= 5; i++) {
    if ( i > starNumbers) {
      stars.push((<Image source={require('../assets/icons/starInactive.png')}
      style={styles.starImg} key={i} />))
    } else {
      stars.push((<Image source={require('../assets/icons/star.png')}
      style={styles.starImg} key={i} />))
    }
    
  }



  return (
    <View style={styles.mainMapCardView}>
      <Image 
        source={props.restaurantData.restaurantImgUrl}
        style={styles.mapCardMainImg}
      />
      <View style={styles.mainMapCardRestaurantDataView}>
        <LinearGradient
          style={styles.restaurantDataContainerGradient}
          colors={[ 'transparent', '#14141475', '#141414' ]}
        >
          <View style={styles.mapRestaurantDataContainerInner}>
            <View style={styles.restaurantDataContainerInnerBottom}>
              <View style={styles.restaurantNameContainer}>
                <Text 
                  style={styles.restaurantNameText}
                  numberOfLines={1}
                >
                  {props.restaurantName}
                </Text>
              </View>
              <View style={styles.mapRestaurantDataContainerMain}>
                <View style={styles.restaurantDataContainerMid}>
                  <View style={styles.specialityTitleTextView}>
                    <Text style={styles.specialityTitleText}>
                      Speciality
                    </Text>
                  </View>
                  <View style={styles.specialitiesBlockContainer}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        paddingLeft: 15
                      }}
                    >
                      {restaurantSpecialitiesListEls}
                    </ScrollView>
                  </View>
                  <View style={styles.restaurantCurrentStateView}>
                    <Text style={[styles.currentStateText,
                    {
                      color: props.restaurantData.currentState === "Closed" ? "#ff6e6e" : '#fff'
                    }]}>
                      {props.restaurantData.currentState}
                    </Text>
                    <View style={styles.timingBreakView} />
                    <Text style={styles.closesText}>
                      Closes {props.restaurantData.closingTime} PM
                    </Text>
                  </View>
                  <View style={styles.reviewsContainer}>
                    <Text style={styles.ratingValueText}>
                      {starNumbers}
                    </Text>
                    <View style={styles.ratingStarsContainer}>
                      {stars}
                    </View>
                    <Text style={styles.totalReviews}> 
                      ({props.restaurantData.totalRatings})
                    </Text>
                  </View>

                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainMapCardView: {
    width: CARD_WIDTH,
    height: 320,
    // backgroundColor: 'red',
    borderRadius: 10,
    marginRight: 20
  },
  mapCardMainImg: {
    height: '100%',
    width: '100%',
    borderRadius: 10
  },
  mainMapCardRestaurantDataView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    // backgroundColor: 'red',
    borderRadius: 10
  },
  restaurantDataContainerGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  mapRestaurantDataContainerInner: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'flex-end'
  },
  restaurantDataContainerInnerBottom: {
    height: 320 * 0.525,
    width: '100%',
    // backgroundColor: 'red',
    borderRadius: 10
  },
  restaurantNameContainer: {
    width: '100%',
    // backgroundColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    height: 35
  },
  restaurantNameText: {
    color: '#fff',
    fontFamily: 'Product-Sans-Regular',
    fontSize: 23
  },
  mapRestaurantDataContainerMain: {
    width: '100%',
    height:  (320 * 0.525) - 35,
    // backgroundColor: 'red'
  },
  restaurantDataContainerMid: {
    height: '100%',
    width: '100%',
  },
  specialityTitleTextView: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  specialityTitleText: {
    fontSize: 13.5,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular'
  },
  mapRestaurantDataCardScrollviewView: {
    width: '100%',
    height: 60,
    backgroundColor: 'red',
  },
  specialitiesBlockContainer: {
    height: 50,
    width: '100%',
    // backgroundColor: 'red',
    paddingTop: 7,
    // paddingLeft: 15,
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // paddingLeft: 15,
    // overflow: 'scroll',
    // scrol
  },
  specialityBlockView: {
    justifyContent: 'center',
    alignItems:'center',
    borderWidth: 1,
    // borderColor: '#333',
    borderColor: '#ffffff50',
    backgroundColor: '#ffffff50',
    paddingLeft: 16,
    paddingRight: 16,
    height: 38,
    borderRadius: 5,
    marginRight: 7,
    marginBottom: 7
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
    paddingTop: 2,
    paddingBottom: 8,
    paddingLeft: 15,
  },
  timingBreakView: {
    height: 5,
    width: 5,
    backgroundColor: '#fff',
    borderRadius:10,
    marginLeft: 7,
    marginRight: 7
  },
  currentStateText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular'
  },
  closesText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular'
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 2.5,
    marginRight: 2.5
  },
  starImg: {
    height: 20,
    width: 20,
    marginRight: 2.5,
  },
  ratingValueText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular',
    marginRight: 2
  },
  totalReviews: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular'
  }

})


export default MapSearchCardsBlock;
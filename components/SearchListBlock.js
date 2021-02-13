import React from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CARD_WIDTH = (screenWidth * 0.8);


const SearchListBlock = (props) => {
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
    <View style={styles.searchBlockMain} >
      <Image 
        source={props.restaurantData.restaurantImgUrl}
        style={styles.restaurantMainImg}
      />
      <View style={styles.restaurantDataContainer}>
        <LinearGradient
          style={styles.restaurantDataContainerGradient}
          colors={[ 'transparent', '#14141475', '#141414' ]}
        >
          <View style={styles.restaurantDataContainerInner}>
            <View style={styles.restaurantDataContainerInnerBottom}>
              <View style={styles.restaurantNameContainer}>
                <Text 
                  style={styles.restaurantNameText}
                  numberOfLines={1}
                >
                  {props.restaurantName}
                </Text>
              </View>
              <View style={styles.restaurantDataContainerMain}>
                <View style={styles.restaurantDataContainerLeft}>
                  <View style={styles.specialityTitleTextView}>
                    <Text style={styles.specialityTitleText}>
                      Speciality
                    </Text>
                  </View>
                  <View style={styles.specialitiesBlockContainer}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {restaurantSpecialitiesListEls}
                      {/* <View style={styles.specialityBlockView}>
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
                      </View> */}
                    </ScrollView>
                  </View>
                  <View style={styles.restaurantCurrentStateView}>
                    <Text style={styles.currentStateText}>
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
                      {/* <Image 
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
                      /> */}
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
  searchBlockMain: {
    height: 280,
    width: (screenWidth * 0.9),
    borderRadius: 10,
    marginBottom: 15
  },
  restaurantMainImg: {
    height: '100%',
    width: '100%',
    borderRadius: 10
  },
  restaurantDataContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    // backgroundColor: '#00000099',
    position: 'absolute',
    top: 0,
    zIndex: 1
  },
  restaurantDataContainerGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  restaurantDataContainerInner: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  restaurantDataContainerInnerBottom: {
    backgroundColor: 'transparent',
    // backgroundColor: 'red',
    height: 280 * 0.58,
    borderRadius: 10,
  },
  restaurantNameContainer: {
    width: '100%',
    // backgroundColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    height: 32
  },
  restaurantNameText: {
    color: '#fff',
    fontFamily: 'Product-Sans-Regular',
    fontSize: 23
  },
  restaurantDataContainerMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: (280 * 0.58) - 32,
    // backgroundColor: 'red'
  },
  restaurantDataContainerLeft: {
    height: '100%',
    width: '100%',
    // width: '85%',
    // backgroundColor: 'green'
  },
  restaurantDataContainerRight: {
    height: '100%',
    width: '15%',
    // backgroundColor: 'blue'
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
  specialitiesBlockContainer: {
    height: 50,
    width: '100%',
    // backgroundColor: 'red',
    paddingTop: 7,
    paddingLeft: 15,
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
    paddingTop: 2,
    paddingBottom: 8,
    paddingLeft: 15
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
    paddingRight: 2.5
  },
  starImg: {
    height: 20,
    width: 20,
    marginRight: 2.5,
  },
  ratingValueText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular'
  },
  totalReviews: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Product-Sans-Regular'
  }


})


export default SearchListBlock;
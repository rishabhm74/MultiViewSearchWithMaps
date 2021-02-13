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



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CARD_WIDTH = (screenWidth * 0.8);


const SearchListBlockOld = (props) => {
  return (
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
  )
}

const styles = StyleSheet.create({
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


export default SearchListBlockOld;
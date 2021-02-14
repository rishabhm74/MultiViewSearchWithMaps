const RestaurantData = [
  {
    restaurantId: 1,
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    restaurantName: 'Dil Se Re Restaurant',
    restaurantData: {
      restaurantImgUrl: require('../assets/images/restaurants/1.jpg'),
      restaurantSpecialities: [ 'Gujarati', 'Chinese', 'Madwadi', 'Maharastrian' ],
      restaurantRating: 3,
      distanceToRestaurant: '1.85 Km',
      currentState: 'Open',
      closingTime: '9',
      totalRatings: 52
    }
  },
  {
    restaurantId: 2,
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    restaurantName: 'Barbeque Nation',
    restaurantData: {
      restaurantImgUrl: require('../assets/images/restaurants/2.jpg'),
      restaurantSpecialities: [ 'Continental', 'Inter-Continental' ],
      restaurantRating: 5,
      distanceToRestaurant: '1.05 Km',
      currentState: 'Closed',
      closingTime: '6',
      totalRatings: 20
    }
  },
  {
    restaurantId: 3,
    coordinate: {
      latitude: 22.6281662,
      longitude: 88.4410113,
    },
    restaurantName: 'Wok On Fire',
    restaurantData: {
      restaurantImgUrl: require('../assets/images/restaurants/3.jpg'),
      restaurantSpecialities: [ 'Madwadi', 'Rajasthani', 'Continental', 'Inter-Continental'  ],
      restaurantRating: 4,
      distanceToRestaurant: '2.3 Km',
      currentState: 'Open',
      closingTime: '9',
      totalRatings: 13
    }
  },
  {
    restaurantId: 4,
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4497463,
    },
    restaurantName: 'Spice Villa Restaurant',
    restaurantData: {
      restaurantImgUrl: require('../assets/images/restaurants/4.jpg'),
      restaurantSpecialities: [ 'Jain', 'Gujarati', 'Continental', 'Inter-Continental' ],
      restaurantRating: 4,
      distanceToRestaurant: '0.5 Km',
      currentState: 'Open',
      closingTime: '8',
      totalRatings: 45
    }
  },
  {
    restaurantId: 5,
    coordinate: {
      latitude: 22.6292757,
      longitude: 88.444781,
    },
    restaurantName: 'Kansar Gujarati Thali',
    restaurantData: {
      restaurantImgUrl: require('../assets/images/restaurants/5.jpg'),
      restaurantSpecialities: [ 'South-Indian', 'Sri-Lankan', 'Chinese' ],
      restaurantRating: 2,
      distanceToRestaurant: '2.7 Km',
      currentState: 'Closed',
      closingTime: '9',
      totalRatings: 38
    }
  },
  {
    restaurantId: 6,
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    restaurantName: 'Sasumaa Gujarati Thali',
    restaurantData: {
      restaurantImgUrl: require('../assets/images/restaurants/6.jpg'),
      restaurantSpecialities: [ 'Gujarati', 'Sindhi' ,'Rajasthani' ],
      restaurantRating: 4,
      distanceToRestaurant: '0.3 Km',
      currentState: 'Closed',
      closingTime: '8:30',
      totalRatings: 43
    }
  }
];

export default RestaurantData;
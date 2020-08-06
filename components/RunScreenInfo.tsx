import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


const icon = require('../assets/images/dot.png');

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import iconSet from '@expo/vector-icons/build/FontAwesome5';



export default function EditScreenInfo({ path }: { path: string }) {
  // initialize 'location' and 'errorMsg' state variables, and set initial values to 'null'
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  // defining background location task:
  TaskManager.defineTask('backgroundTask', ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }

    if (data) {
      const { latitude, longitude } = data.locations[0].coords;

      let location = {
        coords: {
          latitude,
          longitude
        }
      };

      setLocation(location);
    }
  });


  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      (async () => {
        // request access to location data on user device
        let { status } = await Location.requestPermissionsAsync();
        // if access is denied:
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        } else if (status === 'granted') {
          // if access is not denied, save current position as 'location' variable
          await Location.startLocationUpdatesAsync('backgroundTask',{
            accuracy: Location.Accuracy.Highest,
            activityType: Location.ActivityType.Fitness
          });
        }
      })();
    }
  });

    

  let text = 'Waiting..';
  let latitude = 0;
  let longitude = 0;

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle} region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
      }}>
        <Marker
            coordinate={{latitude, longitude}}
            image={icon}
        />
         
      </MapView>
    </View>
  );

}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 0,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
// yelp key = Jw0oIMgpId1HV8x-mogAapr36SVRDSAM00qOEvAmLyxCaOV1I0T6kzJbSvazjA6Q7sNS46uHfHzRzLLAESkHYv3ES50h-sUQwtwvh836OsN-D5UwO6ObMswyxDM6YXYx

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Our first React Native app!</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      {/* <StatusBar style="auto" /> */}
    </View>
  )
}

function DetailsScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(false);
  useEffect(async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    setStatus(status);
    if (status !== 'granted') {
        alert("Please grant camera roll permissions inside your system's settings");
    }
  }, []);
  const addImage = async () => {
    if(!status) {
      alert("Please grant camera roll permissions inside your system's settings");
      return;
    }
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // [Images, Videos, All]
      // allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  };
  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Text>Details Screen</Text>
      <Button
        title="< Back"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Add Image"
        onPress={() => addImage()}
      />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
  },
});

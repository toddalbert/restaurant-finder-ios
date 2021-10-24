import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DetailsScreen({ navigation }) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

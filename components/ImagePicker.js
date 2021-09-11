import React, { useEffect, useState,useRef } from 'react';
import { View,Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { withNavigationFocus } from 'react-navigation';
import * as Permissions from 'expo-permissions';
import NutritionTrackerScreen from '../views/NutritionTrackerScreen'
import Environment from "../config/environment"; 
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const dataURLtoFile = (dataurl, filename) => {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}

const CameraScreen = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [pickedImage, setPickedImage] = useState();

  const cam = useRef();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const _takeImageHandler = async () => {
    const option={quality:0.5,base64:true,skipProcessing:false}
    
    const image = await cam.current.takePictureAsync(option);
    console.log('GOT IMAGE', image);
    const noHeader = image.base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
    //console.log(image)
    if(image.base64){

      try {
        // this.setState({ uploading: true });
        // let { image } = this.state;
        // console.log(image);
        let body = JSON.stringify({
          requests: [
            {
              features: [
                { type: "LABEL_DETECTION", maxResults: 10 },
                { type: "OBJECT_LOCALIZATION", maxResults: 5 },
                { type: "LANDMARK_DETECTION", maxResults: 5 },
                { type: "FACE_DETECTION", maxResults: 5 },
                { type: "LOGO_DETECTION", maxResults: 5 },
                { type: "TEXT_DETECTION", maxResults: 5 },
                { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                { type: "IMAGE_PROPERTIES", maxResults: 5 },
                { type: "CROP_HINTS", maxResults: 5 },
                { type: "WEB_DETECTION", maxResults: 5 }
              ],
              image: {
                content: noHeader
                
              }
            }
          ]
        });
        let response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=" +
            Environment["GOOGLE_CLOUD_VISION_API_KEY"],
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: body
          }
        );
        let responseJson = await response.json();
        console.log('Google response', responseJson);
        console.log("response from first", responseJson.responses[0].localizedObjectAnnotations[0].name);
        const glable = responseJson.responses[0].localizedObjectAnnotations[0].name;
        // this.setState({
        //   googleResponse: responseJson,
        //   uploading: false
        // });
        //   let params ={
        //   method:'POST',
        //   mode:'no-cors',
        //   headers:{
        //     'Content-Type': 'application/json'
        //   },
        //     data:{
        //     label:glable,
        //     user_id:"1",
        //     image:image.base64
        //   }
        // }
      

      var file = dataURLtoFile(`data:image/png;base64,${image.base64}`,'hello.txt');

      console.log("Fetch 2 request starting",image.uri)
      // var formdata = new FormData()
      
      // var photo = {uri: image.uri,name: 'photo.png',filename :'imageName.png',type: 'image/png'}

      // formdata.append('label', glable)
      // formdata.append('user_id', "1")
      // formdata.append("image", image.uri, "imageName.png");
      // // var xhr = new XMLHttpRequest();
      // // xhr.open('POST', 'https://pressbroadcasters.com/SmartNutrition/admin/index.php/SearchItem')
      // // xhr.send(formdata)
      // // console.log(xhr.responseText)
      // console.log('sending request...')
      //   fetch('https://sagarinc.com/Pressbro/SmartNutrition/admin/index.php/SearchItem', {
      //     method: 'POST',
      //     body: formdata
      //   }).then(response => response.text()).then((res) => {
      //       console.log("response log ended",res)
      //       setPickedImage(image.uri);
      //   }).catch((err) => console.log('Error', err))
        

        var formdata = new FormData();
        formdata.append("label", glable);
        formdata.append("user_id", "1");
        // formdata.append("image", image.uri, "Success.png");

        var requestOptions = {
          method: 'POST',
          body: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow'
        };

        fetch("https://sagarinc.com/Pressbro/SmartNutrition/admin/index.php/SearchItem", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log("result", result.substr(result.indexOf("{\"")));
            let parseddata = JSON.parse(result.substr(result.indexOf("{\"")));
            props.navigation.navigate('NutritionTrackerScreen', { image: image.uri, imagedata: parseddata})
          })
          .catch(error => console.log('error', error));
      
      } catch (error) {
        console.log(error);
      }
      
    }
    
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={styles.container}>
      {props.isFocused &&
        <Camera style={styles.camera} type={type} ref={cam}>
          <View style={styles.headerContainer}>
            <Text style={{ color: "#fff", fontSize: 20 }}>Nutrition Tracker</Text></View>
        
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }} onPress={() => props.navigation.goBack()}>
              <Text
                style={{ color: "#fff", fontSize: 20 }}
              >Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => _takeImageHandler()}
            >
              <FontAwesome
                name="camera"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <MaterialIcons
                name="flip-camera-ios"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
      
        </Camera>
      }
    </View>
  );
}

// Header Navigation
// ImagePicker.navigationOptions = ({ navigation }) => {
//   return navigation.setOptions({ tabBarVisible: false })
  
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  headerContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    margin:10,
    backgroundColor:'#0000'
  },
  buttonContainer: {
    flex:1, 
    flexDirection:"row",
    justifyContent:"space-between",
    margin:20
  },
  button: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});
export default withNavigationFocus(CameraScreen);

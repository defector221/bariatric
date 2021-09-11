import { AntDesign, Foundation, Ionicons } from '@expo/vector-icons';
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../constants/Colors';
import Page from '../components/Page';
import CardItem from '../components/CardItem';
import IconImage from '../components/IconImage';



const CONTENT = {
  tableHead: ['Calorie Details'],
  tableData: [
    ['Total Fat', '10g'],
    ['Cholestrol', '59mg'],
    ['Sodium', '439mg'],
    ['Potassium', '132mg'],
    ['Total Carbohydrate', '28g'],
    ['Protein', '6g'],
  ],
};

const NutritionTrackerScreen = props => {
  const [uri, setImage] = useState();
  const [tableDetails, setTableDetails] = useState({
    "id": "11",
    "category_id": "2",
    "name": "-",
    "label": "Orange, Orange Juice, Valencia orange,Mandarin orange",
    "category": "Food"
  });

  const [tableData,setTableData]=useState([
    ["Calories", "-"],
    [ "Fiber", "-"],
    [ "Protein", "-"],
    [ "Sugar", "-"],
    ["Vitamin A", "-"],
    ["Vitamin C", "-"],
  ]);


  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    setImage(pickerResult.uri);
  }

  const HeaderView = styled.View`
  display:flex;
  align-items:baseline;
  justify-content:space-between;
  flex-direction:row;
  height: 35px;
  flex:1;
  margin:10px
  `
  const DetailsView = styled.View`
  display:flex;
  align-items:baseline;
  flex-direction:row;
  width: 127px;
  height: 35px;
  background: #DBF6E9;
  border-radius: 12px;
  padding-horizontal:8px;
  `

  const DetailsText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #4FB6AD;
  `
  const ImageContainer =styled.TouchableOpacity`
  justify-content:center;
  margin:20% 22%;
  `
  const BoldText=styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  `
  useEffect(()=>{
    const url= props.navigation.state.params ? props.navigation.state.params.image : '';
    setImage(url);
    if (props.navigation.state.params && props.navigation.state.params.imagedata && props.navigation.state.params.imagedata.success) {
      let receivedImageData = props.navigation.state.params.imagedata;
      console.log("image data", receivedImageData.item_ingredient);
      let formatedForTableData = receivedImageData.request_data[0].item_ingredient.map((data)=>{
        return [data.ingredient,data.value] })
        console.log('formated table data',formatedForTableData);
        console.log('received data',receivedImageData.request_data[0])
      setTableData(formatedForTableData);
      setTableDetails(receivedImageData.request_data[0])
    } else {
      console.log("No Data");
    }
  },[uri])

  useEffect(()=>()=>{
    return () => {
      setImage();
      setTableData();
      setTableDetails();
    };
  },[])
  

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      {uri ?<Image style={styles.image} source={{ uri:uri }} />:
       <ImageContainer onPress={openImagePickerAsync}>
           <BoldText>Click Here to Add an Image</BoldText>
       </ImageContainer>
      
      }
      <Page>
        <HeaderView>
          {/* <DetailsView>
            <Foundation name="calendar" size={22} color="#4FB6AD" style={{ padding: 6 }} />
            <DetailsText style={{ padding: 6 }}>Today</DetailsText>
            
            <Ionicons name="md-chevron-down-outline" size={22} color="#4FB6AD" style={{ padding: 6 }} />
          </DetailsView> */}
          <TouchableOpacity onPress={openImagePickerAsync}>
            <AntDesign name="upload" size={22} color="#0A0E0D" />
          </TouchableOpacity>
        </HeaderView>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Text style={{ margin: 10, fontSize: 25, fontWeight: 'bold' }}>
            {tableDetails.name}
          </Text>
          <Text style={{ margin: 10, fontSize: 16, fontWeight: 'bold' }}>
            
          </Text>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          height: 45,
        }}>
          <View style={{
            flexDirection: 'row',
            margin: 10,
            width: 167,
            height: 40,
            backgroundColor: '#CFEFE9',
            borderRadius: 12,
            padding: 8,
          }}>
            <Text style={{ fontSize: 14, }}>Amount -100grams </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            margin: 10,
            width: 100,
            height: 40,
            backgroundColor: '#CFEFE9',
            borderRadius: 12,
          }}>
            <Text style={{ margin: 8, fontSize: 14, color: '#000' }}>
              Calories {tableData && tableData[0] && tableData[0][1]? tableData[0][1]: 0}
            </Text>
          </View>

        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          height: 45,
        }}>
          <View style={{
            flexDirection: 'row',
            margin: 10,
            width: 230,
            height: 40,
            backgroundColor: '#CFEFE9',
            borderRadius: 12,
            padding: 8,
          }}>
             <Text>Calorie per byte(30gm) {tableData && tableData[0] && tableData[0][1]? ((tableData[0][1] * 0.3) || 0).toFixed(2) || 0 : 0}</Text>
          </View>
          </View>
        <Table style={{margin:10,backgroundColor:'#CFEFE9',borderRadius:10,padding:10}}>
         
        <Row
          data={CONTENT.tableHead}
          flexArr={[1, 2, 1, 1]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Col
            data={CONTENT.tableTitle}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.text}
          />
          <Rows
            data={tableData}
            flexArr={[2, 1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
      <CardItem color='#FAFAFA'
        height='130px'>
         <Text>Ingredients</Text>
          <View style={styles.container}>
           <IconImage src={require('../assets/flour.png')} title="Flour" />
           <IconImage src={require('../assets/milk.png')} title="Milk" />
           <IconImage src={require('../assets/eggs.png')} title="Eggs" />
           <IconImage src={require('../assets/sugar-cubes.png')} title="Sugar" />
           <IconImage src={require('../assets/butter.png')} title="Butter" />
          </View>

      </CardItem>
      </Page>
    </>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 253,
    width: 400,
  },
  row:{
    padding: 5
  },
  title: {
    padding: 5
  },
  address: {
    color: '#666',
    fontSize: 16
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    marginTop:15
  },
});

export default NutritionTrackerScreen;

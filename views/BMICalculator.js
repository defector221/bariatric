import React,{useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  TouchableNativeFeedback,
  TextInput
  
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Foundation, } from '@expo/vector-icons';



import HeaderButton from '../components/HeaderButton';

import Page from '../components/Page';
import styled from 'styled-components';
import { useEffect } from 'react';



const FlexItem=styled.View`
display:flex;
flex-direction:row;
justify-content:flex-start;
margin-horizontal:5%;
`
const ImageItem=styled.View`
display:flex;
flex-direction:row;
justify-content:center;
align-items:baseline;
margin:15%
`

const ValueText=styled.TextInput`
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 36px;
text-align: center;
color: #000000;
margin-top:20%
`
const DescText=styled.Text`
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
color: #000000;
`

const CardView = styled.View`
height: '150px'
width: 'auto'
`;


const CardItem = props => {
 

 let TouchableCmp = TouchableOpacity;

 if (Platform.OS === 'android' && Platform.Version >= 21) {
   TouchableCmp = TouchableNativeFeedback;
  }
  return (
  <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        >
          {props.children}
        </View>
      </TouchableCmp>
    </View>)
}


const BMICalculator = props => {
  const [femaleActive,setFemale]=useState(false);
  const [maleActive,setMale]=useState(true);
  const [BMIValue,setBMI]=useState(0);
  const [age,setAge]=useState(25);
  const [height,setHeight]=useState(195);
  const [weight,setWeight]=useState(80);

  const setActive=(user)=>{
    if (user === "male"){
      setMale(true)
      setFemale(false)
    } else if (user=== "female"){
      setFemale(true)
      setMale(false)
    }
  }

  const updateBMI=()=>{
    const heightMeters = height/100.0;
    const BMI = (weight / (heightMeters ^ 2)).toFixed(2);
    setBMI(BMI);
    props.navigation.navigate('BMICalculatorScreen',{BMI:BMI})
    console.log('bmivalue', BMIValue)
  }

  useEffect(()=>()=>{
    return () => {
     setAge(0);
     setHeight(0);
     setWeight(0);
     setBMI(0);
    };
  },[])
  return (
    <Page>
      <FlexItem>
      <CardItem
        color='#FDFDFD'
        height='150px'
        onSelect={()=>setActive("male")}>
       <ImageItem>
       <Foundation name="male" color={maleActive ? "#3295DD":"#C4C4C4"} size={85}/>
       </ImageItem>  
      
      </CardItem>
      <CardItem
        color='#FDFDFD'
        height='150px'
        onSelect={()=>setActive("female")}>
       <ImageItem>
       <Foundation name="female" color={femaleActive ? "#3295DD":"#C4C4C4"} size={85}/>
       </ImageItem>  
      
      </CardItem>
      </FlexItem>  
     
      <CardItem
        color='#FFFFFF'
        height='110px'
        onSelect={() => console.log('no action')}>
        <FlexItem>
          <Image source={require('../assets/calendar.png')}/>
          <View>
          <DescText style={{marginHorizontal:20,textAlign:'center'}}>Age</DescText>
          <ValueText 
          style={{marginHorizontal:20,textAlign:'center'}}
          onChangeText={setAge}
          value={age.toString()}
          placeholder="Enter Age"
          keyboardType="numeric"
          />
          </View>
        </FlexItem>

      </CardItem>
      <CardItem
        color='#FFFFFF'
        height='110px'
        onSelect={() => console.log('no action')}>
        <FlexItem>
          <Image source={require('../assets/human-male-height.png')}/>
          <View>
          <DescText style={{marginHorizontal:20,textAlign:'center'}}>Height in (cm)</DescText>
          <ValueText 
          style={{marginHorizontal:20,textAlign:'center'}}
          onChangeText={setHeight}
          value={height.toString()}
          placeholder="Enter Height"
          keyboardType="numeric"
          />
          </View>
        </FlexItem>

      </CardItem>
      <CardItem
        color='#FFFFFF'
        height='110px'
        onSelect={() => console.log('no action')}>
        <FlexItem>
          <Image source={require('../assets/weight.png')}/>
          <View>
          <DescText style={{marginHorizontal:20,textAlign:'center'}}>Weight in (kgs)</DescText>
          <ValueText 
          style={{marginHorizontal:20,textAlign:'center'}}
          onChangeText={setWeight}
          value={weight.toString()}
          placeholder="Enter Weight"
          keyboardType="numeric"
          />
          </View>
        </FlexItem>

      </CardItem>
      <TouchableOpacity onPress={() => updateBMI()}>
          <View style={styles.customBtn}>
              <Text style={{ color: 'black' }}>Submit</Text>
          </View>
      </TouchableOpacity>
    </Page>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    margin: 20
  },
  Icon: {
    alignItems: 'baseline',
    marginHorizontal: 20
  },
  customBtn: {
    height: 40,
    width: 100,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#4FB6AD',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 130,
    marginVertical: 40,
    textTransform: 'capitalize',
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    elevation: 5
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 8,
  },
});

export default BMICalculator;

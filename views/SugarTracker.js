import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, Dimensions, Image,TextInput,TouchableOpacity, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import styled from 'styled-components';
import { BarChart } from 'react-native-chart-kit';


import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import Page from '../components/Page';
import CardItem from '../components/CardItem';
import { Sugar } from '../models/Sugar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AsyncStorage } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const data = {
    labels: ["Tu", "We", "Th", "Fr", "Sa","Su","Mo"],
    datasets: [
        {
            data: [0, 50, 100, 260,300,500,460]
        }
    ]
};
const chartConfig = {
    backgroundColor: '#97999B',
    backgroundGradientFrom: "#97999B",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#97999B",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(250, 250, 250,  ${opacity})`,
    barPercentage: 0.5,
    fillShadowGradient:'#FAFAFA',
    fillShadowGradientOpacity:1,
};
export default function SugarTracker({ navigation }) {

    const BoldText1 = styled.TextInput`
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 20px;
letter-spacing: 0.5px;
color: ${Colors.textColor};
text-align:center;
padding-vertical:5px
`
const BoldText = styled.Text`
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 26px;
letter-spacing: 0.5px;
color: ${Colors.textColor};
`
    const DateView = styled.View`
display:flex;
align-items:baseline;
justify-content:flex-start;
flex-direction:row;
margin:20px;
margin-bottom:50px;
`

    const CustomTabView = styled.View`
display:flex;
align-items:baseline;
justify-content:space-between;
flex-direction:row;
margin:20px;
margin-bottom:50px;
`
    const SubText1 = styled.Text`
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 26px;
letter-spacing: 0.5px;
color: ${Colors.textColor};
`
    const SubText = styled.Text`
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 19px;
   letter-spacing: 0.5px;
   color: ${Colors.textColor};
   text-align:center;
   padding-vertical:5px
 `

const WrapView = styled.View`
  display:flex;
  align-items:baseline;
  flex-direction:row;
  justify-content:space-between;
  margin:5%
  `
  const params = navigation.state.params;
    let date2 = new Date();
    if(params && params.date) {
        date2 = params.date;
    }
    const [date, setDate] = useState(date2);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [sugar, setSugar] = useState( 0 );
    const dateOptions = { weekday: 'short', year: '2-digit', month: 'long', day: 'numeric' };
    const onChange = (event, selectedDate) =>
    {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        navigation.date = currentDate;
    };

    const showMode = (currentMode) =>
    {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () =>
    {
        showMode('date');
    };
    const getData = () =>
    {
        AsyncStorage.getItem(Sugar.getKey(date))
        .then((sugarStr) => {
            if (sugarStr) {
                const obj = JSON.parse(sugarStr);
                setSugar(obj.sugar ? obj.sugar : 0);
                sugarInputStr = obj.sugar.toString();
                navigation.sugar = obj.sugar;
            } else {
                setSugar(0);
            }
            
        });
    };
    const onSubmit = () =>
    {
        const key = Sugar.getKey(date);
        const obj = new Sugar(Date.now(), date, parseInt(sugarInputStr));
        AsyncStorage.setItem(key, JSON.stringify(obj))
        .then(() => {
            console.log('saved');
        })
    };
    let sugarInputStr = '142';
    useEffect(() => getData(), [date]);
    return (
        <Page>
            <DateView>
                <BoldText onPress={showDatepicker}>{date.toLocaleDateString("en-US", dateOptions)}</BoldText>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </DateView>
            <CardItem
                color='#97999B'
                height='280px'
            >
                <BarChart
                    data={data}
                    width={screenWidth-60}
                    height={280}
                    chartConfig={chartConfig}
                    contentInset={{ top: 30, bottom: 30 }}
                />
            </CardItem>
            <CustomTabView>
                <SubText1>Glucose Level</SubText1>
            </CustomTabView>
            <CardItem
                color='#DBF6E9'
                height='110px'
            >
                <WrapView>
                    <Image source={require('../assets/diabetes.png')} />
                    <BoldText1 
                        onChangeText={text=> {sugarInputStr = text;}}
                        keyboardType="numeric"
                    >
                        {sugar.toString()}</BoldText1>
                    <SubText>mg/DL</SubText>
                </WrapView>

            </CardItem>
            <TouchableOpacity onPress={onSubmit}>
             <View style={styles.customBtn}>
                 <Text style={{ color: 'black' }}>Save</Text>
             </View>
            </TouchableOpacity>
        </Page>
    );
}



const styles = StyleSheet.create({
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
})
import React, { useState, useEffect } from 'react';
import { View, Dimensions, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import styled from 'styled-components';
import { BarChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Utils from '../utility/utils';
import User from '../models/User';
import Colors from '../constants/Colors';
import Page from '../components/Page';
import CardItem from '../components/CardItem';

const screenWidth = Dimensions.get("window").width;

const data = {
    labels: ["Week1", "Week2", "Week3", "Week4"],
    datasets: [
        {
            data: [20, 40, 65, 60]
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
    fillShadowGradient:'#FAFAFA',
    fillShadowGradientOpacity:1,
};
export default function SleepTracker({ navigation }) {

    const BoldText = styled.Text`
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 20px;
letter-spacing: 0.5px;
color: ${Colors.textColor};
text-align:center;
padding-vertical:5px
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
  margin-horizontal:10px
  `
    const GraphView = styled.View`
  display:flex;
  flex-direction:row;
  `
    const UserName = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  margin:10px
  `
    const ColView = styled.View`
  display:flex;
  justify-content:center;
  margin-horizontal:20%;
  
  `
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({name: ''});
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

    useEffect(()=>{
        Utils.getMyProfile(user => {
          const newUser = new User(
            user.id,
            user.phone_number,
            user.email_id,
            user.user_name,
            user.first_name,
            user.last_name
          );
          setUser(newUser);
        });
      }, [])
    return (
        <Page>
            <DateView>
                <BoldText onPress={showDatepicker}>{moment(date).format(Utils.getDateFormat())}</BoldText>
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
            <CustomTabView>
                <SubText1>Sleep Information</SubText1>
                <View style={{
                    flexDirection: 'row',
                    margin: 10,
                    width: 87,
                    height: 35,
                    backgroundColor: '#CFEFE9',
                    borderRadius: 12,
                }}>
                    <TouchableOpacity onPress={() => {
                    navigation.navigate({
                        routeName: 'AlarmScreen',
                    })
                }}
                    >
                    <Text style={{ marginHorizontal: 15, marginVertical: 6, fontSize: 14, color: '#4FB6AD' }}>
                        Change
                    </Text>
                    </TouchableOpacity>
                   
                </View>
            </CustomTabView>
            <CardItem
                color='#DBF6E9'
                height='110px'
            >
                <UserName>{user.name}</UserName>
                <WrapView>
                    <Image source={require('../assets/moonsleepIcon.png')} />
                    <Text style={{ paddingHorizontal: 10 }}>Bedtime + 7 Hrs = Wakeup</Text>
                </WrapView>

            </CardItem>
            <GraphView>
                <CardItem
                    color='#FCFCFC'
                    height='169px'
                >
                    <ColView>
                        <SubText>Quality</SubText>
                        <Image source={require('../assets/Circle.png')} />
                        <SubText>90%</SubText>
                    </ColView>
                </CardItem>
                <CardItem
                    color='#FCFCFC'
                    height='169px'
                >
                    <ColView>
                        <SubText>Duration</SubText>
                        <Image source={require('../assets/Circle.png')} />
                        <SubText>7 hrs</SubText>
                    </ColView>
                </CardItem>
            </GraphView>
            <CustomTabView>
                <SubText1>Average Sleep - 45 hrs a Week</SubText1>
            </CustomTabView>
            <CardItem
                color='#97999B'
                height='280px'
            >
                <BarChart
                    data={data}
                    width={screenWidth-50}
                    height={250}
                    chartConfig={chartConfig}

                />
            </CardItem>
        </Page>
    );
}


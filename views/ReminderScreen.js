import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import Utils from '../utility/utils';

import styled from 'styled-components';


import Colors from '../constants/Colors';
import Page from '../components/Page';
import CardItem from '../components/CardItem';
import { TIME_OF_DAY, Medication} from '../models/Medication';

const AddButtonView = styled.View`
display:flex;
align-items:baseline;
justify-content:space-around;
margin:10px;
`
const DateView = styled.View`
display:flex;
align-items:baseline;
justify-content:space-around;
flex-direction:row;
margin:20px;
margin-bottom:50px;
`
const BoldText = styled.Text`
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 26px;
letter-spacing: 0.5px;
color: ${Colors.textColor};
`
const CustomTabView = styled.View`
display:flex;
align-items:baseline;
justify-content:space-between;
flex-direction:row;
margin:20px;
margin-bottom:50px;
`
const SubText = styled.Text`
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 26px;
letter-spacing: 0.5px;
color: ${Colors.textColor};
`

const TimeText = styled.Text`
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 15px;
text-align: justify;
color: #CF0000;
`
const HeadText = styled.Text`
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 22px;
color: #262323;
margin-left:5%
`
const WrapText = styled.Text`
color: #505050;
margin-left:5%
width:240px
`
const getMorningCard = (medication) => (
    <CardItem key={medication.id}
        color='#DBF6E9'
        height='110px'
    >
        <View style={{ flex: 3, flexDirection: 'row' }}>
            <Image source={require('../assets/tablet.png')} />
            <WrapText style={{ height: 500, width: 270 }}>
                <HeadText style={{ flexWrap: 'wrap' }}>{medication.name}</HeadText>
                {"\n"}
                <Text>
                    ({medication.duration}) {medication.quantity}
                </Text>
            </WrapText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', marginLeft: 5, marginTop: 20, justifyContent: 'space-between' }}>
            <Text>({medication.beforeOrAfterFood})</Text>
            <TimeText>{medication.time}</TimeText>
        </View>

    </CardItem>
);

const getNightCard = (medication) => (
    <CardItem key={medication.id}
        color='#FAFAFA'
        height='110px'
    >
        <View style={{ flex: 3, flexDirection: 'row' }}>
            <Image source={require('../assets/tablet.png')} />
            <WrapText style={{ height: 500, width: 270 }}>
                <HeadText style={{ flexWrap: 'wrap' }}>{medication.name}</HeadText>
                {"\n"}
                <Text>
                    ({medication.duration}) {medication.quantity}
                </Text>
            </WrapText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', marginLeft: 5, marginTop: 20, justifyContent: 'space-between' }}>
            <Text>({medication.beforeOrAfterFood})</Text>
            <TimeText>{medication.time}</TimeText>
        </View>

    </CardItem>
);

const Taken = ({ ...navigation }) => (
    <View>
        <CustomTabView>
            <SubText>Morning</SubText>
            <TouchableOpacity onPress={() => navigation.navigate('AddReminder', {date: navigation.date})}>
                <Ionicons name="add" size={20} color={Colors.textColor} />
            </TouchableOpacity>
        </CustomTabView>
        {
            navigation.medications
                .filter(medication => medication.taken && medication.timeOfDay === TIME_OF_DAY.MORNING)
                .map((medication) =>
                (
                    getMorningCard(medication)
                ))
        }
        <CustomTabView>
            <SubText>Afternoon</SubText>
            <TouchableOpacity onPress={() => navigation.navigate('AddReminder', {date: navigation.date})}>
                <Ionicons name="add" size={20} color={Colors.textColor} />
            </TouchableOpacity>
        </CustomTabView>
        {
            navigation.medications
                .filter(medication => medication.taken && medication.timeOfDay === TIME_OF_DAY.AFTER_NOON)
                .map((medication) =>
                (
                    getNightCard(medication)
                ))
        }
        <CustomTabView>
            <SubText>Night</SubText>
            <TouchableOpacity onPress={() => navigation.navigate('AddReminder', {date: navigation.date})}>
                <Ionicons name="add" size={20} color={Colors.textColor} />
            </TouchableOpacity>
        </CustomTabView>
        {
            navigation.medications
                .filter(medication => medication.taken && medication.timeOfDay === TIME_OF_DAY.NIGHT)
                .map((medication) =>
                (
                    getNightCard(medication)
                ))
        }
    </View>
);

const Missed = ({ ...navigation }) => (
    <View>
        <CustomTabView>
            <SubText>Morning</SubText>
            <TouchableOpacity onPress={() => navigation.navigate('AddReminder', {date: navigation.date})}>
                <Ionicons name="add" size={20} color={Colors.textColor} />
            </TouchableOpacity>
        </CustomTabView>
        {
            navigation.medications
                .filter(medication => !medication.taken && medication.timeOfDay === TIME_OF_DAY.MORNING)
                .map((medication) =>
                (
                    getMorningCard(medication)
                ))
        }
        <CustomTabView>
            <SubText>Afternoon</SubText>
            <TouchableOpacity onPress={() => navigation.navigate('AddReminder', {date: navigation.date})}>
                <Ionicons name="add" size={20} color={Colors.textColor} />
            </TouchableOpacity>
        </CustomTabView>
        {
            navigation.medications
                .filter(medication => !medication.taken && medication.timeOfDay === TIME_OF_DAY.AFTER_NOON)
                .map((medication) =>
                (
                    getNightCard(medication)
                ))
        }
        <CustomTabView>
            <SubText>Night</SubText>
            <TouchableOpacity onPress={() => navigation.navigate('AddReminder', {date: navigation.date})}>
                <Ionicons name="add" size={20} color={Colors.textColor} />
            </TouchableOpacity>
        </CustomTabView>
        {
            navigation.medications
                .filter(medication => !medication.taken && medication.timeOfDay === TIME_OF_DAY.NIGHT)
                .map((medication) =>
                (
                    getNightCard(medication)
                ))
        }
    </View>
);


export default function ReminderScreen({ navigation })
{
    const layout = useWindowDimensions();
    const params = navigation.state.params;
    const [date, setDate] = useState(new Date());
    let date2 = new Date();
    if(params && params.date) {
        date2 = new Date(params.date);
        delete navigation.state.params.date;
        setDate(date2);
    }
    
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [medications, setMedications] = useState([]);
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
        AsyncStorage.getItem(Medication.getKey(date))
        .then((medicationsStr) => {
            let medications;
            if (medicationsStr) {
                medications = JSON.parse(medicationsStr);
            } else {
                medications = [];
            }
            setMedications(medications);
            setRoutes(getRoutes(medications));
            navigation.medications = medications;
        });
    };
    const getRoutes = medications => {
        return  [{ key: 'first', title: 'Taken(' + medications.filter(medication => medication.taken).length + ')' },
        { key: 'second', title: 'Missed(' + medications.filter(medication => !medication.taken).length + ')' }]
    }

    useEffect(() => 
        getData(),
        [date]
    )
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState(getRoutes(medications));
    navigation.medications = medications;
    navigation.date = date;
    const renderScene = SceneMap({
        
        first: () => <Taken {...navigation} />,
        second: () => <Missed {...navigation} />,
    });

    const renderLabel = ({ route, focused, color }) =>
    {
        return (
            <View>
                <Text
                    style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}
                >
                    {route.title}
                </Text>
            </View>
        )
    }
    
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

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={layout}
                renderTabBar={props => <TabBar
                    {...props}
                    renderLabel={renderLabel}
                    indicatorStyle={{ backgroundColor: Colors.textColor }}
                    style={{
                        backgroundColor: Colors.greyColor,
                    }}
                />}
            />
        </Page>
    );
}


const styles = StyleSheet.create({
    activeTabTextColor: {
        color: 'black'
    },
    tabTextColor: {
        color: 'black'
    }
})
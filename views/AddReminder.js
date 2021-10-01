import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components'

import CardItem from '../components/CardItem';
import IconImage from '../components/IconImage';
import Page from '../components/Page';
import Medication, { BEFORE_OR_AFTER_FOOD, TIME_OF_DAY } from '../models/Medication';
import { AsyncStorage } from 'react-native';

export default function AddReminder({ navigation })
{
    const [tablet, setTablet] = useState(true);
    const [injection, setInjection] = useState(false);
    const [syrup, setSyrup] = useState(false);
    const [pill, setPill] = useState(false);
    const [butter, setButter] = useState(false);
    const params = navigation.state.params;
    let date2 = new Date();
    if(params && params.date) {
        date2 = params.date;
    }
    const [date] = useState(date2);
    
    const setActive = (user) =>
    {
        if (user === "male")
        {
            setMale(true)
            setFemale(false)
        } else if (user === "female")
        {
            setFemale(true)
            setMale(false)
        }
    }

    const onSubmit = () =>
    {
        const key = Medication.getKey(date);
        AsyncStorage.getItem(key)
        .then((medicationsStr) => {
            console.log(medicationsStr, formMed);
            let medications;
            if (medicationsStr) {
                medications = JSON.parse(medicationsStr);
                medications.push(formMed);
            } else {
                medications = [formMed];
            }
            AsyncStorage.setItem(key, JSON.stringify(medications))
            .then(() => {
                navigation.navigate('ReminderScreen', {date});
            })
        });
    };

    const ColView = styled.View`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:baseline;
    `
    const CustomInput = styled.TextInput`
    background: #ECECEC;
    border-radius: 5px;
    display:flex;
    padding:10px
    margin:10px
    `
    const formMed = new Medication(
        Date.now(),
        'Paracetamol',
        TIME_OF_DAY.MORNING,
        '1 tablet',
        '9:00 am',
        BEFORE_OR_AFTER_FOOD.BEFORE_FOOD,
        '5 days',
        false,
        date
    );
    return (
        <Page>
            <CardItem color='#FAFAFA'
                height='550px'>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => setActive('tablet')}>
                        <IconImage src={require('../assets/tablet.png')} title="" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActive('injection')}>
                        <IconImage src={require('../assets/injection.png')} title="" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActive('syrup')}>
                        <IconImage src={require('../assets/syrup.png')} title="" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActive('pill')}>
                        <IconImage src={require('../assets/pill.png')} title="" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setActive('butter')}>
                        <IconImage src={require('../assets/butter.png')} title="" />
                    </TouchableOpacity>

                </View>
                <Formik
                    initialValues={{ 
                        medicine: new Medication(
                            Date.now(),
                            'Paracetamol',
                            TIME_OF_DAY.MORNING,
                            '1 tablet',
                            '9:00 am',
                            BEFORE_OR_AFTER_FOOD.BEFORE_FOOD,
                            '5 days',
                            false
                        ) 
                    }}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit, values }) => (
                        <View>
                            <CustomInput
                                onChangeText={text => {
                                    formMed.name = text;
                                }}
                                defaultValue={formMed.name}
                                placeholder="Medicine Name"
                            />
                            <ColView>
                                <CustomInput
                                    onChangeText={text => {
                                        formMed.duration = text;
                                    }}
                                    placeholder="Days"
                                    defaultValue={formMed.duration}
                                    style={{ width: 142 }}
                                />
                                <CustomInput
                                    onChangeText={text => {
                                        formMed.time = text;
                                    }}
                                    placeholder="Time"
                                    defaultValue={formMed.time}
                                    style={{ width: 142 }}
                                />

                            </ColView>
                            <ColView>
                                <CustomInput
                                    onChangeText={text => {
                                        formMed.quantity = text;
                                    }}
                                    placeholder="Dose"
                                    defaultValue={formMed.quantity}
                                    style={{ width: 142 }}
                                />
                            </ColView>
                            <Picker
                                // passing value directly from formik
                                selectedValue={formMed.timeOfDay}
                                // changing value in formik
                                onValueChange={itemValue => {
                                    formMed.timeOfDay = itemValue;
                                }}
                                style={{ marginTop: 20 }}
                            >
                                <Picker.Item label='Morning' value={TIME_OF_DAY.MORNING} key={'MORNING'} />
                                <Picker.Item label='Afternoon' value={TIME_OF_DAY.AFTER_NOON} key={'AFTER_NOON'} />
                                <Picker.Item label='Night' value={TIME_OF_DAY.NIGHT} key={'NIGHT'} />
                            </Picker>
                            <Picker
                                // passing value directly from formik
                                selectedValue={formMed.beforeOrAfterFood}
                                // changing value in formik
                                onValueChange={itemValue => {
                                    {
                                        formMed.beforeOrAfterFood = itemValue;
                                    }
                                }}
                                style={{ marginTop: 20 }}
                            >
                                <Picker.Item label='Before Food' value={BEFORE_OR_AFTER_FOOD.BEFORE_FOOD} key={'BEFORE_FOOD'} />
                                <Picker.Item label='After Food' value={BEFORE_OR_AFTER_FOOD.AFTER_FOOD} key={'AFTER_FOOD'} />
                            </Picker>
                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={styles.customBtn}>
                                    <Text style={{ color: 'black' }}>Save</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}


                </Formik>

            </CardItem>


        </Page>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 15
    },
    customBtn: {
        height: 40,
        width: 100,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#4FB6AD',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 100,
        marginVertical: 40,
        textTransform: 'capitalize',
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
    },
})
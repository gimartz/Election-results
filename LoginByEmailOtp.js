import React, { Component, useEffect, useRef, useState } from 'react';
import {  Platform, Alert, StatusBar } from 'react-native';
import Button from '../../../components/themes/Button';
import Text from '../../../components/themes/Text';
import PhoneInput from "react-native-phone-number-input";
import Box from '../../../components/themes/Box';
import { useDispatch } from 'react-redux';
import * as types from '../../../redux/types';
import { View, StyleSheet } from 'react-native';
import { color } from '../../../components/themes/colors';
import TextInput from '../../../components/themes/TextInput';
import { otpLogin, sendOtp } from '../../../components/api/api';
import { emailTest } from '../../../components/core/Helpers';
import { LOGIN_OTP } from '../../../components/constants'
import { useToast } from 'native-base';
import { RenderCustomToast } from '../../../components/Snippets';
import { useNavigation } from '@react-navigation/native';
import { phoneValidate } from '../../../components/helpers/phoneValidate';
export default function LoginByEmailOtp() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
  const [error, setError] = useState()
  const dispatch = useDispatch()

  const toast = useToast()
  useEffect(()=>{ 

  },[])
  const onChangeText = text => {
    console.log({ text });
    setEmail(text)
    setError()
    if (!emailTest(text)) {
      setError('Please enter a valid email address')
    }
  }
  


  const onPress = () => {
    dispatch({ type: types.LOADING_STATE, payload: true })
    sendOtp({
      email,
      otp_for: LOGIN_OTP,
      medium: 'mail' 
    }).then(res => {
      dispatch({ type: types.LOADING_STATE, payload: false })
      navigation.navigate('LoginOtpScreen', {  email, onPress: onPress })
    }).catch(err => {
      dispatch({ type: types.LOADING_STATE, payload: false })
      toast.show({ render: () => <RenderCustomToast type={'error'}
       message= {err.response?.data?.message  || 'Something went wrong'}
       /> })
    })
  }
  return (
    <Box container flex>
      <Box padding mt={10}>
        <Text type='title'>Get back to your account</Text>
        <Text type='body' mr={'20%'}>Enter your email address to receive your login code</Text>
      </Box>
      <Box padding mt={10}>
        <TextInput placeholder='me@you.com' onChangeText={onChangeText} keyboardType='email-address' />
        <Text type='body' color='red'>{error}</Text>
                 
      </Box>
      
      <Box padding mt={20}>
        <Button onPress={onPress} disabled={error || email?.length < 10 } type='solid' color='primary'>Send code</Button>
        <Text mt={30} type='body' bold color={color.primary}>Have an account but changed number?</Text>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  iconButtons: {
    margin: 10, padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.2)', width: 50, height: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center'
  },
  parent: {
    flex: 1,
    paddingTop: 20
    // backgroundColor:'gray'
  },
  terms: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 29,
    // justifyContent: 'center',
  },
  numberContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    //   maxHeight:60,
    //   paddingBottom:0,
    //   paddingTop:0,
  },
  codeContainer: {
    backgroundColor: 'transparent',
    width: '100%',

  },
  textInputStyle: {
    borderBottomColor: color.text,
    borderBottomWidth: 0.6,
    width: '100%',
    marginLeft: -25,
    // fontWeight:'200',
    // fontSize: 15,
  },
  codeTextStyle: {
    borderBottomColor: color.text,
    borderBottomWidth: 0.6,
    paddingBottom: 7,
    marginTop: 15,
    marginLeft: -15,
    width: 60,
    fontWeight: '400',
    fontFamily: 'Barlow-Regular',
  }
});
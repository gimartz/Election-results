import React, { Component, useRef, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Alert, ImageBackground, Pressable } from 'react-native';
import BackIcon from '../../components/icons/BackIcon';
import BackButton from '../../components/stories/BackButton';
import Button from '../../components/themes/Button';
import Text from '../../components/themes/Text';
import TextInput from '../../components/themes/TextInput';
import { color } from '../../components/themes/colors'
import PhoneInput from "react-native-phone-number-input";
import { passwordValidator } from '../../components/helpers/passwordValidator';
import { register } from '../../redux/actions/authActions'
import { connect } from 'react-redux';
import ScreenHeader from '../../components/ScreenHeader';
import Box from '../../components/themes/Box';
import { StatusBar } from 'native-base';
import { login, sendOtp } from '../../components/api/api';
import { LOGIN_OTP } from '../../components/constants';
import store from '../../redux/store';
import * as types from '../../redux/types';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneInputScreen from './Login/PhoneInputScreen';
import LoginByEmailOtp from './Login/LoginByEmailOtp';
import LoginOtp from './Login/LoginOtp';
import { event } from 'react-native-reanimated';
const background = require('../../assets/images/banners/auth-bg.png')

const LoginScreen = ({ navigation }) => {
  const Stack = createStackNavigator();
  const [isShown, setIsShown] = useState(false)
  const changeForm=event=>{
    setIsShown(current =>!current)
  }
  return (
    <>
      <Box flex>
        <StatusBar barStyle={'light-content'} backgroundColor={color.primary} />
        <ImageBackground source={background} resizeMode='cover'
          style={{ width: '100%', height: 200, marginTop: -1 }}
        >
          <Pressable style={styles.iconButtons}
            onPress={() => navigation.navigate('LandingScreen')}>
            <BackIcon color='white' />
          </Pressable>
        </ImageBackground>
        <Box flex>
      {isShown ?    <LoginByEmailOtp /> :<PhoneInputScreen />}
          {/* <Stack.Navigator 
            initialRouteName='EmailScreen'
            defaultScreenOptions={{ headerShown: true }}
          >
            <Stack.Screen name="EmailScreen"
              component={}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="PhoneInputScreen"
              component={PhoneInputScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="LoginOtpScreen"
              component={LoginOtp}
              options={{ headerShown: false }}
            />

          </Stack.Navigator> */}
          <View style={{marginLeft:10,paddingTop:-35,padding:20}}>
            <Button onPress={changeForm} type='solid' color='primary'>Login with {isShown ?'Phone':'email'}</Button></View>
          
        </Box>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => ({
  // user: state.auth.user,
  token: state.auth.token,
  // errors: state.auth.errors,
  // error: state.auth.error,
  // deviceInfo: state.general.device_info,
  // code: state.general.code,
  // loading: state.auth.loading
})

const mapDispatchToProps = {
  register
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);


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
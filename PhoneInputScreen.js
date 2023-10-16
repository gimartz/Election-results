import React, { Component, useRef, useState ,useEffect} from 'react';
import Button from '../../../components/themes/Button';
import Text from '../../../components/themes/Text';
import PhoneInput from "react-native-phone-number-input";
import Box from '../../../components/themes/Box';
import * as types from '../../../redux/types';
import { StyleSheet } from 'react-native';
import { color } from '../../../components/themes/colors';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth'
import {
  
  SafeAreaView,
  TouchableOpacity,
  View,

  TextInput
} from 'react-native'


  class PhoneInputScreen extends Component {
    state = {
    phone: '',
    confirmResult: null,
    verificationCode: '',
    userId: '',error:''
    }
    validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(this.state.phone)
    }
    handleSendCode = () => {
      // Request to send OTP
      if (this.validatePhoneNumber()) {
        auth()
          .signInWithPhoneNumber(this.state.phone)
          .then(confirmResult => {
            this.setState({ confirmResult })
          })
          .catch(error => {
            alert(error.message)
            console.log(error)
          })
      } else {
        alert('Invalid Phone Number')
      }
    }
    changePhoneNumber = () => {
      this.setState({ confirmResult: null, verificationCode: '' })
    }
    handleVerifyCode = () => {
      // Request for OTP verification
      const { confirmResult, verificationCode } = this.state
      if (verificationCode.length == 6) {
        confirmResult
          .confirm(verificationCode)
          .then(user => {
            this.setState({ userId: user.uid })
            alert(`Verified! ${user.uid}`)
          })
          .catch(error => {
            alert(error.message)
            console.log(error)
          })
      } else {
        alert('Please enter a 6 digit OTP code.')
      }
    }
    renderConfirmationCodeView = () => {
      return (
        <View style={styles.verificationView}>
          <TextInput
            style={styles.textInput}
            placeholder='Verification code'
            placeholderTextColor='#eee'
            value={this.state.verificationCode}
            keyboardType='numeric'
            onChangeText={verificationCode => {
              this.setState({ verificationCode })
            }}
            maxLength={6}
          />
          <TouchableOpacity
            style={[styles.themeButton, { marginTop: 20 }]}
            onPress={this.handleVerifyCode}>
            <Text style={styles.themeButtonTitle}>Verify Code</Text>
          </TouchableOpacity>
        </View>
      )
    }
  render() {
    return(
    <Box flex>
      <Box padding mt={10}>
        <Text type='title'>Get back to your account</Text>
        <Text type='body' mr={'20%'}>Enter your mobile number to receive your login code</Text>
      </Box>
      <Box padding mt={10}>
        <PhoneInput
          // ref={phoneInput}
          defaultValue={this.state.phone}
          defaultCode="NG"
          layout="second"
          onChangeText={phone => {
            this.setState({ phone })
          }}
          onChangeFormattedText={phone => {
            this.setState({ phone })
          }}
          disableArrowIcon
          textInputStyle={styles.textInputStyle}
          codeTextStyle={styles.codeTextStyle}
          placeholder='Phone number'
          
          textInputProps={{ placeholderTextColor: '#B2B2B2', fontSize: 15, lineHeight: 14.4, fontFamily: Platform.OS === 'android' ? 'Barlow-Regular' : undefined, fontWeight: '100' }}
          // codeTextStyle={{color:'red'}}
          // textInputStyle={{color:"red",}}
          textContainerStyle={styles.numberContainer}
          containerStyle={styles.codeContainer}  editable={this.state.confirmResult ? false : true}
        />
        <Text type='body' color='red'>{this.state.error}</Text>
      </Box>
      <Box padding mt={20}>
      <Text style={styles.themeButtonTitle}>
          {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
        </Text>
        <Button onPress={
          this.state.confirmResult
            ? this.changePhoneNumber
            : this.handleSendCode
        } disabled={this.state.error || this.state.phone?.length < 10} type='solid' color='primary'>{this.state.confirmResult? 'Change Phone Number' : 'Send Code'}</Button>
        <Text mt={30} type='body' bold color={color.primary}>Have an account but changed number?</Text>
      </Box>
      {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
   
    </Box>
  )
}
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
export default  PhoneInputScreen
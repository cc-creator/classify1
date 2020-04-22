import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity, ProgressBarAndroid
} from 'react-native';
import {Button, Input, Overlay} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ToastExample from "../../nativeComponents/ToastExample";

export default class LogReg extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisible: false,
            below_flag: true,
            login_account: '',
            regist_account: '',
            passwd: '',
            passwd1: '',
            passwd2: '',
            login_account_prompt: '',
            login_passwd_prompt: '',
            regist_account_prompt: '',
            regist_passwd_prompt: '',
            regist_conpwd_prompt: '',
            login_disabled: true,
            regist_disabled: true,
        }
    }

    goto_login() {
        this.setState({
            below_flag: true,
            isVisible: true
        });
        let user = {account: this.state.login_account,password: this.state.passwd}
        fetch(global.variables.ip+'/user/selectUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isVisible: false
                })
                if(responseJson != null){
                    global.variables.userToken = true;
                    global.variables.userId = responseJson.userId;
                    global.variables.name = responseJson.name;
                    global.variables.signature = responseJson.signature;
                    global.variables.avatar = responseJson.avatar;
                    global.variables.account = responseJson.account;
                    console.log(responseJson)
                    ToastExample.show("登陆成功",ToastExample.SHORT);
                    if(this.props.last === 'myInfo'){
                        Actions.pop({refresh:({selectedIndex: 1})})
                    }else{
                        Actions.pop();
                    }
                }else{
                    ToastExample.show("用户名或密码错误",ToastExample.SHORT);
                    this.setState({passwd: ''})
                }
            })
            .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
    }

    goto_regist() {
        this.setState({
            below_flag: false,
            isVisible: true
        });
        let user = {account: this.state.regist_account,password: this.state.passwd1};
        fetch(global.variables.ip+'/user/insertUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)})
            .then(res => {
                this.setState({
                    below_flag: true,
                    login_account: this.state.regist_account,
                    passwd1: '',
                    passwd2: '',
                    isVisible: false
                });
            })
            .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
    }

    checkUserRegistOrNo(account) {
        let temp_account = {"account": account};
        fetch(global.variables.ip+'/user/selectUserRegistOrNo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(temp_account)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if( responseJson != null ){
                    this.setState({
                        regist_account_prompt: '用户已存在',
                        regist_disabled: true
                    })
                }else{
                    this.setState({
                        regist_account_prompt: ''
                    },() => {
                        if(this.state.regist_account !== '' && this.state.passwd1 !== '' && (this.state.passwd1 === this.state.passwd2)){
                            this.setState({regist_disabled: false})
                        }else{
                            this.setState({regist_disabled: true})
                        }
                    })
                }
            })
            .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
    }

    render() {
        return (
            <View>
                <ImageBackground style={{width: width,height: height}} source={require('../../imgs/bg2.jpg')}>
                    <View style={this.state.below_flag ? styles.textView_login : styles.textView_regist}>
                        <TouchableOpacity onPress={() => this.setState({below_flag: true})}>
                            <Text style={this.state.below_flag ? styles.textStyle1 : styles.textStyle2}>登录</Text>
                            {this.state.below_flag ? <View style={styles.textBelow}></View> : null}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({below_flag: false})}>
                            <Text style={this.state.below_flag ? styles.textStyle2 : styles.textStyle1}>注册</Text>
                            {this.state.below_flag ? null : <View style={styles.textBelow}></View>}
                        </TouchableOpacity>
                    </View>
                    {this.state.below_flag ?
                        <View style={styles.container_login}>
                            <View style={styles.inputView}>
                                <Input value={this.state.login_account}
                                       containerStyle={{width: width*0.6,height: width*0.1}}
                                       onChangeText={(text) => {
                                           this.setState({login_account: text},() => {
                                               if(this.state.login_account !== '' && this.state.passwd !== ''){
                                                   this.setState({login_disabled: false})
                                               }else{
                                                   this.setState({login_disabled: true})
                                               }
                                           })
                                       }}
                                       onEndEditing={() => {
                                           if(this.state.login_account === ''){
                                               this.setState({login_account_prompt: '账号不能为空'})
                                           }else{
                                               this.setState({login_account_prompt: ''})
                                           }
                                       }}
                                       label={'账号'}
                                       placeholder='请输入账号'
                                />
                                <Text style={styles.prompt}>{this.state.login_account_prompt}</Text>
                            </View>
                            <View style={styles.inputView}>
                                <Input value={this.state.passwd}
                                       containerStyle={{width: width*0.6,height: width*0.1}}
                                       onChangeText={(text) => {
                                           this.setState({passwd: text},() => {
                                               if(this.state.login_account !== '' && this.state.passwd !== ''){
                                                   this.setState({login_disabled: false})
                                               }else{
                                                   this.setState({login_disabled: true})
                                               }
                                           })
                                       }}
                                       onEndEditing={() => {
                                           if(this.state.passwd === ''){
                                               this.setState({login_passwd_prompt: '密码不能为空'})
                                           }else{
                                               this.setState({login_passwd_prompt: ''})
                                           }
                                       }}
                                       secureTextEntry={true}
                                       label={'密码'}
                                       placeholder='请输入密码'
                                />
                                <Text style={styles.prompt}>{this.state.login_passwd_prompt}</Text>
                            </View>
                            <Button
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                onPress={() => this.goto_login()}
                                disabled={this.state.login_disabled}
                                title='登录'
                            />
                    </View> :
                    <View style={styles.container_regist}>
                        <View style={styles.inputView}>
                            <Input value={this.state.regist_account}
                                   containerStyle={{width: width*0.6,height: width*0.1}}
                                   onChangeText={(text) => {
                                       this.setState({regist_account: text},() => {
                                           if(this.state.regist_account !== '' && this.state.passwd1 !== '' && (this.state.passwd1 === this.state.passwd2) && this.state.regist_account_prompt === ''){
                                               this.setState({regist_disabled: false})
                                           }else{
                                               this.setState({regist_disabled: true})
                                           }
                                       })
                                   }}
                                   onEndEditing={() => {
                                       this.checkUserRegistOrNo(this.state.regist_account)
                                       if(this.state.regist_account === ''){
                                           this.setState({regist_account_prompt: '账号不能为空'})
                                       }else{
                                           this.setState({regist_account_prompt: ''})
                                       }
                                   }}
                                   label={'账号'}
                                   placeholder='请输入账号'/>
                            <Text style={styles.prompt}>{this.state.regist_account_prompt}</Text>
                        </View>
                        <View style={styles.inputView}>
                            <Input value={this.state.passwd1}
                                   containerStyle={{width: width*0.6,height: width*0.1}}
                                   onChangeText={(text) => {
                                       this.setState({passwd1: text},() => {
                                           if(this.state.regist_account !== '' && this.state.passwd1 !== '' && (this.state.passwd1 === this.state.passwd2) && this.state.regist_account_prompt === ''){
                                               this.setState({regist_disabled: false})
                                           }else{
                                               this.setState({regist_disabled: true})
                                           }
                                       })
                                   }}
                                   onEndEditing={() => {
                                       if(this.state.passwd1 === ''){
                                           this.setState({regist_passwd_prompt: '密码不能为空'})
                                       }else{
                                           this.setState({regist_passwd_prompt: ''})
                                       }
                                   }}
                                   secureTextEntry={true}
                                   label={'密码'}
                                   placeholder='请输入密码'/>
                            <Text style={styles.prompt}>{this.state.regist_passwd_prompt}</Text>
                        </View>
                        <View style={styles.inputView}>
                            <Input value={this.state.passwd2}
                                   containerStyle={{width: width*0.6,height: width*0.1}}
                                   onChangeText={(text) => {
                                       this.setState({passwd2: text},() => {
                                           if(this.state.passwd1 !== this.state.passwd2){
                                               this.setState({regist_conpwd_prompt: '两次密码输入不一致'})
                                           }else{
                                               this.setState({regist_conpwd_prompt: ''})
                                           }
                                           if(this.state.regist_account !== '' && this.state.passwd1 !== '' && (this.state.passwd1 === this.state.passwd2) && this.state.regist_account_prompt === ''){
                                               this.setState({regist_disabled: false})
                                           }else{
                                               this.setState({regist_disabled: true})
                                           }
                                       })
                                   }}
                                   onEndEditing={() => {
                                       if(this.state.passwd2 === ''){
                                           this.setState({regist_conpwd_prompt: '确认密码不能为空'})
                                       }else{
                                           this.setState({regist_conpwd_prompt: ''})
                                       }
                                   }}
                                   secureTextEntry={true}
                                   label={'确认密码'}
                                   placeholder='请再次输入密码'/>
                            <Text style={styles.prompt}>{this.state.regist_conpwd_prompt}</Text>
                        </View>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            onPress={() => {this.goto_regist()}}
                            disabled={this.state.regist_disabled}
                            title='注册'
                        />
                    </View>}
                </ImageBackground>
                <Overlay
                    isVisible={this.state.isVisible}
                    height={width*0.25}
                    width={width*0.25}
                >
                    <ProgressBarAndroid style={{marginTop: width*0.02}} styleAttr='Large' color='#2089DC'/>
                </Overlay>
            </View>
        );
    }
}

const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
    container_login:{
        width: width*0.65,
        height: height*0.32,
        backgroundColor: 'white',
        top: height/4.2,
        left: width/5.5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        borderRadius: 5
    },
    container_regist: {
        width: width*0.65,
        height: height*0.4,
        backgroundColor: 'white',
        top: height/5.2,
        left: width/5.5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        borderRadius: 5
    },
    text: {
        fontSize: 20,
        marginTop: 5
    },
    buttonStyle: {
        height:width*0.125,
        width:width*0.25,
        borderRadius: 5,
        top: -height*0.02,
        left: width*0.18,
        marginTop: height*0.02
    },
    titleStyle: {
        fontSize:15
    },
    textView_login: {
        width: width/1.5,
        height: 50,
        top: height/4.3,
        left: width/5.5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textView_regist: {
        width: width/1.5,
        height: 50,
        top: height/5.4,
        left: width/5.5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textStyle1: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },
    textStyle2: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        opacity: 0.7
    },
    textBelow: {
        backgroundColor:'white',
        width:50,
        height:50,
        borderRadius:25,
    },
    imageStyle: {
        width: 38,
        height: 38,
        marginTop: 10
    },
    inputView: {
        flex: 1,
        flexDirection: 'row'
    },
    prompt: {
        left: -width*0.25,
        color: 'red'
    }
});


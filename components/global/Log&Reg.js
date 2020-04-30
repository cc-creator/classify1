import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity, ProgressBarAndroid, Image
} from 'react-native';
import {Button, Input, Overlay} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ToastExample from "../native/Toast";

const phone = /^[1][3-5,7-8]\d{9}$/
export default class logReg extends Component {

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
                    global.variables.background = responseJson.background;
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
            .catch(err => {
                this.setState({isVisible: false});
                ToastExample.show("网络出错",ToastExample.SHORT)
            })
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
            .catch(err => {
                this.setState({isVisible: false});
                ToastExample.show("网络出错",ToastExample.SHORT)
            })
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
                <TouchableOpacity style={{width:30,height:30,top:10,left:20}} onPress={() => {
                    if(this.props.last === 'myInfo'){
                        Actions.pop({refresh:({selectedIndex: 1})})
                    }else{
                        Actions.pop();
                    }
                }}>
                    <Image source={require('../../imgs/close.png')} style={{width: 25,height: 25}}/>
                </TouchableOpacity>
                <View style={{alignItems: 'center',top: height*0.15}}>
                    <View style={styles.textView}>
                        <TouchableOpacity style={{height: 35}} onPress={() => this.setState({below_flag: true})}>
                            <Text style={this.state.below_flag ? styles.textStyle1 : styles.textStyle2}>登录</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height: 35}} onPress={() => this.setState({below_flag: false})}>
                            <Text style={this.state.below_flag ? styles.textStyle2 : styles.textStyle1}>注册</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.below_flag ?
                        <View style={styles.container_login}>
                            <View style={styles.inputView}>
                                <Input value={this.state.login_account}
                                       containerStyle={{width: width*0.84,height: width*0.1}}
                                       rightIcon={<TouchableOpacity onPress={() => this.setState({login_account: ''})}><Image style={{width: width*0.05,height: width*0.05}} source={require("../../imgs/delete.png")}/></TouchableOpacity>}
                                       onChangeText={(text) => {
                                           this.setState({login_account: text},() => {
                                               if(!phone.test(this.state.login_account)){
                                                   this.setState({login_account_prompt: '手机号不合法',login_disabled: true})
                                               }else{
                                                   this.setState({login_account_prompt: ''},() => {
                                                       if(this.state.passwd !== ''){
                                                           this.setState({login_disabled: false})
                                                       }else{
                                                           this.setState({login_disabled: true})
                                                       }
                                                   })
                                               }
                                           })
                                       }}
                                       onEndEditing={() => {
                                           if(this.state.login_account === ''){
                                               this.setState({login_account_prompt: '手机号不能为空'})
                                           }else{
                                               this.setState({login_account_prompt: ''})
                                           }
                                       }}
                                       label={'手机号'}
                                       placeholder='请输入手机号'
                                />
                                <Text style={styles.prompt}>{this.state.login_account_prompt}</Text>
                            </View>
                            <View style={styles.inputView}>
                                <Input value={this.state.passwd}
                                       containerStyle={{width: width*0.84,height: width*0.1}}
                                       onChangeText={(text) => {
                                           this.setState({passwd: text},() => {
                                               if(this.state.passwd !== '' && this.state.login_account_prompt === ''){
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
                                   containerStyle={{width: width*0.84,height: width*0.1}}
                                   rightIcon={<TouchableOpacity onPress={() => this.setState({regist_account: ''})}><Image style={{width: width*0.05,height: width*0.05}} source={require("../../imgs/delete.png")}/></TouchableOpacity>}
                                   onChangeText={(text) => {
                                       this.setState({regist_account: text},() => {
                                           if(!phone.test(this.state.regist_account)){
                                               this.setState({regist_account_prompt: '手机号不合法',regist_disabled: true})
                                           }else{
                                               this.setState({regist_account_prompt: ''},() => {
                                                   if(this.state.passwd1 !== '' && (this.state.passwd1 === this.state.passwd2)){
                                                       this.setState({regist_disabled: false})
                                                   }else{
                                                       this.setState({regist_disabled: true})
                                                   }
                                               })
                                           }
                                       })
                                   }}
                                   onEndEditing={() => {
                                       this.checkUserRegistOrNo(this.state.regist_account)
                                       if(this.state.regist_account === ''){
                                           this.setState({regist_account_prompt: '手机号不能为空'})
                                       }else{
                                           this.setState({regist_account_prompt: ''})
                                       }
                                   }}
                                   label={'手机号'}
                                   placeholder='请输入手机号'/>
                            <Text style={styles.prompt}>{this.state.regist_account_prompt}</Text>
                        </View>
                        <View style={styles.inputView}>
                            <Input value={this.state.passwd1}
                                   containerStyle={{width: width*0.84,height: width*0.1}}
                                   onChangeText={(text) => {
                                       this.setState({passwd1: text},() => {
                                           if(this.state.regist_account_prompt === '' && this.state.passwd1 !== '' && (this.state.passwd1 === this.state.passwd2)){
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
                                   containerStyle={{width: width*0.84,height: width*0.1}}
                                   onChangeText={(text) => {
                                       this.setState({passwd2: text},() => {
                                           if(this.state.passwd1 !== this.state.passwd2){
                                               this.setState({regist_conpwd_prompt: '两次密码输入不一致'})
                                           }else{
                                               this.setState({regist_conpwd_prompt: ''})
                                           }
                                           if(this.state.regist_account_prompt === '' && this.state.passwd1 !== '' && (this.state.passwd1 === this.state.passwd2)){
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
                </View>
                <Overlay
                    isVisible={this.state.isVisible}
                    height={width*0.25}
                    width={width*0.25}
                    overlayStyle={{padding: 0,paddingTop: width*0.024}}
                >
                    <ProgressBarAndroid styleAttr='Large' color='#2089DC'/>
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
        width: width*0.85,
        height: height*0.295,
        paddingTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 40
    },
    container_regist: {
        width: width*0.85,
        height: height*0.45,
        paddingTop: 50,
        borderRadius: 5,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        marginTop: 5
    },
    buttonStyle: {
        height:width*0.125,
        width:width*0.8,
        borderRadius: 5,
        top: -height*0.02,
        marginTop: height*0.02
    },
    titleStyle: {
        fontSize:15
    },
    textView: {
        width: width*0.8,
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle1: {
        fontSize: 25,
        color: '#2089DC',
        fontWeight: 'bold'
    },
    textStyle2: {
        fontSize: 25,
        color: 'gray',
        fontWeight: 'bold',
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
        position: 'absolute',
        height: 20,
        right: 10,
        color: 'red'
    }
});


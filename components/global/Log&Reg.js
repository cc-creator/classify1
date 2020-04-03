import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ToastExample from "../../nativeComponents/ToastExample";

export default class LogReg extends Component {

    constructor(props){
        super(props);
        this.state = {
            below_flag: true,
            account: props.account,
            passwd: ''
        }
    }

    goto_login() {
        this.setState({
            below_flag: true
        });
        let user = {account: this.state.account,password: this.state.passwd}
        fetch('http://192.168.195.1:8080/user/selectUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)})
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.userId !== null){
                    global.variables.userToken = true;
                    global.variables.userId = responseJson.userId;
                    console.log(responseJson)
                    ToastExample.show("登陆成功",ToastExample.SHORT);
                    console.log("登陆成功"+global.variables.userId)
                    Actions.pop();
                }else{
                    ToastExample.show("没有该用户",ToastExample.SHORT);
                }
            })
            .catch(err => console.log(err))
    }

    goto_regist() {
        this.setState({
            below_flag: false
        });
        let user = {account: this.state.account,password: this.state.passwd1};
        fetch('http://192.168.195.1:8080/user/insertUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)})
            .then(res => {
                this.setState({
                    below_flag: true
                });
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <View>
                <ImageBackground style={{width: width,height: height}} source={require('../../bg2.jpg')}>
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
                            <Text style={styles.text}>账号</Text>
                            <Input value={this.state.account}
                                   onChangeText={(text) => this.setState({account: text})}
                                placeholder='INPUT WITH CUSTOM ICON'
                            />
                            <Text style={styles.text}>密码</Text>
                            <Input value={this.state.passwd}
                                   onChangeText={(text) => this.setState({passwd: text})}
                                placeholder='INPUT WITH CUSTOM ICON'
                            />
                            <Button
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                onPress={() => this.goto_login()}
                                title='登录'
                            />
                    </View> :
                    <View style={styles.container_regist}>
                        <Text style={styles.text}>账号</Text>
                        <Input value={this.state.account}
                               onChangeText={(text) => this.setState({account: text})}
                               placeholder='INPUT WITH CUSTOM ICON'
                        />
                        <Text style={styles.text}>密码</Text>
                        <Input value={this.state.passwd1}
                               onChangeText={(text) => this.setState({passwd1: text})}
                               placeholder='INPUT WITH CUSTOM ICON'
                        />
                        <Text style={styles.text}>确认密码</Text>
                        <Input value={this.state.passwd2}
                               onChangeText={(text) => this.setState({passwd2: text})}
                               placeholder='INPUT WITH CUSTOM ICON'
                        />
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            onPress={() => {this.goto_regist()}}
                            title='注册'
                        />
                    </View>}
                </ImageBackground>
            </View>
        );
    }
}

const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
    container_login:{
        width: width/1.5,
        height: height/3,
        backgroundColor: 'white',
        top: height/4.2,
        left: width/5.5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        borderRadius: 5
    },
    container_regist: {
        width: width/1.5,
        height: height/2.35,
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
        height:50,
        width:120,
        borderRadius: 5,
        marginLeft: width/5.1,
        marginTop: height/24
    },
    titleStyle: {
        fontSize:20
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
        opacity: 0.8
    },
    textBelow: {
        backgroundColor:'white',
        width:50,
        height:50,
        borderRadius:25,
    }
});


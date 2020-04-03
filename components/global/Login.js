import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {Button, Input, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ToastExample from "../../nativeComponents/ToastExample";

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisible: true,
            account: props.account,
            passwd: ''
        }
    }

    goto_login() {
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
                    Actions.pop({propNum: 2});
                }else{
                    ToastExample.show("没有该用户",ToastExample.SHORT);
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
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
                <TouchableOpacity onPress={() => Actions.regist()}>
                    <Text>注册</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
    container:{
        width: width/1.5,
        height: height/3,
        backgroundColor: 'white',
        top: height/3.7,
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
    }
});


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity, Image
} from 'react-native';
import {Button, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class Regist extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisible: true,
            account: '',
            passwd1: '',
            passwd2: ''
        }
    }

    goto_regist() {
        let user = {account: this.state.account,password: this.state.passwd1};
        fetch('http://192.168.195.1:8080/user/insertUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)})
            .then(res => {
                console.log(res)
                Actions.login({account: this.state.account});
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
                    <TouchableOpacity onPress={() => {
                        Actions.login()
                    }}>
                        <Text>登录</Text>
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
    container: {
        width: width/1.5,
        height: height/2.35,
        backgroundColor: 'white',
        top: height/4.7,
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


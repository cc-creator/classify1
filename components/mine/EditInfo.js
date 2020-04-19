import React, { Component } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    View,
    Text, Image
} from 'react-native';
import Header from "../global/Header";
import {Avatar,Input} from "react-native-elements";

export default class EditInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            signature: ''
        }
    }

    render() {
        return (
            <View>
                <Header title='编辑个人信息' left_flag={true} />
                <View style={{padding: 5,paddingLeft:10,paddingRight:10}}>
                <Text style={{fontSize: 20}}>头像:</Text>
                <View style={{alignItems: 'center',paddingTop: 5}}>
                    <Avatar
                        size="xlarge"
                        rounded
                        title={'cc'}
                        showEditButton={true}
                        source={require('../../imgs/bg2.jpg')}
                    />
                </View>
                <Text style={{fontSize: 20}}>昵称:</Text>
                <Input placeholder='昵称' value={this.state.name}
                       maxLength={10}
                       onChangeText={(text) => {this.setState({name: text})}}/>
                <Text style={{fontSize: 20}}>个性签名:</Text>
                <Input placeholder='个性签名' value={this.state.signature}
                       maxLength={10}
                       onChangeText={(text) => {this.setState({signature: text})}}/>
                </View>
            </View>
        );
    }
}
const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
});


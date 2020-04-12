import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Header from "../global/Header";

export default class MyInfo extends Component{

    constructor(){
        super();
        this.state = {
            isShow: false,
            progress: 0
        }
    }

    render() {
        return (
            <View>
                <Header title='我的' flag={false}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});


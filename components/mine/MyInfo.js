import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Header from "../global/Header";
import { Avatar } from 'react-native-elements'

export default class MyInfo extends Component{

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title='我的' flag={false}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
});


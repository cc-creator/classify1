import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Button} from "react-native-elements";
import { Actions } from 'react-native-router-flux';

export default class MyInfo extends Component{

     putImages(){
        console.log("==========")
        fetch('http://192.168.195.1:8080/test/testLink', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'yourValue',
                password: 'yourOtherValue',
            }),
        }).catch(res => console.log(res));
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title={'dianji'}
                    onPress={this.putImages.bind(this)}
                ></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
});


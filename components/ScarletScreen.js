import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import ToastExample from '../nativeComponents/ToastExample';

export default class ScarletScreen extends Component{

    recognizeImage() {
        console.log("---------")
        ToastExample.show("Awesome", ToastExample.SHORT);
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.recognizeImage.bind(this)}>
                    <Text
                        style={styles.welcome}
                    >
                        识别
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb0000',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
});

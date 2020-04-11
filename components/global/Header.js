import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import {Actions} from "react-native-router-flux";

const Header = ({title,flag}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            { flag ? <TouchableOpacity style={styles.touchableOpacity}
                                       onPress={() => {
                                           if(title === '图片分类'){
                                               Actions.jump('record');
                                           }else{
                                               Actions.pop()
                                           }
                                       }}>
                    <Image style={styles.image} source={require('../../imgs/back.png')}/>
                </TouchableOpacity> : null }
        </View>
    )
}

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height*0.07,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 25,
        fontWeight: '400',
        lineHeight: height*0.07
    },
    touchableOpacity: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    image: {
        width: 40,
        height: 40
    }
})

export default Header;

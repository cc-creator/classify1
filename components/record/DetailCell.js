import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Badge } from 'react-native-elements';

const DetailCell = ({prop}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{prop.item.label}</Text>
            <View style={styles.imageView}>
                <TouchableOpacity onPress={() => {Actions.cellDetail({images:prop.item.group})}}>
                    <Image style={styles.image} source={{uri: prop.item.group[0].url}}></Image>
                    <Badge badgeStyle={{top: -10,left: -5}} value={prop.item.sum} status="primary" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const dimension = Dimensions.get('window')
let width = dimension.width
let height = dimension.height
const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        height: height/5.5
    },
    text: {
        fontSize: 20,
        marginTop: 10,
    },
    imageView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5
    },
    image: {
        width: (width-50)/4,
        height: (width-50)/4,
        borderRadius: 10.0,
        marginRight: 15
    }
});

export default DetailCell;


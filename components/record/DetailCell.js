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
            <View style={{flex: 1,flexDirection: 'row'}}>
                <Text style={styles.text}>{prop.item.label}</Text>
                <Badge badgeStyle={{top: 5,left: 5}} value={prop.item.sum} status="success" />
            </View>
            <View style={styles.imageView}>
                <FlatList
                    data={prop.item.group}
                    horizontal={true}
                    keyExtractor={(item, index)=> ''+index}
                    renderItem={(item) => <TouchableOpacity onPress={() => {Actions.cellDetail({images:item.item.group})}}>
                        <Image style={styles.image} source={{uri: item.item.group[0].url}}></Image>
                        <Badge badgeStyle={{top: -10,left: -5}} value={item.item.sum} status="primary" />
                        <Text style={{top: -20}}>{item.item.label2}</Text>
                    </TouchableOpacity>}
                ></FlatList>
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
        height: 25
    },
    imageView: {
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'flex-start'
    },
    image: {
        width: (width-50)/4,
        height: (width-50)/4,
        borderRadius: 10.0,
        marginRight: 15,
        marginTop: 30
    }
});

export default DetailCell;


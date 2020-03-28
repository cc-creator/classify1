import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Card } from "react-native-elements";
import { Actions } from 'react-native-router-flux';

const RecordCell = ({prop}) =>{
    return (
        <View style={styles.container}>
            <View style={styles.describe}>
                <TouchableOpacity onPress={Actions.detail({group: prop.item.group})}>
                    <Card
                        title={prop.item.title}
                        titleStyle={styles.titleStyle}
                        containerStyle={{width: 380}}
                        image={{uri: prop.item.group[0].url}}
                        imageProps={{resizeMode: 'cover'}}>
                            <Text>{prop.item.remark}</Text>
                    </Card>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    describe: {
        alignItems: 'center',
        height: height/10,
        justifyContent: 'center',
        marginTop: 90,
        marginBottom: 110
    },
    titleStyle: {
        fontSize:20
    },
});

export default RecordCell;

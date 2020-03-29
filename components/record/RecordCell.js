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
                {/*source: 代表来源，包括未存储temp,本地loacl_remark，远端remote_remark*/}
                <TouchableOpacity onPress={ () => Actions.detail({images: prop.item.group,source: 'local_remark',title: prop.item.title,remark: prop.item.remark})}>
                    <Card
                        title={prop.item.title}
                        titleStyle={styles.titleStyle}
                        containerStyle={{width: width*0.8}}
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

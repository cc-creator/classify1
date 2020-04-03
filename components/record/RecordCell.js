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
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

function getImages(cId,title,remark,cover) {
    let categoryId = {"categoryId": cId};
    fetch('http://192.168.195.1:8080/images/getImages', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryId)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            Actions.detail({images: responseJson,source: 'remote_remark',title: title,remark: remark,cover: cover})
        })
        .catch(err => console.log(err))
}

const RecordCell = ({prop,getFlag}) =>{
    return (
        <View style={styles.container}>
            <View style={styles.describe}>
                {/*source: 代表来源，包括未存储temp,本地loacl_remark，远端remote_remark*/}
                <TouchableOpacity onPress={ () => {
                    if(getFlag()){
                        Actions.detail({images: prop.item.group,source: 'local_remark',title: prop.item.title,remark: prop.item.remark,cover: prop.item.cover})
                    }else{
                        getImages(prop.item.categoryId,prop.item.title,prop.item.remark,prop.item.cover);
                    }
                }}>
                    <Card
                        title={prop.item.title}
                        titleStyle={styles.titleStyle}
                        containerStyle={{width: width*0.8}}
                        image={{uri: prop.item.cover}}
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

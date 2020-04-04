import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Card } from "react-native-elements";
import { Actions } from 'react-native-router-flux';

function getImages(cId,ctitle,remark,cover) {
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
            Actions.detail({images: responseJson,source: 'remote_remark',ctitle: ctitle,remark: remark,cover: cover})
        })
        .catch(err => console.log(err))
}

const RecordCell = ({prop,getFlag,deleteRecord}) =>{
    return (
        <View style={styles.container}>
            <View style={styles.describe}>
                {/*source: 代表来源，包括未存储temp,本地loacl_remark，远端remote_remark*/}
                <TouchableOpacity onPress={ () => {
                    if(getFlag()){
                        Actions.detail({images: prop.item.group,source: 'local_remark',ctitle: prop.item.ctitle,remark: prop.item.remark,cover: prop.item.cover})
                    }else{
                        getImages(prop.item.categoryId,prop.item.ctitle,prop.item.remark,prop.item.cover);
                    }
                }}>
                    <Card
                        title={prop.item.ctitle}
                        titleStyle={styles.titleStyle}
                        containerStyle={{width: width*0.8}}
                        image={{uri: prop.item.cover}}
                        imageProps={{resizeMode: 'cover'}}>
                            <Text>{prop.item.remark}</Text>
                    </Card>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{width: 40,height: 40,backgroundColor: '#2089DC',borderRadius: 20,top: -155,left: -215}}
                              onPress={() => {deleteRecord(prop.index)}}>
            </TouchableOpacity>
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

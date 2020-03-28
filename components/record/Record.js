import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import RNFS from "react-native-fs";
import RecordCell from './RecordCell';

const rnfsPath = RNFS.DocumentDirectoryPath;
const jilu_path = rnfsPath + '/jilu.text';
let groups = [];
export default class Record extends Component{

    constructor(){
        super()
        groups = [];
        RNFS.readFile(jilu_path)
            .then((result) => {
                let paths = result.split('@');
                paths.splice(0,1);
                for(let i=0;i<paths.length;i++){
                    RNFS.readFile(paths[i])
                        .then((result) => {
                            let temp = result.split('@');
                            groups.push({title: temp[0],remark: temp[1],group: JSON.parse(temp[2])})
                        })
                        .catch((err) => {})
                }
            })
            .catch((err) => {})
    }

    render(){
        return (
            <View style={styles.container}>
                {/*<FlatList*/}
                {/*    data={groups}*/}
                {/*    keyExtractor={(item, index)=> ''+index}*/}
                {/*    renderItem={(item) => <RecordCell*/}
                {/*        prop={item}*/}
                {/*    />}/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        height:50,
        width:120
    },
    titleStyle: {
        fontSize:20
    },
});

import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFS from "react-native-fs";
import RecordCell from './RecordCell';
import {Button} from "react-native-elements";
import ToastExample from "../../nativeComponents/ToastExample";

const rnfsPath = RNFS.DocumentDirectoryPath;
const jilu_path = rnfsPath + '/jilu.text';
export default class Record extends Component{

    constructor(){
        super();
        this.state = {
            local_groups: [],
            remote_groups: [],
            flag: true //true:本地，false:远端
        };
    }

    UNSAFE_componentWillMount(): void {
        this.local_get();
    }

    remote_get() {
        this.setState({
            flag: false
        });
        if(!global.variables.userToken){
            console.log("转去登录");
            Actions.logreg();
        }else {
            console.log(global.variables.userId)
            let userId = {"userId": global.variables.userId};
            fetch('http://192.168.195.1:8080/category/getCategorys', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userId)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    let temp_groups = responseJson;
                    console.log(responseJson)
                    this.setState({
                        remote_groups: temp_groups.map(group => {
                            return group;
                        })
                    })
                })
                .catch(err => console.log(err))
        }
    }

    local_get() {
        this.setState({
            flag: true
        });
        let temp_groups = [];
        RNFS.readFile(jilu_path)
            .then((result) => {
                let paths = result.split('@');
                paths.splice(0,1);
                for(let i=0;i<paths.length;i++){
                    RNFS.readFile(paths[i])
                        .then((result) => {
                            let temp = result.split('@');
                            temp_groups.push({ctitle: temp[0],remark: temp[1],cover: temp[2],group: JSON.parse(temp[3])})
                            if(i == paths.length-1){
                                this.setState({
                                    local_groups: temp_groups.map(group => {
                                        return group;
                                    })
                                })
                            }
                        })
                        .catch((err) => {})
                }
            })
            .catch((err) => {})
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.buttonView}>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.titleStyle}
                        onPress={this.local_get.bind(this)}
                        title='本地记录'
                    />
                    <Button
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.titleStyle}
                        onPress={this.remote_get.bind(this)}
                        title='远端记录'
                    />
                </View>
                <View style={styles.listView}>
                    {this.state.flag ?
                        <FlatList
                        data={this.state.local_groups}
                        keyExtractor={(item, index)=> ''+index}
                        renderItem={(item) => <RecordCell
                            prop={item}
                            getFlag={() => {return this.state.flag}}
                        />}/> :
                        <FlatList
                            data={this.state.remote_groups}
                            keyExtractor={(item, index)=> ''+index}
                            renderItem={(item) => <RecordCell
                                prop={item}
                                getFlag={() => {return this.state.flag}}
                            />}/>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    buttonStyle: {
        height:50,
        width:120
    },
    titleStyle: {
        fontSize:20
    },
    listView: {
        marginTop: 50
    }
});

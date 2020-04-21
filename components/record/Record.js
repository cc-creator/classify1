import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View, Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFS from "react-native-fs";
import RecordCell from './RecordCell';
import {Button} from "react-native-elements";
import ToastExample from "../../nativeComponents/ToastExample";
import Header from '../global/Header';

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
            fetch(global.variables.ip+'/category/getCategorys', {
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
                    if(temp_groups.length == 0){
                        ToastExample.show("暂无记录",ToastExample.SHORT);
                    }else{
                        this.setState({
                            remote_groups: temp_groups.map(group => {
                                return group;
                            })
                        })
                    }
                })
                .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
        }
    }

    local_get() {
        this.setState({
            flag: true
        });
        let temp_groups = [];
        RNFS.readFile(jilu_path)
            .then((result) => {
                console.log(result)
                let paths = result.split('@');
                paths.splice(0,1);
                if(paths.length == 0){
                    ToastExample.show("暂无记录",ToastExample.SHORT);
                }else{
                    for(let i=0;i<paths.length;i++){
                        RNFS.readFile(paths[i])
                            .then((result) => {
                                let temp = result.split('@');
                                temp_groups.push({path: paths[i],ctitle: temp[0],remark: temp[1],cover: temp[2],time: temp[3],dateTime: temp[4],group: JSON.parse(temp[14]),pdfUri: temp[15]})
                                console.log(temp_groups)
                                if(i == paths.length-1){
                                    this.setState({
                                        local_groups: temp_groups.map(group => {
                                            return group;
                                        })
                                    })
                                    console.log(this.state.local_groups)
                                }
                            })
                            .catch((err) => {})
                    }
                }
            })
            .catch((err) => {ToastExample.show("暂无记录",ToastExample.SHORT);})
    }

    deleteRecord(index,pdfUri) {
        if(this.state.flag){
            RNFS.readFile(jilu_path)
                .then((result) => {
                    let paths = result.split('@');
                    paths.splice(0,1);
                    //得到要删除记录的文件路径
                    let delpath = paths[index];
                    //删除
                    RNFS.unlink(delpath)
                        .then(()=>{
                            //原有的记录文件一并删除
                            RNFS.unlink(jilu_path)
                                .then(()=>{
                                    //写入新的记录文件
                                    paths.splice(index,1)
                                    if(paths.length == 0){
                                        this.setState({local_groups: []})
                                        ToastExample.show("删除记录成功",ToastExample.SHORT);
                                    }else{
                                        for(let i=0;i<paths.length;i++){
                                            RNFS.appendFile(jilu_path,"@"+paths[i],'utf8')
                                                .then((success) => {
                                                    if(i == paths.length-1){
                                                        ToastExample.show("删除记录成功",ToastExample.SHORT);
                                                        this.local_get();
                                                    }
                                                })
                                                .catch((err) => {})
                                        }
                                    }
                                }).catch((err)=>{
                                console.log(err.message);
                            })
                            //对应的PDF删除
                            RNFS.unlink(pdfUri)
                                .then(()=>{})
                                .catch(()=>{})
                        }).catch((err)=>{
                        console.log(err.message);
                    })
                })
                .catch((err) => {})
        }else {
            let cId = {"cId": this.state.remote_groups[index].categoryId};
            fetch(global.variables.ip+'/category/logDelCategory', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cId)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(index)
                    let temp_groups = this.state.remote_groups;
                    temp_groups.splice(index,1);
                    this.setState({
                        remote_groups: temp_groups.map(group => {
                            return group
                        })
                    })
                    ToastExample.show("删除记录成功",ToastExample.SHORT);
                })
                .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
        }

    }

    render(){
        return (
            <View style={styles.container}>
                <Header title='分类记录' left_flag={false} />
                <View style={styles.buttonView}>
                    <Button
                        buttonStyle={this.state.flag ? styles.buttonStyle1 : styles.buttonStyle2}
                        titleStyle={styles.titleStyle}
                        onPress={this.local_get.bind(this)}
                        title='本地记录'
                    />
                    <Button
                        buttonStyle={this.state.flag ? styles.buttonStyle2 : styles.buttonStyle1}
                        titleStyle={styles.titleStyle}
                        onPress={this.remote_get.bind(this)}
                        title='云端记录'
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
                            deleteRecord={this.deleteRecord.bind(this)}
                        />}/> :
                        <FlatList
                            data={this.state.remote_groups}
                            keyExtractor={(item, index)=> ''+index}
                            renderItem={(item) => <RecordCell
                                prop={item}
                                getFlag={() => {return this.state.flag}}
                                deleteRecord={this.deleteRecord.bind(this)}
                            />}/>}
                </View>
            </View>
        );
    }
}
let dimensions = Dimensions.get("window")
let height = dimensions.height
let width = dimensions.width
const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: height*0.02
    },
    buttonStyle1: {
        height:width*0.125,
        width:width*0.25,
    },
    buttonStyle2: {
        height:width*0.125,
        width:width*0.25,
        opacity: 0.7
    },
    titleStyle: {
        fontSize:15
    },
    listView: {
        marginTop: 50,
        height: height*0.72
    }
});

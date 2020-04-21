import React, { Component } from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';
import {Avatar, Divider, ButtonGroup } from 'react-native-elements';
import Header from "../global/Header";
import InfoCell from './InfoCell';
import RNFS from "react-native-fs";
import ToastExample from "../../nativeComponents/ToastExample";
import {Actions} from "react-native-router-flux";

const rnfsPath = RNFS.DocumentDirectoryPath;
const jilu_path = rnfsPath + '/jilu.text';
export default class MyInfo extends Component{

    constructor(){
        super();
        this.state = {
            local_list: [],
            remote_list: [],
            selectedIndex: 0
        }
    }

    UNSAFE_componentWillMount(): void {
        this.local_getInfo();
    }

    local_getInfo() {
        this.setState({local_list: []})
        RNFS.readFile(jilu_path)
            .then((result) => {
                let paths = result.split('@');
                paths.splice(0,1);
                if(paths.length == 0){
                    ToastExample.show("暂无记录",ToastExample.SHORT);
                }else{
                    let list = [];
                    for(let i=0;i<paths.length;i++){
                        RNFS.readFile(paths[i])
                            .then((result) => {
                                let temp = result.split('@');
                                let first_level = temp[5].split("+");
                                let sum= 0;
                                for(let j=0;j<first_level.length;j++){
                                    sum += Number(first_level[j]);
                                }
                                let second_person = temp[6].split("+");
                                let second_animal = temp[7].split("+");
                                let second_plant = temp[8].split("+");
                                let second_food = temp[9].split("+");
                                let second_scenery = temp[10].split("+");
                                let second_clothing = temp[11].split("+");
                                let second_thing = temp[12].split("+");
                                let second_document = temp[13].split("+");
                                list.push({
                                    'source': 'local',
                                    'title': temp[0],
                                    'remark': temp[1],
                                    'cover': temp[2],
                                    'time': temp[3],
                                    'dateTime': temp[4],
                                    'sum': sum,
                                    'person': first_level[0], 'animal': first_level[1], 'plant': first_level[2], 'food': first_level[3], 'scenery': first_level[4], 'clothing': first_level[5], 'thing': first_level[6], 'document': first_level[7], 'other': first_level[8],
                                    'single': second_person[0], 'dubbo': second_person[1], 'multi': second_person[2], 'passport': second_person[3],
                                    'mammal': second_animal[0], 'bird': second_animal[1], 'fish': second_animal[2], 'insect': second_animal[3], 'anphibious': second_animal[4],
                                    'flower': second_plant[0], 'grass': second_plant[1], 'tree': second_plant[2],
                                    'meal': second_food[0], 'drink': second_food[1], 'desert': second_food[2],
                                    'outside': second_scenery[0], 'night': second_scenery[1],
                                    'clothe': second_clothing[0], 'hat': second_clothing[1], 'shoes': second_clothing[2],
                                    'dianqi': second_thing[0], 'furniture': second_thing[1],
                                    'erweima': second_document[0], 'zhengjian': second_document[1]
                                })
                                if(i == paths.length-1){
                                    this.setState({
                                        local_list: list.map(item => {return item})
                                    })
                                }
                            })
                            .catch((err) => {})
                    }
                }
            })
            .catch((err) => {})
    }

    remote_getInfo() {
        if(!global.variables.userToken){
            console.log("转去登录");
            Actions.logreg();
        }else {
            let userId = {"userId": global.variables.userId};
            fetch(global.variables.ip + '/category/getCategorys', {
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
                    if (temp_groups.length == 0) {
                        ToastExample.show("暂无记录", ToastExample.SHORT);
                    } else {
                        let list = [];
                        for (let i = 0; i < temp_groups.length; i++) {
                            let temp = temp_groups[i].info.split("@");
                            let first_level = temp[0].split('+');
                            let sum = 0;
                            for (let j = 0; j < first_level.length; j++) {
                                sum += Number(first_level[j]);
                            }
                            let second_person = temp[1].split("+");
                            let second_animal = temp[2].split("+");
                            let second_plant = temp[3].split("+");
                            let second_food = temp[4].split("+");
                            let second_scenery = temp[5].split("+");
                            let second_clothing = temp[6].split("+");
                            let second_thing = temp[7].split("+");
                            let second_document = temp[8].split("+");
                            list.push({
                                'source': 'remote',
                                'title': temp_groups[i].ctitle,
                                'remark': temp_groups[i].remark,
                                'cover': temp_groups[i].cover,
                                'time': temp_groups[i].time,
                                'dateTime': temp_groups[i].datetime,
                                'sum': sum,
                                'person': first_level[0],
                                'animal': first_level[1],
                                'plant': first_level[2],
                                'food': first_level[3],
                                'scenery': first_level[4],
                                'clothing': first_level[5],
                                'thing': first_level[6],
                                'document': first_level[7],
                                'other': first_level[8],
                                'single': second_person[0],
                                'dubbo': second_person[1],
                                'multi': second_person[2],
                                'passport': second_person[3],
                                'mammal': second_animal[0],
                                'bird': second_animal[1],
                                'fish': second_animal[2],
                                'insect': second_animal[3],
                                'anphibious': second_animal[4],
                                'flower': second_plant[0],
                                'grass': second_plant[1],
                                'tree': second_plant[2],
                                'meal': second_food[0],
                                'drink': second_food[1],
                                'desert': second_food[2],
                                'outside': second_scenery[0],
                                'night': second_scenery[1],
                                'clothe': second_clothing[0],
                                'hat': second_clothing[1],
                                'shoes': second_clothing[2],
                                'dianqi': second_thing[0],
                                'furniture': second_thing[1],
                                'erweima': second_document[0],
                                'zhengjian': second_document[1]
                            })
                            if (i == temp_groups.length - 1) {
                                this.setState({
                                    remote_list: list.map(item => {
                                        return item
                                    })
                                })
                            }
                        }
                    }
                })
                .catch(err => console.log(err))
        }
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex},() => {
            if(this.state.selectedIndex == 1){
                console.log('++++++')
                this.remote_getInfo();
            }
        })
    }

    render() {
        return (
            <View>
                <Header title='我的' left_flag={false} />
                <View style={{height: height*0.25}}>
                    <ImageBackground style={{width: width,height: height*0.25}} source={require('../../imgs/bg2.jpg')}/>
                </View>
                <Avatar
                    size="large"
                    rounded
                    title={'cc'}
                    source={require('../../imgs/bg2.jpg')}
                    containerStyle={{top: -40,left: 40,borderWidth: 3,borderColor: 'white'}}
                />
                {global.variables.userToken ? <Text style={{position: 'absolute',fontSize: 30,color: 'white',top: height*0.27,left: width*0.4}}>{global.variables.name}</Text> : null}
                {global.variables.userToken ? <Text style={{position: 'absolute',fontSize: 15,color: 'black',top: height*0.32,left: width*0.4}}>{global.variables.userId}</Text> : null}
                {global.variables.userToken ? <Text style={{position: 'absolute',color: 'black',fontSize: 20,top: height*0.37,left: 20}}>{global.variables.signature}</Text> : null}
                <ButtonGroup
                    onPress={this.updateIndex.bind(this)}
                    selectedIndex={this.state.selectedIndex}
                    buttons={['本地记录','云端记录']}
                    containerStyle={{height: width*0.1}}
                />
                {this.state.selectedIndex == 0 ?
                    <View style={{height: height * 0.43, width: width}}>
                        <FlatList
                            data={this.state.local_list}
                            renderItem={(item) => {
                                return <InfoCell prop={item}/>
                            }}
                            ItemSeparatorComponent={() => {
                                return <Divider style={{backgroundColor: 'gray'}}/>
                            }}
                            keyExtractor={(item, index) => '' + index}/>
                    </View> :
                    <View style={{height: height * 0.5, width: width}}>
                        <FlatList
                            data={this.state.remote_list}
                            renderItem={(item) => {
                                return <InfoCell prop={item}/>
                            }}
                            ItemSeparatorComponent={() => {
                                return <Divider style={{backgroundColor: 'gray'}}/>
                            }}
                            keyExtractor={(item, index) => '' + index}/>
                    </View>
                }
            </View>
        );
    }
}
const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
});


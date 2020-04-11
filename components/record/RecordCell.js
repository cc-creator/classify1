import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Card } from "react-native-elements";
import { Actions } from 'react-native-router-flux';

export default class RecordCell extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisable: false
        }
    }

    getImages(cId,ctitle,remark,time,dateTime,pdfUri,cover) {
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
                Actions.detail({images: responseJson,source: 'remote',ctitle: ctitle,remark: remark,time: time,dateTime: dateTime,pdfUri: pdfUri,cover: cover})
            })
            .catch(err => console.log(err))
    }

    goto_detail() {
        let item = this.props.prop.item;
        if (this.props.getFlag()) {
            Actions.detail({
                path: item.path,
                images: item.group,
                ctitle: item.ctitle,
                remark: item.remark,
                time: item.time,
                dateTime: item.dateTime,
                pdfUri: item.pdfUri,
                cover: item.cover,
                source: 'local'
            })
        } else {
            this.getImages(item.categoryId, item.ctitle, item.remark, item.time,item.dateTime,item.pdfUri,item.cover);
        }
        this.setState({isVisable: false})
    }

    goto_classify() {
        let item = this.props.prop.item;
        if (this.props.getFlag()) {//本地记录
            Actions.classify({
                path: item.path,
                source: 'local',
                ctitle: item.ctitle,
                remark: item.remark,
                time: item.time,
                dateTime: item.dateTime,
                pdfUri: item.pdfUri,
                cover: item.cover,
                again: true
            })
        } else {//云端记录
            Actions.classify({
                categoryId: item.categoryId,
                source: 'remote',
                ctitle: item.ctitle,
                remark: item.remark,
                time: item.time,
                dateTime: item.dateTime,
                pdfUri: item.pdfUri,
                cover: item.cover,
                again: true
            });
        }
        this.setState({isVisable: false})
    }

    render() {
        let item = this.props.prop.item;
        return (
            <View style={styles.container}>
                <View style={styles.describe}>
                    {/*source: 代表来源，包括未存储temp,本地loacl_remark，远端remote_remark*/}
                    <TouchableOpacity
                        onPress={this.goto_detail.bind(this)}
                        onLongPress={() => {this.setState({isVisable: true})}}
                    >
                        <Card
                            title={item.ctitle}
                            titleStyle={styles.titleStyle}
                            containerStyle={{width: width * 0.8}}
                            image={{uri: item.cover}}
                            imageProps={{resizeMode: 'cover'}}>
                            <Text>{item.remark}</Text>
                        </Card>
                    </TouchableOpacity>
                    {this.state.isVisable ?
                        <View style={styles.delView}>
                            <TouchableOpacity
                                onPress={this.goto_classify.bind(this)}>
                                <Image source={require('../../imgs/goon.png')} style={styles.delStyle}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity
                                              onPress={() => {this.props.deleteRecord(this.props.prop.index,this.props.prop.item.pdfUri)}}>
                                <Image source={require('../../imgs/remove.png')} style={styles.delStyle}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity
                                              onPress={() => {this.setState({isVisable: false})}}>
                                <Image source={require('../../imgs/cancel.png')} style={styles.delStyle}></Image>
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
            </View>
        );
    }
}

const dimension = Dimensions.get('window')
let width = dimension.width
let height = dimension.height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15
    },
    describe: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: height/10,
        marginTop: 70,
        marginBottom: 80
    },
    titleStyle: {
        fontSize:20
    },
    delView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: height/4.5,
        marginTop: 20
    },
    delStyle: {
        width: 40,
        height: 40,
    }
});


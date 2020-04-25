import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Card, Overlay} from "react-native-elements";
import { Actions } from 'react-native-router-flux';
import ToastExample from "../../nativeComponents/ToastExample";

export default class RecordCell extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisable: false,
            isShow: false
        }
    }

    getImages(cId,ctitle,remark,time,dateTime,pdfUri,cover) {
        let categoryId = {"categoryId": cId};
        fetch(global.variables.ip+'/images/getImages', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryId)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Actions.detail({last: 'record',categoryId: cId,images: responseJson,source: 'remote',ctitle: ctitle,remark: remark,time: time,dateTime: dateTime,pdfUri: pdfUri,cover: cover})
            })
            .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
    }

    goto_detail() {
        let item = this.props.prop.item;
        if (this.props.getFlag()) {
            Actions.detail({
                last: 'record',
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
                last: 'record',
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
                last: 'record',
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
                            containerStyle={{width: width * 0.85}}
                            image={{uri: item.cover}}
                            imageProps={{resizeMode: 'cover'}}>
                            <Text>{item.remark}</Text>
                        </Card>
                    </TouchableOpacity>
                    {this.state.isVisable ?
                        <View style={styles.delView}>
                            <TouchableOpacity style={{alignItems: 'center'}}
                                onPress={this.goto_classify.bind(this)}>
                                <Image source={require('../../imgs/goon.png')} style={styles.delStyle}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity  style={{alignItems: 'center'}}
                                              onPress={() => {
                                                  this.setState({isShow:true})
                                              }}>
                                <Image source={require('../../imgs/remove.png')} style={styles.delStyle}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity  style={{alignItems: 'center'}}
                                              onPress={() => {this.setState({isVisable: false})}}>
                                <Image source={require('../../imgs/cancel.png')} style={styles.delStyle}></Image>
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
                <Overlay isVisible={this.state.isShow}
                         onBackdropPress={() => this.setState({ isShow: false })}
                         overlayStyle={{padding: 15,width: width*0.9,height: width*0.3,backgroundColor: '#384B60'}}
                         height={height*0.25}>
                    <View>
                        <Text style={{fontSize: 18,color: '#F8F7F2'}}>确定删除该记录吗？</Text>
                        <Text style={{color: '#F8F7F2'}}>{item.ctitle}</Text>
                    </View>
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-end',marginTop: height*0.035}}>
                        <TouchableOpacity style={{height:20,marginRight: 20}} onPress={() => this.setState({ isShow: false })}>
                            <Text style={{color: '#BEDAFA'}}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:20,marginRight: 5}} onPress={() => {
                            this.props.deleteRecord(this.props.prop.index,this.props.prop.item.pdfUri)
                            this.setState({ isShow: false })
                        }}>
                            <Text style={{color: '#BEDAFA'}}>删除</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
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
        alignItems: 'center',
        height: height*0.33,
    },
    titleStyle: {
        fontSize: 20
    },
    delView: {
        right: width*0.02,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: height/4.7,
        marginTop: 35,
    },
    delStyle: {
        width: width*0.08,
        height: width*0.08,
    },
    p_text: {
        lineHeight: height*0.1,
        fontSize: 15,
        color: 'white'
    },
});


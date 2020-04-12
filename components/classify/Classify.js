import React, {Component} from 'react';
import {
    View, StyleSheet, FlatList,
    Dimensions, Modal, Text
} from 'react-native';
/*第三方组件*/
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Tflite from 'tflite-react-native';
import { Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
/*自定义组件*/
import Header from '../global/Header';
import CellList from './CellList';
import ToastExample from '../../nativeComponents/ToastExample';

const dimension = Dimensions.get('window')
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
    list: {
        marginTop: 55,
        marginBottom: 30
    }
});

let imageUrls = [];
let images = [];
let index = 0;
let tflite = new Tflite();
export default class Classify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagePaths: null,
            isImageShow: false,
        };
        tflite.loadModel({
                model: 'my_model2.tflite',
                labels: 'my_lables2.txt',
                numThreads: 1,
            });
    }

    pickMultiple() {
        imageUrls = [];
        images = [];
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            mediaType: 'photo',
            includeBase64: true
        }).then(imgs => {
            for(let i in imgs){
                imageUrls.push({url:imgs[i].path});
                images.push({url:imgs[i].path,label1:"other",label2:"",dateTime: imgs[i].exif.DateTime});
            }
            this.setState({
                imagePaths: imgs.map(i => {
                    /*return {image: {uri: i.path,data: i.data,mime: i.mime}}; // base64编码*/
                    return {image: {uri: i.path}}
                })
            });
        }).catch(e => {});
    }

    removeImg(uri){
        const filteredImages = this.state.imagePaths.filter(item => item.image.uri !== uri);
        imageUrls = imageUrls.filter(item => item.url !== uri);
        images = images.filter(item => item.url !== uri);
        this.setState({
            imagePaths: filteredImages
        })
    }

    _keyExtractor=(item, index)=> ''+index;

    findIndex(uri){
        index = this.state.imagePaths.findIndex(item => item.image.uri === uri);
        this.setState({
            isImageShow: true
        });
    }

    clissifyImage(uri){
        tflite.runModelOnImage({
                path: uri,  // 图像文件地址，必填
                imageMean: 128.0, // mean，默认为 127.5
                imageStd: 128.0,  // std，默认为 127.5
                numResults: 3,    // 返回结果数，默认为 5
                threshold: 0.05   // 可信度阈值，默认为 0.1
            },
            (err, res) => {
                if(!err)
                    ToastExample.show(res[0].label+"\n"+"自信率："+res[0].confidence,ToastExample.SHORT);
            });
    }

    async clissifyImages(){
        if(images.length == 0)
            ToastExample.show("请选择图片",ToastExample.SHORT);
        else{
            ToastExample.show("开始分类",ToastExample.SHORT);
            let dateBegin = new Date();
            console.log("-----------分类结果-----------")
            for(let i=0;i<images.length;i++){
                await tflite.runModelOnImage({
                    path: images[i].url,  // 图像文件地址，必填
                    imageMean: 128.0, // mean，默认为 127.5
                    imageStd: 128.0,  // std，默认为 127.5
                    numResults: 1,    // 返回结果数，默认为 5
                    threshold: 0.1   // 可信度阈值，默认为 0.1
                },(err,res) => {
                    if(res.length > 0){
                        let temp_lables = res[0].label.split('-');
                        images[i].label1 = temp_lables[0];
                        images[i].label2 = temp_lables[1];
                    }
                    if(i == images.length-1){
                        ToastExample.show("完成分类",ToastExample.SHORT);
                        let dateEnd = new Date();
                        let time = this.changeTwoDecimal_f((dateEnd-dateBegin)/1000);
                        let newTime = time;
                        /*继续分类将已经分好类的图片加进images中*/
                        if(this.props.again){
                            time = this.changeTwoDecimal_f(Number(time) + Number(this.props.time));
                        }
                        let source = typeof(this.props.source) === 'undefined' ? 'temp' : this.props.source;
                        Actions.detail({
                            images: images,
                            source: source,
                            newTime: newTime,
                            time: time,
                            dateTime: this.getDateTime(dateBegin),
                            again: this.props.again,
                            ctitle: this.props.ctitle,
                            remark: this.props.remark,
                            pdfUri: this.props.pdfUri,
                            path: this.props.path,
                            categoryId: this.props.categoryId,
                            cover: this.props.cover});
                    }
                });
            }
        }
    }

    changeTwoDecimal_f(x) {
        var f_x = parseFloat(x);
        if (isNaN(f_x))
        {
            return 0;
        }
        var f_x = Math.round(x*100)/100;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0)
        {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2)
        {
            s_x += '0';
        }
        return s_x;
    }

    getDateTime(dateTime) {
        let _year = dateTime.getFullYear().toString();
        let _month = (dateTime.getMonth()+1).toString();
        let _day = dateTime.getDate().toString();
        let _hour = dateTime.getHours().toString();
        let _minute = dateTime.getMinutes().toString();
        let _second = dateTime.getSeconds().toString();
        let _time = _year + "-" + _month + "-" + _day + " " + _hour + ":" + _minute + ":" + _second;
        return _time;
    }

    render() {
        return (<View>
            {this.props.again ? <Header title='图片分类' flag={true}/> : <Header title='图片分类' flag={false}/>}
            <View style={styles.buttonView}>
                <Button
                    buttonStyle={styles.buttonStyle}
                    onPress={this.pickMultiple.bind(this)}
                    titleStyle={styles.titleStyle}
                    title='选择图片'
                />
                <Button
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.titleStyle}
                    onPress={() => {this.clissifyImages()}}
                    title={this.props.again ? '继续分类' : '开始分类'}
                />
            </View>
            <View style={styles.list}>
                <FlatList
                    numColumns={4}
                    keyExtractor={this._keyExtractor}
                    data={this.state.imagePaths}
                    renderItem={(item) => <CellList
                        removeImg={this.removeImg.bind(this)}
                        findIndex={this.findIndex.bind(this)}
                        clissifyImage={this.clissifyImage.bind(this)}
                        prop={item}/>
                    }
                >
                </FlatList>
            </View>
            {this.state.isImageShow ?
                <Modal visible={true} transparent={true} animationType={'slide'}
                       onRequestClose={()=> {
                           this.setState({
                               isImageShow: false,
                           });
                       }}
                >
                    <ImageViewer imageUrls={imageUrls}
                                 onClick={()=> {
                                     this.setState({
                                         isImageShow: false,
                                     });
                                 }}
                                 index={index}/>
                </Modal> : null}
        </View>);
    }
}

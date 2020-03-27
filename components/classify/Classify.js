import React, {Component} from 'react';
import {
    View, StyleSheet, FlatList,
    Dimensions, Modal, InteractionManager
} from 'react-native';
/*第三方组件*/
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Tflite from 'tflite-react-native';
import { Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
/*自定义组件*/
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
export default class App extends Component {

    constructor() {
        super();
        this.state = {
            imagePaths: null,
            isImageShow: false,
        };
        tflite.loadModel({
                model: 'my_model1.tflite',
                labels: 'my_lables1.txt',
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
                images.push({url:imgs[i].path,label:"other"});
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

    clissifyImages(){
        if(images.length == 0)
            ToastExample.show("请选择图片",ToastExample.SHORT);
        else{
            ToastExample.show("开始分类",ToastExample.SHORT);
            console.log("-----------分类结果-----------")
            for(let i=0;i<images.length;i++){
                tflite.runModelOnImage({
                    path: images[i].url,  // 图像文件地址，必填
                    imageMean: 128.0, // mean，默认为 127.5
                    imageStd: 128.0,  // std，默认为 127.5
                    numResults: 1,    // 返回结果数，默认为 5
                    threshold: 0.5   // 可信度阈值，默认为 0.1
                },(err,res) => {
                    if(res.length > 0){
                        images[i].label = res[0].label;
                    }
                    if(i == images.length-1){
                        ToastExample.show("完成分类",ToastExample.SHORT);
                        Actions.detail({'images': images})
                    }
                });
            }
        }
    }

    render() {
        return (<View>
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
                    onPress={this.clissifyImages.bind(this)}
                    title='开始分类'
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

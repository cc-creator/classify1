import React, {Component} from 'react';
import {
    View, Text, StyleSheet, FlatList,
    TouchableOpacity, Dimensions, Modal
} from 'react-native';
/*第三方组件*/
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Tflite from 'tflite-react-native';
/*自定义组件*/
import CellList from './CellList';
import ToastExample from '../nativeComponents/ToastExample';

const dimension = Dimensions.get('window')
const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        color: 'white'
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#c1a7e2',
        width: 120,
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent:'center',
    },
    list: {
        marginTop: 55,
        marginBottom: 100,
        height: dimension.height * 5.3/7
    }
});

let imageUrls = [];
let index = 0;
let tflite = new Tflite();
export default class App extends Component {

    constructor() {
        super();
        this.state = {
            images: null,
            isImageShow: false
        };
        tflite.loadModel({
                model: 'mobilenet_v1_1.0_224.tflite',// 模型文件，必填
                labels: 'labels.txt',  // 标签文件，必填
                numThreads: 1,                              // 线程数，默认为 1
            },
            (err, res) => {
                if(err)
                    console.log(err);
                else
                    console.log(res);
            });
    }

    pickMultiple() {
        imageUrls = [];
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            mediaType: 'photo',

        }).then(images => {
            this.setState({
                images: images.map(i => {
                    return {image: {uri: i.path}};
                })
            });
            for(let i in images){
                imageUrls.push({url:images[i].path})
            }
            console.log(imageUrls)
        }).catch(e => {});
    }

    removeImg(uri){
        const filteredImages = this.state.images.filter(item => item.image.uri !== uri);
        imageUrls = imageUrls.filter(item => item.url !== uri);
        this.setState({
            images: filteredImages,
        })
    }

    _keyExtractor=(item, index)=> ''+index;

    findIndex(uri){
        index = this.state.images.findIndex(item => item.image.uri === uri);
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
                if(err)
                    console.log(err);
                else
                    ToastExample.show(res[0].label,ToastExample.SHORT);
            });
    }

    render() {
        return (<View>
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
                    <Text style={styles.text}>选择图片</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>开始分类</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <FlatList
                    numColumns={4}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    data={this.state.images}
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

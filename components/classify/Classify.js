import React, {Component} from 'react';
import {
    View, StyleSheet, FlatList,
    Dimensions, Modal, Text, Image, TouchableOpacity
} from 'react-native';
/*第三方组件*/
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Button, Overlay} from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
/*自定义组件*/
import CellList from './CellList';
import Header from "../global/Header";
import Toast from '../native/Toast';

const dimension = Dimensions.get('window')
const width = dimension.width;
const height = dimension.height;
const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: height*0.02
    },
    buttonStyle: {
        height:width*0.125,
        width:width*0.25,
    },
    titleStyle: {
        fontSize:15
    },
    list: {
        marginTop: height*0.08,
        marginBottom: height*0.2
    },
    progressContainer: {
        alignItems: "center",
        flexDirection: "row",
        marginLeft:15,
        marginRight:15
    }
});

let imageUrls = [];let images = [];
let index = 0;
let time = 0;let newTime = 0;let source = '';let dateBegin = '';
export default class Classify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagePaths: [],
            isImageShow: false,
            isDisabled: false,
            isVisible: false,
            num: 0
        };
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
                images.push({url:imgs[i].path,label1:"other",label2:"",dateTime: imgs[i].modificationDate});
            }
            let temp_images = imgs;
            temp_images.push(require('../../imgs/add.png'))
            this.setState({
                imagePaths: temp_images.map((i,index) => {
                    /*return {image: {uri: i.path,data: i.data,mime: i.mime}}; // base64编码*/
                    if(index == temp_images.length-1){
                        return {image: i}
                    }else{
                        return {image: {uri: i.path}}
                    }
                })
            });
        }).catch(e => {});
    }

    removeImg(uri){
        const filteredImages = this.state.imagePaths.filter(item => item.image.uri !== uri);
        images = images.filter(item => item.url !== uri);
        if(filteredImages.length == 1){
            imageUrls = [];
            this.setState({
                imagePaths: []
            })
        }else{ imageUrls = imageUrls.filter(item => item.url !== uri);
            this.setState({
                imagePaths: filteredImages
            })
        }
    }

    _keyExtractor=(item, index)=> ''+index;

    findIndex(image){
        /*继续选择图片*/
        if(typeof(image.uri) === 'undefined'){
            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeExif: true,
                mediaType: 'photo',
                includeBase64: true
            }).then(imgs => {
                for(let i in imgs){
                    imageUrls.push({url:imgs[i].path});
                    images.push({url:imgs[i].path,label1:"other",label2:"",dateTime: imgs[i].modificationDate});
                }
                let temp_images = this.state.imagePaths;
                temp_images.pop();
                for(let i=0;i<imgs.length;i++){
                    temp_images.push({image: {uri:imgs[i].path}})
                }
                temp_images.push({image: require('../../imgs/add.png')})
                this.setState({imagePaths: temp_images.map(i => {return i})});
            }).catch(e => {});
        }else{
            for(let i=0;i<imageUrls.length;i++){
                if(imageUrls[i].url === image.uri){
                    index = i;
                }
            }
            this.setState({
                isImageShow: true
            });
        }
    }

    clissifyImage(uri){
        global.variables.ccTflite.ccrunModelOnImage(uri,127.5,127.5,3,0.5)
            .then(res => console.log(res))
            .catch( err => console.log(err))
    }

    async clissifyImages(){
        if(images.length == 0)
            Toast.show("请选择图片",Toast.SHORT);
        else{
            this.setState({isDisabled: true})
            dateBegin = new Date();
            for(let i=0;i<images.length;i++){
                this.setState({num: i+1})
                await global.variables.ccTflite.ccrunModelOnImage(images[i].url,127.5,127.5,3,0.5)
                    .then(res => {
                        if(res.length > 0){
                            let temp_lables = res[0].label.split('-');
                            images[i].label1 = temp_lables[0];
                            images[i].label2 = temp_lables[1];
                        }
                        if(i == images.length-1){
                            let dateEnd = new Date();
                            time = this.changeTwoDecimal_f((dateEnd-dateBegin)/1000);
                            console.log(time)
                            newTime = time;
                            source = typeof(this.props.source) === 'undefined' ? 'temp' : this.props.source;
                            if(this.props.again){
                                time = this.changeTwoDecimal_f(Number(time) + Number(this.props.time));
                            }
                        }
                    })
                    .catch(err => console.log(err))
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
        if(_month.length == 1) _month = '0' + _month;
        let _day = dateTime.getDate().toString();
        if(_day.length == 1) _day = '0' + _day;
        let _hour = dateTime.getHours().toString();
        if(_hour.length == 1) _hour = '0' + _hour;
        let _minute = dateTime.getMinutes().toString();
        if(_minute.length == 1) _minute = '0' + _minute;
        let _second = dateTime.getSeconds().toString();
        if(_second.length == 1) _second = '0' + _second;
        let _time = _year + "-" + _month + "-" + _day + " " + _hour + ":" + _minute + ":" + _second;
        console.log(_time)
        return _time;
    }

    render() {
        return (<View>
            {this.props.again ? <Header title='图片分类' left_flag={true} again={this.props.again} last={this.props.last}/> : <Header title='图片分类' left_flag={false} again={this.props.again}/>}
            <View style={styles.buttonView}>
                <Button
                    buttonStyle={styles.buttonStyle}
                    onPress={this.pickMultiple.bind(this)}
                    titleStyle={styles.titleStyle}
                    disabled={this.state.isDisabled}
                    title='选择图片'
                />
                <Button
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.titleStyle}
                    disabled={this.state.isDisabled}
                    onPress={() => {
                        this.setState({isVisible: true})
                        this.clissifyImages()
                    }}
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
            <Overlay isVisible={this.state.isVisible}
                     overlayStyle={{padding: 0,borderRadius:10,backgroundColor: '#F8F7F2',alignItems: 'center'}}
                     onRequestClose={() => {this.setState({isVisible: false,isDisabled: false})}}
                     height={width*0.45}
                     width={width*0.9}
                     children={<View>
                         {this.state.num==this.state.imagePaths.length-1 ?
                            <TouchableOpacity style={{position:'absolute',top: 10,right: -5}} onPress={()=>{
                                Actions.detail({
                                    last: 'classify',
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
                                this.setState({isDisabled: false,isVisible: false,imagePaths: []})
                                imageUrls = [];images = [];
                            }}><Image style={{width: width*0.05,height: width*0.05}} source={require('../../imgs/close.png')}/>
                            </TouchableOpacity> : null }
                            <Text style={{fontSize:25,marginTop:25,marginBottom:15,textAlign:'center'}}>{this.state.num!=this.state.imagePaths.length-1 ? '正在分类' : '分类完成'}</Text>
                            {this.state.imagePaths != null ?
                                <View>
                                    <Progress.Bar progress={this.state.num/(this.state.imagePaths.length-1)} width={width*0.8} height={20} style={{borderRadius:10}} />
                                    <Text style={{fontSize:20,textAlign:'center',marginTop:20}}>{this.state.num}/{this.state.imagePaths.length-1}</Text>
                                </View> : null}
                     </View>}>
            </Overlay>
        </View>);
    }
}

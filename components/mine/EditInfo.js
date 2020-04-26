import React, { Component } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    View,
    Text, Image, ProgressBarAndroid,
} from 'react-native';
import Header from "../global/Header";
import {Avatar, Input, Overlay} from "react-native-elements";
import ImagePicker from 'react-native-image-crop-picker';
import {Actions} from "react-native-router-flux";
import ToastExample from "../../nativeComponents/ToastExample";

export default class EditInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: global.variables.name,
            signature: global.variables.signature,
            avatar: global.variables.avatar,
            visible: false,
            isVisible: false,
        }
    }

    getImageName(url){
        let index = url.lastIndexOf('/') + 1;
        let length = url.length - index;
        return url.substr(index,length);
    }

    updateInfo() {
        this.setState({isVisible: true})
        let formdata = new FormData();
        formdata.append('avatar',{uri: this.state.avatar,type: 'multipart/form-data',name: this.getImageName(this.state.avatar)});
        formdata.append('userId', global.variables.userId);
        formdata.append('name', this.state.name);
        formdata.append('signature', this.state.signature);
        fetch(global.variables.ip+'/user/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata})
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson !== 'FALSE'){
                    ToastExample.show("上传成功",ToastExample.SHORT);
                    global.variables.avatar = responseJson;
                    global.variables.name = this.state.name;
                    global.variables.signature = this.state.signature;
                    this.setState({isVisible: false})
                    Actions.myInfo();
                }else{
                    ToastExample.show("上传失败",ToastExample.SHORT);
                    this.setState({isVisible: false})
                }
            })
            .catch(err => console.log(err))
    }

    pickImageFromGallery() {
        ImagePicker.openPicker({
            cropping: true,
            cropperCircleOverlay: true,
            compressImageQuality: 0.5,
            mediaType: 'photo',
            freeStyleCropEnabled: true,
        }).then(image => {
            console.log(image);
            this.setState({visible: false,avatar: image.path})
        }).catch(err => {})
    }

    pickImageFromCamera() {
        ImagePicker.openCamera({
            cropping: true,
            cropperCircleOverlay: true,
            compressImageQuality: 0.5
        }).then(image => {
            console.log(image);
            this.setState({visible: false,avatar: image.path})
        }).catch(err => {})
    }

    render() {
        return (
            <View>
                <Header title='编辑个人信息' left_flag={true} updateInfo={this.updateInfo.bind(this)}/>
                <View style={{padding: 5,paddingLeft:10,paddingRight:10}}>
                    <Text style={{fontSize: 20}}>头像:</Text>
                    <View style={{alignItems: 'center',paddingTop: 10}}>
                        {typeof(this.state.avatar) === 'undefined' || this.state.avatar === '' ?
                            <Avatar
                                size="large"
                                rounded
                                title={global.variables.name}
                                titleStyle={{fontSize:25}}
                                showEditButton={true}
                                onEditPress={() => {this.setState({visible: true})}}
                            /> :
                            <Avatar
                                size="large"
                                rounded
                                source={{uri: this.state.avatar}}
                                showEditButton={true}
                                onEditPress={() => {this.setState({visible: true})}}
                            />
                        }
                    </View>
                    <Text style={{fontSize: 20}}>昵称:</Text>
                    <Input placeholder='昵称' value={this.state.name}
                           maxLength={10}
                           rightIcon={<TouchableOpacity onPress={() => this.setState({name: ''})}><Image style={{width: width*0.05,height: width*0.05}} source={require("../../imgs/delete.png")}/></TouchableOpacity>}
                           onChangeText={(text) => {this.setState({name: text})}}/>
                    <Text style={{width: 45,textAlign: 'center',left: width*0.8}}>{this.state.name.length}/10</Text>
                    <Input placeholder='个性签名' value={this.state.signature}
                           maxLength={20}
                           rightIcon={<TouchableOpacity onPress={() => this.setState({signature: ''})}><Image style={{width: width*0.05,height: width*0.05}} source={require("../../imgs/delete.png")}/></TouchableOpacity>}
                           onChangeText={(text) => {this.setState({signature: text})}}/>
                    <Text style={{width: 45,textAlign: 'center',left: width*0.8}}>{this.state.signature.length}/20</Text>
                </View>
                <Overlay
                    isVisible={this.state.visible}
                    onBackdropPress={() => {this.setState({visible: false})}}
                    overlayStyle={{width:width,padding: 0,height:height*0.2,top:height*0.383,borderRadius:10}}>
                    <View>
                        <View style={{width:width,height: height*0.12,borderBottomWidth:1,borderBottomColor:'gray'}}>
                            <TouchableOpacity style={{alignItems: 'center',height:height*0.06}} onPress={this.pickImageFromCamera.bind(this)}><Text style={{lineHeight:height*0.06,fontSize:20}}>拍照</Text></TouchableOpacity>
                            <TouchableOpacity style={{alignItems: 'center',height:height*0.06}} onPress={this.pickImageFromGallery.bind(this)}><Text style={{lineHeight:height*0.06,fontSize:20}}>从相册选取图片</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{marginTop: 5,width:width,height: height*0.06,alignItems: 'center'}}
                            onPress={() => {this.setState({visible: false})}}>
                            <Text style={{lineHeight: height*0.06,fontSize:20}}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
                <Overlay
                    isVisible={this.state.isVisible}
                    height={width*0.25}
                    width={width*0.25}
                    overlayStyle={{padding: 0,paddingTop: width*0.024}}
                >
                    <ProgressBarAndroid styleAttr='Large' color='#2089DC'/>
                </Overlay>
            </View>
        );
    }
}
const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
    remove1: {
        backgroundColor: '#ffffff',
        width: width*0.05,
        height: width*0.05,
        position: 'absolute',
        top: height*0.26,
        right: width*0.1,
        borderRadius: 13,
    },
    remove2: {
        backgroundColor: '#ffffff',
        width: width*0.05,
        height: width*0.05,
        position: 'absolute',
        top: height*0.35,
        right: width*0.1,
        borderRadius: 13,
    }
});


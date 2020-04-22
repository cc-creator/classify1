import React, { Component } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    View,
    Text, Image,
} from 'react-native';
import Header from "../global/Header";
import {Avatar, Input, Overlay} from "react-native-elements";
import ImagePicker from 'react-native-image-crop-picker';
import ViewInfo from "./ViewInfo";

export default class EditInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: global.variables.name,
            signature: global.variables.signature,
            visible: false,
            avatar: global.variables.avatar,
        }
    }

    updateInfo() {
        console.log('updateInfo')
    }

    pickImageFromGallery() {
        ImagePicker.openPicker({
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({visible: false})
        })
    }

    pickImageFromCamera() {
        ImagePicker.openCamera({
            cropping: true,
        }).then(image => {
            console.log(image);
        })
    }

    render() {
        return (
            <View>
                <Header title='编辑个人信息' left_flag={true} updateInfo={this.updateInfo.bind(this)}/>
                <View style={{padding: 5,paddingLeft:10,paddingRight:10}}>
                    <Text style={{fontSize: 20}}>头像:</Text>
                    <View style={{alignItems: 'center',paddingTop: 10}}>
                        {typeof(global.variables.avatar) === 'undefined' || global.variables.avatar === '' ?
                            <Avatar
                                size="xlarge"
                                rounded
                                title={global.variables.name}
                                titleStyle={{fontSize:25}}
                                showEditButton={true}
                                onEditPress={() => {this.setState({visible: true})}}
                            /> :
                            <Avatar
                                size="xlarge"
                                rounded
                                source={{uri: global.variables.avatar}}
                                showEditButton={true}
                                onEditPress={() => {this.setState({visible: true})}}
                            />
                        }
                    </View>
                    <Text style={{fontSize: 20}}>昵称:</Text>
                    <Input placeholder='昵称' value={this.state.name}
                           maxLength={10}
                           rightIcon={<TouchableOpacity onPress={() => this.setState({name: ''})}><Image style={{width: width*0.05,height: width*0.05}} source={require("../../android/app/src/main/assets/remove.png")}/></TouchableOpacity>}
                           onChangeText={(text) => {this.setState({name: text})}}/>
                    <Text style={{fontSize: 20}}>个性签名:</Text>
                    <Input placeholder='个性签名' value={this.state.signature}
                           maxLength={20}
                           rightIcon={<TouchableOpacity onPress={() => this.setState({signature: ''})}><Image style={{width: width*0.05,height: width*0.05}} source={require("../../android/app/src/main/assets/remove.png")}/></TouchableOpacity>}
                           onChangeText={(text) => {this.setState({signature: text})}}/>
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


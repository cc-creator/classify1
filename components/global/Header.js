import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            asc: true //默认升序
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                { this.props.left_flag ? <TouchableOpacity style={styles.touchableOpacity_left}
                                           onPress={() => {
                                               if(typeof(this.props.again) === 'undefined'){
                                                   Actions.pop();
                                               }
                                               switch (this.props.last) {
                                                   case 'classify':
                                                       if(typeof(this.props.again) !== 'undefined'){
                                                           Actions.jump('classify');
                                                       }else{
                                                           Actions.classify();
                                                       }
                                                       break;
                                                   case 'record':
                                                       //Actions.jump('record');
                                                       Actions.record();
                                                       break;
                                               }
                                           }}>
                    <Image style={styles.image} source={require('../../imgs/back.png')}/>
                </TouchableOpacity> : null }
                { this.props.title === '分类详情' ? <TouchableOpacity onPress={() => {
                    this.setState({
                        asc: !this.state.asc
                    })
                    this.props.timeOrder(this.state.asc)
                }} style={styles.touchableOpacity_right}>
                    { !this.state.asc ? <Image source={require('../../imgs/desc.png')} style={styles.image}/>
                    : <Image source={require('../../imgs/asc.png')} style={styles.image}/> }
                </TouchableOpacity> : null }
                { this.props.title === '我的' && global.variables.userToken ? <TouchableOpacity onPress={() => {
                    Actions.editInfo();
                }} style={styles.touchableOpacity_right}>
                    <Text style={{color: 'white',lineHeight: height*0.045}}>编辑</Text>
                </TouchableOpacity> : null }
                { this.props.title === '编辑个人信息' ? <TouchableOpacity onPress={() => {this.props.updateInfo()}} style={styles.touchableOpacity_right}>
                    <Text style={{color: 'white',lineHeight: height*0.045}}>完成</Text>
                </TouchableOpacity> : null }
            </View>
        )
    }

}

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height*0.07,
        alignItems: 'center',
        backgroundColor: '#2089DC'
    },
    title: {
        fontSize: 20,
        lineHeight: height*0.07,
        color: 'white'
    },
    touchableOpacity_left: {
        position: 'absolute',
        top: width*0.025,
        left: 10,
    },
    touchableOpacity_right: {
        position: 'absolute',
        top: width*0.025,
        right: 10,
    },
    image: {
        width: 30,
        height: 30
    }
})

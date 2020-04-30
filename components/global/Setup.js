import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text, Dimensions, Image, TouchableOpacity
} from "react-native";
import Header from "./Header";
import {Actions} from "react-native-router-flux";

export default class Setup extends Component{
    constructor(){
        super();
    }

    render() {
        return(
            <View>
                <Header title='设置' left_flag={true} last={'classify'}/>
                <View>
                    <View style={styles.itemView}>
                        <Text style={styles.textStyle1}>线程数</Text>
                        <Text style={styles.textStyle2}>{global.variables.numThread}</Text>
                        <TouchableOpacity style={{width: width*0.08,height: width*0.08,position: 'absolute',top: height*0.02,right: 0}} onPress={() => {
                            Actions.setupDetail({title: '线程数'})
                        }}>
                            <Image source={require('../../imgs/right.png')} style={{width: width*0.08,height: width*0.08}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:1,backgroundColor:'#DCDCDC'}}></View>
                    <View style={styles.itemView}>
                        <Text style={styles.textStyle1}>硬件代理</Text>
                        <Text style={styles.textStyle2}>{global.variables.device}</Text>
                        <TouchableOpacity style={{width: width*0.08,height: width*0.08,position: 'absolute',top: height*0.02,right: 0}} onPress={() => {
                            Actions.setupDetail({title: '硬件代理'})
                        }}>
                            <Image source={require('../../imgs/right.png')} style={{width: width*0.08,height: width*0.08}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
const styles = StyleSheet.create({
    itemView: {
        height: height*0.08,
        paddingLeft: 10,
        paddingRight: 10,
    },
    textStyle1: {
        lineHeight: height*0.08,
        fontSize: 20
    },
    textStyle2: {
        lineHeight: height*0.08,
        fontSize: 20,
        position: 'absolute',
        right: 30
    }

})

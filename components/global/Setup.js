import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text, Dimensions, Image, TouchableOpacity, Switch
} from "react-native";
import Header from "./Header";
import {Actions} from "react-native-router-flux";
import RNFS from "react-native-fs";
import {Slider} from "react-native-elements";

const rnfsPath = RNFS.DocumentDirectoryPath;const setup_path = rnfsPath + '/setup.text';
export default class Setup extends Component{
    constructor(){
        super();
        this.state = {
            isGpu: global.variables.device === 'GPU'
        }
    }

    switchDevice() {
        this.setState({isGpu: !this.state.isGpu},() => {
            if(this.state.isGpu){
                global.variables.device = 'GPU'
                global.variables.ccTflite.ccreLoadModel(global.variables.numThread,global.variables.device).then(res => console.log(res)).catch(err => console.log(err))
                RNFS.unlink(setup_path).then(res => {
                    RNFS.writeFile(setup_path,global.variables.numThread+'@'+global.variables.device,'utf8')
                })
            }else{
                global.variables.device = 'CPU'
                global.variables.ccTflite.ccreLoadModel(global.variables.numThread,global.variables.device).then(res => console.log(res)).catch(err => console.log(err))
                RNFS.unlink(setup_path).then(res => {
                    RNFS.writeFile(setup_path,global.variables.numThread+'@'+global.variables.device,'utf8')
                })
            }
        })
    }

    render() {
        return(
            <View>
                <Header title='设置' left_flag={true} last={'classify'}/>
                <View>
                    <View style={styles.itemView}>
                        <Text style={styles.textStyle1}>线程数</Text>
                        <Text style={styles.textStyle2}>{global.variables.numThread}</Text>
                        <TouchableOpacity style={{width: width*0.08,height: width*0.08,position:'absolute',right: 5,top:height*0.02}} onPress={() => {
                            Actions.setupDetail({title:'线程数'})
                        }}>
                            <Image source={require('../../imgs/right.png')} style={{width: width*0.08,height: width*0.08}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:1,backgroundColor:'#DCDCDC'}}></View>
                    <View style={styles.itemView}>
                        <Text style={styles.textStyle1}>启用GPU加速</Text>
                        <View style={{width:50,position: 'absolute',right:10,top:height*0.02}}>
                        <Switch
                            trackColor={{false:'#DCDCDC',true:'#BEDEFA'}}
                            thumbColor={'#2089DC'}
                            value={this.state.isGpu}
                            onValueChange={() => this.switchDevice()}
                        />
                        </View>
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
        width: width,
        paddingLeft: 10,
        paddingRight: 10
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
{/*<View style={{padding:10,borderColor:'#DCDCDC',borderTopWidth: 1,height: height*0.08}}>
                        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                            <Slider
                                value={this.state.value}
                                maximumValue={10}
                                minimumValue={1}
                                step={1}
                                thumbTintColor={'#2089DC'}
                                onValueChange={value => this.setState({ value })}
                            />
                            <Text>线程数: {this.state.value}</Text>
                        </View>
                    </View>*/}

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text, Dimensions, Image, TouchableOpacity
} from "react-native";
import Header from "./Header";
import {Slider} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import { getApiLevel } from 'react-native-device-info';
import Toast from "../native/Toast";
import RNFS from "react-native-fs";

const rnfsPath = RNFS.DocumentDirectoryPath;const setup_path = rnfsPath + '/setup.text';
export default class SetupDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: global.variables.device,
            value: global.variables.numThread
        }
    }

    setNumThreads() {
        global.variables.numThread = this.state.value;
        global.variables.ccTflite.ccreLoadModel(global.variables.numThread,global.variables.device).then(res => console.log(res)).catch(err => console.log(err))
        RNFS.unlink(setup_path).then(res => {
            RNFS.writeFile(setup_path,global.variables.numThread+'@'+global.variables.device,'utf8')
        })
        Actions.setup();
    }

    async getApiLevel() {
        await getApiLevel().then(res => {
            if(res >= 27){
                this.setState({selected: 'NNAPI'})
                global.variables.device = 'NNAPI';
                global.variables.ccTflite.ccreLoadModel(global.variables.numThread,global.variables.device).then(res => console.log(res)).catch(err => console.log(err))
                RNFS.unlink(setup_path).then(res => {
                    RNFS.writeFile(setup_path,global.variables.numThread+'@'+global.variables.device,'utf8')
                })
                Actions.setup();
            }else {
                Toast.show('当前Android版本不支持NNAPI',Toast.SHORT)
            }
        })
    }

    render() {
        return(
            <View>
                <Header title={this.props.title} left_flag={true} setNumThreads={this.setNumThreads.bind(this)}/>
                {this.props.title === '线程数' ? <View style={{marginTop:50,paddingLeft:10,paddingRight:10}}>
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
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
                </View> : null}
                {this.props.title === '硬件代理' ? <View>
                    <View style={styles.itemView}>
                        <Text style={styles.textStyle}>CPU</Text>
                        <TouchableOpacity style={{width: width*0.06,height: width*0.06,position: 'absolute',top: height*0.02,right: 10}} onPress={() => {
                            this.setState({selected: 'CPU'});
                            global.variables.device = 'CPU';
                            global.variables.ccTflite.ccreLoadModel(global.variables.numThread,global.variables.device).then(res => console.log(res)).catch(err => console.log(err))
                            RNFS.unlink(setup_path).then(res => {
                                RNFS.writeFile(setup_path,global.variables.numThread+'@'+global.variables.device,'utf8')
                            })
                            Actions.setup();
                        }}>
                            {this.state.selected === 'CPU' ? <Image source={require('../../imgs/selected.png')} style={{width: width*0.06,height: width*0.06}}/> : <Image source={require('../../imgs/select.png')} style={{width: width*0.06,height: width*0.06}}/>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.textStyle}>GPU</Text>
                        <TouchableOpacity style={{width: width*0.06,height: width*0.06,position: 'absolute',top: height*0.02,right: 10}} onPress={() => {
                            this.setState({selected: 'GPU'})
                            global.variables.device = 'GPU';
                            global.variables.ccTflite.ccreLoadModel(global.variables.numThread,global.variables.device).then(res => console.log(res)).catch(err => console.log(err))
                            RNFS.unlink(setup_path).then(res => {
                                RNFS.writeFile(setup_path,global.variables.numThread+'@'+global.variables.device,'utf8')
                            })
                            Actions.setup();
                        }}>
                            {this.state.selected === 'GPU' ? <Image source={require('../../imgs/selected.png')} style={{width: width*0.06,height: width*0.06}}/> : <Image source={require('../../imgs/select.png')} style={{width: width*0.06,height: width*0.06}}/>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.textStyle}>NNAPI</Text>
                        <TouchableOpacity style={{width: width*0.06,height: width*0.06,position: 'absolute',top: height*0.02,right: 10}} onPress={() => {
                            this.getApiLevel();
                        }}>
                            {this.state.selected === 'NNAPI' ? <Image source={require('../../imgs/selected.png')} style={{width: width*0.06,height: width*0.06}}/> : <Image source={require('../../imgs/select.png')} style={{width: width*0.06,height: width*0.06}}/>}
                        </TouchableOpacity>
                    </View>
                </View> : null}
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
    textStyle: {
        lineHeight: height*0.08,
        fontSize: 20
    },
})

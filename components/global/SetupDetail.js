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

    render() {
        return(
            <View>
                <Header title={this.props.title} left_flag={true} setNumThreads={this.setNumThreads.bind(this)}/>
                <View style={{marginTop:50,paddingLeft:10,paddingRight:10}}>
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
    textStyle: {
        lineHeight: height*0.08,
        fontSize: 20
    },
})

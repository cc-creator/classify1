import React, { Component } from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    View,
} from 'react-native';
import Header from "../global/Header";
import {Button} from 'react-native-elements'
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Pdf from "react-native-pdf";
import RNFS from "react-native-fs";

const rnfsPath = RNFS.DocumentDirectoryPath;
const jilu_path = rnfsPath + '/jilu.text';
export default class MyInfo extends Component{

    constructor(){
        super();
    }

    render() {
        return (
            <View>
                <Header title='我的' left_flag={false} right_flag={false} />

            </View>
        );
    }
}
const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
});


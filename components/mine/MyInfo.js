import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions, Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
import RNFS from "react-native-fs";

const cc = '郭聪';
const rnfsPath = RNFS.DocumentDirectoryPath;
export default class MyInfo extends Component{

    constructor() {
        super();
        this.state = {
            source: '',
            visible: false
        }
    }

    async createPDF() {
        let options = {
            html: '<h1 style="color: red">郭聪</h1><br/>'+'<h1>郭聪</h1><br/>'+'<h1>郭聪</h1><br/>'+'<h1>郭聪</h1><br/>'+'<h1>郭聪</h1><br/>'+'<h1>郭聪</h1><br/>'+'<h1>郭聪</h1><br/>'+'<h1>郭聪</h1><br/>'+'<h1>郭聪</h1><br/>'+'<h1>郭聪</h1><br/>',
            fileName: 'test',
            directory: 'Documents',
        };

        console.log("生成PDF")

        let file = await RNHTMLtoPDF.convert(options)
        this.setState({
            source: {uri: 'file://'+file.filePath},
            visible: true
        })
        console.log(file.filePath);
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon.Button
                    name="facebook"
                    backgroundColor="#3b5998"
                    onPress={this.createPDF.bind(this)}
                >
                    生成PDF
                </Icon.Button>
                    <Modal visible={this.state.visible} onRequestClose={() => {this.setState({visible: false})}}>
                        <Pdf
                            source={this.state.source}
                            onLoadComplete={(numberOfPages,filePath)=>{
                                console.log(`number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page,numberOfPages)=>{
                                console.log(`current page: ${page}`);
                            }}
                            onError={(error)=>{
                                console.log(error);
                            }}
                            onPressLink={(uri)=>{
                                console.log(`Link presse: ${uri}`)
                            }}
                            style={styles.pdf}/>
                    </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});


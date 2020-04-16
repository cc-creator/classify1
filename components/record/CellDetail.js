import React,{ Component } from 'react';
import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    FlatList,
    Modal,
    TouchableOpacity
} from 'react-native';
import ImageViewer from "react-native-image-zoom-viewer";
import Header from "../global/Header";

let index = 0;
export default class CellDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImageShow: false,
            images: this.props.images.sort((a,b) => {return b.dateTime - a.dateTime}).map((image) => {return image})
        };
    }

    timeOrder(asc) {
        let images = this.state.images;
        if(!asc){
            images.sort((a,b) => {return b.dateTime - a.dateTime})
        }else {
            images.sort((a,b) => {return a.dateTime - b.dateTime})
        }
        this.setState({
            images: images.map((image) => {return image})
        })
        console.log(images)
    }

    render() {
        let imageUrls = [];
        let images = this.props.images;
        for(let i in images){
            imageUrls.push({url:images[i].url});
        }
        return (
            <View>
                <Header title='分类详情' left_flag={true} right_flag={true} timeOrder={this.timeOrder.bind(this)}/>
                <FlatList
                    data={this.state.images}
                    numColumns={4}
                    keyExtractor={(item, index)=> ''+index}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => {
                                index=imageUrls.findIndex(i => i.url === item.url);
                                this.setState({
                                    isImageShow: true
                                });
                            }}>
                            <Image
                                style={styles.cellImage}
                                source={{uri: item.url}}/>
                        </TouchableOpacity>}
                ></FlatList>
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
            </View>
        );
    }
};

const dimension = Dimensions.get('window')
let width = dimension.width
let height = dimension.height
const styles = StyleSheet.create({
    cellImage: {
        width: (width-50)/4,
        height: (width-50)/4,
        borderRadius: 10.0,
        marginTop: 10,
        marginLeft: 10
    }
})


import React from 'react';
import {
    StyleSheet,
    Dimensions,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
//import {Image} from 'react-native-elements';

const dimension = Dimensions.get('window')
const CellList = ({prop,removeImg,findIndex,clissifyImage}) => {
    return (
        <View style={styles.cellContainer}>
            <TouchableOpacity
                onLongPress={() => {
                    clissifyImage(prop.item.image.uri)
                }}
                onPress={() => {
                    findIndex(prop.item.image.uri)
                }}
            >
                <Image
                    source={prop.item.image}
                    style={styles.cellImage}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.remove}
                onPress={() => {
                    removeImg(prop.item.image.uri)
                }}
            >
                <Image style={{width: width*0.05,height: width*0.05}} source={require("../../android/app/src/main/assets/remove.png")} />
            </TouchableOpacity>
        </View>
    );
};

let width = dimension.width
const styles = StyleSheet.create({
    cellContainer: {
        alignItems:'center',
        width:width/4.0-1.5,
        marginTop: 10
    },
    cellImage: {
        width: (width-50)/4,
        height: (width-50)/4,
        borderRadius: 10
    },
    remove: {
        backgroundColor: '#ffffff',
        width: width*0.05,
        height: width*0.05,
        position: 'absolute',
        top: -width*0.02,
        left: width*0.205,
        borderRadius: 13,
    }
})

export default CellList;

import React from 'react';
import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native';

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
                    style={styles.cellImage}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.remove}
                onPress={() => {
                    removeImg(prop.item.image.uri)
                }}
            >
                <Image style={{width: 17,height: 17}} source={require("../img/remove.png")} />
            </TouchableOpacity>
        </View>
    );
};

let width = dimension.width
const styles = StyleSheet.create({
    cellContainer: {
        alignItems:'center',
        width:width/4.0-1,
        marginTop: 10
    },
    cellImage: {
        width: (width-30)/4,
        height: (width-30)/4,
        borderRadius: 10.0,
    },
    remove: {
        backgroundColor: '#ffffff',
        width: 17,
        height: 17,
        position: 'absolute',
        top: -8,
        left: (width-30)/4-8,
        borderRadius: 12,
    }
})

export default CellList;

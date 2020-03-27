import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button,Card } from 'react-native-elements'

import DetailCell from "./DetailCell";

let groups = [];
export default class Detail extends Component{
    constructor(props){
        super(props);
    }

    partition(){
        groups = [];
        const images = this.props.images;
        console.log("images")
        console.log(images)
        const images_person = [];
        const images_animal = [];
        const images_food = [];
        const images_scenery = [];
        const images_plant = [];
        const images_other = [];
        for(let i=0;i<images.length;i++){
            if(images[i].label == 'person'){
                images_person.push(images[i]);
            }else if(images[i].label == 'animal'){
                images_animal.push(images[i]);
            }else if(images[i].label == 'scenery'){
                images_scenery.push(images[i]);
            }else if(images[i].label == 'food'){
                images_food.push(images[i]);
            }else if(images[i].label == 'plant'){
                images_plant.push(images[i]);
            }else{
                images_other.push(images[i]);
            }
        }
        if(images_person.length > 0){
            groups.push({group:images_person,label:"人像",sum: images_person.length});
        }
        if(images_animal.length > 0){
            groups.push({group:images_animal,label:"动物",sum: images_animal.length});
        }
        if(images_scenery.length > 0){
            groups.push({group:images_scenery,label:"风景",sum: images_scenery.length});
        }
        if(images_food.length > 0){
            groups.push({group:images_food,label:"美食",sum: images_food.length});
        }
        if(images_plant.length > 0){
            groups.push({group:images_plant,label:"植物",sum: images_plant.length});
        }
        if(images_other.length > 0){
            groups.push({group:images_other,label:"其他",sum: images_other.length});
        }
    }

    _keyExtractor=(item, index)=> ''+index;

    render()  {
        this.partition();
        return (
            <View style={styles.container}>
                    <View style={styles.describe}>
                        <Card
                            title='名称'
                            titleStyle={styles.titleStyle}
                            containerStyle={{width: 380}}
                            image={{uri: groups[0].group[0].url}}>
                            <Text>
                                The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        </Card>
                    </View>
                    <FlatList
                        data={groups}
                        keyExtractor={this._keyExtractor}
                        renderItem={(item) => <DetailCell
                                prop={item}
                            />}
                    ></FlatList>
                <View style={styles.buttonView}>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.titleStyle}
                        title='导入本地'
                    />
                    <Button
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.titleStyle}
                        title='上传云端'
                    />
                </View>
            </View>
        );
    }
}

const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    describe: {
        alignItems: 'center',
        height: height/10,
        justifyContent: 'center',
        marginTop: 90,
        marginBottom: 110
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 60
    },
    buttonStyle: {
        height:50,
        width:120
    },
    titleStyle: {
        fontSize:20
    },
});


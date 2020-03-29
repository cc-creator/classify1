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
import { Button,Card,Overlay,Input } from 'react-native-elements';
import RNFS from 'react-native-fs';

import DetailCell from "./DetailCell";
import ToastExample from "../../nativeComponents/ToastExample";

let groups = [];
let images = [];
const rnfsPath = RNFS.DocumentDirectoryPath;
const jilu_path = rnfsPath + '/jilu.text';
export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            isVisible: false,
            title: '',
            remark: ''
        }
    }

    partition(){
        groups = [];
        images = this.props.images;
        const images_animal_anphibious = [];
        const images_animal_bird = [];
        const images_animal_fish = [];
        const images_animal_insect = [];
        const images_animal_mammal = [];
        const images_clothing_clothing = [];
        const images_clothing_hat = [];
        const images_clothing_shoes = [];
        const images_document_erweima = [];
        const images_document_passport = [];
        const images_food_dessert = [];
        const images_food_drink = [];
        const images_food_meal = [];
        const images_person_dubbo = [];
        const images_person_multi = [];
        const images_person_passport = [];
        const images_person_single = [];
        const images_plant_flower = [];
        const images_plant_grass = [];
        const images_plant_tree = [];
        const images_scenery_night = [];
        const images_scenery_outside = [];
        const images_thing_dianqi = [];
        const images_thing_furniture = [];
        const images_other_other = [];
        const images_person = [];
        const images_animal = [];
        const images_food = [];
        const images_scenery = [];
        const images_plant = [];
        const images_thing = [];
        const images_clothing = [];
        const images_document = [];
        const images_other = [];
        let sum_person = 0;
        let sum_animal = 0;
        let sum_food = 0;
        let sum_plant = 0;
        let sum_clothing = 0;
        let sum_thing = 0;
        let sum_document = 0;
        let sum_scenery = 0;
        let sum_other = 0;
        for(let i=0;i<images.length;i++){
            if(images[i].label2 == 'anphibious'){
                images_animal_anphibious.push(images[i]);
                sum_animal++;
            }else if(images[i].label2 == 'bird'){
                images_animal_bird.push(images[i]);
                sum_animal++;
            }else if(images[i].label2 == 'fish'){
                images_animal_fish.push(images[i]);
                sum_animal++;
            }else if(images[i].label2 == 'insect'){
                images_animal_insect.push(images[i]);
                sum_animal++;
            }else if(images[i].label2 == 'mammal'){
                images_animal_mammal.push(images[i]);
                sum_animal++;
            }else if(images[i].label2 == 'clothing'){
                images_clothing_clothing.push(images[i]);
                sum_clothing++;
            }else if(images[i].label2 == 'hat'){
                images_clothing_hat.push(images[i]);
                sum_clothing++;
            }else if(images[i].label2 == 'shoes'){
                images_clothing_shoes.push(images[i]);
                sum_clothing++;
            }else if(images[i].label2 == 'erweima'){
                images_document_erweima.push(images[i]);
                sum_document++;
            }else if(images[i].label2 == 'passport'){
                images_document_passport.push(images[i]);
                sum_document++;
            }else if(images[i].label2 == 'dessert'){
                images_food_dessert.push(images[i]);
                sum_food++;
            }else if(images[i].label2 == 'drink'){
                images_food_drink.push(images[i]);
                sum_food++;
            }else if(images[i].label2 == 'meal'){
                images_food_meal.push(images[i]);
                sum_food++;
            }else if(images[i].label2 == 'dubbo'){
                images_person_dubbo.push(images[i]);
                sum_person++;
            }else if(images[i].label2 == 'multi'){
                images_person_multi.push(images[i]);
                sum_person++;
            }else if(images[i].label2 == 'passport'){
                images_person_passport.push(images[i]);
                sum_person++;
            }else if(images[i].label2 == 'single'){
                images_person_single.push(images[i]);
                sum_person++;
            }else if(images[i].label2 == 'flower'){
                images_plant_flower.push(images[i]);
                sum_plant++;
            }else if(images[i].label2 == 'grass'){
                images_plant_grass.push(images[i]);
                sum_plant++;
            }else if(images[i].label2 == 'tree'){
                images_plant_tree.push(images[i]);
                sum_plant++;
            }else if(images[i].label2 == 'night'){
                images_scenery_night.push(images[i]);
                sum_scenery++;
            }else if(images[i].label2 == 'outside'){
                images_scenery_outside.push(images[i]);
                sum_scenery++;
            }else if(images[i].label2 == 'dianqi'){
                images_thing_dianqi.push(images[i]);
                sum_thing++;
            }else if(images[i].label2 == 'furniture'){
                images_thing_furniture.push(images[i]);
                sum_thing++;
            }else{
                images_other_other.push(images[i]);
                sum_other++;
            }
        }
        if(images_animal_mammal.length > 0){
            images_animal.push({group: images_animal_mammal,label1: '动物',label2: '哺乳类',sum: images_animal_mammal.length});
        }
        if(images_animal_bird.length > 0){
            images_animal.push({group: images_animal_bird,label1: '动物',label2: '鸟类',sum: images_animal_bird.length});
        }
        if(images_animal_fish.length > 0){
            images_animal.push({group: images_animal_fish,label1: '动物',label2: '鱼类',sum: images_animal_fish.length});
        }
        if(images_animal_insect.length > 0){
            images_animal.push({group: images_animal_insect,label1: '动物',label2: '昆虫',sum: images_animal_insect.length});
        }
        if(images_animal_anphibious.length > 0){
            images_animal.push({group: images_animal_anphibious,label1: '动物',label2: '两栖类',sum: images_animal_anphibious.length});
        }
        if(images_clothing_clothing.length > 0){
            images_clothing.push({group: images_clothing_clothing,label1: '服装',label2: '衣服',sum: images_clothing_clothing.length})
        }
        if(images_clothing_hat.length > 0){
            images_clothing.push({group: images_clothing_hat,label1: '服装',label2: '帽子',sum: images_clothing_hat.length})
        }
        if(images_clothing_shoes.length > 0){
            images_clothing.push({group: images_clothing_shoes,label1: '服装',label2: '鞋子',sum: images_clothing_shoes.length})
        }
        if(images_person_single.length > 0){
            images_person.push({group: images_person_single,label1: '人像',label2: '单人照',sum: images_person_single.length})
        }
        if(images_person_dubbo.length > 0){
            images_person.push({group: images_person_dubbo,label1: '人像',label2: '双人照',sum: images_person_dubbo.length})
        }
        if(images_person_multi.length > 0){
            images_person.push({group: images_person_multi,label1: '人像',label2: '集体照',sum: images_person_multi.length})
        }
        if(images_person_passport.length > 0){
            images_person.push({group: images_person_passport,label1: '人像',label2: '证件照',sum: images_person_passport.length})
        }
        if(images_document_erweima.length > 0){
            images_document.push({group: images_document_erweima,label1: '文档',label2: '二维码',sum: images_document_erweima.length})
        }
        if(images_document_passport.length > 0){
            images_document.push({group: images_document_passport,label1: '文档',label2: '证件',sum: images_document_passport.length})
        }
        if(images_food_meal.length > 0){
            images_food.push({group: images_food_meal,label1: '美食',label2: '饭菜',sum: images_food_meal.length})
        }
        if(images_food_dessert.length > 0){
            images_food.push({group: images_food_dessert,label1: '美食',label2: '甜点',sum: images_food_dessert.length})
        }
        if(images_food_drink.length > 0){
            images_food.push({group: images_food_drink,label1: '美食',label2: '饮品',sum: images_food_drink.length})
        }
        if(images_scenery_outside.length > 0){
            images_scenery.push({group: images_scenery_outside,label1: '景色',label2: '室外',sum: images_scenery_outside.length})
        }
        if(images_scenery_night.length > 0){
            images_scenery.push({group: images_scenery_night,label1: '景色',label2: '夜景',sum: images_scenery_night.length})
        }
        if(images_plant_grass.length > 0){
            images_plant.push({group: images_plant_grass,label1: '植物',label2: '小草',sum: images_plant_grass.length})
        }
        if(images_plant_flower.length > 0){
            images_plant.push({group: images_plant_flower,label1: '植物',label2: '花朵',sum: images_plant_flower.length})
        }
        if(images_plant_tree.length > 0){
            images_plant.push({group: images_plant_tree,label1: '植物',label2: '树木',sum: images_plant_tree.length})
        }
        if(images_thing_dianqi.length > 0){
            images_thing.push({group: images_thing_dianqi,label1: '物品',label2: '电器',sum: images_thing_dianqi.length})
        }
        if(images_thing_furniture.length > 0){
            images_thing.push({group: images_thing_furniture,label1: '物品',label2: '家具',sum: images_thing_furniture.length})
        }
        if(images_other_other.length > 0){
            images_other.push({group: images_other_other,label1: '其他',label2: '',sum: images_other_other.length});
        }

        if(images_person.length > 0){
            groups.push({group:images_person,label:"人像",sum: sum_person});
        }
        if(images_animal.length > 0){
            groups.push({group:images_animal,label:"动物",sum: sum_animal});
        }
        if(images_plant.length > 0){
            groups.push({group:images_plant,label:"植物",sum: sum_plant});
        }
        if(images_scenery.length > 0){
            groups.push({group:images_scenery,label:"风景",sum: sum_scenery});
        }
        if(images_food.length > 0){
            groups.push({group:images_food,label:"美食",sum: sum_food});
        }
        if(images_thing.length > 0){
            groups.push({group:images_thing,label:"物品",sum: sum_thing});
        }
        if(images_clothing.length > 0){
            groups.push({group:images_clothing,label:"服装",sum: sum_clothing});
        }
        if(images_document.length > 0){
            groups.push({group:images_document,label:"文档",sum: sum_document});
        }
        if(images_other.length > 0){
            groups.push({group:images_other,label:"其他",sum: sum_other});
        }
    }

    local_store() {
        const temp_path = rnfsPath + '/test_' +this.state.title + '.txt';
        let temp_str = this.state.title + "@" + this.state.remark + "@";
        RNFS.writeFile(temp_path,temp_str + JSON.stringify(images),'utf8')
            .then((success) => {
                RNFS.appendFile(jilu_path,"@"+temp_path,'utf8')
                    .then((success) => {
                        ToastExample.show("导入本地成功",ToastExample.SHORT);
                        Actions.record();
                    })
                    .catch((err) => {})
            })
            .catch((err) => {});
        this.setState({isVisible: false})
    }

    _keyExtractor=(item, index)=> ''+index;

    render()  {
        this.partition();
        return (
            <View style={styles.container}>
                { this.props.source !== 'temp' ?
                    <View style={styles.describe}>
                        <Card
                            title={this.props.title}
                            titleStyle={styles.titleStyle}
                            containerStyle={{width: width*0.8}}
                            image={{uri: groups[0].group[0].group[0].url}}
                        imageProps={{resizeMode: 'cover'}}>
                            <Text>{this.props.remark}</Text>
                        </Card>
                    </View> : null}
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
                        onPress={() => {this.setState({isVisible: true})}}
                        disabled={this.props.source === 'local_remark'}
                        title='导入本地'
                    />
                    <Button
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.titleStyle}
                        disabled={this.props.source === 'remote_remark'}
                        title='上传云端'
                    />
                </View>
                <Overlay isVisible={this.state.isVisible}
                         onBackdropPress={() => this.setState({ isVisible: false })}
                         height={height/3.9}>
                    <Input placeholder='标题' value={this.state.title}
                           maxLength={10}
                           onChangeText={(text) => {this.setState({title: text})}}/>
                    <Input placeholder='备注' value={this.state.remark}
                           maxLength={35}
                           multiline={true}
                           onChangeText={(text) => {this.setState({remark: text})}}/>
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-around',marginTop: 30}}>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            onPress={this.local_store.bind(this)}
                            title='确定'
                        />
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            onPress={() => this.setState({ isVisible: false })}
                            title='取消'
                        />
                    </View>
                </Overlay>
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
        position: 'absolute',
        left: width*0.7,
        top: height*0.7
    },
    buttonStyle: {
        height:50,
        width:120,
        borderRadius: 25,
        marginBottom: 5,
        opacity: 0.8
    },
    titleStyle: {
        fontSize:20
    },
});


import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    FlatList, Modal, Image, ProgressBarAndroid
} from 'react-native';
import { Actions} from 'react-native-router-flux';
import { Button,Card,Overlay,Input } from 'react-native-elements';
import RNFS from 'react-native-fs';

import DetailCell from "./DetailCell";
import ToastExample from "../../nativeComponents/ToastExample";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Pdf from "react-native-pdf";
import Header from "../global/Header";

/*images：合并前后均用此数组，ccimages：新选择的图片数组*/
let images = [];let ccimages = [];
/*关于分类的属性：标题 备注 封面 分类用时 分类实践*/
let ctitle = '';let remark = '';let cover = '';let time = '';let dateTime = '';
/*true:本地 false:远端*/
let flag = true;
/*jilu_path：存储所有记录的文件*/
const rnfsPath = RNFS.DocumentDirectoryPath;const jilu_path = rnfsPath + '/jilu.text';
/*用于存放分好类的数组*/
let images_animal_anphibious = [];let images_animal_bird = [];let images_animal_fish = [];let images_animal_insect = [];let images_animal_mammal = [];let images_clothing_clothing = [];let images_clothing_hat = [];let images_clothing_shoes = [];let images_document_erweima = [];let images_document_passport = [];let images_food_dessert = [];let images_food_drink = [];let images_food_meal = [];let images_person_dubbo = [];let images_person_multi = [];let images_person_passport = [];let images_person_single = [];let images_plant_flower = [];let images_plant_grass = [];let images_plant_tree = [];let images_scenery_night = [];let images_scenery_outside = [];let images_thing_dianqi = [];let images_thing_furniture = [];let images_other_other = [];let images_person = [];let images_animal = [];let images_food = [];let images_scenery = [];let images_plant = [];let images_thing = [];let images_clothing = [];let images_document = [];let images_other = [];
/*一级分类数组的长度*/
let sum_person = 0;let sum_animal = 0;let sum_food = 0;let sum_plant = 0;let sum_clothing = 0;let sum_thing = 0;let sum_document = 0;let sum_scenery = 0;let sum_other = 0;
/*表示合并分类前后，true: 合并分类前，false：合并分类后*/
let before_flag = false;
export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            groups: [], //存放分好类的image，用FlatList显示
            isVisible: false, //控制overLay的显示
            title: this.props.ctitle,
            remark: this.props.remark,
            isPdf: false, //标识当前页面的PDF是否生成
            visible: false, //控制Modal的显示
            source: '', //存放生成PDF的路径
            flag: typeof(this.props.again) === 'undefined' ? false : true,
            isLoad: false,
        }
        /*检测PDF是否存在*/
        if(this.props.pdfUri != null && !this.props.again){
            RNFS.exists(this.props.pdfUri)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        isPdf: res,
                        source: {uri: this.props.pdfUri}
                    })
                })
        }

        if(this.props.again){
            before_flag = true;
        }

        ctitle = this.props.ctitle;remark = this.props.remark;cover = this.props.cover;time = this.props.time;dateTime = this.props.dateTime;
        images = this.props.images;ccimages = JSON.parse(JSON.stringify(this.props.images));
    }

    UNSAFE_componentWillMount(): void {
        this.partition();
    }

    /*
    * 用于将images数组分类存放进group
    * */
    partition(){
        let temp_groups = [];
        images_animal_anphibious = [];
        images_animal_bird = [];
        images_animal_fish = [];
        images_animal_insect = [];
        images_animal_mammal = [];
        images_clothing_clothing = [];
        images_clothing_hat = [];
        images_clothing_shoes = [];
        images_document_erweima = [];
        images_document_passport = [];
        images_food_dessert = [];
        images_food_drink = [];
        images_food_meal = [];
        images_person_dubbo = [];
        images_person_multi = [];
        images_person_passport = [];
        images_person_single = [];
        images_plant_flower = [];
        images_plant_grass = [];
        images_plant_tree = [];
        images_scenery_night = [];
        images_scenery_outside = [];
        images_thing_dianqi = [];
        images_thing_furniture = [];
        images_other_other = [];
        images_person = [];
        images_animal = [];
        images_food = [];
        images_scenery = [];
        images_plant = [];
        images_thing = [];
        images_clothing = [];
        images_document = [];
        images_other = [];
        sum_person = 0;
        sum_animal = 0;
        sum_food = 0;
        sum_plant = 0;
        sum_clothing = 0;
        sum_thing = 0;
        sum_document = 0;
        sum_scenery = 0;
        sum_other = 0;
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
            images_plant.push({group: images_plant_flower,label1: '植物',label2: '鲜花',sum: images_plant_flower.length})
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
            temp_groups.push({group:images_person,label:"人像",sum: sum_person});
        }
        if(images_animal.length > 0){
            temp_groups.push({group:images_animal,label:"动物",sum: sum_animal});
        }
        if(images_plant.length > 0){
            temp_groups.push({group:images_plant,label:"植物",sum: sum_plant});
        }
        if(images_scenery.length > 0){
            temp_groups.push({group:images_scenery,label:"风景",sum: sum_scenery});
        }
        if(images_food.length > 0){
            temp_groups.push({group:images_food,label:"美食",sum: sum_food});
        }
        if(images_thing.length > 0){
            temp_groups.push({group:images_thing,label:"物品",sum: sum_thing});
        }
        if(images_clothing.length > 0){
            temp_groups.push({group:images_clothing,label:"服装",sum: sum_clothing});
        }
        if(images_document.length > 0){
            temp_groups.push({group:images_document,label:"文档",sum: sum_document});
        }
        if(images_other.length > 0){
            temp_groups.push({group:images_other,label:"其他",sum: sum_other});
        }
        this.setState({
            groups: temp_groups.map( group =>{
                return group
            })
        })
    }

    local_store() {
        if(!this.props.again){
            console.log("首次分类")
            let local_path = rnfsPath + "/"+this.state.title + '.txt';
            let temp_str = this.state.title + "@" + this.state.remark + "@" + images[0].url + "@" + time + "@" + dateTime + "@" + JSON.stringify(images) + "@";
            temp_str += this.state.source === '' ? '' : this.state.source.uri;
            RNFS.writeFile(local_path,temp_str,'utf8')
                .then((success) => {
                    RNFS.appendFile(jilu_path,"@"+local_path,'utf8')
                        .then((success) => {
                            ToastExample.show("导出本地成功",ToastExample.SHORT);
                            this.setState({
                                isLoad: false,
                                isVisible: false
                            })
                            Actions.record();
                        })
                        .catch((err) => {})
                })
                .catch((err) => {});
            this.setState({isVisible: false})
        }else {
            console.log("继续分类")/*
            RNFS.unlink(this.props.pdfUri)
                .then(()=>{})
                .catch(() => {})*/
            let temp_str = this.state.title + "@" + this.state.remark + "@" + this.props.cover + "@" + time + "@" + dateTime + "@" + JSON.stringify(images) + "@";
            temp_str += this.state.source === '' ? '' : this.state.source.uri;
            console.log("----------"+this.state.source === '' ? '' : this.state.source.uri)
            RNFS.unlink(this.props.path)
                .then(()=>{
                    RNFS.writeFile(this.props.path,temp_str,'utf8')
                        .then((success) => {
                            ToastExample.show("导出本地成功",ToastExample.SHORT);
                            this.setState({
                                isLoad: false,
                                isVisible: false
                            })
                            Actions.record();
                        })
                        .catch((err) => {});
                })
                .catch(err => {})
            this.setState({isVisible: false})
        }

    }

    remote_store() {
        if(!global.variables.userToken){
            console.log("转去登录");
            Actions.logreg();
        }else {
            this.setState({
                isVisible: true
            })
        }
    }

    uploadCategory() {
        console.log("上传图片")
        this.setState({p_isVisible:true})
        let formdata = new FormData();
        if(!this.props.again){
            for(let i=0;i<images.length;i++){
                formdata.append('images',{uri: images[i].url,type: 'multipart/form-data',name: this.getImageName(images[i].url)});
                formdata.append('dateTimes',images[i].dateTime);
                formdata.append('label1s',images[i].label1);
                formdata.append('label2s',images[i].label2);
            }
            formdata.append('userId', global.variables.userId);
            formdata.append('ctitle', this.state.title);
            formdata.append('remark', this.state.remark);
            formdata.append('time',time);
            formdata.append('pdfUri',this.state.source === '' ? '' : this.state.source.uri);
            formdata.append('dateTime', dateTime);
        fetch(global.variables.ip+'/images/uploadCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata})
            .then((response) => response.json())
            .then((responseJson) => {
                ToastExample.show("上传成功",ToastExample.SHORT);
                this.setState({
                    isLoad: false,
                    isVisible: false
                })
                Actions.record();
            })
            .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
        }else {
            console.log("云端继续分类")
            for(let i=0;i<ccimages.length;i++){
                formdata.append('images',{uri: ccimages[i].url,type: 'multipart/form-data',name: this.getImageName(images[i].url)});
                formdata.append('dateTimes',ccimages[i].dateTime);
                formdata.append('label1s',ccimages[i].label1);
                formdata.append('label2s',ccimages[i].label2);
            }
            formdata.append('categoryId',this.props.categoryId);
            formdata.append('ctitle',this.state.title);
            formdata.append('remark',this.state.remark);
            formdata.append('time',time);
            formdata.append('pdfUri',this.state.source === '' ? '' : this.state.source.uri);
            formdata.append('dateTime', dateTime);
            console.log(formdata)
            fetch(global.variables.ip+'/images/uploadImages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formdata})
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({isVisible: false})
                    ToastExample.show("上传成功",ToastExample.SHORT);
                    this.setState({
                        isLoad: false,
                        isVisible: false
                    })

                    Actions.record();
                })
                .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
        }
    }

    getDateTime() {
        let dateTime = new Date();
        let _year = dateTime.getFullYear().toString();
        let _month = (dateTime.getMonth()+1).toString();
        let _day = dateTime.getDate().toString();
        let _hour = dateTime.getHours().toString();
        let _minute = dateTime.getMinutes().toString();
        let _second = dateTime.getSeconds().toString();
        let _time = _year + "-" + _month + "-" + _day + " " + _hour + ":" + _minute + ":" + _second;
        return _time;
    }

    getImageName(url){
        let index = url.lastIndexOf('/') + 1;
        let length = url.length - index;
        return url.substr(index,length);
    }

    _keyExtractor=(item, index)=> ''+index;

    makeHtmlString(ctitle,remark,length,time,dateTime) {
        let table = '<table cellpadding="0px" frame="box" style="width: 100%">\n' +
            '<thead style="background-color: #2089DC;color: #fff;">\n' +
            '<tr style="font-size: 38px"><th height="74">一级类别</th>\n' +
            '<th height="74">二级类别</th>\n' +
            '<th height="74">数量</th></tr>\n' +
            '</thead>\n' +
            '<tbody>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" rowspan="4" style="text-align: center;border-bottom: 1px solid #666;">人像<span style="color: #2089DC;">( '+ sum_person +' )</span></td>\n' +
            '<td height="74" style="text-align: center">单人照</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_person_single.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center">双人照</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_person_dubbo.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center;">集体照</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_person_multi.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;">证件照</td>\n' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;color: #2089DC">'+ images_person_passport.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" rowspan="5" style="text-align: center;border-bottom: 1px solid #666;">动物<span style="color: #2089DC;">( '+ sum_animal +' )</span></td>\n' +
            '<td height="74" style="text-align: center">哺乳类</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_animal_mammal.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center">鱼类</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_animal_fish.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center">鸟类</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_animal_bird.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center">昆虫</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_animal_insect.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;">两栖类</td>\n' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;color: #2089DC">'+ images_animal_anphibious.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" rowspan="3" style="text-align: center;border-bottom: 1px solid #666;">植物<span style="color: #2089DC;">( '+ sum_plant +' )</span></td>\n' +
            '<td height="74" style="text-align: center">花朵</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_plant_flower.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center">小草</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_plant_grass.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;">树木</td>\n' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;color: #2089DC">'+ images_plant_tree.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" rowspan="3" style="text-align: center;border-bottom: 1px solid #666;">美食<span style="color: #2089DC;">( '+ sum_food +' )</span></td>\n' +
            '<td height="74" style="text-align: center">食物</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_food_meal.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center">饮料</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_food_drink.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;">甜点</td>\n' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;color: #2089DC">'+ images_food_dessert.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" rowspan="2" style="text-align: center;border-bottom: 1px solid #666;">风景<span style="color: #2089DC;">( '+ sum_scenery +' )</span></td>\n' +
            '<td height="74" style="text-align: center">室外景色</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_scenery_outside.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;">夜景</td>\n' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;color: #2089DC">'+ images_scenery_night.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" rowspan="3" style="text-align: center;border-bottom: 1px solid #666;">服装<span style="color: #2089DC;">( '+ sum_clothing +' )</span></td>\n' +
            '<td height="74" style="text-align: center">衣服</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_clothing_clothing.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center">鞋子</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_clothing_shoes.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;">帽子</td>\n' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;color: #2089DC">'+ images_clothing_hat.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" rowspan="2" style="text-align: center;border-bottom: 1px solid #666;">物品<span style="color: #2089DC;">( '+ sum_thing +' )</span></td>\n' +
            '<td height="74" style="text-align: center">电器</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_thing_dianqi.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;">家具</td>\n' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;color: #2089DC">'+ images_thing_furniture.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" rowspan="2" style="text-align: center;border-bottom: 1px solid #666;">文档<span style="color: #2089DC;">( '+ sum_document +' )</span></td>\n' +
            '<td height="74" style="text-align: center">证件</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ images_document_passport.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;">二维码</td>\n' +
            '<td height="74" style="text-align: center;border-bottom: 1px solid #666;color: #2089DC">'+ images_document_erweima.length +'</td>' +
            '</tr>\n' +
            '<tr style="font-size: 30px;">' +
            '<td height="74" colspan="2" style="text-align: center">其他</td>\n' +
            '<td height="74" style="text-align: center;color: #2089DC">'+ sum_other +'</td>' +
            '</tr>\n' +
            '</tbody>\n' +
            '</table>';
        let result = '';
        result += typeof(ctitle) === 'undefined' ? '' : '<h1 style="color: dodgerblue;text-align: center">'+ ctitle +'</h1><br/>';
        result += typeof(remark) == 'undefined' ? '' : '<span style="font-size: 30px">'+ remark +'</span><br/><br/>';
        result += '<span style="font-size: 30px">图片总数: </span>' + '<span style="font-size: 30px;color: #2089DC">' + length + '</span>' + '<span style="font-size: 30px"> 张</span><br/><br/>';
        result += '<span style="font-size: 30px">分类用时: </span>' + '<span style="font-size: 30px;color: #2089DC">' + (before_flag ? this.props.newTime : time) + '</span>' + '<span style="font-size: 30px"> 秒</span><br/><br/>';
        result += '<span style="font-size: 30px;">分类时间: </span>' + '<span style="font-size: 30px;color: #2089DC">' + dateTime + '</span><br/><br/>';
        return  result+table;
    }

    async createPDF() {
        let options = {
            html: this.makeHtmlString(ctitle,remark,images.length,time,dateTime),
            fileName: typeof(ctitle) === 'undefined' || before_flag ? new Date().getTime().toString() : ctitle.toString(),
            directory: 'Documents',
        };
        let file = await RNHTMLtoPDF.convert(options)
        this.setState({source: {uri: 'file://'+file.filePath}})
        console.log(file.filePath)
        /*从总览页面进入详情后生成PDF*/
        if(this.props.source === 'local' && typeof(this.props.path) !== 'undefined' && typeof(this.props.again) === 'undefined'){
            console.log('生成PDF')
            RNFS.appendFile(this.props.path,'file://'+file.filePath,'utf8')
                .then((success) => {
                    ToastExample.show(file.filePath,ToastExample.LONG);
                })
                .catch((err) => {})
        }if(this.props.source === 'remote' && typeof(this.props.categoryId) !== 'undefined' && typeof(this.props.again) === 'undefined'){
            console.log('生成PDF')
            let body = {
                'categoryId': this.props.categoryId,
                'pdfUri': 'file://'+file.filePath
            }
            fetch(global.variables.ip+'/category/updateCategory', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)})
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                })
                .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
        } else {
            ToastExample.show(file.filePath,ToastExample.LONG);
        }
    }

    mergeImages() {
        if(this.props.source === 'local'){
            let old_images = [];
            RNFS.readFile(this.props.path)
                .then((result) => {
                    let temp = result.split('@');
                    old_images = JSON.parse(temp[5]);
                    for(let i=0;i<old_images.length;i++){
                        images.push(old_images[i])
                    }
                    this.partition();
                    this.setState({flag: false})
                })
                .catch((err) => {})
        }else {
            console.log("merge")
            let categoryId = {'categoryId': this.props.categoryId}
            fetch(global.variables.ip+'/images/getImages', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryId)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    let old_images = responseJson;
                    for(let i=0;i<old_images.length;i++){
                        images.push(old_images[i])
                    }
                    this.partition();
                    this.setState({flag: false})
                })
                .catch(err => ToastExample.show("网络出错",ToastExample.SHORT))
        }
        before_flag = false;
        this.setState({isPdf: false})
    }

    render()  {
        return (
            <View style={styles.container}>
                <Header title='分类总览' left_flag={true} right_flag={false} again={this.props.again} last={this.props.last}/>
                {this.props.source !== 'temp' && !this.state.flag ?
                    <View style={styles.describe}>
                        <Card
                            title={ctitle}
                            titleStyle={styles.titleStyle}
                            containerStyle={{width: width*0.8}}
                            image={{uri: cover}}
                        imageProps={{resizeMode: 'cover'}}>
                            <Text>{remark}</Text>
                        </Card>
                    </View> : null
                }
                <FlatList
                    data={this.state.groups}
                    keyExtractor={this._keyExtractor}
                    renderItem={(item) => <DetailCell
                        prop={item}
                    />}
                ></FlatList>
                { this.state.flag ?
                    <View style={styles.buttonView}>
                        {this.state.isPdf ?
                            <Button
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                onPress={() => {
                                    this.setState({visible: true})}}
                                title='浏览PDF'/> :
                            <Button
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                onPress={() => {
                                    this.createPDF();
                                    this.setState({isPdf: true})
                                }}
                                title='生成PDF'/>}
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            onPress={() => {this.mergeImages()}}
                            title='合并'/>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            onPress={() => {
                                Actions.jump('record')
                            }}
                            title='放弃'/>
                    </View> :
                    <View style={styles.buttonView}>
                        { typeof(this.props.again) !== 'undefined' && this.props.source === 'remote' ? null :
                            <Button
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                onPress={() => {
                                    flag = true;
                                    this.setState({isVisible: true})
                                }}
                                disabled={typeof(this.props.again) === 'undefined' ? this.props.source === 'local' : !this.props.again}
                                title='导出本地'/>}
                        { typeof(this.props.again) !== 'undefined' && this.props.source === 'local' ? null :
                            <Button
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                onPress={() => {
                                    flag = false;
                                    this.remote_store();
                                }}
                                disabled={typeof(this.props.again) === 'undefined' ? this.props.source === 'remote' : !this.props.again}
                                title='上传云端'/>}
                    {this.state.isPdf ?
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            onPress={() => {
                            this.setState({visible: true})}}
                            title='浏览PDF'/> :
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            onPress={() => {
                                this.createPDF();
                                this.setState({isPdf: true})
                            }}
                            title='生成PDF'/>}
                    </View>
                }
                <Overlay isVisible={this.state.isVisible}
                         onBackdropPress={() => this.setState({ isVisible: false })}
                         overlayStyle={{padding: 0}}
                         height={height*0.25}>
                    { !this.state.isLoad ? <View style={{padding: 10}}>
                        <Input placeholder='标题' value={this.state.title}
                               maxLength={10}
                               style={{marginTop: 5}}
                               onChangeText={(text) => {this.setState({title: text})}}/>
                        <Input placeholder='备注' value={this.state.remark}
                               maxLength={35}
                               multiline={true}
                               onChangeText={(text) => {this.setState({remark: text})}}/>
                        <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-around',marginTop: height*0.02}}>
                            <Button
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                onPress={() => {
                                    this.setState({isLoad: true})
                                    if(flag){
                                        this.local_store();
                                    }else {
                                        this.uploadCategory();
                                    }
                                }}
                                title='确定'
                            />
                            <Button
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                onPress={() => this.setState({ isVisible: false })}
                                title='取消'
                            />
                        </View>
                    </View> : <View style={styles.p_container}>
                            <View style={styles.p_view1}>
                                <Text style={styles.p_text}>正在上传</Text>
                            </View>
                            <View style={styles.p_view2}>
                                <ProgressBarAndroid styleAttr='Large' color='#2089DC' style={styles.p_progress}/>
                            </View></View> }
                </Overlay>
                <Modal visible={this.state.visible} onRequestClose={() => {this.setState({visible: false})}}>
                    { this.state.source == '' ? null :
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
                            style={styles.pdf}/>}
                </Modal>
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
        marginBottom: 110,
    },
    buttonView: {
        position: 'absolute',
        right: width*0.05,
        bottom: height*0.02
    },
    buttonStyle: {
        height:width*0.125,
        width:width*0.25,
        borderRadius: 25,
        marginBottom: 5,
        opacity: 0.8
    },
    titleStyle: {
        fontSize:15
    },
    pdf: {
        flex:1,
        width:width,
        height:height,
    },
    p_container: {
        padding: 0
    },
    p_view1: {
        backgroundColor: '#2089DC',
        height: height*0.1,
        alignItems: 'center'
    },
    p_text: {
        lineHeight: height*0.1,
        fontSize: 25
    },
    p_view2: {
        height: height*0.2
    },
    p_progress: {
        marginTop: height*0.03
    }
});


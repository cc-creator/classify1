import React, { Component } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    View,
    Text, Image, ScrollView
} from 'react-native';
import Header from "../global/Header";
import { VictoryBar, VictoryLine, VictoryArea, VictoryChart, VictoryTheme } from "victory-native";

let first_data = []
let second_person = [];let second_animal = [];let second_plant = [];let second_food = [];let second_scenery = [];let second_clothing = [];let second_thing = [];let second_document = []
export default class ViewInfo extends Component{

    constructor(props){
        super(props);
    }

    UNSAFE_componentWillMount(): void {
        this.readyInfo();
    }

    readyInfo() {
        first_data = [];
        second_person = [];second_document=[];second_thing=[];second_clothing=[];second_scenery=[];second_food=[];second_plant=[];second_animal=[];
        first_data.push({x_data: '人像',y_data: this.props.item.person == 0 ? null : this.props.item.person});first_data.push({x_data: '动物',y_data: this.props.item.animal == 0 ? null : this.props.item.animal});first_data.push({x_data: '植物',y_data: this.props.item.plant == 0 ? null : this.props.item.plant});first_data.push({x_data: '美食',y_data: this.props.item.food == 0 ? null : this.props.item.food});first_data.push({x_data: '风景',y_data: this.props.item.scenery == 0 ? null : this.props.item.scenery});first_data.push({x_data: '服装',y_data: this.props.item.clothing == 0 ? null : this.props.item.clothing});first_data.push({x_data: '事物',y_data: this.props.item.thing == 0 ? null : this.props.item.thing});first_data.push({x_data: '文件',y_data: this.props.item.document == 0 ? null : this.props.item.document});first_data.push({x_data: '其他',y_data: this.props.item.other == 0 ? null : this.props.item.other});
        first_data.sort((a,b) => {return a.y_data - b.y_data})
        second_person.push({x_data:'单人照',y_data:this.props.item.single == 0 ? null : this.props.item.single});second_person.push({x_data:'双人照',y_data:this.props.item.dubbo == 0 ? null : this.props.item.dubbo});second_person.push({x_data:'集体照',y_data:this.props.item.multi == 0 ? null : this.props.item.multi});second_person.push({x_data:'证件照',y_data:this.props.item.passport == 0 ? null : this.props.item.passport});
        second_person.sort((a,b) => {return a.y_data - b.y_data})
        second_animal.push({x_data:'哺乳类',y_data:this.props.item.mammal == 0 ? null : this.props.item.mammal});second_animal.push({x_data:'鸟类',y_data:this.props.item.bird == 0 ? null : this.props.item.bird});second_animal.push({x_data:'鱼类',y_data:this.props.item.fish == 0 ? null : this.props.item.fish});second_animal.push({x_data:'昆虫',y_data:this.props.item.insect == 0 ? null : this.props.item.insect});second_animal.push({x_data:'两栖类',y_data:this.props.item.anphibious == 0 ? null : this.props.item.anphibious});
        second_animal.sort((a,b) => {return a.y_data - b.y_data})
        second_plant.push({x_data:'鲜花',y_data:this.props.item.flower == 0 ? null : this.props.item.flower});second_plant.push({x_data:'小草',y_data:this.props.item.grass == 0 ? null : this.props.item.grass});second_plant.push({x_data:'树木',y_data:this.props.item.tree == 0 ? null : this.props.item.tree});
        second_plant.sort((a,b) => {return a.y_data - b.y_data})
        second_food.push({x_data:'饭菜',y_data:this.props.item.meal == 0 ? null : this.props.item.meal});second_food.push({x_data:'饮品',y_data:this.props.item.drink == 0 ? null : this.props.item.drink});second_food.push({x_data:'甜点',y_data:this.props.item.desert ? null : this.props.item.desert});
        second_food.sort((a,b) => {return a.y_data - b.y_data})
        second_scenery.push({x_data:'室外',y_data:this.props.item.outside == 0 ? null : this.props.item.outside});second_scenery.push({x_data:'夜景',y_data:this.props.item.night == 0 ? null : this.props.item.night});
        second_scenery.sort((a,b) => {return a.y_data - b.y_data})
        second_clothing.push({x_data:'衣服',y_data:this.props.item.clothe == 0 ? null : this.props.item.clothe});second_clothing.push({x_data:'帽子',y_data:this.props.item.hat == 0 ? null : this.props.item.hat});second_clothing.push({x_data:'鞋子',y_data:this.props.item.shoes == 0 ? null : this.props.item.shoes});
        second_clothing.sort((a,b) => {return a.y_data - b.y_data})
        second_thing.push({x_data:'电器',y_data:this.props.item.dianqi == 0 ? null : this.props.item.dianqi});second_thing.push({x_data:'家具',y_data:this.props.item.furniture == 0 ? null : this.props.item.furniture});
        second_thing.sort((a,b) => {return a.y_data - b.y_data})
        second_document.push({x_data:'二维码',y_data:this.props.item.erweima == 0 ? null : this.props.item.erweima});second_document.push({x_data:'证件',y_data:this.props.item.zhengjian == 0 ? null : this.props.item.zhengjian});
        second_document.sort((a,b) => {return a.y_data - b.y_data})
    }

    render() {
        return (
            <View>
                <Header title='分类信息' left_flag={true} />
                <View style={{marginBottom:10}}>
                    <View style={{alignItems: 'center',marginTop:5,marginBottom:10}}>
                        <Text style={{fontSize:25}}>{this.props.item.title}</Text>
                    </View>
                    <View style={{paddingLeft: width*0.05}}>
                        <Text style={{fontSize:20,marginBottom:5}}>        {this.props.item.remark}</Text>
                        <Text style={{fontSize:20}}>总共{this.props.item.sum}张图片</Text>
                        <Text style={{fontSize:20}}>总用时：{this.props.item.time}秒</Text>
                        <Text style={{fontSize:20}}>分类时间：{this.props.item.dateTime}</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                    <View>
                        <Text style={{fontSize: 20,top: 30,left:width*0.1}}>一级分类</Text>
                        <VictoryChart width={400} theme={VictoryTheme.material}  minDomain={{ y: 0 }}>
                            <VictoryBar
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                labels={({ datum }) => datum.y_data}
                                //domain={{y:[0,first_data[first_data.length-1].y_data]}}
                                domainPadding={{x:[30,30]}}
                                categories={{ x: ["人像", "动物", "植物", "美食", "风景", "服装" , "事物", "文件", "其他"] }}
                                style={{
                                    data: { fill: "#c43a31" },
                                    parent: { border: "1px solid #ccc"}
                                }} data={first_data} x="x_data" y="y_data"/>
                        </VictoryChart>
                    </View>
                    {this.props.item.person == 0 ? null :
                        <View>
                            <Text style={{fontSize: 20,top: 30,left:width*0.1}}>二级分类-人像</Text>
                            <VictoryChart width={350} theme={VictoryTheme.material}>
                                <VictoryBar
                                    domainPadding={{x:[40,40]}}
                                    labels={({ datum }) => datum.y_data}
                                    categories={{ x: ["单人照", "双人照", "集体照", "证件照"] }}
                                    style={{
                                        data: {fill: "#c43a31"},
                                        parent: {border: "1px solid #ccc"}
                                    }} data={second_person} x="x_data" y="y_data"/>
                            </VictoryChart>
                        </View>
                    }
                    {this.props.item.animal == 0 ? null :
                        <View>
                            <Text style={{fontSize: 20,top: 30,left:width*0.1}}>二级分类-动物</Text>
                            <VictoryChart width={350} theme={VictoryTheme.material}>
                                <VictoryBar
                                    domainPadding={{x:[35,35]}}
                                    labels={({ datum }) => datum.y_data}
                                    categories={{ x: ["鸟类", "哺乳类", "鱼类", "昆虫", "两栖类"] }}
                                    style={{
                                        data: {fill: "#c43a31"},
                                        parent: {border: "1px solid #ccc"}
                                    }} data={second_animal} x="x_data" y="y_data"/>
                            </VictoryChart>
                        </View>
                    }
                    {this.props.item.plant == 0 ? null :
                        <View>
                            <Text style={{fontSize: 20,top: 30,left:width*0.1}}>二级分类-植物</Text>
                            <VictoryChart width={300} theme={VictoryTheme.material}>
                                <VictoryBar
                                    domainPadding={{x:[50,50]}}
                                    labels={({ datum }) => datum.y_data}
                                    categories={{ x: ["鲜花", "小草", "树木"] }}
                                    style={{
                                        data: { fill: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                    }} data={second_plant} x="x_data" y="y_data" />
                            </VictoryChart>
                        </View>
                    }
                    {this.props.item.food == 0 ? null :
                        <View>
                            <Text style={{fontSize: 20,top: 30,left:width*0.1}}>二级分类-美食</Text>
                            <VictoryChart width={300} theme={VictoryTheme.material}>
                                <VictoryBar
                                    domainPadding={{x:[50,50]}}
                                    labels={({ datum }) => datum.y_data}
                                    categories={{ x: ["饭菜", "饮品", "甜点"] }}
                                    style={{
                                        data: {fill: "#c43a31"},
                                        parent: {border: "1px solid #ccc"}
                                    }} data={second_food} x="x_data" y="y_data"/>
                            </VictoryChart>
                        </View>
                    }
                    {this.props.item.scenery == 0 ? null :
                        <View>
                            <Text style={{fontSize: 20,top: 30,left:width*0.1}}>二级分类-风景</Text>
                            <VictoryChart width={250} theme={VictoryTheme.material}>
                                <VictoryBar
                                    domainPadding={{x:[65,65]}}
                                    labels={({ datum }) => datum.y_data}
                                    categories={{ x: ["室外", "夜景"] }}
                                    style={{
                                        data: {fill: "#c43a31"},
                                        parent: {border: "1px solid #ccc"}
                                    }} data={second_scenery} x="x_data" y="y_data"/>
                            </VictoryChart>
                        </View>
                    }
                    {this.props.item.clothing == 0 ? null :
                        <View>
                            <Text style={{fontSize: 20,top: 30,left:width*0.1}}>二级分类-服装</Text>
                            <VictoryChart width={300} theme={VictoryTheme.material}>
                                <VictoryBar
                                    domainPadding={{x:[50,50]}}
                                    labels={({ datum }) => datum.y_data}
                                    categories={{ x: ["衣服", "帽子", "鞋子"] }}
                                    style={{
                                        data: {fill: "#c43a31"},
                                        parent: {border: "1px solid #ccc"}
                                    }} data={second_clothing} x="x_data" y="y_data"/>
                            </VictoryChart>
                        </View>
                    }
                    {this.props.item.thing == 0 ? null :
                        <View>
                            <Text style={{fontSize: 20,top: 30,left:width*0.1}}>二级分类-事物</Text>
                            <VictoryChart width={250} theme={VictoryTheme.material}>
                                <VictoryBar
                                    domainPadding={{x:[65,65]}}
                                    labels={({ datum }) => datum.y_data}
                                    categories={{ x: ["电器", "家具"] }}
                                    style={{
                                        data: {fill: "#c43a31"},
                                        parent: {border: "1px solid #ccc"}
                                    }} data={second_thing} x="x_data" y="y_data"/>
                            </VictoryChart>
                        </View>
                    }
                    {this.props.item.document == 0 ? null :
                        <View>
                            <Text style={{fontSize: 20,top: 30,left:width*0.1}}>二级分类-文件</Text>
                            <VictoryChart width={250} theme={VictoryTheme.material}>
                                <VictoryBar
                                    domainPadding={{x:[65,65]}}
                                    labels={({ datum }) => datum.y_data}
                                    categories={{ x: ["二维码", "证件"] }}
                                    style={{
                                        data: {fill: "#c43a31"},
                                        parent: {border: "1px solid #ccc"}
                                    }} data={second_document} x="x_data" y="y_data"/>
                            </VictoryChart>
                        </View>
                    }
                    <View style={{height: width*0.6}}></View>
                </ScrollView>
            </View>
        );
    }
}
const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
});


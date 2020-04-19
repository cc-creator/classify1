import React, { Component } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    View,
    Text, Image
} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class InfoCell extends Component{

    constructor(props){
        super(props);
        this.state = {
            isVisible: false
        }
    }


    showInfo() {

    }

    render() {
        return (
            <View>
                <View style={{flex: 1,flexDirection: 'row',paddingLeft: 20,paddingRight: 20,paddingTop: 5,paddingBottom: 10}}>
                    <Image source={{uri: this.props.prop.item.cover}} style={{width: width*0.15,height: width*0.15,borderRadius: width*0.075}}/>
                    <View style={{flex: 1,flexDirection: 'column',paddingLeft: 20,paddingTop: 15}}>
                        <Text style={{fontSize: 20}}>{this.props.prop.item.title}</Text>
                        <Text>{this.props.prop.item.dateTime}</Text>
                    </View>
                    <TouchableOpacity style={{width: width*0.08,height: width*0.08,marginTop: 20}} onPress={() => {
                        Actions.viewInfo({'item': this.props.prop.item});
                    }}>
                        <Image source={require('../../imgs/right.png')} style={{width: width*0.08,height: width*0.08}}/>
                    </TouchableOpacity>
                    {/*{this.state.isVisible ?
                        <TouchableOpacity style={{width: width*0.08,height: width*0.08,marginTop: 20}} onPress={() => {
                            this.setState({isVisible: false})
                        }}>
                            <Image source={require('../../imgs/right.png')} style={{width: width*0.08,height: width*0.08}}/>
                        </TouchableOpacity> :
                        <TouchableOpacity style={{width: width*0.08,height: width*0.08,marginTop: 20}} onPress={() => {
                            this.setState({isVisible: true})
                        }}>
                            <Image source={require('../../imgs/down.png')} style={{width: width*0.08,height: width*0.08}}/>
                        </TouchableOpacity>
                    }*/}
                </View>
                {/*{ this.state.isVisible ?
                    <View style={{marginLeft: width*0.05,width:width*0.9,backgroundColor: 'green',padding: 5,marginBottom: 5}}>
                        <Text>title</Text>
                        <Text>remark</Text>
                        <Text>dateTime</Text>
                        <Text>总数</Text>
                        <Text>时间</Text>
                    </View> : null
                }*/}
            </View>
        );
    }
}
const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const styles = StyleSheet.create({
});

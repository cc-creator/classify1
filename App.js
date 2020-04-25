import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {Actions, Router, Scene, Tabs, Modal} from 'react-native-router-flux';

import Classify from './components/classify/Classify';
import Record from './components/record/Record';
import Detail from './components/record/Detail';
import CellDetail from "./components/record/CellDetail";
import LogReg from './components/global/test_Log&Reg';
import MyInfo from './components/mine/MyInfo';
import EditInfo from "./components/mine/EditInfo";
import ViewInfo from "./components/mine/ViewInfo";
import './components/global/Global';

const dimension = Dimensions.get('window')
let height = dimension.height
let width = dimension.width
const TabIcon = ({ focused, title }) => {
  return (
      <View>
          {title === '记录' ? focused ? <Image source={require('./imgs/tab_record.png')} style={{width:width*0.08,height:width*0.08}}/> : <Image source={require('./imgs/tab_record_unfocused.png')} style={{width:width*0.075,height:width*0.075}}/> : null}
          {title === '分类' ? focused ? <Image source={require('./imgs/tab_classify.png')} style={{width:width*0.08,height:width*0.08}}/> : <Image source={require('./imgs/tab_classify_unfocused.png')} style={{width:width*0.075,height:width*0.075}}/> : null}
          {title === '我的' ? focused ? <Image source={require('./imgs/tab_my.png')} style={{width:width*0.08,height:width*0.08}}/> : <Image source={require('./imgs/tab_my_unfocused.png')} style={{width:width*0.08,height:width*0.075}}/> : null}
          <Text style={{color: focused ? '#2089DC' : 'black',textAlign: 'center'}}>{title}</Text>
      </View>
  );
}
const App = () => {
  return (
      <Router>
        <Scene key="root">
          <Tabs
              hideNavBar
              showLabel={false}
              tabBarStyle={{height: height*0.08,backgroundColor: '#FaFaFa',borderTopWidth: 0}}
          >
            <Scene key="record" title="记录" icon={TabIcon}>
              <Scene
                  key="record"
                  title='分类记录'
                  component={Record}
                  hideNavBar
              />
              <Scene
                  key="detail"
                  title='分类总览'
                  component={Detail}
                  hideNavBar
              />
              <Scene
                  key="cellDetail"
                  title='分类详情'
                  component={CellDetail}
                  hideNavBar
              />
            </Scene>
            <Scene key="classify" title="分类" icon={TabIcon} tabBarOnPress={() => {Actions.classify()}}>
              <Scene
                  key="classify"
                  title='图片分类'
                  component={Classify}
                  hideNavBar
              />
            </Scene>
            <Scene key="my" title="我的" icon={TabIcon} tabBarOnPress={() => {Actions.myInfo()}}>
              <Scene
                  key="myInfo"
                  title='我的'
                  component={MyInfo}
                  hideNavBar
              />
              <Scene
                  key="editInfo"
                  component={EditInfo}
                  hideNavBar
              />
              <Scene
                  key="viewInfo"
                  component={ViewInfo}
                  hideNavBar
              />
            </Scene>
          </Tabs>
          <Modal
              key="logreg"
              component={LogReg}
              title='登录'
              hideNavBar
          />
        </Scene>
      </Router>
  );
}

export default App;

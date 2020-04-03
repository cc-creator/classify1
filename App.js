import React,{Component} from 'react';
import {Text} from 'react-native';
import { Router, Scene, Tabs } from 'react-native-router-flux';

import Classify from './components/classify/Classify';
import Record from './components/record/Record';
import Detail from './components/record/Detail';
import CellDetail from "./components/record/CellDetail";
import Login from './components/global/Login';
import MyInfo from './components/mine/MyInfo';
import Regist from './components/global/Regist';
import './components/global/Global';

const TabIcon = ({ focused, title }) => {

  return (
      <Text style={{color: focused ? '#2089DC' : 'black'}}>{title}</Text>
  );
}
const App = () => {
  return (
      <Router>
        <Scene key="root">
          {/* Tab Container */}
          <Tabs
              hideNavBar
              showLabel={false}
          >
            {/* Tab and it's scenes */}
            <Scene key="record" title="记录" icon={TabIcon}>
              <Scene
                  key="record"
                  component={Record}
                  title="分类记录"
              />
              <Scene
                  key="detail"
                  component={Detail}
                  title="分类总览"
              />
              <Scene
                  key="cellDetail"
                  component={CellDetail}
                  title="分类详情"
              />
            </Scene>
            {/* Tab and it's scenes */}
            <Scene key="classify" title="分类" icon={TabIcon}>
              <Scene
                  key="scarlet"
                  component={Classify}
                  title="图片分类"
                  initial
              />
            </Scene>

            {/* Tab and it's scenes */}
            <Scene key="my" title="我" icon={TabIcon}>
              <Scene
                  key="myInfo"
                  component={MyInfo}
                  title="我的"
              />
              <Scene
                key="login"
                component={Login}
                title="登录"
              />
              <Scene
                  key="regist"
                  component={Regist}
                  title="注册"
              />
            </Scene>

          </Tabs>
        </Scene>
      </Router>
  );
}

export default App;

import React from 'react';
import {Text} from 'react-native';
import {Modal, Router, Scene, Tabs} from 'react-native-router-flux';

import Classify from './components/classify/Classify';
import Record from './components/record/Record';
import Detail from './components/record/Detail';
import CellDetail from "./components/record/CellDetail";
import LogReg from './components/global/Log&Reg';
import MyInfo from './components/mine/MyInfo';
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
                  key="classify"
                  component={Classify}
                  title="图片分类"
              />
            </Scene>

            {/* Tab and it's scenes */}
            <Scene key="my" title="我" icon={TabIcon}>
              <Modal
                  key="myInfo"
                  component={MyInfo}
                  title="我的"
                  titleStyle={{flex:1,textAlign:'center'}}
              />
            </Scene>
          </Tabs>
          <Scene
              key="logreg"
              component={LogReg}
              title={"登录"}
              hideNavBar
          />
        </Scene>
      </Router>
  );
}

export default App;

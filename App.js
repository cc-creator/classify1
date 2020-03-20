import React,{Component} from 'react';
import {Text} from 'react-native';
import Classify from './components/Classify';
import { Router, Scene, Tabs } from 'react-native-router-flux';
import ScarletScreen from './components/ScarletScreen';
import GrayScreen from './components/GrayScreen';
import BlueScreen from './components/BlueScreen';
import BlackScreen from './components/BlackScreen';

const TabIcon = ({ focused, title }) => {

  return (
      <Text style={{color: focused ? 'red' : 'black'}}>{title}</Text>
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
                  key="tftest"
                  component={ScarletScreen}
                  title="Scarlet"
              />
              <Scene
                  key="gray"
                  component={GrayScreen}
                  title="Gray"
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
                  key="blue"
                  component={BlueScreen}
                  title="blue"
              />
              <Scene
                  key="black"
                  component={BlackScreen}
                  title="black"
              />
            </Scene>

          </Tabs>
        </Scene>
      </Router>
  );
}

export default App;

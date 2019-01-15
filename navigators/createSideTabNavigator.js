import React from "react";
import { View, StyleSheet } from "react-native";
import { polyfill } from 'react-lifecycles-compat';
import { ScreenContainer } from 'react-native-screens';

import createTabNavigator from './createTabNavigator'
import ResourceSavingScene from '../views/ResourceSavingScene'
import SideTabBar from '../views/SideTabBar'


class SideBarView extends React.Component {
  static defaultProps = {
    lazy: true
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { index } = nextProps.navigation.state;

    return {
      // Set the current tab to be loaded if it was not loaded before
      loaded: prevState.loaded.includes(index) ? prevState.loaded : [...prevState.loaded, index]
    };
  }

  state = {
    loaded: [this.props.navigation.state.index]
  };

  _jumpTo = key => {
    const { navigation, onIndexChange } = this.props;

    const index = navigation.state.routes.findIndex(route => route.key === key);

    onIndexChange(index);
  };

  _renderTabBar = () => {
    const {
      tabBarComponent: TabBarComponent = SideTabBar,
    } = this.props;

    const { descriptors, navigation } = this.props;
    const { state } = this.props.navigation;
    const route = state.routes[state.index];
    const descriptor = descriptors[route.key];
    const options = descriptor.options;

    if (options.tabBarVisible === false) {
      return null;
    }

    return <TabBarComponent jumpTo={this._jumpTo} navigation={navigation} />
  };

  render() {
    const { navigation, renderScene, lazy } = this.props;
    const { routes } = navigation.state;
    const { loaded } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {this._renderTabBar()}
        <ScreenContainer style={styles.pages}>
          {routes.map((route, index) => {
            if (lazy && !loaded.includes(index)) {
              // Don't render a screen if we've never navigated to it
              return null;
            }
            const isFocused = navigation.state.index === index;

            return <ResourceSavingScene key={route.key} style={StyleSheet.absoluteFill} isVisible={isFocused}>
              {renderScene({ route })}
            </ResourceSavingScene>;
          })}
        </ScreenContainer>
      </View>
    )
  }
}

polyfill(SideBarView);

export default createTabNavigator(SideBarView)

const styles = {
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  pages: {
    flex: 1
  }
}
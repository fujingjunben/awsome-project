/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { Image, View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, TabRouter, createNavigator, StackRouter } from "react-navigation";
import createSideTabNavigator from './navigators/createSideTabNavigator'

const ScreenTable = {
  Home: 'home',
  Details: 'details',
}

const LabelTable = {
  Home: '首页',
  Details: '详情',
}

const NavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e', // 标题栏背景颜色
    },
    headerTintColor: '#fff', // 文字颜色
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  },
  navigationOptions: {
    tabBarLabel: 'HOME!',
  },
}

class SettingScreen extends React.Component {
  constructor(props) {
    super(props)
    console.log("SettingScreen init")
  }

  componentWillMount() {
    console.log("SettingScreen will mount")
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SettingScreen</Text>
        <Button title="go to profile"
          onPress={() => this.props.navigation.navigate('profile')}
        />
      </View>
    )
  }
}


class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    console.log("ProfileScreen init")
  }

  componentWillMount() {
    console.log("ProfileScreen will mount")
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>ProfileScreen</Text>
        <Button
          title="go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}



class ImageTitle extends React.Component {
  render() {
    return (
      < Image
        source={require('./images/title.png')}
        style={{ width: 30, height: 30, marginLeft: 15 }}
      />
    )
  }
}
class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    console.log("HomeScreen init")
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      // headerTitle: <ImageTitle />,
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount', () => alert('no callback'))}
          title="+1"
          color='#000'
        />
      ),
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('details')}
          title="info"
          color='#000'
        />
      )
    }
  }

  componentWillMount() {
    console.log("HomeScreen will mount")
  }

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount })
  }

  state = {
    count: 0
  }

  _increaseCount = () => {
    this.setState({
      count: Math.floor(Math.random() * 100),
    })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Text>count: {Math.floor(Math.random() * 100)}</Text>
        <Button
          title="go to Details"
          onPress={() => this.props.navigation.navigate('details', {
            "itemId": Math.floor(Math.random() * 100),
            "otherParams": "hello world"
          })}
        />
        <Button
          title="setting"
          onPress={() => this.props.navigation.navigate('setting')}
        />
      </View >
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    console.log("DetailsScreen init")
  }
  componentWillMount() {
    console.log("DetailsScreen will mount")
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: navigation.getParam('otherParams', 'from navigation'),
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    }
  }
  render() {
    const { navigation } = this.props
    const itemId = navigation.getParam('itemId', '-1')
    const otherParams = navigation.getParam('otherParams', 'default values')
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParams: {JSON.stringify(otherParams)}</Text>
        <Button
          title="go to Details again"
          onPress={() => this.props.navigation.push('details',
            {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="go to Home"
          onPress={() => this.props.navigation.navigate('home')}
        />
        <Button
          title="change title"
          onPress={() => this.props.navigation.setParams(
            {
              otherParams: "@_@"
            }
          )}
        />
      </View>
    );
  }
}


const HomeStack = createStackNavigator(
  {
    home: HomeScreen,
    details: DetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e', // 标题栏背景颜色
      },
      headerTintColor: '#fff', // 文字颜色
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    },
    navigationOptions: {
      tabBarLabel: 'HOME!',
    },
    headerMode: 'none'
  }
)

const SettingStack = createStackNavigator(
  {
    setting: SettingScreen,
    profile: ProfileScreen
  }
)



const MainRoutes = {
  home: {
    screen: HomeScreen
  },
  details: {
    screen: DetailsScreen
  },
}

class SideBar extends React.Component {
  render() {
    const { navigation } = this.props
    const { routes } = navigation.state;
    return (
      <View style={styles.sideBarContainer}>
        <View style={styles.sideBarContent}>
          {routes.map(route =>
            (
              <TouchableOpacity
                onPress={() => {
                  console.log("导航：" + route.routeName)
                  navigation.navigate(route.routeName)
                }
                }
                style={styles.sideBarTab}
                key={route.routeName}
              >
                <Text>{route.routeName}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    )
  }
}

class SideBarView extends React.Component {
  render() {
    const { navigation, renderScene } = this.props;
    const { routes, index } = navigation.state;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <SideBar navigation={navigation} />
        {/* <ActiveScreen navigation={descriptor.navigation} state={descriptor.state} /> */}
        <ScreenContainer style={styles.pages}>
          {routes.map((route, index) => {

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

const CustomTabRouter = TabRouter(MainRoutes,
  {
    defaultNavigationOptions: NavigationOptions.defaultNavigationOptions,
    headerMode: 'true'
  }
)

const CustomStackRouter = StackRouter(MainRoutes)


const BottomNavigator = createBottomTabNavigator(
  {
    home: HomeScreen,
    details: DetailsScreen
  },
  {
    initialRouteName: "home",
    defaultNavigationOptions: NavigationOptions.defaultNavigationOptions,
    headerMode: 'true'
  }
);
const SideBarNavigator = createSideTabNavigator(
  {
    home: HomeScreen,
    details: DetailsScreen
  },
  {
    initialRouteName: "home",
    defaultNavigationOptions: NavigationOptions.defaultNavigationOptions,
    headerMode: 'true'
  }
);
// const AppContainer = createAppContainer(createNavigator(SideBarView, CustomTabRouter, {}));
const AppContainer = createAppContainer(SideBarNavigator);

// const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = {
  sideBarContainer: {
    width: 100,
    height: '100%',
  },
  sideBarContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRightWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  sideBarTab: {
    padding: 16,
  },
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  pages: {
    flex: 1
  }
}
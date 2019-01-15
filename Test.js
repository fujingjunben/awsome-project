/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { Image, View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer, createTabNavigator, createBottomTabNavigator, tabBarOptions } from "react-navigation";

class SettingScreen extends React.Component {
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


const SettingStack = createStackNavigator(
  {
    setting: SettingScreen,
    profile: ProfileScreen
  }
)

const SettingContainer = createAppContainer(SettingStack)


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
          onPress={() => navigation.navigate('Modal')}
          title="info"
          color='#000'
        />
      )
    }
  }

  // constructor(props) {
  //   super(props)
  //   console.log("HomeScreen init")
  // }

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
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Text>count: {this.state.count}</Text>
        <Button
          title="go to Details"
          onPress={() => this.props.navigation.navigate('Details', {
            "itemId": 86,
            "otherParams": "hello world"
          })}
        />
        <Button
          title="setting"
          onPress={() => this.props.navigation.navigate('setting')}
        />
        <Button
          title="safe"
          onPress={() => this.props.navigation.navigate('safe')}
        />
      </View >
    );
  }
}

class DetailsScreen extends React.Component {
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
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
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

class SafeAreaExample extends React.Component {
  rendeor() {
    return (
      <View>
        <SafeAreaView forceInset={{ top: 'always' }}>
          <View>
            <Text>Yeah, I'm safe too!</Text>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>display modal</Text>
        <Button title="dismiss"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}



const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Safe: SafeAreaExample,
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
  }

)

const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Setting: SettingStack
  },
  {
    initialRouteName: "Home",
  }
);

const ModalNavigator = createStackNavigator(
  {
    Home: HomeStack,
  },
  {
    headerMode: 'none'
  }
)

const AppContainer = createAppContainer(ModalNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
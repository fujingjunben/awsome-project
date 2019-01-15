
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class SideTabBar extends React.Component {
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

export default SideTabBar


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
}
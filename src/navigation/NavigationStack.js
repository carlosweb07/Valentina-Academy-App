import React                    from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreem            from "../screens/LandingScreem"
import HomeScreem               from "../screens/HomeScreem"
import LoginScreem              from "../screens/LoginScreem"
import RegisterScreem           from "../screens/RegisterScreem"

const Stack = createStackNavigator();

export default function NavigationStack() {
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreem} />
            <Stack.Screen name="Home" component={HomeScreem} />
            <Stack.Screen name="Login" component={LoginScreem} />
            <Stack.Screen name="Register" component={RegisterScreem} />
        </Stack.Navigator>
    );
}
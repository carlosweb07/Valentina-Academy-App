import React from "react";
import { Button, Text, View} from "react-native";

export default function LandingScreem(props) {
    const {navigation} = props;

    const goToLogin = () => {
        navigation.navigate("Login")
    }

    const goToRegister = () => {
        navigation.navigate("Register")
    }
    
    return (
        <View>
            <Text>Hola Mundo XD</Text>
            <Button onPress={goToLogin} title="Login" />
            <Button onPress={goToRegister} title="Register" />
        </View>
    );
}
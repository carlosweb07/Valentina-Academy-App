import React from "react";
import {TextInput, Button, Text, View} from "react-native";

export default function LoginForm(props) {
    const {navigation} = props;

    const goToLanding = () => {
        navigation.navigate("Landing")
    }

    const goToRegister = () => {
        navigation.navigate("Register")
    }

    return (
        <View>
            <Text>Login:</Text>
            <TextInput placeholder="Correo"></TextInput>
            <TextInput placeholder="Contraseña"></TextInput>
            <Button title="Enviar" onPress={() => console.log("Enviado")}></Button>

            <Button onPress={goToLanding} title="Landing" />
            <Button onPress={goToRegister} title="Register" />
        </View>
    );
}
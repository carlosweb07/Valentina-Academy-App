import React from "react";
import {TextInput, Button, Text, View} from "react-native";

export default function RegisterScreem(props) {
    const {navigation} = props;

    const goToLanding = () => {
        navigation.navigate("Landing")
    }
    
    const goToLogin = () => {
        navigation.navigate("Login")
    }

    return (
        <View>
            <Text>Registro:</Text>
            <TextInput placeholder="Nombres"></TextInput>
            <TextInput placeholder="Apellidos"></TextInput>
            <TextInput placeholder="Genero"></TextInput>
            <TextInput placeholder="Pais"></TextInput>
            <TextInput placeholder="Correo"></TextInput>
            <TextInput placeholder="Contraseña"></TextInput>
            <TextInput placeholder="Confirmar la Contraseña"></TextInput>
            <Button title="Registrar" onPress={() => console.log("Registrado")}></Button>

            <Button onPress={goToLanding} title="Landing" />
            <Button onPress={goToLogin} title="Login" />
        </View>
    );
}
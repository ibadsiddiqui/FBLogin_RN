import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Text, TextInput } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

export default class HomeScreen extends Component {
    state = {
        dataOfFB: null,
        token: "Data",
        data: null
    }
    async getDataOfFB() {
        const response = await fetch(
            `https://graph.facebook.com/me?access_token=${this.state.token}&fields=id,name,email,about,picture`
        );
        this.setState({
            dataOfFB: JSON.stringify(await resposne.json())
        })
    }

    async onClick() {
        // error: any;
        // isCancelled: boolean;
        // grantedPermissions ?: Permissions[];
        // declinedPermissions ?: Permissions[];


        var token= await LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email'])
        // const { data, token } = LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
        this.setState({
            token: token,
        });
    }

    render() {
        return (
            <View>
                <LoginButton 
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                Alert.alert("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    async (data) => {
                                        this.setState({
                                            token: data.accessToken.toString()
                                        })
                                        // Alert.alert(data.accessToken.toString())
                                        const response = await fetch(
                                            `https://graph.facebook.com/me?access_token=${data.accessToken}&fields=id,name,email,about,picture`
                                        );
                                        this.setState({
                                            data: response._bodyText
                                        })
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => Alert.alert("logout.")} />
                <TouchableOpacity style={{ width: 100, backgroundColor: 'blue', borderWidth: 3, }} onPress={this.onClick}>
                    <Text>Press me to get FB data</Text>
                </TouchableOpacity>

                <Text >
                    {JSON.stringify(this.state.data)} 
                </Text>

            </View>
        );
    }
}
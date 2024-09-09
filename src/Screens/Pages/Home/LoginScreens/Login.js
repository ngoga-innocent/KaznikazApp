import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../components/Global";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SignIn } from "../../../../redux/Features/Account";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";
// import { AppleButton,appleAuth } from '@invertase/react-native-apple-authentication';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import {
//   Settings,
//   LoginButton,
//   LoginManager,
//   AccessToken,
// } from "react-native-fbsdk-next";
// import {
//   GoogleOneTapSignIn,
//   statusCodes,
//   isErrorWithCode,
//   GoogleSignin,
// } from "@react-native-google-signin/google-signin";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [appleLoginAvailable,setAppleLoginAvailable]=useState(false)
useEffect(()=>{
  async function checkAvailability(){
        // const isAvailble=await AppleAuthentication.isAvailableAsync();
        // setAppleLoginAvailable(isAvailble);
        // console.log(isAvailble);
  }
  checkAvailability();
},[])

  useEffect(() => {
    async function GetToken() {
      const token = await AsyncStorage.getItem("token");
      // console.log(token);
      if (token != null) {
        navigation.navigate("BottomTab");
      }
    }
    GetToken();
  }, []);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [loginError, setLoginError] = useState();
  ////////Login Function ///////
  const { LoginSuccess, loading, isError, errorMessage } = useSelector(
    (state) => state.Account
  );
  const GoogleSigninFunction = async () => {
    // try {
    //   GoogleSignin.configure({
    //     webClientId:
    //     "139154356857-mpo6g1bva20ou9qln8s6r45t16li0nhp.apps.googleusercontent.com",
    //       // "850627398929-be3d8jqne5c4j59c0pqe59uftr3p4qmv.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    //     scopes: ["profile"], // what API you want to access on behalf of the user, default is email and profile
    //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //     hostedDomain: "", // specifies a hosted domain restriction
    //     forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //   });
    //   await GoogleSignin.hasPlayServices();

    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(userInfo);
    //   // Alert.alert(userInfo);
    //   if (userInfo?.idToken) {
    //     const result = await dispatch(
    //       SignIn({
    //         username: userInfo.user.givenName.split(" ")[0],
    //         password: userInfo.user.email + "@" + userInfo.user.familyName,
    //       })
    //     );
    //     if (SignIn.fulfilled.match(result)) {
    //       navigation.navigate("BottomTab");
    //     } else if (SignIn.rejected.match(result)) {
    //       Alert.alert(
    //         "This Account is not registered on KazniKaz please Register Your Account"
    //       );
    //     }
    //   } else {
    //     Alert.alert("Failed to Login account");
    //   }
    // } catch (error) {
    //   if (isErrorWithCode(error)) {
    //     console.log(error);
    //   } else {
    //     console.log(error);
    //     // an error that's not related to google sign in occurred
    //   }
    // }
  };
  ///aPPLE lOGIN
  // async function onAppleButtonPress() {
  //   // Start the sign-in request
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
  //     // See: https://github.com/invertase/react-native-apple-authentication#faqs
  //     requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  //   });
  
  //   // Ensure Apple returned a user identityToken
  //   if (!appleAuthRequestResponse.identityToken) {
  //     throw new Error('Apple Sign-In failed - no identify token returned');
  //   }
  
  //   // Create a Firebase credential from the response
  //   const { identityToken, nonce } = appleAuthRequestResponse;
  //   console.log(appleAuthRequestResponse)
  // }
  // // Facebook Login /////////////
  // const FaceBookLogin = async () => {
  //   await LoginManager.logInWithPermissions(["public_profile", "email"]);
  //   const result = await AccessToken.getCurrentAccessToken();
  //   console.log(result);
  // };
  // // Helper function to check if an error object has a code property
  // const isErrorWithCode = (error) => {
  //   return error && error.code;
  // };

  //console.log(LoginSuccess);
  useEffect(() => {
    if (LoginSuccess) {
      navigation.navigate("BottomTab");
    }
  }, [LoginSuccess, navigation]);
  const LoginFunction = async () => {
    if (username !== "" && password !== "") {
      const result = await dispatch(
        SignIn({ username: username, password: password })
      );
      if (SignIn.fulfilled.match(result)) {
        navigation.navigate("BottomTab");
      } else if (SignIn.rejected.match(result)) {
        Alert.alert(
          "This Account is not registered on KazniKaz please Register Your Account"
        );
      }
    } else {
      Alert.alert("Fill the empty fields to continue ");
    }
  };
  return (
    <ScrollView
      className="flex-1 flex flex-col px-8 "
      contentContainerStyle={{ justifyContent: "center", flex: 1 }}
    >
      <Spinner visible={loading} color={Colors.appColor} size={30} />
      <View className="z-50">
        <Toast />
      </View>
      <TouchableOpacity
        className="self-end "
        onPress={() => navigation.navigate("BottomTab")}
      >
        <Text className="font-bold">Skip</Text>
      </TouchableOpacity>
      <View className="w-full justify-center flex flex-col ">
        <View className="py-7 pt-20">
          <Text className="text-3xl font-bold">Logins</Text>
        </View>
        <View className="py-4 my-2">
          {errorMessage !== "" && (
            <Text className="text-orange-700 font-bold">{errorMessage}</Text>
          )}
          <View className="bg-white rounded-md my-2 z-10 shadow-md  px-4 py-1 flex-row justify-between items-center">
            <View>
              <Text className="text-gray-400">Username or Email</Text>
              <TextInput
                className=" "
                value={username}
                onChangeText={(e) => setUsername(e)}
              />
            </View>
            {username && (
              <AntDesign name="checkcircle" size={24} color={Colors.appColor} />
            )}
          </View>
          {/* password */}
          <View className="bg-white rounded-md my-1 z-10 shadow-md shadow-black px-4 py-1 flex-row justify-between items-center">
            <View>
              <Text className="text-gray-400">Password</Text>
              <TextInput
                className=" "
                secureTextEntry={secureTextEntry}
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
            </View>

            <View className="flex flex-row gap-x-2">
              {password !== "" && (
                <AntDesign
                  name="checkcircle"
                  size={24}
                  color={Colors.appColor}
                />
              )}
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <AntDesign name="eye" size={30} color={Colors.appColor} />
              </TouchableOpacity>
            </View>
          </View>
          {isError && (
            <Text className="text-orange-400 font-bold text-center ">
              {errorMessage}
            </Text>
          )}
          <TouchableOpacity className="self-end my-2 flex-row items-center">
            <Text className="text-gray-400">Forgot your password</Text>
            <TouchableOpacity>
              <Feather name="arrow-right" size={24} color={Colors.appColor} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => LoginFunction()}
          className="py-3 rounded-full bg-appColor items-center"
        >
          <Text className="font-bold text-white">Sign In</Text>
        </TouchableOpacity>
        <View className="mt-14 items-center place-self-end justify-end">
          <Text className="text-gray-400">Or Login with Social Media</Text>
          <View className="flex flex-row gap-x-2 my-2">
            <TouchableOpacity
              onPress={() => GoogleSigninFunction()}
              className="bg-white w-14 h-14 items-center justify-center rounded-lg"
            >
              <Image
                source={require("../../../../../assets/icons/google.png")}
                resizeMode="contain"
                className="rounded-md h-8 w-8"
              />
            </TouchableOpacity>
            {/* <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160,
        height: 45,
      }}
      onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
    /> */}
            {/* <TouchableOpacity
              onPress={() => FaceBookLogin()}
              className="bg-white w-14 h-14 items-center justify-center rounded-lg"
            >
              <Image
                resizeMode="contain"
                className="rounded-md h-8 w-8"
                source={require("../../../../../assets/icons/facebook.png")}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View className="flex flex-row items-center self-center gap-x-2 flex-end mt-7">
          <Text className="text-gray-500">New To Kaz ni Kaz?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            className=""
          >
            <Text className="font-bold text-appColor">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
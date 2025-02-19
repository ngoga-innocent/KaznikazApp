import React,{useEffect} from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../../components/Functions/ThemeProvider";
import { Colors } from "../../components/Global";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { UpdateOnlineStatus } from "../../../redux/Features/Account";
import {useSafeAreaInsets} from 'react-native-safe-area-context'
export default Header = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(UpdateOnlineStatus());
    console.log('dispatched')
  },[]);
  const inset=useSafeAreaInsets()
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const { wallet } = useSelector((state) => state.Wallet);
  // console.log(wallet)
  const { height } = Dimensions.get("screen");
  const navigation = useNavigation();
  async function SchedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You have successfully scheduled Mail",
        body: "Here is your notification body",
        data: { data: "Goes Here", url: "KazniKaz://logins" },
      },
      trigger: { seconds: 4 },
    });
  }
  return (
    <View className="bg-white" style={{paddingTop:inset.top }}>
      <View
        className={` flex-row justify-between items-center  mb-2 ${
          isDarkMode ? "bg-darkcolor" : "bg-white"
        } px-2 rounded-lg py-2 `}
      >
        <Image
          source={require("../../../../assets/icon.png")}
          resizeMode="contain"
          className="w-14 h-14"
        />
        <Text
          className={`${isDarkMode ? "text-white" : null} text-2xl font-bold`}
        >
          Kaz Ni kaz
        </Text>
        {/* <TouchableOpacity onPress={() => SchedulePushNotification()}>
          <Text>Notification</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          className="items-center"
          onPress={() =>
            navigation.navigate("BottomTab", {
              screen: "wallet",
            })
          }
        >
          <FontAwesome6 name="coins" size={30} color={Colors.appColor} />
          <Text
            className={`text-sm font-bold ${isDarkMode ? "text-white" : null}`}
          >
            {wallet?.amount} Rwf
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";

const settings = () => {
  return (
    <SafeAreaView>
      <Text>Settings</Text>

      <TouchableOpacity

      style={{
        marginTop: 20,
        padding: 10,
        backgroundColor: "#14F195",
        borderRadius: 5,
        }}

        
        onPress={() => {
          console.log("pressed");
        }}
      >
        <Text>My Orders</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default settings;

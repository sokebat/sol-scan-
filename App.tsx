import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WalletScreen } from "./src/screens/WalletScreen";
import { SwapScreen } from "./src/screens/SwapScreen";

export default function App() {
  const [activeTab, setActiveTab] = useState<"wallet" | "swap">("wallet");

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={s.safe}>
        {/* Screen Content */}
        <View style={s.container}>
          {activeTab === "wallet" ? <WalletScreen /> : <SwapScreen />}
        </View>

        {/* Bottom Tab Bar */}
        <View style={s.tabBar}>
          <TouchableOpacity
            style={s.tab}
            onPress={() => setActiveTab("wallet")}
            activeOpacity={0.7}
          >
            <Ionicons
              name={activeTab === "wallet" ? "wallet" : "wallet-outline"}
              size={24}
              color={activeTab === "wallet" ? "#14F195" : "#6B7280"}
            />
            <Text style={[s.tabLabel, activeTab === "wallet" && s.tabActive]}>
              Wallet
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.tab}
            onPress={() => setActiveTab("swap")}
            activeOpacity={0.7}
          >
            <Ionicons
              name={activeTab === "swap" ? "swap-horizontal" : "swap-horizontal-outline"}
              size={24}
              color={activeTab === "swap" ? "#14F195" : "#6B7280"}
            />
            <Text style={[s.tabLabel, activeTab === "swap" && s.tabActive]}>
              Swap
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D0D12",
  },
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#16161D",
    borderTopWidth: 1,
    borderTopColor: "#2A2A35",
    paddingBottom: 10,
    paddingTop: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "600",
  },
  tabActive: {
    color: "#14F195",
  },
});
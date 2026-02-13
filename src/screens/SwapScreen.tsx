import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSwap } from "../hooks/useSwap";

export function SwapScreen() {
    const {
        fromAmount,
        setFromAmount,
        toAmount,
        setToAmount,
        fromToken,
        toToken,
        swapTokens,
        handleSwap
    } = useSwap();

    return (
        <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
            <Text style={s.title}>Swap Tokens</Text>

            {/* From Token Card */}
            <View style={[s.card, { marginBottom: 10 }]}>
                <View style={s.cardHeader}>
                    <TouchableOpacity style={s.tokenSelector}>
                        <View style={[s.tokenIcon, { backgroundColor: fromToken === "SOL" ? "#9945FF" : "#2775CA" }]}>
                            <Text style={s.tokenIconText}>{fromToken === "SOL" ? "S" : "$"}</Text>
                        </View>
                        <Text style={s.tokenName}>{fromToken}</Text>
                        <Ionicons name="chevron-down" size={18} color="#888" />
                    </TouchableOpacity>
                    <TextInput
                        style={s.amountInput}
                        value={fromAmount}
                        onChangeText={setFromAmount}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor="#666"
                    />
                </View>
                <View style={s.cardFooter}>
                    <Text style={s.balanceText}>Balance: 0.0661 {fromToken}</Text>
                    <Text style={s.usdText}>$499.749</Text>
                </View>
            </View>

            {/* Swap Arrow */}
            <View style={s.arrowContainer}>
                <TouchableOpacity style={s.swapArrow} onPress={swapTokens}>
                    <Ionicons name="swap-vertical" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* To Token Card */}
            <View style={s.card}>
                <View style={s.cardHeader}>
                    <TouchableOpacity style={s.tokenSelector}>
                        <View style={[s.tokenIcon, { backgroundColor: toToken === "SOL" ? "#9945FF" : "#2775CA" }]}>
                            <Text style={s.tokenIconText}>{toToken === "SOL" ? "S" : "$"}</Text>
                        </View>
                        <Text style={s.tokenName}>{toToken}</Text>
                        <Ionicons name="chevron-down" size={18} color="#888" />
                    </TouchableOpacity>
                    <TextInput
                        style={s.amountInput}
                        value={toAmount}
                        onChangeText={setToAmount}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor="#666"
                    />
                </View>
                <View style={s.cardFooter}>
                    <Text style={s.balanceText}>Balance: 250 {toToken}</Text>
                    <Text style={s.usdText}>$499.419</Text>
                </View>
            </View>

            {/* Swap Button */}
            <TouchableOpacity style={s.swapBtn} onPress={handleSwap}>
                <Text style={s.swapBtnText}>Swap</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const s = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: "#0D0D12",
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "900",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#16161D",
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: "#2A2A35",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tokenSelector: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#252530",
        paddingLeft: 8,
        paddingRight: 14,
        paddingVertical: 10,
        borderRadius: 24,
        gap: 8,
    },
    tokenIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    tokenIconText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    tokenName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    amountInput: {
        fontSize: 36,
        fontWeight: "600",
        color: "#FFFFFF",
        textAlign: "right",
        flex: 1,
        marginLeft: 10,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 14,
    },
    balanceText: {
        fontSize: 13,
        color: "#6B7281",
        fontWeight: "500",
    },
    usdText: {
        fontSize: 13,
        color: "#6B7281",
        fontWeight: "500",
    },
    arrowContainer: {
        alignItems: "center",
        marginVertical: -24,
        zIndex: 10,
    },
    swapArrow: {
        backgroundColor: "#16161D",
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        borderColor: "#0D0D12",
    },
    swapBtn: {
        backgroundColor: "#14F195",
        paddingVertical: 20,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 24,
    },
    swapBtnText: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "800",
    },
});
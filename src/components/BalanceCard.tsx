import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../theme/colors";

interface BalanceCardProps {
    balance: number;
    address: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, address }) => {
    const shortAddress = (s: string) => `${s.slice(0, 8)}...${s.slice(-8)}`;

    return (
        <LinearGradient
            colors={Colors.cardGradient as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.info}>
                <Text style={styles.label}>TOTAL BALANCE</Text>
                <View style={styles.balanceRow}>
                    <Text style={styles.balanceVal}>
                        {balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </Text>
                    <Text style={styles.solUnit}>SOL</Text>
                </View>
                <Text style={styles.addressText}>{shortAddress(address)}</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    info: {
        alignItems: "center",
    },
    label: {
        color: Colors.textMuted,
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 2,
        marginBottom: 8,
    },
    balanceRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 4,
    },
    balanceVal: {
        fontSize: 42,
        fontWeight: "800",
        color: Colors.text,
    },
    solUnit: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.primary,
        marginLeft: 8,
        marginBottom: 8,
    },
    addressText: {
        fontSize: 13,
        color: Colors.textDim,
        fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    },
});

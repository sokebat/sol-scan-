import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

interface TokenItemProps {
    mint: string;
    amount: number;
}

export const TokenItem: React.FC<TokenItemProps> = ({ mint, amount }) => {
    const short = (s: string) => `${s.slice(0, 6)}...${s.slice(-6)}`;

    return (
        <View style={styles.card}>
            <View style={styles.tokenIcon}>
                <Text style={styles.tokenSymbol}>{mint.slice(0, 1).toUpperCase()}</Text>
            </View>
            <View style={styles.tokenInfo}>
                <Text style={styles.mintAddr}>{short(mint)}</Text>
                <Text style={styles.tokenAmount}>{amount.toLocaleString()} Tokens</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.surface,
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    tokenIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.border,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    tokenSymbol: {
        color: Colors.primary,
        fontWeight: "700",
    },
    tokenInfo: {
        flex: 1,
    },
    mintAddr: {
        color: Colors.text,
        fontWeight: "600",
        fontSize: 15,
    },
    tokenAmount: {
        color: Colors.textMuted,
        fontSize: 13,
    },
});

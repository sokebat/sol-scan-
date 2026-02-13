import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Colors } from "../theme/colors";

interface TransactionItemProps {
    sig: string;
    time: number | null;
    ok: boolean;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ sig, time, ok }) => {
    const short = (s: string) => `${s.slice(0, 10)}...${s.slice(-10)}`;

    const timeAgo = (ts: number | null) => {
        if (!ts) return "Unknown";
        const s = Math.floor(Date.now() / 1000 - ts);
        if (s < 60) return `${s}s ago`;
        if (s < 3600) return `${Math.floor(s / 60)}m ago`;
        if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
        return `${Math.floor(s / 86400)}d ago`;
    };

    const openInSolscan = () => {
        Linking.openURL(`https://solscan.io/tx/${sig}`);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={openInSolscan}>
            <View style={[styles.statusDot, { backgroundColor: ok ? Colors.success : Colors.error }]} />
            <View style={styles.txnInfo}>
                <Text style={styles.sigText}>{short(sig)}</Text>
                <Text style={styles.timeText}>{timeAgo(time)}</Text>
            </View>
            <Text style={[styles.statusText, { color: ok ? Colors.success : Colors.error }]}>
                {ok ? "SUCCESS" : "FAILED"}
            </Text>
        </TouchableOpacity>
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
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 12,
    },
    txnInfo: {
        flex: 1,
    },
    sigText: {
        color: Colors.text,
        fontWeight: "600",
        fontSize: 14,
    },
    timeText: {
        color: Colors.textDim,
        fontSize: 12,
        marginTop: 2,
    },
    statusText: {
        fontSize: 10,
        fontWeight: "800",
    },
});

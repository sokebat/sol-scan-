import React from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

interface SearchInputProps {
    value: string;
    onChangeText: (text: string) => void;
    onSearch: () => void;
    loading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText, onSearch, loading }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Solana wallet address..."
                placeholderTextColor={Colors.textDim}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity style={styles.btn} onPress={onSearch} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#000" size="small" />
                ) : (
                    <Text style={styles.btnText}>Search</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: Colors.surfaceLight,
        borderRadius: 16,
        padding: 6,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.border,
    },
    input: {
        flex: 1,
        color: Colors.text,
        paddingHorizontal: 16,
        fontSize: 15,
        height: 44,
    },
    btn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "#000",
        fontWeight: "700",
        fontSize: 14,
    },
});

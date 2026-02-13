import { useState } from "react";
import { Alert } from "react-native";

export function useSwap() {
  const [fromAmount, setFromAmount] = useState("100");
  const [toAmount, setToAmount] = useState("0.28014");
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("SOL");

  const swapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;

    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = () => {
    if (!fromAmount) {
      Alert.alert("Enter an amount");
      return;
    }
    Alert.alert(
      "Swap",
      `Swapping ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`,
    );
  };

  return {
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    swapTokens,
    handleSwap,
  };
}

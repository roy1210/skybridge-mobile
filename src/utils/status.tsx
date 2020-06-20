import { TxStatus } from "../state/explorer/types";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import React from "react";
import { Colors } from "../data/colors";

export const statusText = (status: string, size: string): JSX.Element => {
  switch (status) {
    case TxStatus.COMPLETED:
      return (
        <Text category={size} style={styles.completed}>
          {status}
        </Text>
      );
    case TxStatus.CANCELED:
      return (
        <Text category={size} style={styles.canceled}>
          {status}
        </Text>
      );
    case TxStatus.BROADCASTED:
      return (
        <Text category={size} style={styles.broadcasted}>
          {status}
        </Text>
      );
    case TxStatus.SENDING:
      return (
        <Text category={size} style={styles.sending}>
          {status}
        </Text>
      );
    case TxStatus.SENT:
      return (
        <Text category={size} style={styles.sent}>
          {status}
        </Text>
      );
    case TxStatus.PENDING:
      return (
        <Text category={size} style={styles.pending}>
          {status}
        </Text>
      );
    case TxStatus.SIGNING:
      return (
        <Text category={size} style={styles.signing}>
          {status}
        </Text>
      );
    case TxStatus.REFUNDING:
      return (
        <Text category={size} style={styles.refunding}>
          {status}
        </Text>
      );
    case TxStatus.SIGNING_REFUND:
      return (
        <Text category={size} style={styles.refund}>
          {status}
        </Text>
      );
    case TxStatus.REFUNDED:
      return (
        <Text category={size} style={styles.refunded}>
          {status}
        </Text>
      );
    case TxStatus.SENDING_REFUND:
      return (
        <Text category={size} style={styles.sendingRefund}>
          {status}
        </Text>
      );
    default:
      return <Text category={size}>{status}</Text>;
  }
};

const styles = StyleSheet.create({
  completed: {
    color: Colors.green,
  },
  canceled: {
    color: Colors.pink,
  },
  broadcasted: {
    color: Colors.green,
  },
  sending: {
    color: Colors.green,
  },
  sent: {
    color: Colors.green,
  },
  pending: {
    color: Colors.lightOrange,
  },
  signing: {
    color: Colors.teal,
  },
  refunding: {
    color: Colors.pink,
  },
  refund: {
    color: Colors.red,
  },
  refunded: {
    color: Colors.red,
  },
  sendingRefund: {
    color: Colors.red,
  },
});

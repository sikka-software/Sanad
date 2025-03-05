"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { Client, Invoice } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: 100,
    fontWeight: "bold",
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  description: {
    flex: 2,
  },
  quantity: {
    flex: 1,
    textAlign: "center",
  },
  price: {
    flex: 1,
    textAlign: "right",
  },
  total: {
    marginTop: 20,
    textAlign: "right",
  },
  notes: {
    marginTop: 30,
    fontSize: 10,
    color: "#666",
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
  client: Client;
}

export function InvoicePDF({ invoice, client }: InvoicePDFProps) {
  const total = invoice.products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text>{invoice.invoiceNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>Bill To:</Text>
          <Text>{client.name}</Text>
          <Text>{client.company}</Text>
          <Text>{client.address}</Text>
          <Text>
            {client.city}, {client.state} {client.zipCode}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text>{format(invoice.date, "MMMM dd, yyyy")}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Due Date:</Text>
            <Text>{format(invoice.dueDate, "MMMM dd, yyyy")}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.quantity}>Quantity</Text>
            <Text style={styles.price}>Price</Text>
            <Text style={styles.price}>Amount</Text>
          </View>
          {invoice.products.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.quantity}>{product.quantity}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              <Text style={styles.price}>
                ${(product.quantity * product.price).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text style={{ fontWeight: "bold" }}>
            Total: ${total.toFixed(2)}
          </Text>
        </View>

        {invoice.notes && (
          <View style={styles.notes}>
            <Text style={{ marginBottom: 5 }}>Notes:</Text>
            <Text>{invoice.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
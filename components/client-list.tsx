"use client";

import { useState } from "react";
import { Client } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { InvoiceDialog } from "@/components/invoice-dialog";

interface ClientListProps {
  clients: Client[];
}

export function ClientList({ clients }: ClientListProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const handleCreateInvoice = (client: Client) => {
    setSelectedClient(client);
    setIsInvoiceOpen(true);
  };

  if (clients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No clients added yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => (
        <Card key={client.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{client.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCreateInvoice(client)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Company:</strong> {client.company}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {client.email}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> {client.phone}
              </p>
              <p className="text-sm">
                <strong>Address:</strong> {client.address}, {client.city},{" "}
                {client.state} {client.zipCode}
              </p>
              {client.notes && (
                <p className="text-sm">
                  <strong>Notes:</strong> {client.notes}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      {selectedClient && (
        <InvoiceDialog
          client={selectedClient}
          open={isInvoiceOpen}
          onOpenChange={setIsInvoiceOpen}
        />
      )}
    </div>
  );
}
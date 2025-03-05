"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ClientDialog } from "@/components/client-dialog";
import { ClientList } from "@/components/client-list";
import { Client } from "@/lib/types";

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addClient = (client: Client) => {
    setClients([...clients, { ...client, id: Math.random().toString() }]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Client Management</h1>
        <Button onClick={() => setIsOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <ClientList clients={clients} />
      <ClientDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={addClient}
      />
    </div>
  );
}
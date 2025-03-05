"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ClientDialog } from "@/components/client-dialog";
import { ClientList } from "@/components/client-list";
import { useClients } from "@/hooks/use-clients";
import { useAuth } from "@/hooks/use-auth";
import type { Client } from "@/lib/types";
import type { Database } from "@/lib/database.types";

type DbClient = Database['public']['Tables']['clients']['Row'];

function mapDbClientToClient(dbClient: DbClient): Client {
  return {
    id: dbClient.id,
    name: dbClient.name,
    email: dbClient.email,
    phone: dbClient.phone,
    company: dbClient.company,
    address: dbClient.address,
    city: dbClient.city,
    state: dbClient.state,
    zipCode: dbClient.zip_code,
    notes: dbClient.notes || undefined,
  };
}

function mapClientToDbClient(client: Omit<Client, 'id'>, userId: string): Omit<DbClient, 'id' | 'created_at'> {
  return {
    name: client.name,
    email: client.email,
    phone: client.phone,
    company: client.company,
    address: client.address,
    city: client.city,
    state: client.state,
    zip_code: client.zipCode,
    notes: client.notes || null,
    user_id: userId,
  };
}

export default function Home() {
  const { session } = useAuth();
  const { clients, isLoading, insertClient } = useClients();
  const [isOpen, setIsOpen] = useState(false);

  const addClient = async (data: Omit<Client, 'id'>) => {
    if (!session?.user) return;
    
    await insertClient.mutateAsync(mapClientToDbClient(data, session.user.id));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Client Management</h1>
        <Button onClick={() => setIsOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <ClientList clients={clients?.map(mapDbClientToClient) || []} />

      <ClientDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={addClient}
      />
    </div>
  );
}

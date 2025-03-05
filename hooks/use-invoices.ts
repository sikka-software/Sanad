import {
  useSupabaseQuery,
  useSupabaseInsert,
  useSupabaseUpdate,
  useSupabaseDelete,
} from "./use-supabase-query";
import type { Database } from "@/lib/database.types";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type InvoiceInsert = Database["public"]["Tables"]["invoices"]["Insert"];
type InvoiceUpdate = Database["public"]["Tables"]["invoices"]["Update"];
type InvoiceItem = Database["public"]["Tables"]["invoice_items"]["Row"];
type InvoiceItemInsert =
  Database["public"]["Tables"]["invoice_items"]["Insert"];

export function useInvoices(clientId?: string) {
  const { data: invoices, isLoading } = useSupabaseQuery<Invoice>(
    ["invoices", clientId],
    "invoices",
    {
      select: "*, clients(name, email, company)",
      filter: clientId ? { client_id: clientId } : undefined,
    }
  );

  const { data: invoiceItems } = useSupabaseQuery<InvoiceItem>(
    ["invoice_items", invoices?.map((i) => i.id)],
    "invoice_items",
    {
      select: "*",
      filter: invoices?.length
        ? { invoice_id: { in: invoices.map((i) => i.id) } }
        : undefined,
    }
  );

  const insertInvoice = useSupabaseInsert<InvoiceInsert>("invoices");
  const updateInvoice = useSupabaseUpdate<InvoiceUpdate>("invoices");
  const deleteInvoice = useSupabaseDelete("invoices");
  const insertInvoiceItem =
    useSupabaseInsert<InvoiceItemInsert>("invoice_items");

  const createInvoiceWithItems = async (
    data: Omit<InvoiceInsert, "user_id"> & {
      items: Array<Omit<InvoiceItemInsert, "invoice_id">>;
    }
  ) => {
    const { items, ...invoiceData } = data;
    const invoice = await insertInvoice.mutateAsync(invoiceData);

    if (invoice) {
      await Promise.all(
        items.map((item) =>
          insertInvoiceItem.mutateAsync({
            ...item,
            invoice_id: invoice.id,
          })
        )
      );
    }

    return invoice;
  };

  return {
    invoices,
    invoiceItems,
    isLoading,
    insertInvoice,
    updateInvoice,
    deleteInvoice,
    insertInvoiceItem,
    createInvoiceWithItems,
  };
}

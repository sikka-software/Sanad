"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Client, Invoice, invoiceSchema, Product } from "@/lib/types";
import { InvoicePDF } from "@/components/invoice-pdf";
import { PDFViewer } from "@react-pdf/renderer";

interface InvoiceDialogProps {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceDialog({
  client,
  open,
  onOpenChange,
}: InvoiceDialogProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const form = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientId: client.id,
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
      date: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      products: [],
      notes: "",
    },
  });

  const addProduct = () => {
    setProducts([...products, { description: "", quantity: 1, price: 0 }]);
  };

  const updateProduct = (index: number, field: keyof Product, value: any) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]:
        field === "quantity" || field === "price" ? Number(value) : value,
    };
    setProducts(updatedProducts);
  };

  const handlePreview = () => {
    const formData = form.getValues();
    if (products.length === 0) {
      toast.error("Please add at least one product");
      return;
    }
    formData.products = products;
    setShowPreview(true);
  };

  const handleSubmit = (data: Invoice) => {
    // Here you would typically save the invoice to your backend
    toast.success("Invoice generated successfully!");
    onOpenChange(false);
  };

  if (showPreview) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[800px] h-[800px]">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
          </DialogHeader>
          <PDFViewer width="100%" height="100%">
            <InvoicePDF
              invoice={{ ...form.getValues(), products }}
              client={client}
            />
          </PDFViewer>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Edit
            </Button>
            <Button onClick={form.handleSubmit(handleSubmit)}>
              Generate PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={format(field.value, "yyyy-MM-dd")}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Products</h3>
                <Button type="button" variant="outline" onClick={addProduct}>
                  Add Product
                </Button>
              </div>
              {products.map((product, index) => (
                <div key={index} className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <Input
                      placeholder="Description"
                      value={product.description}
                      onChange={(e) =>
                        updateProduct(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProduct(index, "quantity", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      placeholder="Price"
                      value={product.price}
                      onChange={(e) =>
                        updateProduct(index, "price", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes for the invoice..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handlePreview}>
                Preview Invoice
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

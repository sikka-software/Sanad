import { MultiLangString } from "@/types/common.type";
import { ClientProps } from "@/types/client.type";
import { CommentProps } from "@/types/comment.type";
import { InvoiceProps } from "@/types/invoice.type";
import { NoteProps } from "@/types/note.type";

export type CompanyProps = {
  _id?: string;
  name: MultiLangString;
  description: MultiLangString;
  invoices: InvoiceProps[];
  primary?: boolean;
  vat_number: string;
  website: string;
  cr_number: string;
  client: ClientProps | string;
  industry?: string;

  address: {
    street?: string;
    district?: string;
    building?: string;
    city?: string;
    state?: string;
    province?: string;
    postal_code?: string;
    zip_code?: string;
    country?: string;
  };

  contact_info: {
    mobile_phone?: string;
    office_phone?: string;
    support_email?: string;
    sales_email?: string;
  };

  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };

  note?: NoteProps;
  comments?: CommentProps[];

  createdAt?: string;
  updatedAt?: string;
};

export type CompanyInput = Partial<CompanyProps>;

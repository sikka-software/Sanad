import { CommentProps } from "./comment.type";
import { CompanyProps } from "./company.type";
import { InvoiceProps } from "./invoice.type";
import { NoteProps } from "./note.type";
import { UserProps } from "./user.type";

export type ClientProps = {
  _id: string;
  profile: UserProps;

  invoices?: InvoiceProps[];
  companies?: (CompanyProps | string)[];

  website?: string;
  street?: string;
  district?: string;
  city?: string;
  state?: string;
  province?: string;
  zip_code?: any;
  country_code?: any;
  country?: string;
  photo?: any;

  note?: NoteProps;
  comments?: CommentProps[];

  createdAt?: string;
  updatedAt?: string;
};

export type ClientInput = Partial<ClientProps>;

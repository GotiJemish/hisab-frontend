import InvoiceComponent from "@/pages/invoice/InvoiceComponent";

export default function Page({ params, searchParams }) {
  const { invoiceId } = params;

  return <InvoiceComponent id={invoiceId} searchParams={searchParams} />;
}

"use client";

import React, { useEffect, useState } from "react";
import InvoiceForm from "./InvoiceForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import { PrintIcon } from "@/icons";

const InvoiceComponent = ({ id, searchParams }) => {
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (searchParams?.status === "update") {
      setIsUpdate(true);
    }
  }, [searchParams]);

  if (isUpdate) {
    return <InvoiceForm id={id} />;
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <PageBreadcrumb pageTitle="View Invoice" />
      </div>
      <div>
        <div className="w-full rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
            <h3 className="text-theme-xl font-medium text-gray-800 dark:text-white/90">
              Invoice
            </h3>

            <h4 className="text-base font-medium text-gray-700 dark:text-gray-400">
              ID : #348
            </h4>
          </div>

          <div className="p-5 xl:p-8">
            <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  From
                </span>

                <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                  Pimjo LLC
                </h5>

                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  1280, Clair Street, <br />
                  Massachusetts, New York - 02543
                </p>

                <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Issued On:
                </span>

                <span className="block text-sm text-gray-500 dark:text-gray-400">
                  11 March, 2027
                </span>
              </div>

              <div className="h-px w-full bg-gray-200 sm:h-[158px] sm:w-px dark:bg-gray-800"></div>

              <div className="sm:text-right">
                <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  To
                </span>

                <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                  Albert Ward
                </h5>

                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  355, Shobe Lane <br />
                  Colorado, Fort Collins - 80543
                </p>

                <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Due On:
                </span>

                <span className="block text-sm text-gray-500 dark:text-gray-400">
                  16 March, 2027
                </span>
              </div>
            </div>

            <div>
              <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
                <table className="min-w-full text-left text-gray-700 dark:text-gray-400">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="px-5 py-3 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                        S.No.#
                      </th>
                      <th className="px-5 py-3 text-xs font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                        Products
                      </th>
                      <th className="px-5 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                        Quantity
                      </th>
                      <th className="px-5 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                        Unit Cost
                      </th>
                      <th className="px-5 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                        Discount
                      </th>
                      <th className="px-5 py-3 text-right text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                      <td className="px-5 py-3 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        1
                      </td>
                      <td className="px-5 py-3 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                        Macbook pro 13”
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        1
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        $48
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        0%
                      </td>
                      <td className="px-5 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
                        $1,200
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
                        2
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
                        Apple Watch Ultra
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        1
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        $300
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        50%
                      </td>
                      <td className="px-5 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
                        $150
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
                        3
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
                        iPhone 15 Pro Max
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        3
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        $800
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        0%
                      </td>
                      <td className="px-5 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
                        $1,600
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
                        4
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
                        iPad Pro 3rd Gen
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        1
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        $900
                      </td>
                      <td className="px-5 py-3 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        0%
                      </td>
                      <td className="px-5 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
                        $900
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 flex justify-end border-b border-gray-100 pb-6 text-right dark:border-gray-800">
              <div className="w-[220px]">
                <p className="mb-4 text-left text-sm font-medium text-gray-800 dark:text-white/90">
                  Order summary
                </p>
                <ul className="space-y-2">
                  <li className="flex justify-between gap-5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Sub Total
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                      $3,850
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Vat (10%):
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                      $385
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-400">
                      Total
                    </span>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white/90">
                      $4,235
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">

              <Button variant="outline" title="Proceed to payment" className="fill-current" size="sm" />
             
              <Button startIcon={<PrintIcon />} title="Print" className="fill-current" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceComponent;

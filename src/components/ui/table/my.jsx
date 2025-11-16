// import Checkbox from "@/components/form/input/Checkbox";
// import Badge from "@/components/ui/badge/Badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import React, { useState } from "react";

//
//
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <th>sdfj</th>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         <TableRow>
//           <TableCell>
//             <Checkbox checked={isChecked} onChange={setIsChecked} />
//           </TableCell>
//           <TableCell>
//            <Badge>dsuh</Badge>
//           </TableCell>
//         </TableRow>
//       </TableBody>
//     </Table>
//   );
// };

//
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import Checkbox from "@/components/form/input/Checkbox";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { ChevronDownIcon, DownloadIcon, SearchIcon, ThreeDotIcon } from "@/icons";

// Define the table data using the interface
const tableData = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];

const MainTable = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown(e) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
      <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400"> Show </span>
          <div className="relative z-20 bg-transparent">
            <select className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
              <option
                value={10}
                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                10
              </option>
              <option
                value={8}
                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                8
              </option>
              <option
                value={5}
                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                5
              </option>
            </select>
            <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
              {/* <svg
                className="stroke-current"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                  stroke
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
              <ChevronDownIcon className="stroke-current"/>
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400"> entries </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <button className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
            <SearchIcon className="fill-current"/>
            </button>
            <input
              x-model="search"
              placeholder="Search..."
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
              type="text"
            />
          </div>
          <button className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">
            Download
           <DownloadIcon className="fill-current"/>
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <Table className="min-w-full">
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                <Checkbox checked={isChecked} onChange={setIsChecked} />
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Project Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Team
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Budget
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <Image
                        width={40}
                        height={40}
                        src={order.user.image}
                        alt={order.user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.user.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order.user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.projectName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {order.team.images.map((teamImage, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <Image
                          width={24}
                          height={24}
                          src={teamImage}
                          alt={`Team member ${index + 1}`}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {order.budget}
                </TableCell>

                <TableCell className=" px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block">
                    <div className="relative">
                      <button
                        className="text-gray-500 dark:text-gray-400 "
                        onClick={toggleDropdown}
                      >
                       <ThreeDotIcon className="fill-current"/>
                      </button>
                      <Dropdown
                        isOpen={isOpen}
                        onClose={closeDropdown}
                        className="absolute z-10 right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                      >
                        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                          <li>
                            <DropdownItem
                              onItemClick={closeDropdown}
                              tag="a"
                              href="/profile"
                              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                              View More
                            </DropdownItem>
                          </li>
                        </ul>
                        <button
                          onClick={() => {}}
                          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          {/* <SignOutIcon className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"/> */}
                          Delete
                        </button>
                      </Dropdown>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <table className="min-w-full undefined">
        <thead>
          <tr>
            <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex gap-3">
                  <label className="flex items-center space-x-3 group cursor-pointer"><div className="relative w-5 h-5">
                      <input className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60" type="checkbox" /></div></label><span className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">User</span>
                </div>
                <button className="flex flex-col gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41.585a.5.5 0 0 0-.82 0L1.05 4.213A.5.5 0 0 0 1.46 5h5.08a.5.5 0 0 0 .41-.787z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41 4.415a.5.5 0 0 1-.82 0L1.05.787A.5.5 0 0 1 1.46 0h5.08a.5.5 0 0 1 .41.787z" />
                  </svg>
                </button>
              </div>
            </th>
            <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <div className="flex items-center justify-between cursor-pointer">
                <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                  Position
                </p>
                <button className="flex flex-col gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41.585a.5.5 0 0 0-.82 0L1.05 4.213A.5.5 0 0 0 1.46 5h5.08a.5.5 0 0 0 .41-.787z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41 4.415a.5.5 0 0 1-.82 0L1.05.787A.5.5 0 0 1 1.46 0h5.08a.5.5 0 0 1 .41.787z" />
                  </svg>
                </button>
              </div>
            </th>
            <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <div className="flex items-center justify-between cursor-pointer">
                <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                  Salary
                </p>
                <button className="flex flex-col gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41.585a.5.5 0 0 0-.82 0L1.05 4.213A.5.5 0 0 0 1.46 5h5.08a.5.5 0 0 0 .41-.787z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41 4.415a.5.5 0 0 1-.82 0L1.05.787A.5.5 0 0 1 1.46 0h5.08a.5.5 0 0 1 .41.787z" />
                  </svg>
                </button>
              </div>
            </th>
            <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <div className="flex items-center justify-between cursor-pointer">
                <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                  Office
                </p>
                <button className="flex flex-col gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41.585a.5.5 0 0 0-.82 0L1.05 4.213A.5.5 0 0 0 1.46 5h5.08a.5.5 0 0 0 .41-.787z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41 4.415a.5.5 0 0 1-.82 0L1.05.787A.5.5 0 0 1 1.46 0h5.08a.5.5 0 0 1 .41.787z" />
                  </svg>
                </button>
              </div>
            </th>
            <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <div className="flex items-center justify-between cursor-pointer">
                <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                  Status
                </p>
                <button className="flex flex-col gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41.585a.5.5 0 0 0-.82 0L1.05 4.213A.5.5 0 0 0 1.46 5h5.08a.5.5 0 0 0 .41-.787z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41 4.415a.5.5 0 0 1-.82 0L1.05.787A.5.5 0 0 1 1.46 0h5.08a.5.5 0 0 1 .41.787z" />
                  </svg>
                </button>
              </div>
            </th>
            <th className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <div className="flex items-center justify-between cursor-pointer">
                <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                  Action
                </p>
                <button className="flex flex-col gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41.585a.5.5 0 0 0-.82 0L1.05 4.213A.5.5 0 0 0 1.46 5h5.08a.5.5 0 0 0 .41-.787z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width={8} height={5} fill="none" className="text-gray-300 dark:text-gray-700">
                    <path fill="currentColor" d="M4.41 4.415a.5.5 0 0 1-.82 0L1.05.787A.5.5 0 0 1 1.46 0h5.08a.5.5 0 0 1 .41.787z" />
                  </svg>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
              <div className="flex gap-3">
                <div className="mt-1">
                  <label className="flex items-center space-x-3 group cursor-pointer"><div className="relative w-5 h-5">
                      <input className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60" type="checkbox" /></div></label>
                </div>
                <div>
                  <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Lindsey Curtis
                  </p>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">demoemail@gmail.com</span>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
              <span> Sales Assistant</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              $89,500
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              Edinburgh
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">Hired</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <div className="flex items-center w-full gap-2">
                <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M6.541 3.792a2.25 2.25 0 0 1 2.25-2.25h2.417a2.25 2.25 0 0 1 2.25 2.25v.25h3.208a.75.75 0 0 1 0 1.5h-.29v10.666a2.25 2.25 0 0 1-2.25 2.25h-8.25a2.25 2.25 0 0 1-2.25-2.25V5.541h-.292a.75.75 0 1 1 0-1.5H6.54zm8.334 9.454V5.541h-9.75v10.667c0 .414.336.75.75.75h8.25a.75.75 0 0 0 .75-.75zM8.041 4.041h3.917v-.25a.75.75 0 0 0-.75-.75H8.791a.75.75 0 0 0-.75.75zM8.334 8a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-5a.75.75 0 0 1 .75-.75m4.083.75a.75.75 0 0 0-1.5 0v5a.75.75 0 1 0 1.5 0z" clipRule="evenodd" />
                  </svg></button><button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M17.091 3.532a2.25 2.25 0 0 0-3.182 0l-8.302 8.302c-.308.308-.52.7-.61 1.126l-.735 3.485a.75.75 0 0 0 .888.889l3.485-.735a2.25 2.25 0 0 0 1.127-.611l8.301-8.302a2.25 2.25 0 0 0 0-3.182zm-2.121 1.06a.75.75 0 0 1 1.06 0l.973.973a.75.75 0 0 1 0 1.06l-.899.899-2.033-2.033zm-1.96 1.96-6.342 6.342a.75.75 0 0 0-.203.376l-.498 2.358 2.358-.497a.75.75 0 0 0 .376-.204l6.343-6.342z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
              <div className="flex gap-3">
                <div className="mt-1">
                  <label className="flex items-center space-x-3 group cursor-pointer"><div className="relative w-5 h-5">
                      <input className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60" type="checkbox" /></div></label>
                </div>
                <div>
                  <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Kaiya George
                  </p>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">demoemail@gmail.com</span>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
              <span> Chief Executive Officer</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              $105,000
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              London
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400">In Progress</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <div className="flex items-center w-full gap-2">
                <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M6.541 3.792a2.25 2.25 0 0 1 2.25-2.25h2.417a2.25 2.25 0 0 1 2.25 2.25v.25h3.208a.75.75 0 0 1 0 1.5h-.29v10.666a2.25 2.25 0 0 1-2.25 2.25h-8.25a2.25 2.25 0 0 1-2.25-2.25V5.541h-.292a.75.75 0 1 1 0-1.5H6.54zm8.334 9.454V5.541h-9.75v10.667c0 .414.336.75.75.75h8.25a.75.75 0 0 0 .75-.75zM8.041 4.041h3.917v-.25a.75.75 0 0 0-.75-.75H8.791a.75.75 0 0 0-.75.75zM8.334 8a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-5a.75.75 0 0 1 .75-.75m4.083.75a.75.75 0 0 0-1.5 0v5a.75.75 0 1 0 1.5 0z" clipRule="evenodd" />
                  </svg></button><button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M17.091 3.532a2.25 2.25 0 0 0-3.182 0l-8.302 8.302c-.308.308-.52.7-.61 1.126l-.735 3.485a.75.75 0 0 0 .888.889l3.485-.735a2.25 2.25 0 0 0 1.127-.611l8.301-8.302a2.25 2.25 0 0 0 0-3.182zm-2.121 1.06a.75.75 0 0 1 1.06 0l.973.973a.75.75 0 0 1 0 1.06l-.899.899-2.033-2.033zm-1.96 1.96-6.342 6.342a.75.75 0 0 0-.203.376l-.498 2.358 2.358-.497a.75.75 0 0 0 .376-.204l6.343-6.342z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
              <div className="flex gap-3">
                <div className="mt-1">
                  <label className="flex items-center space-x-3 group cursor-pointer"><div className="relative w-5 h-5">
                      <input className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60" type="checkbox" /></div></label>
                </div>
                <div>
                  <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Zain Geidt
                  </p>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">demoemail@gmail.com</span>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
              <span> Junior Technical Author</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              $120,000
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              San Francisco
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400">In Progress</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <div className="flex items-center w-full gap-2">
                <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M6.541 3.792a2.25 2.25 0 0 1 2.25-2.25h2.417a2.25 2.25 0 0 1 2.25 2.25v.25h3.208a.75.75 0 0 1 0 1.5h-.29v10.666a2.25 2.25 0 0 1-2.25 2.25h-8.25a2.25 2.25 0 0 1-2.25-2.25V5.541h-.292a.75.75 0 1 1 0-1.5H6.54zm8.334 9.454V5.541h-9.75v10.667c0 .414.336.75.75.75h8.25a.75.75 0 0 0 .75-.75zM8.041 4.041h3.917v-.25a.75.75 0 0 0-.75-.75H8.791a.75.75 0 0 0-.75.75zM8.334 8a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-5a.75.75 0 0 1 .75-.75m4.083.75a.75.75 0 0 0-1.5 0v5a.75.75 0 1 0 1.5 0z" clipRule="evenodd" />
                  </svg></button><button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M17.091 3.532a2.25 2.25 0 0 0-3.182 0l-8.302 8.302c-.308.308-.52.7-.61 1.126l-.735 3.485a.75.75 0 0 0 .888.889l3.485-.735a2.25 2.25 0 0 0 1.127-.611l8.301-8.302a2.25 2.25 0 0 0 0-3.182zm-2.121 1.06a.75.75 0 0 1 1.06 0l.973.973a.75.75 0 0 1 0 1.06l-.899.899-2.033-2.033zm-1.96 1.96-6.342 6.342a.75.75 0 0 0-.203.376l-.498 2.358 2.358-.497a.75.75 0 0 0 .376-.204l6.343-6.342z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
              <div className="flex gap-3">
                <div className="mt-1">
                  <label className="flex items-center space-x-3 group cursor-pointer"><div className="relative w-5 h-5">
                      <input className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60" type="checkbox" /></div></label>
                </div>
                <div>
                  <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Abram Schleifer
                  </p>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">demoemail@gmail.com</span>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
              <span> Software Engineer</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              $95,000
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              New York
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">Hired</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <div className="flex items-center w-full gap-2">
                <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M6.541 3.792a2.25 2.25 0 0 1 2.25-2.25h2.417a2.25 2.25 0 0 1 2.25 2.25v.25h3.208a.75.75 0 0 1 0 1.5h-.29v10.666a2.25 2.25 0 0 1-2.25 2.25h-8.25a2.25 2.25 0 0 1-2.25-2.25V5.541h-.292a.75.75 0 1 1 0-1.5H6.54zm8.334 9.454V5.541h-9.75v10.667c0 .414.336.75.75.75h8.25a.75.75 0 0 0 .75-.75zM8.041 4.041h3.917v-.25a.75.75 0 0 0-.75-.75H8.791a.75.75 0 0 0-.75.75zM8.334 8a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-5a.75.75 0 0 1 .75-.75m4.083.75a.75.75 0 0 0-1.5 0v5a.75.75 0 1 0 1.5 0z" clipRule="evenodd" />
                  </svg></button><button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M17.091 3.532a2.25 2.25 0 0 0-3.182 0l-8.302 8.302c-.308.308-.52.7-.61 1.126l-.735 3.485a.75.75 0 0 0 .888.889l3.485-.735a2.25 2.25 0 0 0 1.127-.611l8.301-8.302a2.25 2.25 0 0 0 0-3.182zm-2.121 1.06a.75.75 0 0 1 1.06 0l.973.973a.75.75 0 0 1 0 1.06l-.899.899-2.033-2.033zm-1.96 1.96-6.342 6.342a.75.75 0 0 0-.203.376l-.498 2.358 2.358-.497a.75.75 0 0 0 .376-.204l6.343-6.342z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
              <div className="flex gap-3">
                <div className="mt-1">
                  <label className="flex items-center space-x-3 group cursor-pointer"><div className="relative w-5 h-5">
                      <input className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60" type="checkbox" /></div></label>
                </div>
                <div>
                  <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Carla George
                  </p>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">demoemail@gmail.com</span>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
              <span> Integration Specialist</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              $80,000
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              Chicago
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500">Pending</span>
            </td>
            <td className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
              <div className="flex items-center w-full gap-2">
                <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M6.541 3.792a2.25 2.25 0 0 1 2.25-2.25h2.417a2.25 2.25 0 0 1 2.25 2.25v.25h3.208a.75.75 0 0 1 0 1.5h-.29v10.666a2.25 2.25 0 0 1-2.25 2.25h-8.25a2.25 2.25 0 0 1-2.25-2.25V5.541h-.292a.75.75 0 1 1 0-1.5H6.54zm8.334 9.454V5.541h-9.75v10.667c0 .414.336.75.75.75h8.25a.75.75 0 0 0 .75-.75zM8.041 4.041h3.917v-.25a.75.75 0 0 0-.75-.75H8.791a.75.75 0 0 0-.75.75zM8.334 8a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-5a.75.75 0 0 1 .75-.75m4.083.75a.75.75 0 0 0-1.5 0v5a.75.75 0 1 0 1.5 0z" clipRule="evenodd" />
                  </svg></button><button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none">
                    <path fill="currentColor" fillRule="evenodd" d="M17.091 3.532a2.25 2.25 0 0 0-3.182 0l-8.302 8.302c-.308.308-.52.7-.61 1.126l-.735 3.485a.75.75 0 0 0 .888.889l3.485-.735a2.25 2.25 0 0 0 1.127-.611l8.301-8.302a2.25 2.25 0 0 0 0-3.182zm-2.121 1.06a.75.75 0 0 1 1.06 0l.973.973a.75.75 0 0 1 0 1.06l-.899.899-2.033-2.033zm-1.96 1.96-6.342 6.342a.75.75 0 0 0-.203.376l-.498 2.358 2.358-.497a.75.75 0 0 0 .376-.204l6.343-6.342z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table> */}
        {/* </div> */}
      </div>
      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <div className="pb-3 xl:pb-0">
            <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
              Showing 1 to 5 of 10 entries
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
              disabled
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded bg-brand-500 text-white flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                1
              </button>
              <button className="px-4 py-2 rounded text-gray-700 dark:text-gray-400 flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                2
              </button>
            </div>
            <button className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainTable;

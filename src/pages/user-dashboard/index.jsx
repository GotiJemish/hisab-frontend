"use client"
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
export default function Home() {
  const { user, logout } = useAuth();

  return (<>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
      {/* <div className="p-8 rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-primary">Welcome to My App</h1>
        <p className="mt-4 text-theme">This app uses Tailwind CSS with a custom theme via CSS variables.</p>
        <button
          onClick={logout}
          className="mt-6 px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition"
        >
          logout
        </button>
      </div> */}
  </>  
  );
}

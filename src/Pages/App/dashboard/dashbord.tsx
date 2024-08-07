import { Helmet } from "react-helmet-async";
import { MonthCard } from "./month-card";
import { MonthOrdersAmountCard } from "./month-orders-amount-count";
import { DayOrdersAmountCard } from "./day-orders-amount-card";
import { MonthCanceledOrdersAmountCard } from "./month-canceled-orders-amount";
import { RevenueChart } from "./chart/revenue-chart";
import { PopularProductChart } from "./chart/popular-products-chart";

export function Dashboard(){
    return(
        <>
            <Helmet title="Dashboard"/>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

                <div className="grid grid-cols-4 gap-4">
                    <MonthCard/>
                    <MonthOrdersAmountCard/>
                    <DayOrdersAmountCard/>
                    <MonthCanceledOrdersAmountCard/>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <RevenueChart/>
                </div>
                <div className="col-span-1">
                    <PopularProductChart />
                </div>
            </div>
        </>
    );
}

// import { useEffect, useState } from "react";
import Charts from "../../components/chart/Charts";
import FeatureInfo from "../../components/featureInfo/FeatureInfo";
import Sidebar from "../../components/sidebar/Sidebar";
import WidgetLg from "../../components/users/Users";
import TopBar from "../../components/topbar/Topbar";
import WidgetSm from "../../components/products/Products";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="flex h-full justify-start flex-1">
        <div className="bg-white border-right border-2 fixed h-full">
          <Sidebar />
        </div>
        <div>
          <div className="flex items-center">
            <div className="mt-6 ml-56 w-3/5">
              <Charts />
            </div>
            <div className="mt-6 w-[40%]  mx-8">
              <FeatureInfo />
            </div>
          </div>
          <div className="ml-56  mt-6 mr-8">
            <div className="">
              <WidgetLg />
            </div>
            <div className="">
              <WidgetSm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

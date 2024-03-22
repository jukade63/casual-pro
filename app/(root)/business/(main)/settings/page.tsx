import { getBusiness } from "@/actions/business";
import BasicInfo from "@/components/BasicInfo";
import React from "react";
import EditBusinessField from "./EditBusinessField";

export default async function Settings() {
  const business: Business = await getBusiness();
  return (
    <section className="space-y-2">
      <h1 className="text-xl font-semibold">Settings</h1>
      <BasicInfo />
      <h1 className="text-xl font-semibold">Business profile</h1>
      <div className="space-y-2">
        <div className="flex justify-between px-4 py-2 rounded-lg bg-gray-200">
          <div>
            <p className="font-semibold">Company industry</p>
            <p className="text-gray-500 text-sm">{business.industry}</p>
          </div>
          <EditBusinessField
            field="industry"
            data={business.industry}
            businessId={business.id}
          />
        </div>

        <div className="flex justify-between px-4 py-2 rounded-lg bg-gray-200">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-gray-500 text-sm">{business.description}</p>
          </div>
          <EditBusinessField
            field="description"
            data={business.description}
            businessId={business.id}
          />
        </div>
      </div>
    </section>
  );
}

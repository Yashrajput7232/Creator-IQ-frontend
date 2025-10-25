
'use client';

import { Briefcase } from "lucide-react";

export default function CampaignTrackerPage() {
  return (
    <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Campaign Tracker</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                This page is under construction. You will be able to track your campaigns here.
            </p>
        </div>
    </div>
  );
}

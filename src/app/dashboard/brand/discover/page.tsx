
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function DiscoverCreatorsPage() {
  return (
    <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Discover Creators</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                This page is under construction. Creator search and filtering will be available here.
            </p>
        </div>
    </div>
  );
}

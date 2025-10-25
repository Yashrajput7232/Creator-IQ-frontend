'use client';

import React, { type ReactNode } from 'react';

// This is now a simple pass-through provider since we removed Firebase auth for the MVP.
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

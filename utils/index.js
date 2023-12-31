"use client";

import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function Providers({children}) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // default: true
                staleTime: 1000 * 60 * 60 * 24
            },
        },
    })
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default Providers;
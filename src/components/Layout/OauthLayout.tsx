"use-client";

import Footer from "@/components/layout-component/Footer";
import { ReactNode } from "react";
import Header2 from "../layout-component/Header2";

const OauthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-stone-50">
            <Header2 />
            <div className="flex items-center justify-center py-7">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default OauthLayout
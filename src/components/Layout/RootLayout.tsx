"use-client";

import Footer from "@/components/layout-component/Footer";
import Header1, { Header1Props } from "@/components/layout-component/Header1";
import { ReactNode } from "react";

const RootLayout = ({ children, activeHeader }: { children: ReactNode, activeHeader: Header1Props["activePage"] }) => {
    return (
        <div className="min-h-screen bg-stone-50">
            <Header1 activePage={activeHeader} />
            {children}
            <Footer />
        </div>
    )
}

export default RootLayout
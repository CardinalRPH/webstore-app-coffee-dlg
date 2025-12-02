import Footer from "@/components/layout-component/Footer";
import Header1 from "@/components/layout-component/Header1";
import { ReactNode } from "react";

const ProductLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-stone-50">
            <Header1 activePage="menu" />
            {children}
            <Footer />
        </div>
    )
}

export default ProductLayout
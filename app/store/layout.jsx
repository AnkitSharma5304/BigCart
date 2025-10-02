import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "BigCart - Store Dashboard",
      description: "BigCart - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}

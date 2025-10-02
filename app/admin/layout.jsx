import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "BigCart - Admin",
      description: "BigCart - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}

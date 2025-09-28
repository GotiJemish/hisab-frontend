import AdminLayout from "@/layouts/AdminLayout";

const UserLayout = async ({ params, children }) => {
  const { user_id } = await params;
  return (
    <AdminLayout id={user_id}>{children}</AdminLayout>)
};

export default UserLayout;

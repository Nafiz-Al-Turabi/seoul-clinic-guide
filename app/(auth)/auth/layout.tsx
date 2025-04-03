// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* <h4 className="bg-slate-700 text-white py-3 text-center">
        ©2025 All rights reserved
      </h4> */}
    </>
  );
}

import AdminNavigation from '@/components/AdminNavigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      <main className="lg:ml-64 transition-all duration-300 ease-in-out">
        <div className="pt-16 lg:pt-0 p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

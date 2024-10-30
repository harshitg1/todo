import { Outlet } from 'react-router-dom'


export function AppLayout() {
  return (
    <div className="flex justify-center items-center antialiased w-full">
        <Outlet />
    </div>
  )
}

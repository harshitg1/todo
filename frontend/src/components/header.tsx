import { Link } from 'react-router-dom'


import { SettingsMenu } from './settings'


export function Header() {


  return (
    <>
      <header className="sticky left-0 top-0 z-50 border-b bg-white">
        <div className="flex justify-between h-16 items-center gap-6 px-16">
          <Link to="/">Task</Link>
          <div className=" flex items-center gap-2">
            <SettingsMenu />
          </div>
        </div>
      </header>
    </>
  )
}

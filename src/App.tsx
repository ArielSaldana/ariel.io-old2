import { useState } from 'react'
import reactLogo from './assets/react.svg'

import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Cursor from "./components/mouse/Cursor";

const pages = import.meta.glob('./pages/*.tsx', { eager: true })

const routes = Object.keys(pages).map((path) => {
    const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1]
    console.log(name)
    return {
        name,
        path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
        // @ts-ignore
        component: pages[path].default,
    }
})

function App() {
  return (
    <>
    <Cursor></Cursor>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />}></Route>
        })}
      </Routes>
    </>
  )
}

export default App

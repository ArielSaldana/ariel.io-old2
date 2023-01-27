import {useEffect, useState} from 'react'

import './App.scss'
import { Cursor } from "@unreal/unreal-components"
import {Detector} from "@unreal/pan";
import Navigation from "./components/navigation/Navigation";
import '@unreal/unreal-components/dist/style.css'
import {Link, Route, Routes} from "react-router-dom";

const pages = import.meta.glob('./pages/*.tsx', { eager: true })
const routes = Object.keys(pages).map((path) => {
    const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1]
    return {
        name,
        path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
        // $ts-ignore
        component: pages[path].default,
    }
})

function App() {
    const [customCursorEnabled, setCustomCursorEnabled] = useState(false)
    useEffect(() => {
        const detector = Detector.getInstance()
        if (detector?.isTouchScreen() === false && !detector.isMobile()) {
            setCustomCursorEnabled(true)
        }
    })
  return (
    <>
        {customCursorEnabled &&
            <Cursor hexColor='#F00' />
        }
    <Navigation routes={routes}/>
        <div className="body-content">
            <Routes>
                {routes.map(({ path, component: RouteComp }) => {
                    return <Route key={path} path={path} element={<RouteComp />}></Route>
                })}
            </Routes>
        </div>
    </>
  )
}

export default App

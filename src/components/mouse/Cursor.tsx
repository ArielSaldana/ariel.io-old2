import {useEffect, useRef, useState} from "react";
import { Mouse, Ticker, Viewport } from '@unreal/pan';
import * as pan from "@unreal/pan";

interface MousePosition {
    x: number
    y: number
}

function Lerp(start: number, end: number, t: number): number {
    return (1 - t) * start + t * end
}

export default function Cursor() {
    const cursorElemRef = useRef(null);
    const [mousePosition, setMousePosition] = useState<MousePosition>({x: 0, y: 0})
    const [mouseVisible, setMouseVisible] = useState(false)
    const [cursorSize, setCursorSize] = useState(32)
    const [viewportWidthHeight, setViewportWidthHeight] = useState({width: 0, height: 0})

    useEffect(() => {
        console.log(viewportWidthHeight)
    }, [viewportWidthHeight])

    useEffect(() => {
        const position: MousePosition = {
            x: 0,
            y: 0
        }
        const animatedPosition: MousePosition = {
            x: 0,
            y: 0
        }

        const viewportInformation = {
            width: 0,
            height: 0
        }
        let cursorSize = 32;
        let animatedCursorSize = 32;

//        const mouse = pan.mouse()
        const mouse = Mouse.getInstance()
        const ticker = pan.ticker()
        const viewport = pan.viewport({fireViewportInformationOnListen: true})

        viewport.on('resize', (resizeEvent: any) => {
            viewportInformation.width = resizeEvent.width;
            viewportInformation.height = resizeEvent.height;
            setViewportWidthHeight({
                width: resizeEvent.width,
                height: resizeEvent.height
            })
        })

        mouse.on('move', (mouseEvent: any) => {
            if (!mouseVisible) {
                setMouseVisible(true)
            }
            position.x = mouseEvent.x
            position.y = mouseEvent.y

            if (mouseEvent.x < 4 ||
                mouseEvent.x > viewportInformation.width - 4 ||
                mouseEvent.y < 4 ||
                mouseEvent.y > viewportInformation.height - 4
            ) {
                cursorSize = 0
            } else if (mouseEvent.y > 500) {
                cursorSize = 64
            } else {
                cursorSize = 32
            }
        })

        ticker.on('tick', () => {
            if (cursorElemRef.current !== null) {
                const elem = cursorElemRef.current as HTMLElement
                const width = elem.offsetWidth
                const height = elem.offsetHeight

                // we apply a lerp effect to smooth our movement,
                // plus calculate the size of the cursor to factor it into the position
                animatedPosition.x += ((position.x - (width/2)) - animatedPosition.x) * 0.1
                animatedPosition.y += ((position.y - (height/2)) - animatedPosition.y) * 0.1

                //animate mouse position
                setMousePosition({
                    x: animatedPosition.x,
                    y: animatedPosition.y
                })

                //animated mouse size
                animatedCursorSize += (cursorSize - animatedCursorSize) * 0.3
                setCursorSize(animatedCursorSize)

            }
        })


    }, [])

    const display = mouseVisible ? 'flex' : 'none'
    return (
        <>
        <div ref={cursorElemRef} className="cursor" style={{
                width: `${cursorSize}px`,
                height: `${cursorSize}px`,
                display: `${display}`,
                transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${mousePosition.x}, ${mousePosition.y}, 0, 1)`
            }}></div>
        </>
    )
}
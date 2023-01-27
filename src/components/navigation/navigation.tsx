import {Link, Route, Routes} from "react-router-dom";
import styles from './Navigation.module.scss'
import {useEffect, useState} from "react";

interface NavigationProps {
    routes: []
}

export default function Navigation(props: NavigationProps) {
    const [navigationMenuOpened, setNavigationMenuOpened] = useState(false)

    function toggleMenu() {
        setNavigationMenuOpened(!navigationMenuOpened)
    }

    useEffect(() => {
        console.log('navigation', navigationMenuOpened)
        if (navigationMenuOpened) {
            window.document.body.classList.add('navigation-opened');
        } else {
            window.document.body.classList.remove('navigation-opened');
        }
    }, [navigationMenuOpened])


//    const opacityLevel = (navigationMenuOpened) ? 1 : 0
    return (
        <div>
            <button className={styles.menuButton} onClick={toggleMenu}>Menu</button>
            <div className={styles.navigation}>
                <nav className={styles.nav}>
                <div className={styles.navigationPrimary}>
                    <ul className={styles.ul}>
                        {props.routes.map(({ name, path }) => {
                            return (
                                    <li className={styles.li} key={path}>
                                        <Link to={path}>{name}</Link>
                                    </li>
                                    )
                        })}
                    </ul>
                </div>
                </nav>
            </div>
        </div>
    )
}
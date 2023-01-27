import styles from './Hero.module.css'

export function Hero() {
    return (
        <div className={styles.hero}>
            <div>
                <p>Hi, my name is</p>
                <h1>Ariel Saldana.<br/>
                    I build things for the web.</h1>
                <p>I’m a software engineer specializing in building (and occasionally designing) exceptional digital
                    experiences. Currently, I’m focused on building accessible, human-centered products at
                    Upstatement.</p>
            </div>
        </div>
    )
}
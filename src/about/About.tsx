import Navigation from "../components/navigation/navigation";
import ReactMarkdown from 'react-markdown'

export default function About() {
    return (
        <div className="ariel-about">
            <Navigation></Navigation>
            <h1>My About Page</h1>
            <ReactMarkdown># Hello, *world*!</ReactMarkdown>
        </div>
    )
}
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";

const articles = import.meta.glob<string>('../assets/articles/*.md', {eager: true, as: 'raw'})
export default function Home() {

    const blogArticles = Object.keys(articles).map((path, index) =>
        <ReactMarkdown key={index}>
            {articles[path]}
        </ReactMarkdown>
    )

    return (
        <>
            <h1>Blog</h1>
            <div className="container">
                {blogArticles}
            </div>
        </>
    )
}
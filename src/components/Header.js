import React from "react"
import meme from "../images/Troll Face.png"

export default function Header()
{
    return (

        <header>
            <nav className="nav">
                <img className="nav--img" src={meme}></img>
                <h1 className="nav--title">MemeXpress</h1>
                
            </nav>
        </header>
    )
}
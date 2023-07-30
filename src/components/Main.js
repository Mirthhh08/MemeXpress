import React from "react"
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
export default function Main() {


    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1ur9b0.jpg"
    })

    const [allMeme, setAllMeme] = React.useState([])

    React.useEffect(() => {

        async function getMeme() {

            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMeme(data.data.memes)
        }

        getMeme()

    }, [])


    function getMemeImage() {
        const ranNum = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[ranNum].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const { name, type, value } = event.target

        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }



    function downloadImage() {
        const memeContainer = document.getElementById('meme-container');

    
        html2canvas(memeContainer, { useCORS: true, ignoreBackground: false })
            .then((canvas) => {
               
                canvas.toBlob((blob) => {
                    
                    saveAs(blob, 'meme.png');
                });
            })
            .catch((err) => console.log(err));
    }

    return (
        <section className="main">
            <div className="main--input">
                <input
                    type="text"
                    className="main--iput--1  input"
                    placeholder="TOP TEXT"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="main--input--2 input"
                    placeholder="BOTTOM TEXT"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </div>

            <button className="meme--button" onClick={getMemeImage}> Get a new meme image  🖼  </button>



            <div className="main--image" id="meme-container">
                <img className="meme--image" src={meme.randomImage}></img>
                <h2 className="main--text-1">{meme.topText}</h2>
                <h2 className="main--text-2">{meme.bottomText}</h2>
            </div>

            <button className="download--button" onClick={downloadImage}>Download Image</button>


        </section>
    )
}
import React, { useState, useEffect } from 'react'

const ImageItem = ({ index, username, fileName, time, blob }) => {

    const [imageSrc, setImageSrc] = useState('')

    useEffect(() => {
        const render = new FileReader()
        render.readAsDataURL(blob)
        render.onloadend = () => {
            setImageSrc(render.result)
        }

    }, [blob])

    return (
        <div key={index} class="chat-messages" id="chat-messsage">
            <div className="message">
                <p className="meta">
                    {username}
                    <span>{time}</span>
                </p>
                <p className="text">Say: ...</p>
                <p>
                    <img
                        src={imageSrc}
                        alt={fileName}
                    />
                </p>
            </div>
        </div>
    )
}

export default ImageItem

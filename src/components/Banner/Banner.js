import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { imageUrl } from '../constants/constants'
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState()
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${process.env.REACT_APP_API_KEY}language=en-US`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
                }
            }
        ).then((response) => {
            let num = Math.floor(Math.random() * 21)
            // console.log(num)
            // console.log(response.data.results[num])
            setMovie(response.data.results[num])
        })
    }, [])

    return (
        <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : null})` }}
            className='banner'>
            <div className="content">
                <h1 className='title'>{movie && (movie.title || movie.name)}</h1>
                <div className="banner_buttons">
                    <button className='button'>Play</button>
                    <button className='button'>My List</button>
                </div>
                <h1 className='description'>{movie && movie.overview}</h1>
            </div>
            <div className="fade-bottom"></div>
        </div>
    )
}

export default Banner
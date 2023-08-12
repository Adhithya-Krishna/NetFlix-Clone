import React, { useState, useEffect } from 'react'
import './RowPost.css'
import axios from '../axios'
import { imageUrl } from '../constants/constants'


function RowPost(props) {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios.get(props.url,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
                }
            }).then((response) => {
                // console.log(response.data.results)
                setMovies(response.data.results)
            }).catch((err) => {
                console.log('Network Error')
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj, index) =>
                    <img key={index} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="RowPoster" />
                )}
            </div>
        </div>
    )
}

export default RowPost
import React, { useState, useEffect } from 'react'
import './RowPost.css'
import Youtube from 'react-youtube'
import axios from '../axios'
import { imageUrl } from '../constants/constants'


function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId, urlsetId] = useState('')
    const [activeVideoId, setActiveVideoId] = useState(null);
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
    }, []);
    const opts = {
        height: '223.990',
        width: '398.220',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 0,
            frameborder: 0
        },
    };

    const handleVideo = async (id) => {
        const tvUrl = await axios.get(`tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
            }
        }).then((response) => {

            return response;
        }).catch((err) => {
            return null;
        });

        const movieUrl = await axios.get(`movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
            }
        }).then((response) => {
            return response;
        }).catch((err) => {
            return null;
        });
        if ((movieUrl !== null && movieUrl.data.results.length > 0 && movieUrl.data.results[0].key.length !== 0) || (tvUrl !== null && tvUrl.data.results.length > 0 && tvUrl.data.results[0].key.length !== 0)) {
            const videoKey = movieUrl !== null ? movieUrl.data.results[0].key : tvUrl.data.results[0].key;
            // console.log("video " + videoKey)
            setActiveVideoId(id);
            urlsetId(videoKey);
        } else {
            console.log('Trailer not available...');
        }



    }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj, index) =>
                    <div
                        onClick={() => {
                            handleVideo(obj.id);
                        }}
                        key={index}
                        className={`poster ${activeVideoId === obj.id ? 'active' : ''}`}
                    >
                        {activeVideoId === obj.id ? (
                            <Youtube className='youtube' videoId={urlId} opts={opts} />
                        ) : (
                            obj.backdrop_path && (
                                <img
                                    className={props.isSmall ? 'smallPoster' : 'poster'}
                                    src={`${imageUrl}${obj.backdrop_path}`}
                                    alt='RowPoster'
                                />
                            )
                        )}
                    </div>

                )}
            </div>
        </div>
    )
}

export default RowPost
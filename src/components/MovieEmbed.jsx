import React from 'react';
import { useParams } from 'react-router-dom';

const MovieEmbed = () => {
    const { id } = useParams()
    const embedUrl = `https://embed.su/embed/movie/${id}`;

    return (
        <div>
            <iframe
                src={embedUrl}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allowFullScreen
                title="Movie Embed"
            ></iframe>
        </div>
    );
}

export default MovieEmbed;
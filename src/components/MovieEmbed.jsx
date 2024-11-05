import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieEmbed = () => {
    const { id } = useParams();
    const [server, setServer] = useState('Server 1');

    const servers = [
        { name: 'Server 1', url: 'https://embed.su/embed/movie/' },
        { name: 'Server 2', url: 'https://vidsrc.in/embed/movie/' },
        { name: 'Server 3', url: 'https://player.autoembed.cc/embed/movie/' }
    ];

    const embedUrl = `${servers.find(s => s.name === server).url}${id}`;

    return (
        <div className="relative h-screen">
            <div className="mb-4 flex justify-center space-x-2">
                {servers.map(s => (
                    <button
                        key={s.name}
                        onClick={() => setServer(s.name)}
                        className={`px-4 py-2 rounded transition-colors duration-300 ${server === s.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {s.name}
                    </button>
                ))}
            </div>
            <div className="relative pt-[56.25%]">
                <iframe
                    src={embedUrl}
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                    allowFullScreen
                    title="Movie Embed"
                ></iframe>
            </div>
        </div>
    );
}

export default MovieEmbed;
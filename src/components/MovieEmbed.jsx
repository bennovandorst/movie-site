import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieEmbed = () => {
    const { id } = useParams();
    const [server, setServer] = useState('Server 1');

    const servers = [
        { name: 'Server 1', url: 'https://embed.su/embed/movie/' },
        { name: 'Server 2', url: 'https://vidsrc.in/embed/movie/' },
        { name: 'Server 3', url: 'https://player.autoembed.cc/embed/movie/' },
        { name: 'Server 4', url: 'https://www.2embed.cc/embed/' },
        { name: 'Server 5', url: 'https://vidlink.pro/movie/' }
    ];

    const embedUrl = `${servers.find(s => s.name === server).url}${id}`;

    return (
        <div>
            <div className="mb-4 flex justify-center space-x-2 p-4">
                {servers.map(s => (
                    <button
                        key={s.name}
                        onClick={() => setServer(s.name)}
                        className={`px-4 py-2 rounded transition-colors duration-300 ${server === s.name ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        {s.name}
                    </button>
                ))}
            </div>
            <div className="relative pt-[56.25%]">
                <iframe
                    src={embedUrl}
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border-4 border-gray-800"
                    allowFullScreen
                    title="Movie Embed"
                ></iframe>
            </div>
        </div>
    );
}

export default MovieEmbed;
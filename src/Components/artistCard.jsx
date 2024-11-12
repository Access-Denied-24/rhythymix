import React from 'react';

const ArtistCard = ({ artist }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden m-4 transition-transform transform hover:scale-105">
      {/* Artist Image */}
      <img
        className="w-full h-48 object-cover"
        src={artist.images && artist.images[0]?.url}
        alt={artist.name}
      />

      {/* Artist Info */}
      <div className="p-5">
        {/* Artist Name */}
        <h3 className="text-xl font-bold text-gray-800 truncate">{artist.name}</h3>

        {/* Followers */}
        <p className="text-gray-600 mt-1">
          <span className="font-semibold">Followers:</span> {artist.followers.total.toLocaleString()}
        </p>

        {/* Popularity */}
        <p className="text-gray-600 mt-1">
          <span className="font-semibold">Popularity:</span> {artist.popularity}%
        </p>

        {/* Genres */}
        <div className="mt-2">
          <p className="text-gray-600 font-semibold">Genres:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {artist.genres.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-purple-100 text-purple-600 font-medium py-1 px-3 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;

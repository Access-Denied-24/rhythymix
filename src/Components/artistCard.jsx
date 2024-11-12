import FollowButton from './FollowButton';

const ArtistCard = ({ artist }) => {
  console.log('artists :', artist);

  return (
    <div className="bg-neutral-900 border border-gray-200 shadow dark:bg-[#120018] p-2 rounded-xl dark:border-gray-700 relative w-[12rem] hover:scale-105 transform transition duration-300 ease-in-out h-[80%] overflow-auto mt-[20px] text-center">
      <img
        className="w-full h-48 object-cover"
        src={artist.images[0].url}
        alt={artist.name}
      />


      <div className="p-5">
        <h3 className="text-xl font-semibold text-white" style={{textDecoration:"none"}}>{artist.name}</h3>

        <FollowButton artistId={artist.id} />
        <p className="text-gray-200 mt-1">
          <span className="font-semibold"  style={{textDecoration:"none"}}>Followers:</span> {artist.followers.total.toLocaleString()}
        </p>

        <p className="text-gray-200 mt-1">
          <span className="font-semibold"  style={{textDecoration:"none"}}>Popularity:</span> {artist.popularity}%
        </p>

        <div className="mt-2">
          <p className="text-gray-200 font-semibold"  style={{textDecoration:"none"}}>Genres:</p>
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

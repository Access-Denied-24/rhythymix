export default function TracksPage({ tracks }) {
  return (
    <>
      <div className="Cont flex flex-wrap justify-center w-[100%] mx-auto">
        {tracks.map((element, index) => (
          <div key={index} className="m-4 flex justify-center">
            <div className="Card bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: "9rem", }}>
              <a href="#">
                <img className="rounded-t-lg" src={element.album.images[0].url} alt={element.name} />
              </a>
              
              <div className="separator flex flex-col justify-between">

                <div className="songDetails p-1">
                  <a href="#">
                    <h5 className="songTitle mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white border ">
                    {element.name}
                    </h5>
                  </a>
                <p className="Artists mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Artists : {element.artists.map(artist => artist.name).join(', ')}
                </p>
                
                <div className=" flex justify-center">
                  {/* <button role="button" className="text-black border w-[50%]">
                    Play
                  </button> */}
                  <audio src={element.preview_url} controls></audio>
                </div>
              </div>
            </div>
            
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

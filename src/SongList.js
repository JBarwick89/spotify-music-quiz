import { useState, useEffect } from 'react';
import axios from 'axios';

function SongList(props) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${props.token}`,
        }, 
        params: {
          limit: 50
        },
      });
  
      console.log(data);
  
      // setSongs(data.playlists.items);
    }

    getSongs();
  }, [props.token]);

  const RenderSongs = () => {
    return <h1>test</h1>;
    // return songs.map(song => {
    //   return <span>song</span>;
    // });
  }


  return (
    <RenderSongs />
  )
}

export default SongList;

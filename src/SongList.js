import { useState, useEffect } from 'react';
import axios from 'axios';

function SongList(props) {
  const [songAnswers, setSongAnswers] = useState([]);

  useEffect(() => {
    // const getSongsFromAllPlaylists = async () => {
    //   const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
    //     headers: {
    //       Authorization: `Bearer ${props.token}`,
    //     }, 
    //     params: {
    //       limit: 50
    //     },
    //   });

    //   // console.log(data);

    //   let overallTrackCount = 0;

    //   /*
    //     return [indexOfFirstSongInOverallTrackCount, indexOfLastSongInOverallTrackCount, playlistId]
    //   */
    //   const getPlaylistSequenceArray = playlists => {
    //     const returnArray = [];

    //     playlists.forEach(playlist => {
    //       const playlistTrackCount = playlist.tracks.total;
    //       overallTrackCount += playlistTrackCount;

    //       const previousPlaylistEndSequence = returnArray.length ? returnArray.slice(-1)[0][1] : 0;
    //       returnArray.push([previousPlaylistEndSequence, previousPlaylistEndSequence + playlistTrackCount - 1, playlist.id])
    //     });
  
    //     return returnArray;
    //   };

    //   const playlistSequenceArray = getPlaylistSequenceArray(data.items);
    //   const songIndexes = Array(4).fill(Math.random() * overallTrackCount);
    //   // console.log(playlistSequenceArray);
      
    //   songIndexes.forEach((songIndex, i) => {
    //     playlistSequenceArray.forEach(async arr => {
    //       if (songIndex >= arr[0] && songIndex <= arr[1]) {
    //         const playlistId = arr[2];
    //         const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    //           headers: {
    //             Authorization: `Bearer ${props.token}`,
    //           },
    //           params: {
    //             limit: 0
    //           },
    //         });

    //         console.log(data);
    //       }
    //     })
    //   });

    //   // return playlistSequenceArray;
    // }


    const getSongsFromAllPlaylists = async () => {
      const { data } = await axios.get('https://api.spotify.com/v1/me/tracks', {
        headers: {
          Authorization: `Bearer ${props.token}`,
        }, 
        params: {
          limit: 1
        },
      });

      const total = data.total;
      let songIndexes = [];
      for (let i = 0; i < 4; i++) {
        songIndexes.push(Math.floor(Math.random() * (total - 1)));
      }

      const getSong = async (index) => {
        const { data } = await axios.get('https://api.spotify.com/v1/me/tracks', {
          headers: {
            Authorization: `Bearer ${props.token}`,
          }, 
          params: {
            limit: 1,
            offset: index,
          },
        });

        console.log(data);
        setSongAnswers(prevSongAnswers => {
          return [...prevSongAnswers, data.items[0].track.name];
        });
      }

      songIndexes.forEach(index => {
        getSong(index);
      });
    }

    getSongsFromAllPlaylists();
  }, [props.token]);

  const RenderSongs = () => {
    const renderArray = [];

    for (let i = 0; i < 4; i++) {
      renderArray.push(i < songAnswers.length ? songAnswers[i] : '')
    }

    // return <h1></h1>;
    return renderArray.map(song => {
      return <span>{song}</span>;
    });
  }


  return (
    <RenderSongs />
  )
}

export default SongList;

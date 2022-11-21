import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import SongList from './SongList';

function App() {
  const clientId = '0cbc0725b7a74ff995cc752e1bb70448';
  const redirectUri = 'http://localhost:3000';
  const authEndpoint = 'https://accounts.spotify.com/authorize?show_dialog=true&scope=user-library-read';
  const responseType = 'token';

  const loginUrl = `${authEndpoint}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;

  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(element => element.startsWith('access_token')).split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  }

  // const searchArtists = async (e) => {
  //   e.preventDefault();

  //   const { data } = await axios.get('https://api.spotify.com/v1/search', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     }, 
  //     params: {
  //       q: searchKey,
  //       type: 'artist',
  //     },
  //   });

  //   setArtists(data.artists.items);
  // }



  // const RenderArtists = () => {
  //   return artists.map(artist => {
  //     return <div key={artist.id}>
  //       {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
  //       {artist.name}
  //     </div>
  //   });
  // };


  // const RenderArtists = () => {
  //   return artists.map(artist => {
  //     return <div key={artist.id}>
  //       {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
  //       {artist.name}
  //     </div>
  //   });
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? 
          <button><a href={loginUrl}>Login to Spotify</a></button>
          : <button onClick={logout}>Logout</button>
        }

        {/* {token ?
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type="submit">Search</button>
          </form>
          : <h2>Please login</h2>
        } */}

        {token ? <SongList token={token}/> : null}
      </header>
    </div>
  );
}

export default App;

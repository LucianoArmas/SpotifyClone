import{Pause, Play} from "./Player"
import {usePlayerStore} from "../store/playerStore" //lee el estado global

export function CardPlayBtn({id}){
  const {
    currentMusic, 
    isPlaying, 
    setIsPlaying, 
    setCurrentMusic} = usePlayerStore(state => state)
  
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id 
  
  const handleClick = () =>{
    if(isPlayingPlaylist){
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const {songs, playlist} = data
        setIsPlaying(true)
        setCurrentMusic({songs, playlist, song: songs[0]})
      })
  }

  
  return(
    <button onClick={handleClick} className="card-play-btn rounded-full bg-green-500 p-4 shadow-black shadow-md">
      {isPlayingPlaylist ? <Pause/> : <Play/>}
    </button>
  )
}
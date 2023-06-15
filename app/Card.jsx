import React from 'react'
import "./globals.css"


function Card({pokemon, handleSelect}) {
  return (
    <div className='flex flex-col items-center relative bg-white rounded-b-xl lower-shadow m-[2px]' onClick={()=>handleSelect(pokemon)}>
        <div className='name-container flex flex-col items-start w-[100%]'>
            <h3 className={`pokemonName text-3xl text-bold m-2 mb-0 exo`}>{pokemon.name}</h3>
            <h3 className='text-lg text-gray-400 text-bold m-2 mt-0 exo'>{`#${pokemon.id}`}</h3>
        </div>
        <img src={pokemon.sprites.front_default} alt={`Image of ${pokemon.name}`} width={250} height={250} loading="lazy" className='pokePic'/>
        <div className='type-container flex flex-row justify-center'>
                {pokemon.types.map((t) => <div className={`m-1 mt-2 p-1 px-2 rounded-md ${t.type.name} drop-shadow-md`} key={t.type.name}><h4 className='text-center text-white text-md pokemonName'>{t.type.name}</h4></div>  )}
        </div>
    </div>
  )
}

export default Card
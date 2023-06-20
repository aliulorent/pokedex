import React from 'react'
import SelectRadar from './SelectRadar';

const statsMap = new Map();
statsMap.set('attack', 'ATK');
statsMap.set('defense', 'DEF');
statsMap.set('hp', 'HP');
statsMap.set('special-attack', 'S-ATK');
statsMap.set('special-defense', 'S-DEF');
statsMap.set('speed', 'SPD');

function Selected({pokemon, close}) {
    let picURL;
    if(pokemon.sprites.other["official-artwork"].front_default){
      picURL = pokemon.sprites.other["official-artwork"].front_default;
    }
    else{
      picURL = pokemon.sprites.front_default;
    }
    const { name, weight, height, id } = pokemon;
    let abilities = [];
    for (let i = 0; i<pokemon.abilities.length; i++){
      abilities.push(pokemon.abilities[i].ability.name);
    }
    let types = [];
    for (let j = 0; j<pokemon.types.length; j++){
      types.push(pokemon.types[j].type.name);
    }
    let stats = [];
    for (let k = 0; k<pokemon.stats.length; k++){
      //stats[pokemon.stats[k].stat.name] = pokemon.stats[k].base_stat;
      stats.push({
        //["stats"] : pokemon.stats[k].stat.name.charAt(0).toUpperCase() + pokemon.stats[k].stat.name.slice(1),
        ["stats"] : statsMap.get(pokemon.stats[k].stat.name),
        [name]: pokemon.stats[k].base_stat,
      })
    }
    const width = window.innerWidth;

    if (width < 640){
      return (
        <div className='fixed flex flex-col items-center justify-evenly select-container bg-gradient-to-b from-white to-blue-400 z-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[100dvh] w-[100dvw] md:h-[80%] md:w-[65%] rounded-none md:rounded-lg cursor-default'>
            <div className='name-container flex flex-row justify-center w-[100%]'>
                <h3 className={`pokemonName text-lg sm:text-3xl text-bold m-2`}>{name}</h3>
                <h3 className='text-lg md:text-3xl text-gray-500 text-bold m-2'>{`#${id}`}</h3>
            </div>
            <img src={picURL} alt={`Image of ${name}`} loading="lazy" className='pokePic w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-gradient-to-b from-white to-gray-200 p-4 rounded-md shadow-md outline outline-2 outline-blue-400'/>
            <div className='type-container flex flex-row justify-center'>
              {types.map((t) => <div className={`m-1 mt-2 p-1 px-2 rounded-md ${t} drop-shadow-md`} key={t}><h4 className='text-center text-white text-sm md:text-xl pokemonName'>{t}</h4></div>  )}
            </div>
            <div className='body-attributes flex flex-row justify-center gap-2 m-1'>
              <h1 className='text-sm md:text-lg text-gray-700'>{"Height: " + height / 10 + "m"}</h1>
              <h1 className='text-sm md:text-lg text-gray-700'>{"Weight: " + weight / 10 + "kg"}</h1>
            </div>
            <SelectRadar data = {stats} name = {name}/>
            <btn className='absolute top-2 right-2 bg-blue-400 p-1 px-2 text-white rounded-full shadow-md cursor-pointer' onClick={()=>close()}>✖</btn>
        </div>
      )
    }
    else{
      return(
        <div className='fixed flex flex-col items-center justify-evenly select-container bg-gradient-to-b from-white to-blue-400 z-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[100dvh] w-[100dvw] md:h-[80%] md:w-[65%] rounded-none md:rounded-lg cursor-default'>
            <div className='name-container flex flex-row justify-center w-[100%]'>
                <h3 className={`pokemonName text-lg sm:text-3xl text-bold m-2`}>{name}</h3>
                <h3 className='text-lg md:text-3xl text-gray-500 text-bold m-2'>{`#${id}`}</h3>
            </div>
            <div className='flex flex-row justify-evenly gap-4'>
              <div className='flex flex-col'>
                <img src={picURL} alt={`Image of ${name}`} loading="lazy" className='pokePic w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-gradient-to-b from-white to-gray-200 p-4 rounded-md shadow-md outline outline-2 outline-blue-400'/>
                <div className='type-container flex flex-row justify-center'>
                  {types.map((t) => <div className={`m-1 mt-2 p-1 px-2 rounded-md ${t} drop-shadow-md`} key={t}><h4 className='text-center text-white text-sm md:text-xl pokemonName'>{t}</h4></div>  )}
                </div>
                <div className='body-attributes flex flex-row justify-center gap-2 m-1'>
                  <h1 className='text-sm md:text-lg text-gray-700'>{"Height: " + height / 10 + "m"}</h1>
                  <h1 className='text-sm md:text-lg text-gray-700'>{"Weight: " + weight / 10 + "kg"}</h1>
                </div>
              </div>
              <div className='w-[300px] h-[300px]'>
                <SelectRadar data = {stats} name = {name} marginx = {30}/>
              </div>
            </div>
            <btn className='absolute top-2 right-2 bg-blue-400 p-1 px-2 text-white rounded-full shadow-md cursor-pointer' onClick={()=>close()}>✖</btn>
        </div>
      )
    }


}

export default Selected
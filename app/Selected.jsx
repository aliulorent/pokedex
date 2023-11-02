import React, { useState, useEffect } from 'react'
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

    const [renderLayout, setRenderLayout] = useState();
    const handleResize = ()=>{
      if (window.innerWidth > 1080){
        setRenderLayout(1);
      }
      else{
        setRenderLayout(0);
      }
    }
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }, []);

    if (!renderLayout){
      return (
        <div className='fixed flex flex-col items-center justify-evenly select-container bg-white outline outline-2 outline-gray-500 z-20 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[100dvh] w-[100dvw] rounded-none md:rounded-lg cursor-default'>
            <div className='name-container flex flex-row justify-center w-[100%]'>
                <h3 className={`pokemonName text-2xl sm:text-3xl text-bold m-2`}>{name}</h3>
                <h3 className='text-2xl md:text-3xl text-gray-500 text-bold m-2'>{`#${id}`}</h3>
            </div>
            <img src={picURL} alt={`Image of ${name}`} loading="lazy" className='pokePic w-[250px] h-[250px] bg-gradient-to-b from-white to-gray-200 outline outline-1 outline-gray-300 p-4 rounded-md shadow-md object-scale-down'/>
            <div className='type-container flex flex-row justify-center'>
              {types.map((t) => <div className={`m-1 mt-2 p-1 px-2 rounded-md ${t} drop-shadow-md`} key={t}><h4 className='text-center text-white text-sm md:text-xl pokemonName'>{t}</h4></div>  )}
            </div>
            <div className='body-attributes flex flex-row justify-center gap-2 m-1'>
              <h1 className='text-md md:text-lg text-gray-700'>{"Height: " + height / 10 + "m"}</h1>
              <h1 className='text-md md:text-lg text-gray-700'>{"Weight: " + weight / 10 + "kg"}</h1>
            </div>
            <div className='w-[300px] h-[300px]'>
              <SelectRadar data = {stats} name = {name}/>
            </div>
            <btn className='absolute top-2 right-2 bg-gray-500 p-1 px-2 text-white rounded-full shadow-md cursor-pointer' onClick={()=>close()}>✖</btn>
        </div>
      )
    }
    else{
      return(
        <>
        <div className='fixed flex flex-col items-center justify-evenly select-container bg-white outline outline-2 outline-gray-500 z-20 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-fit h-fit p-14 px-18 rounded-none md:rounded-lg cursor-default'>
            <div className='name-container flex flex-row justify-center w-[100%] mb-5'>
                <h3 className={`pokemonName text-5xl text-bold m-2`}>{name}</h3>
                <h3 className='text-5xl text-gray-500 text-bold m-2'>{`#${id}`}</h3>
            </div>
            <div className='flex flex-row justify-evenly gap-4'>
              <div className='flex flex-col'>
                <img src={picURL} alt={`Image of ${name}`} loading="lazy" className='w-[450px] h-[450px] bg-gradient-to-b from-white to-gray-200 p-4 shadow-md outline outline-1 outline-gray-300 object-scale-down'/>
                <div className='type-container flex flex-row justify-center'>
                  {types.map((t) => <div className={`m-1 mt-2 p-1 px-2 rounded-md ${t} drop-shadow-md`} key={t}><h4 className='text-center text-white text-2xl pokemonName'>{t}</h4></div>  )}
                </div>
                <div className='body-attributes flex flex-row justify-center gap-2 m-1'>
                  <h1 className='text-xl text-gray-700'>{"Height: " + height / 10 + "m"}</h1>
                  <h1 className='text-xl text-gray-700'>{"Weight: " + weight / 10 + "kg"}</h1>
                </div>
              </div>
              <div className='w-[450px] h-[450px]'>
                <SelectRadar data = {stats} name = {name} marginx = {30}/>
              </div>
            </div>
            <button className='absolute top-2 right-2 bg-gray-500 p-1 px-2 text-white rounded-full shadow-md cursor-pointer' onClick={()=>close()}>✖</button>
        </div>
        <div className='bg-black opacity-30 fixed w-[100dvw] h-[100dvh] z-10 m-0 p-0' onClick={()=>close()}></div>
        </>
      )
    }
}

export default Selected
import React from 'react'

function Selected({pokemon}) {
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
    let stats = {};
    for (let k = 0; k<pokemon.stats.length; k++){
      stats[pokemon.stats[k].stat.name] = pokemon.stats[k].base_stat;
    }


  return (
    <div className='select-container'>
        <div className='name-container flex flex-row justify-center w-[100%]'>
            <h3 className={`pokemonName text-3xl text-bold m-2`}>{name}</h3>
            <h3 className='text-3xl text-gray-400 text-bold m-2'>{`#${id}`}</h3>
        </div>
        <img src={picURL} alt={`Image of ${name}`} width={250} height={250} loading="lazy" className='pokePic'/>
        <div className='type-container flex flex-row justify-center'>
          {types.map((t) => <div className={`m-1 mt-2 p-1 px-2 rounded-md ${t} drop-shadow-md`} key={t}><h4 className='text-center text-white text-md pokemonName'>{t}</h4></div>  )}
        </div>
        <div className='body-attributes flex flex-row justify-center gap-1'>
          <h1>{"Height: " + height / 10 + "m"}</h1>
          <h1>{"Weight: " + weight / 10 + "kg"}</h1>
        </div>
        
    </div>
  )
}

export default Selected
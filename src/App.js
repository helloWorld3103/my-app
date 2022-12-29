import React, { useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import TextFile from '@mui/material/TextField';
import './App.css';
import Autocomplete from '@mui/material/Autocomplete';

function App() {
  const [data, setData] = useState([])
  const columns = [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'url',
      label: 'url'
    }
  ]
  const names = data.map(a =>{
    let properties={
      'label': a.name,
      'name':a.name
    }
    return properties;
  })
  console.log(names)
  async function getPokemones() {
    try {
      const pokemones = await axios.get('https://pokeapi.co/api/v2/pokemon')
      setData(pokemones.data.results)
    }
    catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App">
      <Button onClick={getPokemones} variant="outlined">get data</Button>
      <Autocomplete
        disablePortal
        id='autocomplete'
        options={names}
        sx={{ width: 300 }}
        renderInput={(params) => <TextFile {...params} label='Pokemones' />}
      />
      <MUIDataTable
        title={'pokemones'}
        data={data}
        columns={columns}
      />
    </div>
  );
}

export default App;

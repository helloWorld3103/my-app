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
  const names = data.map(pokemon => {
    let properties = {
      label: pokemon.name,
      value: pokemon.name
    }
    return properties;
  })

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
    <div>
      <div style={{ display: 'flex' }}>
        <Button style={{ margin: '20px' }} onClick={getPokemones} variant="outlined">get data</Button>
        <Autocomplete
          style={{ margin: '20px' }}
          disablePortal
          id='autocomplete'
          options={names}
          sx={{ width: 300 }}
          renderInput={(params) => <TextFile {...params} label='Pokemones' />}
        />
      </div>
      <div className="App">
        <MUIDataTable
          style={{ margin: '20px' }}
          title={'pokemones'}
          data={data}
          columns={columns}
          options={{
            onRowClick:(rowData,rowMeta)=>{
              const name=rowData[0]
              console.log(name)
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;

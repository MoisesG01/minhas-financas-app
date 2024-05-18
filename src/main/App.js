import React from 'react';

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'

import Rotas from './rotas';
import Navbar from '../components/navbar';

import 'primeicons/primeicons.css';

import { Button } from 'primereact/button';

class App extends React.Component {

  render() {
    return (

      <>
      <Navbar />
      <Button label="Submit" icon="pi pi-check" iconPos="right" />
      <div className='container'>
        <Rotas />
      </div>
      </>
    )
  }
}

export default App;

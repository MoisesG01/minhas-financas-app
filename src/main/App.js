import React from 'react';

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'

import Rotas from './rotas';
import Navbar from '../components/navbar';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-alt//theme.css'
import 'primereact/resources/primereact.min.css'
import ProvedorAutenticacao from './provedorAutenticacao';

class App extends React.Component {

  render() {
    return (

      <ProvedorAutenticacao>
      <Navbar />
      
      <div className='container'>
        <Rotas />
      </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;

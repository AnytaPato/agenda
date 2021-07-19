import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';


const data = [
  {id: 1, names: "Urgencias", phone: "911"},
  
  
  
  
]


class App extends React.Component {
  state = {
    data: data,
    form:{
      id: '',
      names: '',
      phone:''
    },
    modalInsertar: false,
    modalEditar: false,
  };

handleChange = e => {
  this.setState({
    form:{
    ...this.state.form,
    [e.target.name]:e.target.value
    } 
  });
}

mostrarModalInsertar=()=>{
  this.setState({modalInsertar: true});
}

ocultarModalInsertar=()=>{
  this.setState({modalInsertar: false});
}

mostrarModalEditar=(registro)=>{
  this.setState({modalEditar: true, form: registro});
}

ocultarModalEditar=()=>{
  this.setState({modalEditar: false});
}

insertar=()=>{
  var valorNuevo = this.state.form;
  valorNuevo.id = this.state.data.length+1;
  var lista = this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar: false});
}

editar =(dato)=>{
  var contador= 0; 
  var lista = this.state.data;
  lista.map((registro)=>{
    if(dato.id==registro.id){
      lista[contador].names=dato.names;
      lista[contador].phone=dato.phone;
    }
    contador++;
});
this.setState({data: lista, modalEditar: false});
}

 eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar a "+dato.names + "?");
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };


  render() {
    return (
      <>
      
      <div className="fondo">
     
      <Container>
          <div className="title">
            <h1>Agenda De Contactos</h1>
           </div>
          <div className="container">
          <br />
         

          <Table>
              <thead><tr>
              <th>Órden</th>
              <th>Nombre</th>
              <th>Número</th>
              
              </tr></thead>
          

            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.names}</td>
                  <td>{elemento.phone}</td>
                  <td><Button className="botones" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button></td>
                  <td><Button className="botones" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
                </tr>
              ))}
           </tbody>
           </Table>
         </div>

         <Button className="botones" onClick = {()=>this.mostrarModalInsertar()}>Agregar nuevo contacto</Button>
          <br />  <br /> <br />
          
       </Container>
       </div>

             <Modal isOpen={this.state.modalInsertar}>
               <div className="container">
          <ModalHeader>
           <div className="title">
            <h1>Nuevo Contacto</h1>
           </div>
          </ModalHeader>

          <ModalBody>
           <FormGroup>
            <label>id:</label>
            <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
         </FormGroup>

         <FormGroup>
          <label>Nombre:</label>
            <input className="form-control" name="names" type="text" onChange={this.handleChange}/>
         </FormGroup>

         <FormGroup>
           <label>Número:</label>
          <input className="form-control" name="phone" type="text" onChange={this.handleChange}/>
         </FormGroup>
      </ModalBody>

         <ModalFooter>
           <Button className="botones" onClick={()=>this.insertar()}>Agregar</Button>
           <Button className="botones" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
         </ModalFooter>
         </div>
      </Modal>

     <Modal isOpen={this.state.modalEditar}>
       <div className="container">
       <ModalHeader>
         <div className="title">
           <h3>Editar Contacto</h3>
         </div>
       </ModalHeader>

       <ModalBody>
         <FormGroup>
           <label>Id:</label>
           <input className="form-control" readOnly type="text" value={this.state.form.id}/>
         </FormGroup>

        
         <FormGroup>
           <label>Nombre:</label>
           <input className="form-control" name="names" type="text" onChange={this.handleChange} value={this.state.form.names}/>
         </FormGroup>

       
         <FormGroup>
           <label>Nùmero:</label>
           <input className="form-control" name="phone" type="text" onChange={this.handleChange} value={this.state.form.phone} />
         </FormGroup>
       </ModalBody>

       <ModalFooter>
       <Button  className="botones" onClick={()=>this.editar(this.state.form)}>Aceptar</Button>
       <Button className="botones" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
       </ModalFooter>
       </div>
    </Modal>  

  
  </>
  
    )
  }
};  




export default App;

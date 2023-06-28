document.addEventListener("DOMContentLoaded",init);
const URL_API='http://localhost:3000/api/';
var customers=[]

function init(){
    search()
}

function agregar(){
    clean();
    abrirForm();
}

function abrirForm(){
    htmlmodal=document.getElementById("modal");
    htmlmodal.setAttribute("class","display");
}
function cerrarModal(){
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modal-container");
}

async function search(){
    var url = URL_API+'customers';
    var response= await fetch(url,{
        "method":'GET',
        "headers":{
            "Content-Type":'application/json'
        }
    });
    customers= await response.json();

    var html=''
    for (customer of customers){
        var row = `
            <tr>
                <td>${customer.firstname}</td>
                <td>${customer.lastname}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <button class="btn btn-primary" onclick=editarCli(${customer.id})>Editar</button>
                    <button class="btn btn-danger" onclick=eliminarCli(${customer.id})>Eliminar</button>
                </td>
            </tr>
        `
        html=html+row;
    }
    
    document.querySelector('#customers> tbody').outerHTML= html
}

async function save(){
    var id=document.getElementById('txtId').value
    var data= {
        "address": document.getElementById('txtAddress').value,
        "email": document.getElementById('txtEmail').value,
        "firstname": document.getElementById('txtFirstname').value,
        "lastname": document.getElementById('txtLastname').value,
        "phone": document.getElementById('txtPhone').value
      }
    
      if(id !=''){
        data.id=id
      }
    var url = URL_API+'customers';
    await fetch(url,{
        "method":'POST',
        "body": JSON.stringify(data),
        "headers":{
           "Content-Type":'application/json'
        }
    });                
    window.location.reload();
    alert("Guardado");
}
function clean(){
    document.getElementById('txtId').value= '';
    document.getElementById('txtFirstname').value= '';
    document.getElementById('txtLastname').value= '';
    document.getElementById('txtEmail').value= '';
    document.getElementById('txtPhone').value= '';
    document.getElementById('txtAddress').value= '';
}

function editarCli(id){
    abrirForm();
    var cliente= customers.find(x => x.id==id);
    document.getElementById('txtId').value= cliente.id;
    document.getElementById('txtFirstname').value= cliente.firstname;
    document.getElementById('txtLastname').value= cliente.lastname;
    document.getElementById('txtEmail').value= cliente.email;
    document.getElementById('txtPhone').value= cliente.phone;
    document.getElementById('txtAddress').value= cliente.address;
}

async function eliminarCli(id){
    respuesta=confirm('¿Esta seguro de Elimarlo?');
    if(respuesta){
        var url = URL_API+'customers/'+id;
        await fetch(url,{
            "method":'DELETE',
            "headers":{
                "Content-Type":'application/json'
            }
        });
                
        window.location.reload();
        alert("Eliminado");
    }
}

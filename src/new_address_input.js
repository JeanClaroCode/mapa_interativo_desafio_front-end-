let inputFieldCreated = false 

export async function addNewInputAddress() {
document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'addRoute' && !inputFieldCreated) {
    console.log("Botão Rotas clicado");
    const newAddressContainer = document.querySelector('.col'); 
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'address2');
    input.setAttribute('class', 'form-control');
    input.setAttribute('placeholder', 'Insira o destino')

    newAddressContainer.appendChild(input);
    inputFieldCreated = true;
    }
  });
}
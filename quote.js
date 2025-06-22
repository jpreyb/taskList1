const CODE = 'reyrey2024';
const codeBtn = document.getElementById('codeBtn');
const codeInput = document.getElementById('code');
const cotizador = document.getElementById('cotizador');
const codeError = document.getElementById('codeError');

codeBtn.addEventListener('click', () => {
  if(codeInput.value === CODE){
    document.getElementById('acceso').style.display = 'none';
    cotizador.style.display = 'block';
  } else {
    codeError.textContent = 'C\u00f3digo incorrecto';
  }
});

function calculate(){
  let total = 0;
  document.querySelectorAll('#quote-form input[type=checkbox]:checked').forEach(ch => {
    total += parseInt(ch.value, 10);
  });
  document.getElementById('total').textContent = total.toLocaleString('es-CL');
}

document.querySelectorAll('#quote-form input[type=checkbox]').forEach(check => {
  check.addEventListener('change', calculate);
});

// Comprueba que las dos contraseñas coincidan antes de enviar el registro
const form = document.getElementById('form-registro');
 
if (form) {
    const clave1 = document.getElementById('password');
    const clave2 = document.getElementById('password2');
 
    function comprobar() {
        clave2.setCustomValidity(
            clave1.value === clave2.value ? '' : 'Las contraseñas no coinciden'
        );
    }
 
    clave1.addEventListener('input', comprobar);
    clave2.addEventListener('input', comprobar);
}
 
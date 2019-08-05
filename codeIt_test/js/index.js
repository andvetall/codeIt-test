// functon to validate entered name from user
function validateName(nameInput){
    let element = document.getElementById(nameInput)
    if(element.value.length <= 3){
        fetch('http://localhost:3000/validation').then(
            response => response.json()
        ).then(
            response => {
                for(let error in response){
                    response[error].field == 'secondname' ? alert(response[error].message) : null
                }
            }
        )
        return false
    }else return true
}
//function to validate email, send data to data base and relocate to main page
function validateEmail(form_id,email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = document.forms[form_id].elements[email].value;
    if((reg.test(address) == false) || !validateName('user-name')) {
        fetch('http://localhost:3000/validation').then(
            response => response.json()
        ).then(
            response => {
                for(let error in response){
                    response[error].field == 'email' ? alert(response[error].message) : null
                }
            }
        )
       return false
    }else{
        fetch ( 'http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify ({
                "userName": `${document.getElementById('user-name').value}`,
                "userNameTwo": `${document.getElementById('user-name-two').value}`,
                "userEmail": `${document.getElementById('user-email').value}`,
                "userGender": `${document.getElementById('user-gender').value}`,
                "userPassword": `${Sha256.hash(document.getElementById('user-password').value)}`,
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then ( response => location.href = 'main.html')
    }
}

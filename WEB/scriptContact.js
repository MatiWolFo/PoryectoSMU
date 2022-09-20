window.addEventListener('DOMContentLoaded', (e) => {

    console.log("DOM Welcome");
    //CATCH THE FORM TO RESET IT
    let form = document.querySelector(".contact-form");
    //ADD RESPONSIVITY TO THE BUTTON
    let button = document.getElementById("btn-suscribir");
    //ADDS LISTENER TO CLICK EVENT
    button.addEventListener("click", (ev) => {
        //OPENS THE TRY CATCH BLOCK TO GET VERIFICATION IF ANY ERROR IS DETECTED
        try {
            //CATCH ELEMENTS WITH ID
            let name = document.getElementById("name").value;
            //ADDS VERIFICATION IF
            if (name == null) {
                throw new Error("Please, introduce a valid data information");
            }
            let lastName = document.getElementById("lastName").value;
            if (lastName == null) {
                throw new Error("Please, introduce a valid data information");
            }
            let email = document.getElementById("email").value;
            if (email == null) {
                throw new Error("Please, introduce a valid data information");
            }
            //CATCH ELEMENTS USING FUNCTIONS
            //CATCH RADIUS AND CHECKBOX
            let stack = getStack();
            let reason = getReason();
            //CATCH TEXTAREA
            let userMessage = getUserMessage();
            //CREATE THE ARRAY WITH THE VARIABLES
            let fullForm = {
                name,
                lastName,
                email,
                stack,
                reason,
                userMessage,
                contactDate: (new Date()).toISOString()
            };
            //REGISTER THE CORRECT INPUT OF THE JSON IN THE CONSOLE
            console.dir(fullForm);
            //CALL THE SAVE FUNCTION
            saveForm(fullForm);
            //CALL THE SUCCESS FUNCTION
            successMessage("Your data has been successfuly sent.");
            //RESET TO CLEAN THE INPUTS
            form.reset();
        } catch (err) {
            //IN CASE OF ANY ERROR, TRIGGERS ERRO MESSAGE
            errorMessage(err.message);
        }
    });
});

//ASYNC SAVE FUNCTION
async function saveForm(fullForm) {
    //PERSIST THE DATA ON FIREBASE
    const url = "https://cursosmu-b2545-default-rtdb.firebaseio.com/database.json";
    //FETCH AWAIT POST TYPE IN BODY
    const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(fullForm)
    });
    const data = await respuesta.json();
    //CALL THE SUCCESS FUNCTION
    successMessage("Thanks for your message.");
}

//FUNCTION TO GET THE CHECKBOXES
function getReason() {
    //GETS THE INPUTS USING QUERYSELECTOR
    let inputReason = document.querySelectorAll("input[name='project']:checked");
    //CREATE ARRAY TO PERSIST THE ANSWERS
    let arrReason = [];
    //LOOPS THE ARRAY AND PUSHES THE SELECTIONS INTO THE LET
    for (let i = 0; i < inputReason.length; i++) {
        const reason = inputReason[i].value;
        arrReason.push(reason);
    }
    //ERROR VALIDATION
    if (inputReason == null) {
        throw new Error("Please, introduce a valid data information input");
    }
    //RETURNS THE FILLED ARRAY
    return arrReason;
}

//FUNCTION TO GET THE RADIUS
function getStack() {
    //GETS THE INPUTS USING QUERYSELECTOR
    let inputStack = document.querySelector("input[name='stack']:checked");
    //ERROR VALIDATION
    if (inputStack == null) {
        throw new Error("Please, introduce a valid data information input");
    }
    const stack = inputStack.value;
    //RETURNS THE FILLED ARRAY
    return stack;
}

//FUNCTION TO GET THE TEXTAREA
function getUserMessage() {
    //GETS THE INPUTS USING ID
    let inputMessage = document.getElementById("textarea").value;
    //ERROR VALIDATION
    if (inputMessage == null) {
        throw new Error("Please, introduce a valid data information input");
    }
    //RETURNS THE FILLED ARRAY
    return inputMessage;
}

//ERROR FUNCTION
function errorMessage(message) {
    //SHOWS THE ELEMENT USING DISPLAY
    document.getElementById("form-mensaje-error").style.display = "block";
    //GET THE ERROR MESSAGE BY ID AND TURNING IT INTO A CONST
    const ul = document.querySelector("#form-mensaje-error ul");
    //CLEAN THE ERROR MESSAGES ON SCREEN
    ul.innerHTML = "";
    //CREATES THE ELEMENT IN THE HTML
    const li = document.createElement("li");
    li.innerHTML = "";
    //AND ADDS AN ERROR STRING
    const liText = document.createTextNode(message);
    //ADDS THE TEXT INTO THE ELEMENT AS A CHILD
    li.appendChild(liText);
    ul.appendChild(li);
}

//SUCCESS FUNCTION
function successMessage(message) {
    //SHOWS THE ELEMENT USING DISPLAY
    document.getElementById("form-mensaje-exitoso").style.display = "block";
    //GET THE SUCCESS MESSAGE BY ID AND TURNING IT INTO A CONST
    const ul = document.querySelector("#form-mensaje-exitoso ul");
    //CLEAN THE MESSAGES ON SCREEN
    ul.innerHTML = "";
    //CREATES THE ELEMENT IN THE HTML
    const li = document.createElement("li");
    li.innerHTML = "";
    //AND ADDS AN SUCCESS STRING
    const liText = document.createTextNode(message);
    //ADDS THE TEXT INTO THE ELEMENT AS A CHILD
    li.appendChild(liText);
    ul.appendChild(li);
}
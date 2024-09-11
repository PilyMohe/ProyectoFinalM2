
var accounts = [
    { name: "J*** H********", balance: 500, pin: "1234" },
    { name: "P**** M********", balance: 4500, pin: "1318" },
    { name: "LL*** R****", balance: 800, pin: "6186" },
    { name: "F***** P****", balance: 10, pin: "1011" },
    { name: "R*** R***", balance: 200, pin: "0322" }
];

var currentAccount = null;

function login() {
    var accountIndex = document.getElementById("account").value;
    var pin = document.getElementById("pin").value;
    var loginMessage = document.getElementById("login-message");

    if (accounts[accountIndex].pin === pin) {
        currentAccount = accounts[accountIndex];
        document.getElementById("account-selection").style.display = "none";
        document.getElementById("actions").style.display = "block";
        loginMessage.textContent = "";
    } else {
        loginMessage.textContent = "Pin incorrecto, intenta de nuevo.";
    }
}

function logout() {
    currentAccount = null;
    document.getElementById("account-selection").style.display = "block";
    document.getElementById("actions").style.display = "none";
    document.getElementById("balance").style.display = "none";
    document.getElementById("transaction").style.display = "none";
    document.getElementById("login-message").textContent = "";
    document.getElementById("pin").value = "";
}

function checkBalance() {
    document.getElementById("balance").textContent = "Tu saldo es: $" + currentAccount.balance;
    document.getElementById("balance").style.display = "block";
    document.getElementById("transaction").style.display = "none";
}

function showDeposit() {
    document.getElementById("balance").style.display = "none";
    document.getElementById("transaction").style.display = "block";
    document.getElementById("amount").value = "";
    document.getElementById("transaction-message").textContent = "";
    document.getElementById("transaction").setAttribute("data-type", "deposit");
}

function showWithdraw() {
    document.getElementById("balance").style.display = "none";
    document.getElementById("transaction").style.display = "block";
    document.getElementById("amount").value = "";
    document.getElementById("transaction-message").textContent = "";
    document.getElementById("transaction").setAttribute("data-type", "withdraw");
}

function performTransaction() {
    var amount = parseInt(document.getElementById("amount").value);
    var transactionType = document.getElementById("transaction").getAttribute("data-type");
    var transactionMessage = document.getElementById("transaction-message");

    if (isNaN(amount) || amount <= 0) {
        transactionMessage.textContent = "Por favor ingresa una cantidad valida";
        return;
    }

    if (transactionType === "deposit") {
        if (currentAccount.balance + amount > 5000) {
            transactionMessage.textContent = "El saldo de tu cuenta no puede exceder los $5000.";
        } else {
            currentAccount.balance += amount;
            transactionMessage.textContent = "Deposito: $" + amount + ". Saldo Final: $" + currentAccount.balance;
        }
    } else if (transactionType === "withdraw") {
        if (currentAccount.balance - amount < 10) {
            transactionMessage.textContent = "Operacion no disponible, No puedes tener menos de $10.";
        } else {
            currentAccount.balance -= amount;
            transactionMessage.textContent = "Retiro: $" + amount + ". Saldo Final: $" + currentAccount.balance;
        }
    }
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("Registro de SW Exitoso", reg))
        .catch(err => console.log("Error al tratar de registrar SW", err))
}
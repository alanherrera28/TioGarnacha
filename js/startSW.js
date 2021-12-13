if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("Registro de SW Exitoso", reg))
        .catch(err => console.log("Error al tratar de registrar SW", err))
}

if (window.Notification) {
    Notification.requestPermission().then(estatus => {
        console.log(estatus);
        if (estatus == "granted") {
            let notificacion = new Notification("Tio Garnacha Te Saluda", {
                body: "Nos encanta que hayas activado las notificacions, esperamos poder ayudarte a encontrar la garnacha perfecta.",
                icon: "./img/icons/icon256.png",
                image: "./img/bg-masthead.jpg"
            });
        }
    })
}
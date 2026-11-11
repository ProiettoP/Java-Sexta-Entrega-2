class Vino {
    constructor(id, nombre, precio, cepa, stock) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cepa = cepa
        this.stock = stock
    }

    calcularPrecioConIva() {
        return this.precio * 1.21
    }

    descontarStock(cantidad) {
        if (this.stock >= cantidad) {
            this.stock = this.stock - cantidad
            return true
        } else {
            return false
        }
    }
}

let listaVino = [
    new Vino(1, "Uvas Sweet", 9788, "Torrontes", 10),
    new Vino(2, "13 Cles Reserva", 11800, "Bonarda", 8),
    new Vino(3, "Pokahara", 12300, "Bonarda", 6),
    new Vino(4, "Simonasi", 14900, "Malbec", 5),
    new Vino(5, "Gran Sombrero", 16200, "Cabernet Sauvignon", 4)
]

const aplicarDescuento = (monto, porcentaje) => monto * (1 - porcentaje / 100)

function mostrarCatalogo() {
    console.clear()
    console.log("=== CATALOGO DE VINOS DISPONIBLES ===")

    let textoAlerta = "Catalogo actual en bodega:\n\n"

    listaVino.forEach((vino) => {
        let linea = "ID: " + vino.id + " - " + vino.nombre + " (" + vino.cepa + ") - $" + vino.precio + " [Stock: " + vino.stock + "]"
        console.log(linea)
        textoAlerta = textoAlerta + linea + "\n"
    })

    console.log("=====================================")
    alert(textoAlerta)
}

function buscarPorCepa() {
    let cepaBuscada = prompt("Ingresa la cepa que deseas buscar (ej: Malbec, Bonarda, Torrontes):")

    if (cepaBuscada && cepaBuscada.trim() !== "") {
        let resultados = listaVino.filter((vino) => vino.cepa.toLowerCase().includes(cepaBuscada.trim().toLowerCase()))

        console.clear()
        console.log("=== VINOS ENCONTRADOS PARA LA CEPA: " + cepaBuscada.toUpperCase() + " ===")

        if (resultados.length > 0) {
            let mensaje = "Resultados para \"" + cepaBuscada + "\":\n\n"
            resultados.forEach((vinoEncontrado) => {
                let linea = "ID: " + vinoEncontrado.id + " - " + vinoEncontrado.nombre + " - $" + vinoEncontrado.precio + " [Stock: " + vinoEncontrado.stock + "]"
                console.log(linea)
                mensaje = mensaje + linea + "\n"
            })
            alert(mensaje)
        } else {
            console.log("No se encontraron vinos de esa cepa.")
            alert("No se encontraron vinos disponibles con esa cepa.")
        }
    }
}

function filtrarPorPrecioMaximo() {
    let precioMaximo = parseFloat(prompt("Ingresa tu presupuesto máximo por botella:"))

    if (!isNaN(precioMaximo) && precioMaximo > 0) {
        let vinosAccesibles = listaVino
            .filter((vino) => vino.precio <= precioMaximo)
            .sort((vinoA, vinoB) => vinoB.precio - vinoA.precio)

        console.clear()
        console.log("=== VINOS DE HASTA $" + precioMaximo + " ===")

        if (vinosAccesibles.length > 0) {
            let mensaje = "Vinos disponibles hasta $" + precioMaximo + ":\n\n"
            vinosAccesibles.forEach((vino) => {
                let linea = vino.nombre + " (" + vino.cepa + ") - $" + vino.precio
                console.log(linea)
                mensaje = mensaje + linea + "\n"
            })
            alert(mensaje)
        } else {
            console.log("Ningun vino coincide con el presupuesto.")
            alert("No encontramos opciones dentro de ese rango de precio.")
        }
    } else {
        alert("Monto invalido.")
    }
}

function agregarVinoAlCatalogo() {
    alert("--- Alta de nuevo vino en el catalogo ---")

    let nombre = prompt("Ingresa el nombre del vino:")
    if (nombre === null || nombre.trim() === "") {
        alert("Operacion cancelada: el nombre no puede estar vacio.")
    } else {
        let precio = parseFloat(prompt("Ingresa el precio unitario:"))
        if (isNaN(precio) || precio <= 0) {
            alert("Operacion cancelada: ingresa un precio numerico valido.")
        } else {
            let cepa = prompt("Ingresa la cepa (ej: Malbec, Torrontes, Blend):")
            if (cepa === null || cepa.trim() === "") {
                cepa = "Sin especificar"
            }

            let stock = parseInt(prompt("Ingresa la cantidad inicial de botellas en stock:"))
            if (isNaN(stock) || stock < 0) {
                alert("Operacion cancelada: ingresa un stock valido.")
            } else {
                let mayorId = 0
                listaVino.forEach((vinoActual) => {
                    if (vinoActual.id > mayorId) {
                        mayorId = vinoActual.id
                    }
                })
                let nuevoId = mayorId + 1

                const nuevoVino = new Vino(nuevoId, nombre, precio, cepa, stock)
                listaVino.push(nuevoVino)

                console.log("Nuevo vino incorporado al inventario:")
                console.log(nuevoVino)
                alert("Se agrego '" + nuevoVino.nombre + "' al catalogo con ID: " + nuevoId)
            }
        }
    }
}

function armarMenuProductos() {
    let menu = "Ingresa el ID del vino a comprar:\n\n"

    listaVino.forEach((vino) => {
        menu = menu + "ID " + vino.id + ": " + vino.nombre + " (" + vino.cepa + ") - $" + vino.precio + " [Stock: " + vino.stock + "]\n"
    })

    return menu
}

function cargarCarrito() {
    let carrito = []
    let seguirComprando = true

    while (seguirComprando) {
        let menu = armarMenuProductos()
        let idIngresado = parseInt(prompt(menu))
        let productoSeleccionado = listaVino.find((vino) => vino.id === idIngresado)

        if (productoSeleccionado) {
            if (productoSeleccionado.descontarStock(1)) {
                carrito.push(productoSeleccionado)
                alert("Agregaste: " + productoSeleccionado.nombre + " ($" + productoSeleccionado.precio + ")")
            } else {
                alert("Lo sentimos, no queda stock disponible de " + productoSeleccionado.nombre)
            }
        } else {
            alert("ID no encontrado en el catalogo.")
        }

        let respuesta = prompt("¿Deseas agregar otro producto? (si / no)")
        if (respuesta === null || respuesta.toLowerCase() !== "si") {
            seguirComprando = false
        }
    }

    let subtotal = carrito.reduce((acumuladorSubtotal, vinoSeleccionado) => acumuladorSubtotal + vinoSeleccionado.precio, 0)
    let totalConIva = carrito.reduce((acumuladorTotalIva, vinoSeleccionado) => acumuladorTotalIva + vinoSeleccionado.calcularPrecioConIva(), 0)

    return { subtotal: subtotal, totalConIva: totalConIva, carrito: carrito }
}

function procesarPago(totalConIva) {
    let medioPago = prompt(
        "Elige el metodo de pago:\n" +
        "1 - Efectivo / Transferencia (10% de descuento)\n" +
        "2 - Tarjeta de Debito (Precio de lista)\n" +
        "3 - Tarjeta de Credito en 3 cuotas (15% de recargo)"
    )

    let totalFinal = totalConIva
    let detallePago = ""

    switch (medioPago) {
        case "1":
            totalFinal = aplicarDescuento(totalConIva, 10)
            detallePago = "Efectivo / Transferencia (10% OFF)"
            break
        case "2":
            totalFinal = totalConIva
            detallePago = "Tarjeta de Debito"
            break
        case "3":
            totalFinal = totalConIva * 1.15
            detallePago = "Tarjeta de Credito (3 cuotas con 15% recargo)"
            break
        default:
            alert("Opcion no reconocida, se aplicara precio de lista.")
            detallePago = "Tarjeta de Debito (por defecto)"
            break
    }

    return { totalFinal: totalFinal, detallePago: detallePago }
}

function imprimirTicket(nombre, carrito, subtotal, iva, totalConIva, detallePago, totalFinal) {
    console.clear()
    console.log("================================")
    console.log("        RESUMEN DE COMPRA       ")
    console.log("================================")
    console.log("Cliente:            " + nombre)
    console.log("Articulos comprados:")
    carrito.forEach((itemComprado) => {
        console.log(" - " + itemComprado.nombre + " ($" + itemComprado.precio + ")")
    })
    console.log("--------------------------------")
    console.log("Subtotal sin IVA:   $" + subtotal.toFixed(2))
    console.log("IVA (21%):          $" + iva.toFixed(2))
    console.log("Total con IVA:      $" + totalConIva.toFixed(2))
    console.log("Forma de pago:      " + detallePago)
    console.log("--------------------------------")
    console.log("TOTAL FINAL:        $" + totalFinal.toFixed(2))
    console.log("================================")
}

function ejecutarVenta(nombreCliente) {
    let resultadoCarrito = cargarCarrito()
    let subtotal = resultadoCarrito.subtotal
    let totalConIva = resultadoCarrito.totalConIva
    let carrito = resultadoCarrito.carrito

    if (subtotal > 0) {
        let ivaCalculado = totalConIva - subtotal
        let resultadoPago = procesarPago(totalConIva)

        imprimirTicket(
            nombreCliente,
            carrito,
            subtotal,
            ivaCalculado,
            totalConIva,
            resultadoPago.detallePago,
            resultadoPago.totalFinal
        )

        alert("¡Venta finalizada con exito! Revisa la consola para ver el comprobante.")
    } else {
        alert("No se cargaron productos a la venta.")
    }
}

let nombreUsuario = prompt("Bienvenido al sistema de la Vinoteca. Ingresa tu nombre:")
let ejecutando = true

while (ejecutando) {
    let menu = prompt(
        "Hola " + (nombreUsuario || "Cliente") + ", selecciona una opcion:\n\n" +
        "1 - Ver catalogo completo\n" +
        "2 - Buscar vinos por cepa\n" +
        "3 - Filtrar por presupuesto maximo\n" +
        "4 - Modificar catalogo (Agregar vino)\n" +
        "5 - Ingresar venta\n" +
        "6 - Salir"
    )

    switch (menu) {
        case "1":
            mostrarCatalogo()
            break
        case "2":
            buscarPorCepa()
            break
        case "3":
            filtrarPorPrecioMaximo()
            break
        case "4":
            agregarVinoAlCatalogo()
            break
        case "5":
            ejecutarVenta(nombreUsuario || "Consumidor Final")
            break
        case "6":
        case null:
            ejecutando = false
            alert("Gracias por usar el sistema. ¡Hasta luego!")
            break
        default:
            alert("Opcion no valida. Por favor, ingresa un numero del 1 al 6.")
            break
    }
}
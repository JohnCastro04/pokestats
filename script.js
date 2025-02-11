let pokemon;
const boton = "#pulsado";
const entrada = "#pokemonInput";
const areaEstadisticas = document.querySelector("polygon#statArea");
console.log(areaEstadisticas);

const manejarBusquedaPokemon = async () => {
    pokemon = document.querySelector(entrada).value;
    pokemon = pokemon.toLowerCase().trim();

    const checkboxShiny = document.querySelector("#shiny");
    const valorShiny = checkboxShiny.checked ? "shiny" : "normal";

    if (pokemon === "nerea") {
        const estadisticas = {
            HP: "40",
            Ataque: "65",
            Defensa: "120",
            "At. Esp.": "110",
            "Def. Esp.": "130",
            Velocidad: "50"
        };
        const estadisticasFormato = generarEstadisticasFormato(estadisticas, formatoDeseado);
        const maxEstadisticas = Math.max(...Object.values(estadisticasFormato)); // Obtiene el valor máximo
        const contenedorImagen = document.querySelector("#pokemonImage");
        const img = document.createElement("img");
        if (valorShiny == "shiny") {
            img.src = "https://www.sdpnoticias.com/resizer/v2/BQKVYO5VBFGKNMVKLJVXKRZXV4.jpeg?smart=true&auth=eb6f9564402adc93d52cea13ffef7599959ac0976a81a13ac7f7c92750862bfa&width=768&height=1152";
        } else {
            img.src = "https://static.vecteezy.com/system/resources/thumbnails/041/713/515/small_2x/ai-generated-inquisitive-raccoon-with-a-curious-gaze-on-transparent-background-stock-png.png";
        }

        img.alt = "Nerea";
        contenedorImagen.innerHTML = ""; // Limpiar cualquier imagen anterior
        contenedorImagen.appendChild(img);

        // Calcular puntos del polígono en función de las estadísticas
        const calcular = () => {
            return angulos.map((angulo, i) => {
                const valorEstadistica = Object.values(estadisticasFormato)[i];
                const ratioValor = valorEstadistica / maxEstadisticas;
                const r = radio * ratioValor;
                const x = r * Math.sin((angulo * Math.PI) / 180);
                const y = -r * Math.cos((angulo * Math.PI) / 180);
                return `${x},${y}`;
            }).join(" ");
        };

        // Dibujar el área de estadísticas
        areaEstadisticas.setAttribute("points", calcular());
    } else if (pokemon === "matías" || pokemon === "matias") {
        pokemon = document.querySelector(entrada).value;
        pokemon = pokemon.toLowerCase().trim();
    
        const checkboxShiny = document.querySelector("#shiny");
        const valorShiny = checkboxShiny.checked ? "shiny" : "normal";
    
        if (pokemon === "matías" || pokemon === "matias") {
            const estadisticas = {
                HP: "90",
                Ataque: "75",
                Defensa: "120",
                "At. Esp.": "110",
                "Def. Esp.": "65",
                Velocidad: "80"
            };
            const estadisticasFormato = generarEstadisticasFormato(estadisticas, formatoDeseado);
            const maxEstadisticas = Math.max(...Object.values(estadisticasFormato)); // Obtiene el valor máximo
            const contenedorImagen = document.querySelector("#pokemonImage");
            const img = document.createElement("img");
            if (valorShiny == "shiny") {
                img.src = "https://i.pinimg.com/originals/ed/da/5f/edda5fa03fac2bdaaadb159eb0c22dc8.jpg";
            } else {
                img.src = "https://png.pngtree.com/png-vector/20230915/ourmid/pngtree-duck-face-frames-animal-face-png-image_10083760.png";
            }
    
            img.alt = "Matías";
            contenedorImagen.innerHTML = ""; // Limpiar cualquier imagen anterior
            contenedorImagen.appendChild(img);
    
            // Calcular puntos del polígono en función de las estadísticas
            const calcular = () => {
                return angulos.map((angulo, i) => {
                    const valorEstadistica = Object.values(estadisticasFormato)[i];
                    const ratioValor = valorEstadistica / maxEstadisticas;
                    const r = radio * ratioValor;
                    const x = r * Math.sin((angulo * Math.PI) / 180);
                    const y = -r * Math.cos((angulo * Math.PI) / 180);
                    return `${x},${y}`;
                }).join(" ");
            };
    
            // Dibujar el área de estadísticas
            areaEstadisticas.setAttribute("points", calcular());
        }
    } else {
        try {
            const estadisticas = await obtenerEstadisticas(pokemon);
            const estadisticasFormato = generarEstadisticasFormato(estadisticas, formatoDeseado);
            const maxEstadisticas = Math.max(...Object.values(estadisticasFormato)); // Obtiene el valor máximo

            // Calcular puntos del polígono en función de las estadísticas
            const calcular = () => {
                return angulos.map((angulo, i) => {
                    const valorEstadistica = Object.values(estadisticasFormato)[i];
                    const ratioValor = valorEstadistica / maxEstadisticas;
                    const r = radio * ratioValor;
                    const x = r * Math.sin((angulo * Math.PI) / 180);
                    const y = -r * Math.cos((angulo * Math.PI) / 180);
                    return `${x},${y}`;
                }).join(" ");
            };

            // Dibujar el área de estadísticas
            areaEstadisticas.setAttribute("points", calcular());

            // Obtener imagen del pokemon
            imagenPokemon = await formatoPokemon(pokemon);
            const contenedorImagen = document.querySelector("#pokemonImage");
            const img = document.createElement("img");
            img.src = `https://img.pokemondb.net/sprites/home/${valorShiny}/${imagenPokemon}.png`;
            img.alt = pokemon;
            contenedorImagen.innerHTML = ""; // Limpiar cualquier imagen anterior
            contenedorImagen.appendChild(img);
        } catch (error) {
            alert("No se encontró el Pokémon o está mal introducido.");
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(boton).addEventListener("click", manejarBusquedaPokemon);
    document.querySelector(entrada).addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            manejarBusquedaPokemon();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.altKey && (event.key === "s" || event.key === "S")) {
            const checkboxShiny = document.querySelector("#shiny");
            checkboxShiny.checked = !checkboxShiny.checked;
        }
    });

    const checkboxShiny = document.querySelector("#shiny");
    checkboxShiny.addEventListener("change", manejarBusquedaPokemon); // Añadir eventListener al checkbox
});

const obtenerEstadisticas = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) {
        throw new Error("Pokémon no encontrado");
    }
    const data = await response.json();

    const estadisticas = {
        HP: data.stats[0].base_stat,
        Ataque: data.stats[1].base_stat,
        Defensa: data.stats[2].base_stat,
        "At. Esp.": data.stats[3].base_stat,
        "Def. Esp.": data.stats[4].base_stat,
        Velocidad: data.stats[5].base_stat
    };

    return estadisticas;
};

const formatoPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) {
        throw new Error("Pokémon no encontrado");
    }
    const data = await response.json();

    const pokemonMinus = data.name.toLowerCase();

    return pokemonMinus;
};

const formatoDeseado = ["HP", "Ataque", "Defensa", "Velocidad", "Def. Esp.", "At. Esp."];

// Método para reordenar stats según el orden especificado
const generarEstadisticasFormato = (estadisticas, orden) => {
    return Object.fromEntries(
        orden.map((key) => [key, estadisticas[key]])
    );
};

const angulos = [0, 60, 120, 180, 240, 300]; // Ángulos de cada punto del hexágono
const radio = 90; // Radio del hexágono

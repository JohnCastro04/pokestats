let pokemon;
const button = "#pulsado";
const input = "#pokemonInput";
const statArea = document.querySelector("polygon#statArea");
console.log(statArea);

const handlePokemonSearch = async () => {
    pokemon = document.querySelector(input).value;
    pokemon = pokemon.toLowerCase().trim();

    const shinyCheckbox = document.querySelector("#shiny");
    const valorShiny = shinyCheckbox.checked ? "shiny" : "normal";


    if (pokemon === "nerea") {
        const stats = {
            HP: "40",
            Ataque: "65",
            Defensa: "120",
            "At. Esp.": "110",
            "Def. Esp.": "130",
            Velocidad: "50"
        };
        const statsFormato = generarStatsFormato(stats, formatoDeseado);
        const maxStats = Math.max(...Object.values(statsFormato)); // Obtiene el valor máximo
        const imgContainer = document.querySelector("#pokemonImage");
        const img = document.createElement("img");
        if (valorShiny == "shiny") {
            img.src = "https://www.sdpnoticias.com/resizer/v2/BQKVYO5VBFGKNMVKLJVXKRZXV4.jpeg?smart=true&auth=eb6f9564402adc93d52cea13ffef7599959ac0976a81a13ac7f7c92750862bfa&width=768&height=1152";
            alert("¡Perdiste!");
        } else {
            img.src = "https://static.vecteezy.com/system/resources/thumbnails/041/713/515/small_2x/ai-generated-inquisitive-raccoon-with-a-curious-gaze-on-transparent-background-stock-png.png";
        }

        img.alt = "Nerea";
        imgContainer.innerHTML = ""; // Limpiar cualquier imagen anterior
        imgContainer.appendChild(img);

        // Calcular puntos del polígono en función de las estadísticas
        const calcular = () => {
            return angles.map((angle, i) => {
                const statValue = Object.values(statsFormato)[i];
                const valueRatio = statValue / maxStats;
                const r = radius * valueRatio;
                const x = r * Math.sin((angle * Math.PI) / 180);
                const y = -r * Math.cos((angle * Math.PI) / 180);
                return `${x},${y}`;
            }).join(" ");
        };

        // Dibujar el área de estadísticas
        statArea.setAttribute("points", calcular());
    } else {
        const stats = await obtenerEstadisticas(pokemon);
        const statsFormato = generarStatsFormato(stats, formatoDeseado);
        const maxStats = Math.max(...Object.values(statsFormato)); // Obtiene el valor máximo

        // Calcular puntos del polígono en función de las estadísticas
        const calcular = () => {
            return angles.map((angle, i) => {
                const statValue = Object.values(statsFormato)[i];
                const valueRatio = statValue / maxStats;
                const r = radius * valueRatio;
                const x = r * Math.sin((angle * Math.PI) / 180);
                const y = -r * Math.cos((angle * Math.PI) / 180);
                return `${x},${y}`;
            }).join(" ");
        };

        // Dibujar el área de estadísticas
        statArea.setAttribute("points", calcular());

        // Obtener imagen del pokemon
        pokemonImagen = await pokemonFormato(pokemon);
        const imgContainer = document.querySelector("#pokemonImage");
        const img = document.createElement("img");
        img.src = `https://img.pokemondb.net/sprites/home/${valorShiny}/${pokemonImagen}.png`;
        img.alt = pokemon;
        imgContainer.innerHTML = ""; // Limpiar cualquier imagen anterior
        imgContainer.appendChild(img);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(button).addEventListener("click", handlePokemonSearch);
    document.querySelector(input).addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handlePokemonSearch();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.altKey && (event.key === "s" || event.key === "S")) {
            const shinyCheckbox = document.querySelector("#shiny");
            shinyCheckbox.checked = !shinyCheckbox.checked;
        }
    });
});

const obtenerEstadisticas = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();

    const stats = {
        HP: data.stats[0].base_stat,
        Ataque: data.stats[1].base_stat,
        Defensa: data.stats[2].base_stat,
        "At. Esp.": data.stats[3].base_stat,
        "Def. Esp.": data.stats[4].base_stat,
        Velocidad: data.stats[5].base_stat
    };

    return stats;
};

const pokemonFormato = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();

    const pokemonMinus = data.name.toLowerCase();

    return pokemonMinus;
};

const formatoDeseado = ["HP", "Ataque", "Defensa", "Velocidad", "Def. Esp.", "At. Esp."];

// Método para reordenar stats según el orden especificado
const generarStatsFormato = (stats, orden) => {
    return Object.fromEntries(
        orden.map((key) => [key, stats[key]])
    );
};

const angles = [0, 60, 120, 180, 240, 300]; // Ángulos de cada punto del hexágono
const radius = 90; // Radio del hexágono

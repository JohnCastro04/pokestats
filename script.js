let pokemon;
const button = "#pulsado";  
const input = "#pokemonInput"; 
const statArea = document.querySelector("polygon#statArea");
console.log(statArea);  

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(button).addEventListener("click", async () => {
        pokemon = document.querySelector(input).value;
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

const formatoDeseado = ["HP", "Ataque", "Defensa", "Velocidad", "Def. Esp.", "At. Esp."];

// Método para reordenar stats según el orden especificado
const generarStatsFormato = (stats, orden) => {
    return Object.fromEntries(
        orden.map((key) => [key, stats[key]])
    );
};

const angles = [0, 60, 120, 180, 240, 300]; // Ángulos de cada punto del hexágono
const radius = 90; // Radio del hexágono

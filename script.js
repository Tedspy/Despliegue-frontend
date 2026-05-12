document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('equipos-grid');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');

    // URL del backend
    const API_URL = 'http://localhost:3000/api/equipos';

    // Función para obtener los datos
    const fetchEquipos = async () => {
        try {
            // Se simula un pequeño retraso para ver la animacion de carga
            await new Promise(resolve => setTimeout(resolve, 800));

            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const equipos = await response.json();
            
            // Ocultar loader y mostrar grid
            loader.classList.add('hidden');
            grid.classList.remove('hidden');
            
            renderEquipos(equipos);

        } catch (error) {
            console.error('Error al cargar equipos:', error);
            loader.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
    };

    // Función para renderizar las tarjetas de los equipos en el DOM
    const renderEquipos = (equipos) => {
        equipos.forEach(equipo => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Usamos el primer color del equipo como acento de la tarjeta
            const mainColor = equipo.colores[0];
            card.style.setProperty('--team-color', mainColor);

            // Generar los indicadores de colores del equipo
            const coloresHTML = equipo.colores.map(color => 
                `<div class="color-dot" style="background-color: ${color};" title="Color del equipo"></div>`
            ).join('');

            card.innerHTML = `
                <h2 class="team-name">${equipo.nombre}</h2>
                <div class="team-info">
                    <div class="info-item">
                        <span>Ciudad</span>
                        <span>${equipo.ciudad}</span>
                    </div>
                    <div class="info-item">
                        <span>Estadio</span>
                        <span>${equipo.estadio}</span>
                    </div>
                    <div class="info-item">
                        <span>Fundación</span>
                        <span>${equipo.fundacion}</span>
                    </div>
                </div>
                <div class="color-dots">
                    ${coloresHTML}
                </div>
            `;

            grid.appendChild(card);
        });
    };

    // Iniciar la petición
    fetchEquipos();
});

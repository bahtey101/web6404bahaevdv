async function fetchNotes() {
    const apiUrl = "http://localhost:8000/notes";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const result = await response.json();
        const gridContainer = document.querySelector('.grid');
        gridContainer.innerHTML = '';

        result.data.forEach(note => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.date}</p>
            `;
            gridContainer.appendChild(card);
        });
    } catch (error) {
        // Обработка ошибок
        console.error('Произошла ошибка:', error);

        // Показ сообщения об ошибке пользователю
        const gridContainer = document.querySelector('.grid');
        gridContainer.innerHTML = `
            <div>
                <p>Не удалось загрузить данные. Попробуйте обновить страницу.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', fetchNotes);
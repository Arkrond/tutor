document.addEventListener('DOMContentLoaded', function () {
  // Обробка форми
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Тут додати логіку обробки форми
    console.log('Form submitted');
  });

  // Плавна прокрутка для навігації
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Отримуємо цитату при завантаженні сторінки
  getPhysicsQuote();
  
  // Оновлюємо цитату кожні 24 години
  setInterval(getPhysicsQuote, 24 * 60 * 60 * 1000);
});

async function getPhysicsQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random?tags=science,technology');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayQuote(data);
    } catch (error) {
        console.error('Помилка отримання цитати:', error);
        // Display a fallback quote
        displayQuote({
            content: "The important thing is not to stop questioning. Curiosity has its own reason for existence.",
            author: "Albert Einstein"
        });
    }
}

function displayQuote(data) {
    const quoteContainer = document.getElementById('quoteContainer');
    
    quoteContainer.innerHTML = `
        <h3>Цитати відомих фізиків</h3>
        <blockquote>
            "${data.content}"
            <footer>- ${data.author}</footer>
        </blockquote>
    `;
} 

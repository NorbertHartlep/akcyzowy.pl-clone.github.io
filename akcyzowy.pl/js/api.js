const url = 'https://api.nbp.pl/api/exchangerates/tables/A/';

// Funkcja do pobierania kursów walut z API NBP
async function pobierzKursy() {
    try {
        const response = await fetch(url); // Wywołanie API
        const data = await response.json(); // Przetworzenie odpowiedzi na format JSON

        if (response.ok) {
            // Pobranie kursów walut z pierwszego rekordu w tabeli
            const kursy = data[0].rates;

            // Znajdowanie kursów odpowiednich walut i zapisywanie w mapie
            const waluty = new Map();
            waluty.set('eur', kursy.find(kurs => kurs.code === 'EUR').mid);
            waluty.set('gbp', kursy.find(kurs => kurs.code === 'GBP').mid);
            waluty.set('usd', kursy.find(kurs => kurs.code === 'USD').mid);
            waluty.set('chf', kursy.find(kurs => kurs.code === 'CHF').mid);

            // Wyświetlenie kursów
            console.log('EUR:', waluty.get('eur'));
            console.log('GBP:', waluty.get('gbp'));
            console.log('USD:', waluty.get('usd'));
            console.log('CHF:', waluty.get('chf'));

            // Zwrócenie mapy z kursami walut
            return waluty;
        } else {
            throw new Error('Wystąpił błąd podczas pobierania danych.');
        }
    } catch (error) {
        console.log('Wystąpił błąd:', error.message);
    }
}

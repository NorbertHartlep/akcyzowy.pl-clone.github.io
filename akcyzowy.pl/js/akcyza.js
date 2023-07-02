badania = 100;
let wybranaWaluta;
let tablice_wywozowe;
tlumaczenie_dokumentow = 150;
oplata_komunikacyjna = 256;
let cenaSamochodu;
const radioInputs = document.querySelectorAll('input[name="waluta"]');

radioInputs.forEach(function (input) {
    input.addEventListener('change', function () {
        if (this.checked) {
            wybranaWaluta = this.value.toLowerCase();
            console.log('Wybrana waluta:', wybranaWaluta);
        }
    });

    document.getElementById("akcyza").addEventListener("submit", function (event) {
        event.preventDefault();

        document.getElementById("akf").style.display = "none";
        document.getElementById("innyDiv").style.display = "block";
    });
});
document.getElementById("akcyza").addEventListener("submit", async function (event) {
    event.preventDefault(); // Zatrzymuje domyślne zachowanie formularza (nie będzie przekierowania do akcyza.php)

    var rodzajNapedu = document.querySelector('input[name="auto"]:checked').value;

    var waluta = document.querySelector('input[name="waluta"]:checked').value;

    var cenaSamochodu = document.getElementById("cena").value;

    var rodzajTablic = document.getElementById("tablice").value;

    console.log("Rodzaj napędu: " + rodzajNapedu);
    console.log("Wybrana waluta: " + waluta);
    console.log("Wartość samochodu: " + cenaSamochodu);
    console.log("Rodzaj tablic wywozowych: " + rodzajTablic);

    const kursy = await pobierzKursy();

    kurs = kursy.get(waluta);
    console.log(kurs);
    console.log(kursy);
    obliczAkcyze(kurs, cenaSamochodu, tablice_wywozowe, rodzajNapedu, rodzajTablic);
});

function hybryda(kwota) {
    return kwota / 2;
}

function obliczAkcyze(kurs, cenaSamochodu, rodzajTablic, rodzajNapedu, rodzajTablic) {
    console.log(kurs);
    let cenaSamochoduWPln = kurs * cenaSamochodu;
    let akcyza;
    let tablice;

    if (rodzajNapedu == 'spalinowy-maly') {
        akcyza = cenaSamochoduWPln * 0.031;
    } else if (rodzajNapedu == 'spalinowy-dlugi') {
        akcyza = cenaSamochoduWPln * 0.186;
    } else {
        akcyza = 0;
    }

    if (rodzajTablic == 'zolte') {
        tablice = 350;
    } else if (rodzajTablic == 'czerwone') {
        tablice = 120;
    } else {
        tablice = 0;
    }

    var checkboxElement = document.getElementById('hybryda_0');
    console.log(tablice);
    if (checkboxElement.checked) { akcyza = akcyza / 2 }
    else { }
    cena = tlumaczenie_dokumentow + oplata_komunikacyjna + cenaSamochoduWPln + akcyza + tablice;
    document.getElementById('wartoscKosztZakupu').textContent = cenaSamochoduWPln.toFixed(2) + "zł";
    document.getElementById('wartoscTabliceWywozowe').textContent = tablice.toFixed(2) + "zł";
    document.getElementById('wartoscBadanieTechniczne').textContent = badania.toFixed(2) + "zł";
    document.getElementById('wartoscTlumaczenieDokumentow').textContent = tlumaczenie_dokumentow.toFixed(2) + "zł";
    document.getElementById('wartoscOplataKomunikacyjna').textContent = oplata_komunikacyjna.toFixed(2) + "zł";
    document.getElementById('wartoscUCAkcyza').textContent = akcyza.toFixed(2) + "zł";
    document.getElementById('wartoscKosztyRazem').textContent = cena.toFixed(2) + "zł";
    return cena;

}








document.addEventListener("DOMContentLoaded", function() {
    const heureNormaleInput = document.getElementById("heureNormale");
    const centiemeInput = document.getElementById("centieme");
    const convertButton = document.getElementById("convertButton");
    const clearButton = document.getElementById("clearButton");
    const errorMessage = document.getElementById("errorMessage");

    convertButton.addEventListener("click", function() {
        const heureNormale = heureNormaleInput.value;
        const centieme = centiemeInput.value;

        // Vérification des caractères saisis
        if (!validateInput(heureNormale) || !validateInput(centieme)) {
            errorMessage.textContent = "Caractères non valides. Utilisez uniquement des chiffres, des points et ':'";
            return;
        }

        if (heureNormale !== "") {
            const parts = heureNormale.split(":");
            if (parts.length === 2) {
                const heures = parseInt(parts[0]);
                const minutes = parseFloat(parts[1]);
                const centiemes = (heures * 60 + minutes) * 100 / 60;
                const centiemesFormatted = heures + ":" + ((minutes * 100) / 60).toFixed(0);
                centiemeInput.value = centiemesFormatted;
                errorMessage.textContent = "";
            } else {
                errorMessage.textContent = "Format d'heure incorrect (hh:mm).";
            }
        } else if (centieme !== "") {
            const parts = centieme.split(":");
            if (parts.length === 2) {
                const heures = parseInt(parts[0]);
                const centiemes = parseFloat(parts[1]);
                const minutes = (centiemes * 60) / 100;
                const heuresFormatted = heures + ":" + (minutes < 10 ? "0" : "") + minutes;
                heureNormaleInput.value = heuresFormatted;
                errorMessage.textContent = "";
            } else {
                errorMessage.textContent = "Format de centième incorrect (hh:cent.).";
            }
        } else {
            errorMessage.textContent = "Remplissez un des deux champs.";
        }
    });

    // Fonction pour valider les caractères saisis
    function validateInput(input) {
        return /^[0-9:.]*$/.test(input);
    }

    clearButton.addEventListener("click", function() {
        heureNormaleInput.value = "";
        centiemeInput.value = "";
        errorMessage.textContent = "";
    });
});

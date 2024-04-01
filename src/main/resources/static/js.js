
function getFilmer(){
    $.get("/getFilm", function (filmer){
        formaterFilmer(filmer);
    })
    function formaterFilmer (filmer){
        let ut = "<select id='film'>";
        for(const film of filmer){
            ut+= "<option value='" + film + "'>" + film + "</option>";
        }
        ut+= "</select>";
        $("#filmInn").html(ut);
    }
}
function validateogSubmit() {

    const filmSelect = $("#filmSelect").val();
    const antall = $("#antall").val();
    const forNavn = $("#fornavn").val();
    const etterNavn = $("#etternavn").val();
    const telefonNr = $("#tlfnr").val();
    const email = $("#email").val();

    console.log(filmSelect)
    let feilMelding;

    let allGood = true;
    if (filmSelect === "" || antall === "" || forNavn === "" || etterNavn === "" || telefonNr === "" || email === "") {
        $("#feilMeldingAntall").text('"Må skriv noe inn i antall"');
        $("#feilMeldingfornavn").text('"Må skriv noe inn i fornavn"');
        $("#feilMeldingetternavn").text('"Må skriv noe inn i etternavn"');
        $("#feilMeldingtlfnr").text('"Må skriv noe inn i telefonnr"');
        $("#feilMeldingemail").text('"Må skriv noe inn i email"');
        return;
    }
    if ( antallBilleter.val() <= 0) {
        alert("Skriv gyldig tall for billetter.")
        return;
    }
    const tlfnRgl = /^[0-9]{8}$/;
    if (!tlfnRgl.test(telefonNr)) {
        alert("Skriv inn et gyldig telefonnummer.");
        return;
    }

    // kontrol av email formatt
    const emailRgl = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRgl.test(email)) {
        alert("Skriv inn et gyldig epost adresse.");
        return;
    }

    if (fornavn.val() === "") {
        feilMelding = "Må skrives noe inn i fornavnet."
        $("#manglerFornavn").html(feilMelding);
        console.log("feil i fornavn");
        allGood = false;
    } else {
        console.log("suksess for fornavn");
        feilMelding = "";
        $("#manglerFornavn").html(feilMelding);
    }
    if (etternavn.val() === "") {
        feilMelding = "Må skrives noe inn i etternavn."
        $("#manglerEtternavn").html(feilMelding);
        console.log("feil for etternavn");
        allGood = false;
    } else {
        console.log("suksess for etternavn");
        feilMelding = ""
        $("#manglerEtternavn").html(feilMelding);
    }
    if (telefon.val() === "") {
        feilMelding = "Må skrives noe inn i telefon nummer."
        $("#manglerTelefon").html (feilMelding);
        console.log("feil for telefon nummer");
        allGood = false;
    } else {
        console.log("suksess for telefon nummer");
        feilMelding = "";
        $("#manglerTelefon").html(feilMelding);
    }
    if (epost.val() === "") {
        feilMelding = "Må skrive gyldig epost."
        $("#manglerEpost").html(feilMelding);
        console.log("feil for epost");
        allGood = false;
    } else {
        console.log("suksess for epost");
        feilMelding = "";
        $("#manglerEpost").html(feilMelding);
    }
    if (allGood) {
        const billett = {
            filmS: film.val(),
            antallBilleterS: antallBilleter.val(),
            fornavnS: fornavn.val(),
            etternavnS: etternavn.val(),
            telefonS: telefon.val(),
            epostS: epost.val()
        };

        $.post("/kjop", billett, function () {
            hentAlle()
            console.log("Etter post")
        })

        $("#film").val(""),
            $("#antall").val(""),
            $("#fornavn").val(""),
            $("#etternavn").val(""),
            $("#telefon").val(""),
            $("#epost").val("")

        function hentAlle() {
            $.get("/hentAlle", function (data) {
                formaterData(data);
            });
        }

        function formaterData(billetter) {
            let utData = "<table class='table table-striped'><tr><th> Film </th><th>Antall</th>" +
                "<th> Fornavn </th><th> Etternavn </th><th> Telefon </th> " +
                "<th> Epost </th></tr>";
            for (const b of billetter) {
                utData += "<tr> <td>" + b.filmS + "</td> <td>" + b.antallBilleterS + "</td> <td>" +
                    b.fornavnS + "</td> <td>" + b.etternavnS + "</td> <td>" +
                    b.telefonS + "</td> <td>" + b.epostS + "</td> </tr>";
            }
            utData += "</table>";
            $("#visBilleter").show();
            $("#kjopteBilletter").html(utData);

        }
    }
}

function slettBilletter() {
    //const ok=confirm("Sikker på å slette alle billettene?");
    //if(ok){
    $.get( "/slettAlle", function() {
        //hentAlle();
        $("#kjopteBilletter").html("");
    });
    //}
}

function translate() {
    $("#translate").click(function () {
        let url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyDZPP2pokVpAEMTOq6WRrYp3eUd7cU1O90";
        url += "&source=" + $("#source-language").val();
        url += "&target=" + $("#target-language").val();
        url += "&q=" + escape($("#text-to-translate").val());
        $.get(url, function (data, status) {
            $("#display-translated-text").val(data.data.translations[0].translatedText);
        });  
    });
}

function setLanguage(results) {
    let country_name = results[0].address_components[results[0].address_components.length - 1].short_name;
    let source_language = countries[country_name].languages[0];
    let target_language = navigator.language;
    if(target_language.substr(0,2) === "en") {
        target_language = "en";
    }
    console.log(`source language: ${source_language} \n target language: ${target_language}`);
    document.getElementById("source-language").value = source_language;
    document.getElementById("target-language").value = target_language;
}

function switchLanguage() {
    $("#switch-language").click(function() {
        let source_language = document.getElementById("source-language").value;
        let target_language = document.getElementById("target-language").value;
        document.getElementById("source-language").value = target_language;
        document.getElementById("target-language").value = source_language;
    }); 
}

function watchTranslate() {
    switchLanguage();
    translate();
}

$(watchTranslate);
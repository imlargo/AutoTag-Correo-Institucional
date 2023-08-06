//Creado por @im largo

const allLabels = {

    "Institucional": {
        "Vicerrectoria": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Secretaria de Sede": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Representacion Estudiantil": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
    },

    "Otros": {
        "Post Master": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Periodico UNAL": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "DINARA": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Direccion Academica": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Direccion de Relaciones Exteriores": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Educacion Continua": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Bienestar/Cultura": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
    },

    "Informa Facultades":
    {
        "Facultad Minas": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Facultad Ciencias": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Facultad Artes y Arquitectura": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
        "Facultad Humanas": ["correo@correo.com", "correo2@correo.com"], //Sin correos por motivos de privacidad
    },
}

const colors = {
    "Institucional": {
        "textColor": "#000000",
        "backgroundColor": "#98d7e4",
      },
    "Otros": {
        "textColor": "#ffffff",
        "backgroundColor": "#fbd3e0",
      },
    "Informa Facultades": {
        "textColor": "#000000",
        "backgroundColor": "#e7e7e7",
      },
}

function addFiltro(mail, label_id) {
    Gmail.Users.Settings.Filters.create({
        criteria: {
            from: mail // Reemplaza con la dirección de correo deseada
        },
        action: {
            addLabelIds: [label_id],
            shouldArchive: false
        }
    }, "me");
}

function addLabels() {
    for (const bigLabelname in allLabels) {
        const subTags = allLabels[bigLabelname];

        const bigLabel = Gmail.Users.Labels.create({
            "name": bigLabelname,
            "color": colors[bigLabelname]
        }, "me")

        for (const subEtiqueta in subTags) {
            const subLabel = Gmail.Users.Labels.create({
                "name": (bigLabelname + "/" + subEtiqueta),
                "color": colors[bigLabelname]
            }, "me")

            for (const mail of subTags[subEtiqueta]) {
                addFiltro(mail, subLabel.id)
            }
        }
    }
}

function doGet() {
    return HtmlService.createHtmlOutputFromFile('Estructura');
}

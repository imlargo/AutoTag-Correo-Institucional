//Creado por @im largo

const allLabels = {
    "Semestre 2023-2S": { },

    "Institucional": {
        "Vicerrectoria": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Secretaria de Sede": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Representacion Estudiantil": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
    },

    "Otros": {
        "Post Master": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Periodico UNAL": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "DINARA": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Direccion Academica": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Direccion de Relaciones Exteriores": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Educacion Continua": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Bienestar/Cultura": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
    },

    "Informa Facultades":
    {
        "Facultad Minas": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Facultad Ciencias": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Facultad Artes y Arquitectura": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
        "Facultad Humanas": ["infoprivada@gmail.com", "nosepuedemostrar@unal.edu.co", "yaper@unal.edu"],
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

    "Semestre 2023-2S": {
        "textColor": "#000000",
        "backgroundColor": "#b99aff",
    }    
}

function addFiltro(mail, label_id) {
    Gmail.Users.Settings.Filters.create({
        criteria: {
            from: mail // Reemplaza con la dirección de correo deseada
        },
        action: {
            addLabelIds: [label_id], //'STARRED'
            shouldArchive: false
        }
    }, "me");
}

function addLabels(allLabel) {
    
    for (const bigLabelname in allLabel) {
        const subTags = allLabel[bigLabelname];
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

function getData() {
  return allLabels
}

function doGet() {
    return HtmlService.createHtmlOutputFromFile('index');
}
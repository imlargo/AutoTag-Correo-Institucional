//Trabajando en mejorar los permisos
//Creado por @im largo

let addedLabels = []
let label_name;

let sub_Materias = [
    ["Materia", ["Correo"]],
    ["Materia", ["Correo"]],
]

let sub_facultades = [
    ["Facultad Minas", ["informa_fac_minas@unal.edu.co"]],
    ["Facultad Ciencias", ["informa_fac_ciencias@unal.edu.co"]],
    ["Facultad Artes y Arquitectura", ["informa_fac_arquitectura@unal.edu.co"]],
    ["Facultad Humanas", ["informa_fac_ciencias_humanas_y_economicas@unal.edu.co"]],
]

let sub_Otros = [
    ["Post Master", ["postmaster_unal@unal.edu.co"]],
    ["Periodico UNAL", ["infeducontinua@unal.edu.co"]],
    ["DINARA", ["comdninfoa_nal@unal.edu.co"]],
    ["Direccion Academica", ["informa_direccion_academica@unal.edu.co"]],
    ["Direccion de Relaciones Exteriores", ["dre@unal.edu.co"]],
    ["Educacion Continua", ["infeducontinua@unal.edu.co"]],
    ["Bienestar/Cultura", ["logcultura_med@unal.edu.co", "ccultura_med@unal.edu.co"]],
]

let sub_I = [
    ["", [""]],
]

let sub_Institucional = [
    ["Vicerrectoria", ["informa_vicerrectoria@unal.edu.co"]],
    ["Secretaria de Sede", ["informa_secretaria_sede@unal.edu.co"]],
    ["Representacion Estudiantil", ["reestudia_med@unal.edu.co", "estudiantilca@unal.edu.co", "estudiantilcsu@unal.edu.co",]],
]

let Labels = {
    "Institucional": sub_Institucional,
    "Otros": sub_Otros,
    "Informa Facultades": sub_facultades
}

function LabelId(Etiqueta) {
    var request = Gmail.Users.Labels.list('me');
    var name, id;
    for (var l = 0; l < request.labels.length; l++) {
        name = request.labels[l].name;
        id = request.labels[l].id;
        if (name === Etiqueta) {
            return id
        }
    }
}

function addFiltro(Correo, Id_Label) {
    var filter = {
        criteria: {
            from: Correo // Reemplaza con la dirección de correo deseada
        },
        action: {
            addLabelIds: [Id_Label], // Reemplaza con el ID de la etiqueta deseada
            shouldArchive: false
        }
    };
    Gmail.Users.Settings.Filters.create(filter, "me");
}

function Prueba() {
    console.log("tesssss")
}

function addLabels() {
    for (let key of Object.keys(Labels)) {
        GmailApp.createLabel(key)

        let Sub_Etiquetas = Labels[key]

        Sub_Etiquetas.forEach(subLabel => {
            label_name = (key + "/" + subLabel[0])
            GmailApp.createLabel(label_name)

            let Id_Etiqueta = LabelId(label_name)
            let Correos = subLabel[1]

            Correos.forEach(correo => {
                addFiltro(correo, Id_Etiqueta)
            });

            let Check = { "Nombre": label_name, "Correos": Correos }
            addedLabels.push(Check)
        });
    }
    console.log(addedLabels)
}

function getGmailFilters() {
    var filters = Gmail.Users.Settings.Filters.list("me").filter;
    for (var i = 0; i < filters.length; i++) {
        var filter = filters[i];
        Logger.log("Filtro " + (i + 1) + ":");
        Logger.log("  ID: " + filter.id);
        Logger.log("  From: " + filter.criteria.from);
        Logger.log("  To: " + filter.criteria.to);
    }
}

function doGet() {
    return HtmlService.createHtmlOutputFromFile('Estructura');
}

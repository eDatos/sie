I18n.translations || (I18n.translations = {});

I18n.translations.ca = {

    number: {
        format: {
            separator: ",", /* Decimal */
            delimiter: ".", /* Thousands */
            strip_insignificant_zeros: false
        }
    },
    filter: {
        button: {
            edit: "Canviar selecció",
            info: "Informació",
            table: "Taula de dades",
            column: "Gràfic de columnes",
            pie: "Gràfic de pastís",
            line: "Gràfic de línies",
            map: "Mapa",
            mapbubble: "Mapa de símbols",
            fullscreen: "Pantalla completa",
            share: "Compartir",
            download: "Descàrrega",
            accept: "Acceptar",
            cancel: "Cancel·lar",
            selectAll: "Seleccionar",
            deselectAll: "Deseleccionar",
            reverseOrder: "Invertir ordre",
            close: "Tancar",
            visualize: "Consultar",
            embed: "Widget",
            disabledFeature: {
                internalPortal: "Aquesta característica està desactivada al visualitzador intern"
            }
        },
        download: {
            selection: "Descarregar selecció",
            all: "Descarregar tot",
            selectionDisabled: "S'ha deshabilitat la descàrrega de la selecció perquè hi ha molts elements seleccionats en les dimensions. Per rehabilitar-la deseleccioneu alguns elements.",
            modal: {
                title: "Informació de descàrrega"
            }
        },
        share: {
            permanent: "Enllaç permanent:"
        },
        embed: {
            instructions: "Selecciona, copia i enganxa aquest codi a la teva pàgina"
        },
        text: {
            fixedDimensions: "Valors fixats",
            leftDimensions: "Files",
            topDimensions: "Columnes",
            fixedDimensionX: "Dimensió fixa",
            horizontalAxis: "Eix horitzontal",
            columns: "Columnes",
            lines: "Línies",
            sectors: "Sectors",
            map: "Territoris",
            mapbubble: "Territoris",
            "for": "Per"
        },
        sidebar: {
            ignorable: {
                null: "Veure categories amb cel·les en blanc",
                zero: "Veure categories amb cel·les en zero"
            },
            info: {
                title: "Info"
            },
            filter: {
                title: "Filtrar",
                search: "Buscar"
            },
            order: {
                title: "Ordenar",
                info: {
                    fixed: "",
                    left: "",
                    top: ""
                },
                table: {
                    fixed: "Fixades",
                    left: "Files",
                    top: "Columnes"
                },
                column: {
                    fixed: "Fixades",
                    left: "Eix X",
                    axisy: "Eix Y",
                    top: "Columnes"
                },
                line: {
                    fixed: "Fixades",
                    left: "Eix X",
                    axisy: "Eix Y",
                    top: "Línies"
                },
                map: {
                    fixed: "Fixades",
                    left: "Territoris"
                },
                mapbubble: {
                    fixed: "Fixades",
                    left: "Territoris"
                }

            }
        },
        selector: {
            level: {
                1: "Canàries",
                2: "Províncies",
                3: "Illes",
                4: "Municipis",
                5: "Seccions censals"
            }
        }
    },
    ve: {
        map: {
            nomap: "Mapa no disponible"
        },
        mapbubble: {
            nomap: "Mapa no disponible"
        },
        noSelection: "Heu de seleccionar almenys una categoria en cada dimensió",
        loading: "Carregant dades...",
        others: "Altres"
    },

    entity: {
        dataset: {
            title: "Títol",
            subtitle: "Subtítol",
            abstract: "Resum",
            measureDimensionCoverageConcepts: "Conceptes que formen la cobertura de la unitat de mesura",
            statisticalOperation: "Operació estadística",
            validFrom: "Vàlid des de",
            validTo: "Vàlid fins",
            dateStart: "Període inicial",
            dateEnd: "Període final",
            version: "Número de versió",
            versionRationale: {
                title: "Motiu del canvi",
                enum: {
                    MAJOR_CATEGORIES: "Major: Categories",
                    MAJOR_ESTIMATORS: "Major: Estimadors",
                    MAJOR_NEW_RESOURCE: "Major: nou recurs",
                    MAJOR_OTHER: "Major: Altres",
                    MAJOR_VARIABLES: "Major: Variables",
                    MINOR_DATA_UPDATE: "Menor: Actualització de dades",
                    MINOR_ERRATA: "Menor: Errates",
                    MINOR_METADATA: "Menor: Metadades",
                    MINOR_OTHER: "Menor: Altres",
                    MINOR_SERIES_UPDATE: "Menor: Actualització de sèrie"
                }
            },
            replacesVersion: "Reemplaça versió",
            isReplacedByVersion: "És reemplaçat per versió",
            publishers: "Publicadors",
            contributors: "Contribuïdors de publicació",
            mediators: "Mediadors",
            replaces: "Reemplaça a",
            isReplacedBy: "És reemplaçat per",
            rightsHolder: "Titular dels drets",
            copyrightDate: "Data de copyright",
            license: "Llicència",
            nolicense: "Llicència no disponible",
            accessRights: "Drets d'accés",
            subjectAreas: "Àrees",
            formatExtentObservations: "Mida de la taula",
            lastUpdate: "Data de la darrera actualització",
            dateNextUpdate: "Data de la propera actualització",
            updateFrequency: "Freqüència d'actualització",
            statisticOfficiality: "Oficialitat estadística",
            bibliographicCitation: "Citació bibliogràfica",
            measureConcepts: {
                title: "Què mesuren les dades",
                annotations: "Notes generals"
            },

            section: {
                descriptors: "Descriptors de la taula",
                validity: "Validesa de les dades",
                periods: "Períodes de referència",
                dimensions: "Respecte a què es mesuren les dades",
                datasetAttributes: "Notes de la taula",
                version: "Versionat i actualització de les dades",
                reuse: "Reutilització i informació per a desenvolupadors"
            },

            language: "Idioma",

            apiDocumentationUrl: "Accés a la documentació de l'API",
            apiUrl: "Accés al recurs a l'API",
            selectionApiUrl: "Accés a la selecció actual a l'API",

            nextVersion: {
                title: "Propera actualització",
                enum: {
                    NON_SCHEDULED_UPDATE: "Sense actualització programada",
                    NO_UPDATES: "Sense actualitzacions",
                    SCHEDULED_UPDATE: "Actualització programada"
                }
            }
        },
        observation: {
            measure: {
                title: "Identificació de la dada",
                data: "Dada"
            },
            attributes: {
                title: "Notes de l'observació",
                primaryMeasure: "Atributs a nivell dobservació",
                combinatedDimensions: "Atributs a nivell de dimensió",
            }
        },
        granularity: {
            temporal: {
                enum: {
                    YEARLY: "Anual",
                    BIYEARLY: "Bianual",
                    QUARTERLY: "Trimestral",
                    FOUR_MONTHLY: "Quadrimestral",
                    MONTHLY: "Mensual",
                    WEEKLY: "Setmanal",
                    DAILY: "Diari",
                    HOURLY: "Cada hora"
                }
            }
        }
    },
    date: {
        formats: {
            "default": "%d/%m/%Y",
            "short": "%d de %B",
            "long": "%d de %B de %Y"
        },
        day_names: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
        abbr_day_names: ["Dd", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
        month_names: [null, "Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
        abbr_month_names: [null, "Gen", "Febr", "Març", "Abr", "Maig", "Juny", "Jul", "Ag", "Set", "Oct", "Nov", "Des"],
        meridian: ["am", "pm"]


    },
    indicator: {
        dimension: {
            name: {
                TIME: "Períodes",
                MEASURE: "Mesures",
                GEOGRAPHICAL: "Localització geogràfica"
            }
        }
    }
};

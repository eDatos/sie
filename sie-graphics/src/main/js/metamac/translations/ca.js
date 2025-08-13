I18n.translations || (I18n.translations = {});

I18n.translations.ca = {
    number: {
        format: {
            separator: ",", // Decimal
            delimiter: ".", // Thousands
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
            helpUrl: "Ajuda",
            share: "Compartir",
            download: "Descàrrega",
            save: "Desar",
            accept: "Acceptar",
            cancel: "Cancel·lar",
            selectAll: "Seleccionar",
            deselectAll: "Deseleccionar",
            reverseOrder: "Invertir ordre",
            close: "Tancar",
            visualize: "Consultar",
            embed: "Giny (Widget)",
            disabledFeature: {
                internalPortal: "Aquesta característica està desactivada al visualitzador intern"
            }
        },
        download: {
            selection: "Descarregar selecció",
            all: "Descarregar tot",
            selectionDisabled: "S'ha deshabilitat la descàrrega de la selecció perquè hi ha molts elements seleccionats en les dimensions. Per rehabilitar-la deseleccioneu alguns elements.",
            excel: {
                disabled: "Aquest recurs no es pot descarregar com a XLSX perquè excedeix el nombre d'observacions per a aquest format. Si us plau, trieu una altra opció."
            },
            modal: {
                title: "Informació de descàrrega"
            },
            attributes: {
                modal: {
                    title: "Incloure atributs",
                    question: "Voleu incloure els atributs en la descàrrega?"
                }
            }
        },
        share: {
            permanent: "Enllaç permanent:"
        },
        embed: {
            instructions: "Selecciona, copia i enganxa aquest codi a la teva pàgina"
        },
        save: {
            button: {
                submit: "Desar"
            },
            label: {
                name: "Nom de la consulta personalitzada",
                notes: "Notes"
            },
            modal: {
                title: "Desar consulta personalitzada",
                success: "La consulta personalitzada s'ha desat correctament",
                failure: "Hi ha hagut un problema desant la consulta personalitzada"
            }
        },
        text: {
            fixedDimensions: "Valors fixats",
            leftDimensions: "Files",
            topDimensions: "Columnes",
            fixedDimensionX: "Dimensió fixa",
            horizontalAxis: "Eix horitzontal",
            columns: "Columnes",
            bars: "Barres",
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
                bar: {
                    fixed: "Fixades",
                    left: "Eix Y",
                    axisy: "Eix X",
                    top: "Barres"
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
                0: "Comunitat autònoma",
                1: "Províncies",
                2: "Illes",
                3: "Municipis",
                4: "Seccions censals"
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
        others: "Altres",
        loading: "Carregant dades..."
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
            dataProviders: "Proveïdors de dades",
            dataProviderAnnotations: "Observacions associades als proveïdors de dades",
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
                primaryMeasure: "Atributs a nivell d'observació",
                combinatedDimensions: "Atributs a nivell de dimensió"
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
    },
    login: {
        button: {
            submit: "Iniciar sessió",
            register: "Registrar-se"
        },
        label: {
            email: "Correu electrònic",
            password: "Contrasenya"
        },
        modal: {
            title: "Usuari",
            success: "Heu iniciat sessió amb èxit",
            failure: "Hi ha hagut un problema iniciant sessió"
        },
        error: {
            client: "El correu electrònic o la contrasenya no són vàlids.",
            server: "Hi ha hagut un problema iniciant sessió. Torneu-ho a intentar més tard."
        }
    },
    logout: {
        modal: {
            title: "Tancar sessió",
            question: "Esteu segur que voleu tancar sessió?"
        }
    },
    modal: {
        confirmation: {
            button: {
                confirm: "Sí",
                reject: "No"
            }
        },
        information: {
            loginRequired: {
                title: "Operació no vàlida",
                message: "L'operació que voleu realitzar requereix que inicieu sessió primer. Voleu iniciar sessió?"
            }
        },
        permalinkConfig: {
            button: {
                submit: "Desar"
            },
            label: {
                version: {
                    group: "Dades",
                    last: "Actualitzar les dades amb possibles correccions o modificacions de les mateixes",
                    current: "Mostrar sempre les dades actuals"
                },
                data: {
                    group: "Dades",
                    update: "Actualitzar les dades amb nous períodes",
                    selected: "Fixar les dades al període seleccionat"
                },
                dataReview: {
                    group: "Revisions de dades",
                    update: "Actualitzar amb les revisions de dades"
                },
                periods: {
                    group: "Períodes",
                    quantity: "Actualitzar amb els últims n períodes:",
                    date: "Actualitzar a partir del següent període:",
                    all: "Actualitzar amb tots els períodes"
                }
            },
            error: {
                quantity: "El camp numèric de l'apartat 'Actualitzar amb els últims n períodes' ha de ser un nombre enter positiu major o igual a un.",
                periods: "Heu de seleccionar una de les opcions de l'apartat 'Períodes'."
            },
            info: {
                noTemporalDimension: "Aquest recurs no permet triar el període perquè no té una dimensió temporal.",
                noVersionUpdate: "Aquest recurs no permet consultar versions anteriors."
            }
        },
        embedConfig: {
            label: {
                title: "Títol"
            }
        }
    },
    user: {
        header: {
            userAreaTooltip: "Àrea de l'usuari",
            loginTooltip: "Iniciar sessió",
            logoutTooltip: "Tancar sessió"
        }
    },
    captcha: {
        button: {
            text: "Enviar"
        },
        label: {
            text: "Escriviu el valor de la imatge mostrada a sobre"
        }
    },
    exception: {
        common: {
            unknown: "Error desconegut"
        }
    }
};

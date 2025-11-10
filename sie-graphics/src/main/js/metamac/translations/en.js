I18n.translations || (I18n.translations = {});

I18n.translations.en = {
    number: {
        format: {
            separator: ".", // Decimal
            delimiter: ",", // Thousands
            strip_insignificant_zeros: false
        }
    },
    filter: {
        button: {
            edit: "Change selection",
            info: "Info",
            table: "Datatable",
            column: "Columns chart",
            pie: "Pie chart",
            line: "Lines chart",
            map: "Map",
            mapbubble: "Bubble map",
            fullscreen: "Fullscreen",
            helpUrl: "Help",
            share: "Share",
            download: "Download",
            save: "Save",
            accept: "Accept",
            cancel: "Cancel",
            selectAll: "Select",
            deselectAll: "Deselect",
            reverseOrder: "Reverse order",
            close: "Close",
            visualize: "Visualize",
            embed: "Giny (Widget)",
            disabledFeature: {
                internalPortal: "This feature is disabled on the internal visualizer"
            }
        },
        download: {
            selection: "Download selection",
            all: "Download all",
            selectionDisabled: "The selection download has been disabled because there are too many items selected in the dimensions. To re-enable it, deselect some items.",
            excel: {
                disabled: "This resource cannot be downloaded as XLSX because it exceeds the number of observations for this format. Please choose another option."
            },
            modal: {
                title: "Download info"
            },
            attributes: {
                modal: {
                    title: "Include attributes",
                    question: "Do you want to include the attributes in the download?"
                }
            }
        },
        share: {
            permanent: "Permanent link:"
        },
        embed: {
            instructions: "Select, copy and paste this code on your page"
        },
        save: {
            button: {
                submit: "Save"
            },
            label: {
                name: "Custom query name",
                notes: "Notes"
            },
            modal: {
                title: "Save custom query",
                success: "The custom query has been saved successfully",
                failure: "There was a problem saving the custom query"
            }
        },
        text: {
            fixedDimensions: "Fixed values",
            leftDimensions: "Rows",
            topDimensions: "Columns",
            fixedDimensionX: "Fixed dimension",
            horizontalAxis: "Horizontal axis",
            columns: "Columns",
            bars: "Bars",
            lines: "Lines",
            sectors: "Sectors",
            map: "Territories",
            mapbubble: "Territories",
            "for": "For"
        },
        sidebar: {
            ignorable: {
                null: "View categories with blank cells",
                zero: "View categories with zero cells"
            },
            info: {
                title: "Info"
            },
            filter: {
                title: "Filter",
                search: "Search"
            },
            order: {
                title: "Sort",
                info: {
                    fixed: "",
                    left: "",
                    top: ""
                },
                table: {
                    fixed: "Fixed values",
                    left: "Rows",
                    top: "Columns"
                },
                column: {
                    fixed: "Fixed values",
                    left: "X axis",
                    axisy: "Y axis",
                    top: "Columns"
                },
                bar: {
                    fixed: "Fixed values",
                    left: "Y axis",
                    axisy: "X axis",
                    top: "Bars"
                },
                line: {
                    fixed: "Fixed values",
                    left: "X axis",
                    axisy: "Y axis",
                    top: "Lines"
                },
                map: {
                    fixed: "Fixed values",
                    left: "Territories"
                },
                mapbubble: {
                    fixed: "Fixed values",
                    left: "Territories"
                }
            }
        },
        selector: {
            level: {
                0: "Autonomous Community",
                1: "Provinces",
                2: "Islands",
                3: "Municipalities",
                4: "Census sections"
            }
        }
    },
    ve: {
        map: {
            nomap: "No map available"
        },
        mapbubble: {
            nomap: "No map available"
        },
        noSelection: "You must select at least one category in each dimension",
        others: "Others",
        loading: "Loading data..."
    },
    entity: {
        dataset: {
            title: "Title",
            subtitle: "Subtitle",
            abstract: "Abstract",
            measureDimensionCoverageConcepts: "Measure dimension coverage concepts",
            statisticalOperation: "Statistical operation",
            validFrom: "Valid from",
            validTo: "Valid to",
            dateStart: "Initial period",
            dateEnd: "End period",
            version: "Version number",
            versionRationale: {
                title: "Change rationale",
                enum: {
                    MAJOR_CATEGORIES: "Major: Categories",
                    MAJOR_ESTIMATORS: "Major: Estimators",
                    MAJOR_NEW_RESOURCE: "Major: New resource",
                    MAJOR_OTHER: "Major: Others",
                    MAJOR_VARIABLES: "Major: Variables",
                    MINOR_DATA_UPDATE: "Minor: Data update",
                    MINOR_ERRATA: "Minor: Errata",
                    MINOR_METADATA: "Minor: Metadata",
                    MINOR_OTHER: "Minor: Others",
                    MINOR_SERIES_UPDATE: "Minor: Series update"
                }
            },
            replacesVersion: "Replaces version",
            isReplacedByVersion: "Is replaced by version",
            publishers: "Publishers",
            contributors: "Publication contributors",
            mediators: "Mediators",
            replaces: "Replaces",
            isReplacedBy: "Is replaced by",
            rightsHolder: "Rights holder",
            copyrightDate: "Copyright date",
            license: "License",
            nolicense: "License not available",
            accessRights: "Access rights",
            subjectAreas: "Areas",
            formatExtentObservations: "Table size",
            lastUpdate: "Last update date",
            dateNextUpdate: "Next update date",
            updateFrequency: "Update frequency",
            statisticOfficiality: "Statistic officiality",
            bibliographicCitation: "Bibliographic citation",
            dataProviders: "Data providers",
            dataProviderAnnotations: "Notes associated with data providers",
            measureConcepts: {
                title: "What do the data measure",
                annotations: "General notes"
            },
            section: {
                descriptors: "Table descriptors",
                validity: "Data validity",
                periods: "Reference periods",
                dimensions: "What are the data measured against",
                datasetAttributes: "Table notes",
                version: "Versioning and data update",
                reuse: "Reuse and information for developers"
            },
            seeConcept: {
                button: "See concept",
            },
            seeRelatedResource: {
                button: "See codelist"
            },

            language: "Language",
            apiDocumentationUrl: "API documentation access",
            apiUrl: "API resource access",
            selectionApiUrl: "Current selection API access",
            nextVersion: {
                title: "Next update",
                enum: {
                    NON_SCHEDULED_UPDATE: "Non scheduled update",
                    NO_UPDATES: "No updates",
                    SCHEDULED_UPDATE: "Scheduled update"
                }
            }
        },
        observation: {
            measure: {
                title: "Data identification",
                data: "Data"
            },
            attributes: {
                title: "Observation notes",
                primaryMeasure: "Observation level attributes",
                combinatedDimensions: "Dimension level attributes"
            }
        },
        granularity: {
            temporal: {
                enum: {
                    YEARLY: "Yearly",
                    BIYEARLY: "Biyearly",
                    QUARTERLY: "Quarterly",
                    FOUR_MONTHLY: "Four monthly",
                    MONTHLY: "Monthly",
                    WEEKLY: "Weekly",
                    DAILY: "Daily",
                    HOURLY: "Hourly"
                }
            }
        }
    },
    date: {
        formats: {
            "default": "%Y-%m-%d",
            "short": "%b %d",
            "long": "%B %d, %Y"
        },
        day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        meridian: ["am", "pm"]
    },
    indicator: {
        dimension: {
            name: {
                TIME: "Periods",
                MEASURE: "Measures",
                GEOGRAPHICAL: "Geographical location"
            }
        }
    },
    login: {
        button: {
            submit: "Sign in",
            register: "Register"
        },
        label: {
            email: "Email",
            password: "Password"
        },
        modal: {
            title: "User",
            success: "You have successfully signed in",
            failure: "There was a problem signing in"
        },
        error: {
            client: "The email or password is not valid.",
            server: "There was a problem signing in. Please try again later."
        }
    },
    logout: {
        modal: {
            title: "Sign out",
            question: "Are you sure you want to sign out?"
        }
    },
    modal: {
        confirmation: {
            button: {
                confirm: "Yes",
                reject: "No"
            }
        },
        information: {
            loginRequired: {
                title: "Invalid operation",
                message: "The operation you want to perform requires you to sign in first. Do you want to sign in?"
            }
        },
        permalinkConfig: {
            button: {
                submit: "Save"
            },
            label: {
                version: {
                    group: "Data",
                    last: "Update the data with possible corrections or modifications",
                    current: "Always show current data"
                },
                data: {
                    group: "Data",
                    update: "Update the data with new periods",
                    selected: "Fix the data to the selected period"
                },
                dataReview: {
                    group: "Data reviews",
                    update: "Update with data reviews"
                },
                periods: {
                    group: "Periods",
                    quantity: "Update with the last n periods:",
                    date: "Update from the following period:",
                    all: "Update with all periods"
                }
            },
            error: {
                quantity: "The numeric field in the 'Update with the last n periods' section must be a positive integer greater than or equal to one.",
                periods: "You must select one of the options in the 'Periods' section."
            },
            info: {
                noTemporalDimension: "This resource does not allow choosing the period because it does not have a temporal dimension.",
                noVersionUpdate: "This resource does not allow consulting previous versions."
            }
        },
        embedConfig: {
            label: {
                title: "Title"
            }
        }
    },
    user: {
        header: {
            userAreaTooltip: "User area",
            loginTooltip: "Sign in",
            logoutTooltip: "Sign out"
        }
    },
    captcha: {
        button: {
            text: "Send"
        },
        label: {
            text: "Enter the value of the image shown above"
        }
    },
    exception: {
        common: {
            unknown: "Unknown error"
        }
    }
};

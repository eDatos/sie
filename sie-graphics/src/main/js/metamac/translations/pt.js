I18n.translations || (I18n.translations = {});

I18n.translations.pt = {
    number: {
        format: {
            separator: ",", // Decimal
            delimiter: " ", // Thousands
            strip_insignificant_zeros: false
        }
    },
    filter: {
        button: {
            edit: "Modificar seleção",
            info: "Informação",
            table: "Tabela de dados",
            column: "Gráfico de colunas",
            pie: "Gráfico de tarte",
            line: "Gráfico de linhas",
            map: "Mapa",
            mapbubble: "Mapa de símbolos",
            fullscreen: "Ecrã inteiro",
            helpUrl: "Ajuda",
            share: "Partilhar",
            download: "Download",
            save: "Guardar",
            accept: "Aceitar",
            cancel: "Cancelar",
            selectAll: "Selecionar",
            deselectAll: "Desselecionar",
            reverseOrder: "Ordem inversa",
            close: "Fechar",
            visualize: "Visualizar",
            embed: "Giny (Widget)",
            disabledFeature: {
                internalPortal: "Este recurso está desativado no visualizador interno"
            }
        },
        download: {
            selection: "Download da seleção",
            all: "Download de tudo",
            selectionDisabled: "O download da seleção foi desativado porque há muitos itens selecionados nas dimensões. Para reativá-lo, desselecione alguns itens.",
            excel: {
                disabled: "Este recurso não pode ser baixado como XLSX porque excede o número de observações para este formato. Por favor, escolha outra opção."
            },
            modal: {
                title: "Baixar informações"
            },
            attributes: {
                modal: {
                    title: "Incluir atributos",
                    question: "Deseja incluir os atributos no download?"
                }
            }
        },
        share: {
            permanent: "Ligação permanente:"
        },
        embed: {
            instructions: "Seleciona, copia e cola este código na tua página"
        },
        save: {
            button: {
                submit: "Guardar"
            },
            label: {
                name: "Nome da consulta personalizada",
                notes: "Notas"
            },
            modal: {
                title: "Guardar consulta personalizada",
                success: "A consulta personalizada foi guardada com sucesso",
                failure: "Houve um problema ao guardar a consulta personalizada"
            }
        },
        text: {
            fixedDimensions: "Valores fixos",
            leftDimensions: "Linhas",
            topDimensions: "Colunas",
            fixedDimensionX: "Dimensão fixa",
            horizontalAxis: "Eixo horizontal",
            columns: "Colunas",
            bars: "Barras",
            lines: "Linhas",
            sectors: "Sectores",
            map: "Territórios",
            mapbubble: "Territórios",
            "for": "Para"
        },
        sidebar: {
            ignorable: {
                null: "Ver categorias com células em branco",
                zero: "Ver categorias com células em zero"
            },
            info: {
                title: "Info"
            },
            filter: {
                title: "Filtro",
                search: "Pesquisa"
            },
            order: {
                title: "Ordem",
                info: {
                    fixed: "",
                    left: "",
                    top: ""
                },
                table: {
                    fixed: "Valores fixos",
                    left: "Linhas",
                    top: "Colunas"
                },
                column: {
                    fixed: "Valores fixos",
                    left: "Eixo X",
                    axisy: "Eixo Y",
                    top: "Colunas"
                },
                bar: {
                    fixed: "Valores fixos",
                    left: "Eixo Y",
                    axisy: "Eixo X",
                    top: "Barras"
                },
                line: {
                    fixed: "Valores fixos",
                    left: "Eixo X",
                    axisy: "Eixo Y",
                    top: "Linhas"
                },
                map: {
                    fixed: "Valores fixos",
                    left: "Territórios"
                },
                mapbubble: {
                    fixed: "Valores fixos",
                    left: "Territórios"
                }
            }
        },
        selector: {
            level: {
                0: "Comunidade Autónoma",
                1: "Províncias",
                2: "Ilhas",
                3: "Municípios",
                4: "Secções de recenseamento"
            }
        }
    },
    ve: {
        map: {
            nomap: "Mapa indisponível"
        },
        mapbubble: {
            nomap: "Mapa indisponível"
        },
        noSelection: "Você deve selecionar pelo menos uma categoria em cada dimensão",
        others: "Outros",
        loading: "Carregando dados..."
    },
    entity: {
        dataset: {
            title: "Título",
            subtitle: "Subtítulo",
            abstract: "Resumo",
            measureDimensionCoverageConcepts: "Conceitos que formam a cobertura da unidade de medida",
            statisticalOperation: "Operação estatística",
            validFrom: "Válido desde",
            validTo: "Válido até",
            dateStart: "Período inicial",
            dateEnd: "Período final",
            version: "Número da versão",
            versionRationale: {
                title: "Motivo da mudança",
                enum: {
                    MAJOR_CATEGORIES: "Grande: Categorias",
                    MAJOR_ESTIMATORS: "Grande: Estimadores",
                    MAJOR_NEW_RESOURCE: "Grande: Novo recurso",
                    MAJOR_OTHER: "Grande: Outros",
                    MAJOR_VARIABLES: "Grande: Variáveis",
                    MINOR_DATA_UPDATE: "Pequena: Atualização de dados",
                    MINOR_ERRATA: "Pequena: Erratas",
                    MINOR_METADATA: "Pequena: Metadados",
                    MINOR_OTHER: "Pequena: Outros",
                    MINOR_SERIES_UPDATE: "Pequena: Atualização de série"
                }
            },
            replacesVersion: "Substitui versão",
            isReplacedByVersion: "É substituído por versão",
            publishers: "Publicadores",
            contributors: "Contribuidores de publicação",
            mediators: "Mediadores",
            replaces: "Substitui",
            isReplacedBy: "Substituído por",
            rightsHolder: "Titular dos direitos",
            copyrightDate: "Data de copyright",
            license: "Licença",
            nolicense: "Licença indisponível",
            accessRights: "Direitos de acesso",
            subjectAreas: "Áreas",
            formatExtentObservations: "Tamanho da tabela",
            lastUpdate: "Data da última atualização",
            dateNextUpdate: "Data da próxima atualização",
            updateFrequency: "Frequência de atualização",
            statisticOfficiality: "Oficialidade estatística",
            bibliographicCitation: "Citação bibliográfica",
            dataProviders: "Provedores de dados",
            dataProviderAnnotations: "Observações associadas aos provedores de dados",
            measureConcepts: {
                title: "O que os dados medem",
                annotations: "Notas gerais"
            },
            section: {
                descriptors: "Descritores da tabela",
                validity: "Validade dos dados",
                periods: "Períodos de referência",
                dimensions: "Em relação a que os dados são medidos",
                datasetAttributes: "Notas da tabela",
                version: "Versionamento e atualização dos dados",
                reuse: "Reutilização e informações para desenvolvedores"
            },
            language: "Idioma",
            apiDocumentationUrl: "Acesso à documentação da API",
            apiUrl: "Acesso ao recurso na API",
            selectionApiUrl: "Acesso à seleção atual na API",
            nextVersion: {
                title: "Próxima atualização",
                enum: {
                    NON_SCHEDULED_UPDATE: "Sem atualização programada",
                    NO_UPDATES: "Sem atualizações",
                    SCHEDULED_UPDATE: "Atualização programada"
                }
            }
        },
        observation: {
            measure: {
                title: "Identificação do dado",
                data: "Dado"
            },
            attributes: {
                title: "Notas da observação",
                primaryMeasure: "Atributos ao nível da observação",
                combinatedDimensions: "Atributos ao nível da dimensão"
            }
        },
        granularity: {
            temporal: {
                enum: {
                    YEARLY: "Anual",
                    BIYEARLY: "Bianual",
                    QUARTERLY: "Trimestral",
                    FOUR_MONTHLY: "Quadrimestral",
                    MONTHLY: "Mensal",
                    WEEKLY: "Semanal",
                    DAILY: "Diário",
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
        day_names: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        abbr_day_names: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        month_names: [null, "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        abbr_month_names: [null, "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        meridian: ["am", "pm"]
    },
    indicator: {
        dimension: {
            name: {
                TIME: "Períodos",
                MEASURE: "Medidas",
                GEOGRAPHICAL: "Localização geográfica"
            }
        }
    },
    login: {
        button: {
            submit: "Iniciar sessão",
            register: "Registrar-se"
        },
        label: {
            email: "Email",
            password: "Senha"
        },
        modal: {
            title: "Usuário",
            success: "Sessão iniciada com sucesso",
            failure: "Houve um problema ao iniciar sessão"
        },
        error: {
            client: "O email ou a senha não são válidos.",
            server: "Houve um problema ao iniciar sessão. Tente novamente mais tarde."
        }
    },
    logout: {
        modal: {
            title: "Terminar sessão",
            question: "Tem certeza de que deseja terminar sessão?"
        }
    },
    modal: {
        confirmation: {
            button: {
                confirm: "Sim",
                reject: "Não"
            }
        },
        information: {
            loginRequired: {
                title: "Operação inválida",
                message: "A operação que deseja realizar requer que inicie sessão primeiro. Deseja iniciar sessão?"
            }
        },
        permalinkConfig: {
            button: {
                submit: "Guardar"
            },
            label: {
                version: {
                    group: "Dados",
                    last: "Atualizar os dados com possíveis correções ou modificações dos mesmos",
                    current: "Mostrar sempre os dados atuais"
                },
                data: {
                    group: "Dados",
                    update: "Atualizar os dados com novos períodos",
                    selected: "Fixar os dados ao período selecionado"
                },
                dataReview: {
                    group: "Revisões de dados",
                    update: "Atualizar com as revisões de dados"
                },
                periods: {
                    group: "Períodos",
                    quantity: "Atualizar com os últimos n períodos:",
                    date: "Atualizar a partir do seguinte período:",
                    all: "Atualizar com todos os períodos"
                }
            },
            error: {
                quantity: "O campo numérico da seção 'Atualizar com os últimos n períodos' deve ser um número inteiro positivo maior ou igual a um.",
                periods: "Você deve selecionar uma das opções da seção 'Períodos'."
            },
            info: {
                noTemporalDimension: "Este recurso não permite escolher o período porque não possui uma dimensão temporal.",
                noVersionUpdate: "Este recurso não permite consultar versões anteriores."
            }
        },
        embedConfig: {
            label: {
                title: "Título"
            }
        }
    },
    user: {
        header: {
            userAreaTooltip: "Área do usuário",
            loginTooltip: "Iniciar sessão",
            logoutTooltip: "Terminar sessão"
        }
    },
    captcha: {
        button: {
            text: "Enviar"
        },
        label: {
            text: "Digite o valor da imagem mostrada acima"
        }
    },
    exception: {
        common: {
            unknown: "Erro desconhecido"
        }
    }
};

export enum RouteType {
    EVOLUCION_ELECTORAL,
    PROCESO_ELECTORAL,
    OTHER,
}

export const ISTAC_ORANGE = '#E5772D';
export const ISTAC_GREEN = '#67A23F';
export const ISTAC_BROWN = '#8C5C1D';
export const ISTAC_BLUE = '#008BD0';
export const ISTAC_BLUE_LIGHT = '#2CBCE2';
export const ISTAC_BLUE_LIGHTEST = '#D5EDFA';

export const INDICADOR_GRAFICA_ELECTORES = {
    nombre: 'ELECTORES',
    color: ISTAC_BLUE,
};

export const INDICADORES_GRAFICA_PARTICIPACION = {
    nombre: 'TASA_PARTICIPACION',
    color: ISTAC_ORANGE,
};

export const TIPO_COLUMNA = 'column';
export const TIPO_LINEA = 'line';
export const ELECTORES = 'ELECTORES';
export const STACKING_TYPE = 'normal';

export const TIPO_ELECCIONES_AUTONOMICAS = 'AUTONOMICAS';
export const TIPO_ELECCIONES_DEFAULT = TIPO_ELECCIONES_AUTONOMICAS;
export const TIPO_ELECCIONES_REFERENDUM = 'REFERENDUM';

export const ORDEN_TIPO_ELECCIONES = [
    'AUTONOMICAS',
    'CABILDO',
    'CONSEJO_INSULAR',
    'MUNICIPALES',
    'CONGRESO',
    'SENADO',
    'PARLAMENTO_EUROPEO',
]

export const ELECCIONES_REGIONALES_ID_FRAGMENT = '_REGIONALES';

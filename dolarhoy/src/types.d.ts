export interface APIResults {
    dolars: Dolar[]
}

export interface Dolar {
    compra:         string
    venta:          string
    agencia:        string
    nombre:         string
    variacion?:     string
    ventaCero?:     string
    decimales?:     string
    mejor_compra?:  string
    mejor_venta?:   string
    fecha?:         string
    recorrido?:     string
    afluencia?:     Afluencia
    observaciones?: Afluencia
}

export interface Afluencia {
}
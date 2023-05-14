import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { DolarType } from './components/DolarType'
import { useEffect, useState } from 'react'
import { type Casa } from './types.d'

const excludedDollars = ['Dolar', 'Argentina', 'Bitcoin']

export const App: React.FC = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        getDollarValues()
    }, [])

    const getDollarValues: Casa = async() => {
        const data = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        const dataJson = await data.json()
        const dataJsonFormatted = dataJson.map((data) => data.casa)
        setData(dataJsonFormatted)
    }

    if (loading) return (
        <SafeAreaView style={ styles.loadingPage }>
            <ActivityIndicator size={ 50 } />
        </SafeAreaView>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.filters}>
                <Text style={styles.filtersTitle}>FILTROS</Text>

                <ScrollView
                    contentContainerStyle={styles.filterButtons}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    { data.map((dollar) => {
                        if (excludedDollars.includes(dollar.nombre)) return null

                        return (
                            <TouchableOpacity key={ dollar.agencia } style={styles.filterButton}>
                                <Text style={styles.filterButtonText}>{dollar.nombre}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={ styles.values }>
                { data.map((dollar) => {
                    if (excludedDollars.includes(dollar.nombre)) return null

                    return <DolarType key={ dollar.agencia } name={ dollar.nombre } purchaseValue={ dollar.compra } saleValue={ dollar.venta } />
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loadingPage: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    container: {
        backgroundColor: '#fff',
        gap: 10
    },
    filters: {
        paddingHorizontal: 20,
        gap: 10
    },
    filtersTitle: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
        color: '#00B982'
    },
    filterButtons: {
        gap: 20
    },
    filterButton: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: '#fafafa',
        borderRadius: 5
    },
    filterButtonText: {
        fontSize: 19
    },
    values: {
        gap: 10,
        paddingHorizontal: 20,
        paddingBottom: 70,
        borderRadius: 5
    }
})

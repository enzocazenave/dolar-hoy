import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Animated, useColorScheme } from 'react-native'
import { DolarType } from './components/DolarType'
import { useEffect, useState } from 'react'
import { type Casa } from './types.d'

const excludedDollars = ['Dolar', 'Argentina', 'Bitcoin', 'Dolar Soja']

export const App: React.FC = () => {
    const [data, setData] = useState<Casa[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [opacity] = useState<number>(new Animated.Value(0))
    const theme = useColorScheme<string>()
    
    useEffect(() => {
        getDollarValues()
    }, [])

    useEffect(() => {
        if (!loading) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start()
        }
    }, [loading])

    const toggleShow = (agencia: Casa.agencia): void => {
        setData(prevState => prevState.map(dollar => {
            if (dollar.agencia !== agencia) return dollar

            return {
                ...dollar,
                show: !dollar.show
            }
        }))
    } 

    const getDollarValues = async(): void => {
        try {
            const data = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
            const dataJson = await data.json()
            const dataJsonFormatted = dataJson.map((data) => {
                return { 
                    ...data.casa,
                    show: true
                }
            })
            setData(dataJsonFormatted)
        } catch (e) {
            console.log(e)
            setData([])
        } finally {
            setLoading(false)
        }
    }

    if (loading) return (
        <SafeAreaView style={ [styles.loadingPage, { backgroundColor: theme === 'dark' ? '#141E2A' : '#FFF'  }] }>
            <ActivityIndicator 
                size={ 'large' }
                color='#00B982'
             />
        </SafeAreaView>
    )

    if (!data.length) return (
        <SafeAreaView style={ [styles.loadingPage, { backgroundColor: theme === 'dark' ? '#141E2A' : '#FFF'  }] }>
            <Text style={ [styles.filtersTitle, { fontSize: 18 }] }>Servicio de cotizaciones no disponible</Text>
        </SafeAreaView>
    )

    return (
        <SafeAreaView style={[styles.container, theme === 'dark' && { backgroundColor: '#141E2A' }]}>
            <Animated.View style={{ opacity, gap: 10 }}>
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
                                <TouchableOpacity 
                                    key={ dollar.agencia } 
                                    style={[
                                        styles.filterButton, 
                                        theme === 'dark' && { backgroundColor: '#1E2733' },
                                        dollar.show && { backgroundColor: '#00B982' }
                                    ]}
                                    activeOpacity={ 0.8 }
                                    onPress={ () => { toggleShow(dollar.agencia) } }
                                >
                                    <Text style={[styles.filterButtonText, theme === 'dark' && { color: '#FAFAFA' }, dollar.show && { color: '#FFF' }]}>{dollar.nombre}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>

                <ScrollView contentContainerStyle={ styles.values }>
                    { data.map((dollar) => { 
                        if (excludedDollars.includes(dollar.nombre)) return null
                        if (dollar.show) return <DolarType key={ dollar.agencia } name={ dollar.nombre } purchaseValue={ dollar.compra } saleValue={ dollar.venta } />
                    
                        return null
                    })}
                </ScrollView>
            </Animated.View>
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
        height: '100%'
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
        backgroundColor: '#f0f0f0',
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

import { Text, View, StyleSheet, useColorScheme } from 'react-native'
import { useMemo } from 'react'

interface Props {
    name: string
    purchaseValue: string
    saleValue: string
    variation: string
}

export const DolarType: React.FC = ({ name, purchaseValue, saleValue, variation }: Props) => {
    const theme = useColorScheme()
    const purchaseValueRefactored = parseFloat(purchaseValue.replace(',', '.')).toFixed(2)
    const saleValueRefactored =  parseFloat(saleValue.replace(',', '.')).toFixed(2)

    return (
        <View style={ [styles.container, theme === 'dark' && { backgroundColor: '#1E2733' }] }>
            <Text style={ [styles.name, variation[0] === '-' && { color: '#CD261C' }] }>{ name.toUpperCase() }</Text>

            <View style={ styles.values }>
                {!isNaN(purchaseValueRefactored) && (
                    <View style={ styles.value }>
                        <Text style={ [styles.valueTitle, theme === 'dark' && { color: '#E6E6E6' }] }>COMPRA</Text>
                        <Text style={ [styles.valueNumber, theme === 'dark' && { color: '#FFF' }] }>$ { purchaseValueRefactored }</Text>
                    </View>
                )}
                    
                {!isNaN(saleValueRefactored) && (
                    <View style={ styles.value }>
                        <Text style={ [styles.valueTitle, theme === 'dark' && { color: '#E6E6E6' }] }>VENTA</Text>
                        <Text style={ [styles.valueNumber, theme === 'dark' && { color: '#FFF' }] }>$ { saleValueRefactored }</Text>
                    </View>
                )}
            </View>

            <Text style={ [styles.variationText, variation[0] === '-' && { color: '#CD261C' }] }>
                { variation[0] === '-' ? `${variation} % ↓` : `${variation} %  ↑` }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    variationText: {
        color: '#00B982',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600'
    },
    container: {
        padding: 20,
        backgroundColor: '#f3f3f3',
        gap: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    name: {
        color: '#00B982',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center'
    },
    values: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    value: {
        gap: 8
    },
    valueTitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
        fontWeight: 700
    },
    valueNumber: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700'
    }
})

import { Text, View, StyleSheet } from 'react-native'
import { useMemo } from 'react'

interface Props {
    name: string
    purchaseValue: number
    saleValue: number
}

export const DolarType: React.FC = ({ name, purchaseValue, saleValue }: Props) => {
    const purchaseValueRefactored = parseFloat(purchaseValue.replace(',', '.')).toFixed(2)
    const saleValueRefactored =  parseFloat(saleValue.replace(',', '.')).toFixed(2)

    if ((isNaN(purchaseValueRefactored) && saleValueRefactored === '0.00') || (isNaN(saleValueRefactored) && purchaseValueRefactored === '0.00')) return null

    return (
        <View style={ styles.container }>
            <Text style={ styles.name }>{ name.toUpperCase() }</Text>

            <View style={ styles.values }>
                {!isNaN(purchaseValueRefactored) && (
                    <View style={ styles.value }>
                        <Text style={ styles.valueTitle }>COMPRA</Text>
                        <Text style={ styles.valueNumber }>$ { purchaseValueRefactored }</Text>
                    </View>
                )}
                    
                {!isNaN(saleValueRefactored) && (
                    <View style={ styles.value }>
                        <Text style={ styles.valueTitle }>VENTA</Text>
                        <Text style={ styles.valueNumber }>$ { saleValueRefactored }</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fafafa',
        gap: 20,
        borderRadius: 5
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
        color: '#606060',
        fontWeight: 700
    },
    valueNumber: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700'
    }
})

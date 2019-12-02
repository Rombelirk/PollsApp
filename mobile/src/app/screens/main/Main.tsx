import React from 'react';
import { View, Text, Button } from 'react-native'
import { retrieveData, storeData } from '../../helpers/asyncStorage'

const Main = () => {
    return <View>
        <Text>
            Main
        </Text>
        <Button title="Clear" onPress={() => storeData("jwtToken", null)} />
    </View>
}

export default Main;
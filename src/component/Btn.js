import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Btn = ({title, Press}) => {
  return (
    <View style={{
        display:"flex",
        alignItems: 'center',
        justifyContent:'center',
    }} >
    <TouchableOpacity style={{
        // backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        display: "flex",
        width: 200,
        paddingVertical: 10,
        marginVertical: 20
    }}
    onPress={Press}>
    {/* <Text>
    2023 Annual Conference Recorded Presentations

    Experts from leading cancer centers came together to discuss updates to NCCN Guidelines®, the latest advances across several cancer types, and emerging issues in oncology.

    CE credit is available for the oncology team. There are more than 30 recorded educational sessions!
    </Text> */}
    <Text style={{fontSize: 15, color: 'black'}}>
        {title}
    </Text>
    </TouchableOpacity>
    </View>
  )
}

export default Btn
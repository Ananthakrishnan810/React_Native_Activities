import {
    View,  
    Text, 
    Alert, 
    SafeAreaView, 
    ActivityIndicator, 
    FlatList ,
    TextInput,
    StyleSheet
} from 'react-native'
import React,{ useEffect, useState } from 'react'


const url = "https://api.airindia.com/common/general/airport-content?page=1&pageSize=0"

const FetchApi = () => {
    const [isLoading, setLoading] = useState(true)
    const [data,setData] = useState([])
    const [fullData, setFullData] = useState([])
    const [serachQuery,setSerachQuery] = useState("")

    const handleSerach = (query) => {
        // setSerachQuery(query)
        if(query){
        const formattedQuery = fullData.filter((item) => {
            const itemData = item.airportCity ? 
                item.airportCity.toUpperCase() : ''.toUpperCase()  
            const textData = query.toUpperCase()
            return itemData.indexOf(textData) > -1 
        })
        setData(formattedQuery)
        setSerachQuery(query)
        }
        else
        {
            setData(fullData)
            setSerachQuery(query)
        }
        // const filteredData = filter()
    }
    
    useEffect(()=>{
        fetch(url)
            .then((response) => response.json())
            .then((json) =>{ 
                setData(json.responsePayload.data)
                setFullData(json.responsePayload.data)
            })
            .catch((error) => Alert.alert(error))
            .finally(setLoading(false))
    },[])

  return (
    <SafeAreaView style={styles.container}>
        <TextInput 
            placeholder='Search' 
            style={styles.searchBar}
            autoCapitalize='none'
            autoCorrect={false}
            value={serachQuery}
            onChangeText={(query) => handleSerach(query)}/>
        {isLoading ? (
            <ActivityIndicator/> 
            ): ( <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.textName}>
                        {item.id}
                        {item.attributes.airportCity}
                        {item.attributes.airportName}
                    </Text>
                </View>
            )}
        />)}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        marginHorizontal:20
    },
    searchBar:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderColor:'#ccc',
        borderWidth:1,
        borderRadius:8,
        marginVertical:10
    },
    textName:{
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600"
    },
    itemContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 10
    }
})

export default FetchApi
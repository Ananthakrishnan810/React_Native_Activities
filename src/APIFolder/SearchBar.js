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
    const [isLoading, setLoading] = useState(false)
    const [data,setData] = useState([])
    const [error, setError] = useState(null)
    const [fullData, setFullData] = useState([])
    const [serachQuery,setSerachQuery] = useState("")

    
    useEffect(()=>{
        setLoading(true)
        fetchData(url)
    },[])

    const fetchData = async(url) =>{
        try{
            const response = await fetch(url)
            const json = await response.json()
            setData(json.results)

            console.log(json.results)

            setLoading(false)
        }catch(error){
            setError(error)
            console.log(error)
        } 
    }
    
    const handleSerach = (query) => {
        setSerachQuery(query)
    }

    if( isLoading ){
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'} color='#5500dc' />
            </View>
        )
    }

    if( error ){
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <Text>Error in fetching data ... please check your internet connection!</Text>
            </View>
        )
    }

  return (
    <SafeAreaView style={styles.container}>
        <TextInput 
            placeholder='Search' 
            style={styles.searchBar}
            autoCapitalize='none'
            autoCorrect={false}
            value={serachQuery}
            onChangeText={(query) => handleSerach(query)}/>
            <FlatList 
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
            />
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
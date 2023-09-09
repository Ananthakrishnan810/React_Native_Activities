import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView,
    FlatList,
    TextInput,
    TouchableOpacity,
    ImageBackground } from 'react-native'
import React,{useState, useEffect} from 'react'

const GetSearch = () => {

    const [filteredData,setFiltererdData] = useState([])
    const [masterData, setMasterData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=>{
        fetchPosts()
    },[])

    const fetchPosts = () => {
        const apiURL = "https://api.airindia.com/common/general/airport-content?page=1&pageSize=0"
        fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {
                setFiltererdData(responseJson.responsePayload.data)
                setMasterData(responseJson.responsePayload.data)
            }).catch((error) => {
                console.error(error)
            })
    } 

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.attributes.airportCity ? 
                    item.attributes.airportCity.toUpperCase() 
                    : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setFiltererdData(newData)
            setSearch(text)
        }else{
            setFiltererdData(masterData)
            setSearch(text)
        }
    }

    const ItemView = ({item}) => {
        return (
            <Text style={{
                // flexDirection:'row',
                // justifyContent:'space-between',
                // alignItems: 'center',
                padding: 10,
                fontSize: 17,
                marginLeft: 20,
                marginBottom: 20}}>
                {item.id}
                {" "}
                {item.attributes.airportCity}
                <View style={{marginLeft: 20}}>
                <TouchableOpacity style={styles.touchStyle}>
                    <Text style={styles.bookstyle}>Book Now</Text>
                </TouchableOpacity>
                </View>
            </Text>
        )
    }

    const ItemSeparatorView = () => {
        return(
            <View 
                style={{height: 1.5, width: '100%', backgroundColor:'#c8c8c8',marginVertical: 20}}
            >
            </View>
        )
    }

  return (
    <SafeAreaView>
         <ImageBackground
                 source={require('../images/mountain.jpeg')}
                 size={80}
            >
            <View style={styles.container}>
            </View>
            </ImageBackground>
            <View>
            <TextInput
                    style={styles.textInputStyle}
                    value={search}
                    placeholder="search Here"
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => searchFilter(text)}  
            />  
            <View style={styles.flatStyle}>  
            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
            />
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginVertical:85,
    },
    itemStyle:{
        // padding: 10,
        // fontSize: 17,
        // marginLeft: 10,
        // fontWeight: "600",
        // flex:1,
        // flexDirection:'row',
        // justifyContent:'space-between'
        // flex:1,
        // justifyContent:'space-between',
        // alignItems: 'center',
        // marginBottom: 20
        // display:"flex",
        // marginTop: 5,
        // padding: 10,
        // flexDirection: 'row',
        // justifyContent:'space-between'
    },
    textInputStyle:{
        borderWidth: 1.5,
        paddingLeft: 20,    
        borderColor:'#009688',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    touchStyle:{
        backgroundColor:'#0aada8',
        padding:10,
        width:100,
        borderRadius: 10,
        marginLeft:80
    },
    bookstyle:{
        color: '#333',
        fontFamily:'Roboto-Medium',
        fontSize:14,
        textAlign: 'center'
    },
})

export default GetSearch
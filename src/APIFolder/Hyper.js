import { View, Text, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const API_ENDPOINT = ``

const Hyper = () => {
  const[searchQuery,setSearchQuary] = useState("")
  const handleSearch = (query) => {
    setSearchQuary(query)
  }
  return (
    <SafeAreaView style={{
      display:"flex",
      marginHorizontal: 20,
      paddingVertical:15
      }}>
      <TextInput placeholder='Search' 
        style={styles.serachBox}
        autoCapitalize='none'
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query)=>{
          handleSearch(query)
        }}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  serachBox:{
    paddingHorizontal:20,
          paddingVertical:10,
          borderColor:'#ccc',
          borderWidth:1,
          borderRadius:8,
  }
})

export default Hyper
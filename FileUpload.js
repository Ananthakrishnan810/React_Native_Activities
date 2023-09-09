import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import DocumentPicker from 'react-native-document-picker'
import { Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

const FileUpload = (props) => {

    const chooseFile = async() => {
        try{
            const file = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles]
            })
            console.log(
                res.uri,
                res.type,
                res.name,
                res.size
            )
            const path = await normalizePath(file.uri)
            const result = awaitRNFetchBlob.fs.readFile(path,'base64')
            console.log(result)
            console.log(path)
        }catch(err){
            if(DocumentPicker.isCancel(err)){

            }else{
                throw err;
            }
        }
    }

    const normalizePath = async(path) => {
        if(Platform.OS==='ios' || Platform.OS==='android'){
            const fileperfix = 'file://'
            if(path.startsWith(filePrefix)){
                path=path.substring(filePrefix.length)
                try{
                    path=decodeURI(path)
                }
                catch(e){

                }
            }
        }
        return path
    }

  return (
    <View>
      <TouchableOpacity style={{
      width: '90%',
      height: 50,
      borderWidth: .5,
      alignSelf: 'center',
      paddingLeft: 20,
      borderRadius: 20,
      backgroundColor: 'purple',
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center'
    }}
    onPress={chooseFile}>
      <Text style={{ color: 'white' }}>Upload File</Text>
    </TouchableOpacity>
    </View>
  )
}

export default FileUpload
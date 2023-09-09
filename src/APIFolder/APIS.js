import { View, Text, FlatList, Linking } from 'react-native'
import React,{useState} from 'react'
import Btn from '../component/Btn'
import axios from 'axios'

const APIS = () => {
  const [data, setData] = useState([])
  const baseURL = 'https://api.airindia.com/common/general'

  const getAPI = () =>{
    axios({
      method:"GET",
      url: `${baseURL}/airport-content?page=1&pageSize=0`
    }).then(res => setData(res.data))
      .catch(err => console.log(err))
  }

  // const get_by_ID = () => {
  //   axios({
  //     method:"GET",
  //     url: `${baseURL}/posts/16`,
  //     body: JSON.stringify({
  //       id: 101,
  //       title: 'New Title',
  //       body: 'New Body for the data'
  //     })
  //   }).then(res => console.log(res.data))
  //     .catch(err => console.log(err))
  // }

  // const postAPI = () => {
  //   axios({
  //     method:"POST",
  //     url: `${baseURL}/posts/10`
  //   }).then(res => console.log(res.data))
  //     .catch(err => console.log(err))
  // }

  // const patchAPI = () => {
  //   axios({
  //     method:"PATCH",
  //     url: `${baseURL}/posts/16`,
  //     body: JSON.stringify({
  //       title: 'Updated Title',
  //     })
  //   }).then(res => console.log(res))
  //     .catch(err => console.log(err))
  // }

  // const deleteAPI = () => {
  //   axios({
  //     method:"DELETE",
  //     url: `${baseURL}/posts/16`
  //   }).then(res => console.log(res))
  //     .catch(err => console.log(err))
  // }

  return (
    <View>
        <Btn title='for more infromation visit site' Press={getAPI}/>
        {/* <Btn title='GET BY ID' Press={get_by_ID}/>
        <Btn title='POST' Press={postAPI}/>
        <Btn title='PATCH' Press={patchAPI}/>
        <Btn title='DELETE' Press={deleteAPI}/> */}

        <FlatList data={data} 
        renderItem={({item}) =>
        <View>
          {/* <Text style={{ fontSize: 22, color: 'black' }}>ID:{item.id}</Text> */}
          {/* <Text 
            style={{
               fontSize: 22,
               color: 'black' 
              }}
               numberOfLines={1}  
          >
            {item.Title}
          </Text> */}
          <Text 
            style={{ 
              fontSize: 19, 
              color: 'black' 
            }} 
            numberOfLines={3}
            onPress={()=> Linking.openURL(item.Link)}
           >
            {item.Link}
          </Text>
        </View>
      }
        />
    </View>
  )
}

export default APIS
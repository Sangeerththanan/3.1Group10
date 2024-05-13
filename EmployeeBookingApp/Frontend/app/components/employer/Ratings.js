import React,{useState} from 'react';
import { SafeAreaView,StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
export default function Ratings() {
    const [defaultRating , setDefaultRating] = useState(0);
    const [maxRating,setMaxRating]=useState([1,2,3,4,5]);

    const filledStarImage='https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const cornerStarImage='https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';


    const custormerRatingX=()=>{
        return(
            <View style={styles.custormerRatingBarStyle}>
            {
                maxRating.map((item,key)=>{
                    return(
                        <TouchableOpacity 
                        activeOpacity={0.7}
                        key={item}
                        onPress={()=>setDefaultRating(item)}
                        >
                            <Image
                                style={styles.starImgStyle}
                                source={
                                    item <=defaultRating ?{uri:filledStarImage} :{uri:cornerStarImage}
                                }
                            />
                        </TouchableOpacity>

                    );
                })
            }
            </View>
        )
    }
  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.textStyle}>Please Rate us</Text>
      {custormerRatingX()}

      <Text style={styles.textStyle}>
            {defaultRating +' / '+maxRating.length}
      </Text>
      <TouchableOpacity
  activeOpacity={0.7}
  style={styles.buttonStyle}
  onPress={() => alert(defaultRating)}
>
  <Text>Submit Rating</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign:'center',
    fontSize :23,
    marginTop:20,
  },
  custormerRatingBarStyle:{
    justifyContent:'center',
    flexDirection:'row',
    marginBottom:-600,
  },
  starImgStyle:{
    width:20,
    height:20,
    resizeMode:'cover'
  },
  buttonStyle:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,
    padding:15,
    backgroundColor:'lightgreen'
,  }
});
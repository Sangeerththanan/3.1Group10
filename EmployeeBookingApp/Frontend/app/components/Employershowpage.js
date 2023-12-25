import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Client from '../api/Client';
import { useLogin } from '../context/LoginProvider';
import UserTypeButton from './UserTypeButton';


const Home = ({ route, navigation }) => {
  const { updatedData } = route.params ?? {};
  //console.log('updatedData:'updatedData);

  const { Home } = useLogin();
  const [employerData, setEmployerData] = useState(null);
  const { email } = Home;
  //console.log('email: ',email);
  useEffect(() => {
    const fetchData = async () => {
        try {
            if (updatedData) {
                setEmployerData(updatedData);
                //console.log('Updated!')
            } else {
                const response = await Client.get(`/employers/${email}`);
                setEmployerData(response.data);
            }
        } catch (error) {
            console.error('Error fetching employer data:', error);
        }
    };
    fetchData();
  }, [email, updatedData]); // Include email in the dependency array to fetch data when email changes , // Include email and updatedData in the dependency array

  

  return (
    <View style={styles.container}>
        {employerData ? (
            <View>
                
                
            </View>
        ) : (
            <Text style={styles.loadingText}>Loading...</Text>
        )}
    </View>
);
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    text: {
        fontSize: 20,
        marginBottom: 8,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Home;

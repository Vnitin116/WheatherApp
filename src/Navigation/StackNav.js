
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Splash';
import ForecastScreen from '../Screens/ForecastScreen';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash}
                options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForeCastScreen" component={ForecastScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
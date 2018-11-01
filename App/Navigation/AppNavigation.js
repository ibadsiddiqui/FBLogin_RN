import { StackNavigator } from 'react-navigation'

import HomeScreen from '../Screens/HomeScreen'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: { screen: HomeScreen }

}, 

{
    // Default config for all screens
    headerMode: 'none',
  initialRouteName: 'HomeScreen',
    navigationOptions: {
      //
    }
  })

export default PrimaryNav

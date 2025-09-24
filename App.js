import React from 'react';
import Navigation from './navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTab } from './src/navigation/BottomTab';


export default function App() {
  return <Navigation />;
}

// const App = () => {
//   return(
//     <NavigationContainer>
//       <BottomTab />
//     </NavigationContainer>
//   )
// }

// export default App;
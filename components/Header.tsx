import { Text, View, StyleSheet } from 'react-native';

interface HeaderProps {
    appName: string;
}

const Header = ({appName} : HeaderProps) => {
    return(
        <View>
            <Text style={styles.text}>Welcome to {appName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  text:{fontSize:24,color:'orange', marginVertical:10, height:30, borderBottomWidth:1}
});

export default Header;
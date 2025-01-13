import { Text, View } from 'react-native';



type HeaderProps = {
    appName: string

}

const Header:React.FC<HeaderProps> = ({appName}) => {
    return(
        <View>
            <Text>Welcome to {appName}</Text>
        </View>
    )
}

export default Header;
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <Text>DEMO Streaming</Text>
            <View style={styles.containerOptions}>
                <TouchableOpacity>
                    <Text>Log In</Text>
                </TouchableOpacity>
                <Button title="Start your free trial"></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    containerOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
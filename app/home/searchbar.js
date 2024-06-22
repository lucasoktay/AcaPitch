import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Text, View } from 'react-native';
import styles from '../styles.js';

const SearchBar = () => {
    return (
        <View style={styles.searchbar}>
            <FontAwesomeIcon icon={faSearch} size={20} color={"#DF7B43"} />
            <Text style={{ color: "grey" }}>Search</Text>
        </View>
    );
}

export default SearchBar
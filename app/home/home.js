import { Text, View } from 'react-native';
import NavBar from '../navbar/navbar.js';
import PlusButton from './plusbutton.js';
import SearchBar from './searchbar.js';
import SettingsIcon from './settingsicon.js';
import SongList from './songlist.js';
import styles from './styles.js';

const Home = () => {
    return (
        <View style={{ backgroundColor: '#f9f5ef', flexGrow: 1 }}>
            <View style={styles.fullscreen}>
                <View style={styles.topbar}>
                    <SearchBar />
                    <SettingsIcon />
                </View>
                <Text style={styles.yoursongs}>Your Songs</Text>
                <SongList />
                <View style={styles.bottomline}></View>
                <PlusButton />
            </View>
            <NavBar />
        </View>
    );
}

export default Home;
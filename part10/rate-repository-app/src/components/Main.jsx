import { StyleSheet, View } from 'react-native';
import { Route, Routes } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import Repository from './Repository';
import ReviewForm from './ReviewForm';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.gray,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/repository/:id' element={<Repository />} />
                <Route path='/review' element={<ReviewForm />} />
            </Routes>
        </View>
    );
};

export default Main;

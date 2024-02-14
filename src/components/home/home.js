import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Footer from '../footer/footer';
import Header from '../header/header';
import Series from '../../pages/series/series'
import Movies from '../../pages/movies/movies';

export default function Home() {

    const [selectedCategory, setSelectedCategory] = useState('Movies');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
            </View>
            <View style={styles.category}>
                <TouchableOpacity onPress={() => handleCategoryChange('Movies')}>
                    <Text style={[styles.categoryText, selectedCategory === 'Movies' && styles.selectedText]}>Popular Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCategoryChange('Series')}>
                    <Text style={[styles.categoryText, selectedCategory === 'Series' && styles.selectedText]}>Popular Series</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {selectedCategory === 'Movies' ? <Movies /> : <Series />}
            </View>
            <View style={styles.footer}>
                <Footer />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    header: {
        height: '10%'
    },
    category: {
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedText: {
        color:'#aae'
    },
    content: {
        height: '68%'
    },
    footer: {
        height: '14%',
    },
});
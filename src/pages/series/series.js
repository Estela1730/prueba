import React, { useState, useEffect } from 'react';
import data from '../../../data/sample.json';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal } from 'react-native';

export default function Movies() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const peliculasFiltradas = data.entries.filter(entry => entry.programType === "series" && entry.releaseYear >= 2010);
    peliculasFiltradas.sort((a, b) => a.title.localeCompare(b.title));
    const primeras20Peliculas = peliculasFiltradas.slice(0, 20);
    const dataAgrupada = agruparData(primeras20Peliculas, 3);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>Oops, something went wrong...</Text>
            </View>
        );
    }

    function agruparData(array, tamañoGrupo) {
        const agruparArray = [];
        let index = 0;
        while (index < array.length) {
            agruparArray.push(array.slice(index, index + tamañoGrupo));
            index += tamañoGrupo;
        }
        return agruparArray;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={dataAgrupada}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        {item.map((entry) => (
                            <TouchableOpacity
                                key={entry.title}
                                onPress={() => handleMovieClick(entry)}
                                style={styles.movieContainer}
                            >
                                <Image source={{ uri: entry.images['Poster Art'].url }} style={styles.poster} />
                                <Text style={styles.movieTitle}>{entry.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />

            <Modal
                visible={selectedMovie !== null}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedMovie && (
                            <View>
                                <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
                                <Text style={styles.modalText}>{selectedMovie.description}</Text>
                                <Text style={styles.modalText}>{selectedMovie.releaseYear}</Text>
                                <Image source={{ uri: selectedMovie.images['Poster Art'].url }} style={styles.modalPoster} />
                                <TouchableOpacity onPress={() => setSelectedMovie(null)} style={styles.closeButton}>
                                    <Text>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 8,
    },
    movieTitle: {
        width: 120,
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 10,
        width: '90%',
        borderRadius: 8,
    },
    modalPoster: {
        height: 200,
        marginBottom: 10,
        borderRadius: 8,
    },
    closeButton: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 8,
    },
    movieContainer: {
        flex: 1,
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
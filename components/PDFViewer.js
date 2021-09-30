import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import Pdf from 'rn-pdf-reader-js';

 const PDFViewer = (props) => {
    const state = props.navigation.state;
    const source = {uri:`${state.params.uri}`,cache:true};
    return (
        <View style={styles.container}>
            <Pdf
                source={source}
                style={styles.pdf}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

export default PDFViewer;
import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

export default class Card extends React.Component {
  // state = {
  //   showTerm: false,
  //   favorite: this.props.favorite
  // }
  constructor(props) {
  super(props);
  this.state = {showTerm: true, favorite: props.favorite};
}

  /*
    Flips the showTerm flag in our state
  */
  flipCard = () => {
    (this.props.deleteMode) ?
    this.props.deleteCard(this.props.cardData.term)
    : this.setState({ showTerm: !this.state.showTerm});
  }

  favoritePressed = () => {
    // (this.state.favorite) ?
    this.props.favoritePressed(this.props.cardData.term);
    this.setState({ favorite: !this.state.favorite });
  }

  render() {
    // Conditional statement that changes the style of the text based on whether or not we're seeing the term or definition
    const textStyle = (this.state.showTerm) ? (styles.termText) : (styles.definitionText);

    return (
      <TouchableWithoutFeedback onPress={this.flipCard}>
        <View style={[styles.container]}>
          <View style={styles.topBar} >
          <Text style={styles.cardTitle}>{(this.state.showTerm) ? ("Term") : ("Definition")}</Text>
          <Text style={styles.favorite}
            style={styles.favoriteButton}
            onPress={this.favoritePressed}
            color={(this.state.favorite) ? ("#ffd700") : ("#841584")}
            >{(this.state.favorite) ? ("★") : ("☆")}
          </Text>
        </View>
          <Text style={textStyle}>{(this.state.showTerm) ? (this.props.cardData.term) : (this.props.cardData.definition)}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexBasis: '50%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 20,
    height: 300
  },
  cardTitle: {
    color: '#7f8c8d',
    fontSize: 18,
    fontFamily: 'Avenir Next',
  },
  favoriteButton: {
    color: '#eaea00',
    fontSize: 25,
    fontFamily: 'Avenir Next',
  },
  termText: {
    fontSize: 50,
    fontFamily: 'AvenirNext-Medium',
    textAlign: 'center',
  },
  definitionText: {
    fontSize: 24,
    fontFamily: 'Avenir Next',
    textAlign: 'center',
  },
  topBar: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 0,
    position: 'absolute',
    left: 20,
    top: 20,
    justifyContent:'space-between',
    width:'100%',
  }
});

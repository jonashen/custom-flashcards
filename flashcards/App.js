import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Modal,
  TextInput,
  NavigatorIOS
} from 'react-native';

/*
  Import our two custom components
*/
import NewCardModal from './NewCardModal';
import Card from './Card';

/*
  Default set of cards
*/
var DEFAULT_CARDS = [
  {
    term: "Jonathon",
    definition: "Da best boi",
    favorite: false
  },
  {
    term: "Scope",
    definition: "An awesome CS club at USC",
    favorite: false
  },
  {
    term: "JonLuca",
    definition: "Part robot, part human, part deity",
    favorite: false
  },
  {
    term: "Willie",
    definition: "Part scrub, part goon, part snake #marshall",
    favorite: false
  }
];

class App extends Component {
  state = {
    cards: DEFAULT_CARDS,
    favoriteCards: [],
    modalVisible: false,
    deleteMode: false,
    favoriteMode: false
  }

  /*
    Toggles the new card modal
  */
  _toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  _toggleDelete = () => {
    this.setState({
      deleteMode: !this.state.deleteMode
    });
  }

  _toggleFavorite = () => {
    this.setState({
      favoriteMode: !this.state.favoriteMode
    });
    console.log("hello");
  }

  _deleteCard = (_cardTerm) => {
    const cards = this.state.cards;

    this.setState({cards: this.state.cards.filter(function(card) {
    return card.term !== _cardTerm })
  });
  }

  /*
    Passed to the new card modal.
    Called when user decides to add new card.
    Creates card object and adds it to our state
  */
  _addCard = (_term, _definition) => {
    const cards = this.state.cards;

    cards.push({
      term: _term,
      definition: _definition
    });

    this.setState({
      cards: cards
    });

    this.setState({
      modalVisible: false
    });
  }
  _favoritePressed = (_cardTerm) => {
      this.setState({cards: this.state.cards.filter(function(card) {
        if (card.term == _cardTerm) {
          card.favorite = !card.favorite;
          return card;
        } else return card;
      })
      });
  }

  render() {
    var cards;

    // Favorite button selected
    if (this.state.favoriteMode) {
      cards = this.state.cards.filter(function(card) {
        if (card.favorite) { return card; }
      })

      cards = cards.map((card, index) => {
       // Pass the appropriate data as a prop to the Card component
       return (
         <Card cardData={card}
           key={index}
           favorite={card.favorite}
           deleteMode={this.state.deleteMode}
           deleteCard={this._deleteCard}
           favoriteMode={this.state.deleteMode}
           favoritePressed={this._favoritePressed}
         />
       )
     });
    }

    else {
      // Loop through the cards array in state and create Card component for each card
       cards = this.state.cards.map((card, index) => {
        // Pass the appropriate data as a prop to the Card component
        return (
          <Card cardData={card}
            key={index}
            favorite={card.favorite}
            deleteMode={this.state.deleteMode}
            deleteCard={this._deleteCard}
            favoriteMode={this.state.deleteMode}
            favoritePressed={this._favoritePressed}
          />
        )
      });
    }

    return (
      <View style={styles.container}>
        <NewCardModal
          modalVisible={this.state.modalVisible}
          toggleModal={this._toggleModal}
          addCard={this._addCard}
        />

        <ScrollView>
          {cards}
        </ScrollView>
        <View style={styles.buttonBar} >
        <TouchableHighlight
          style={styles.addButton}
          onPress={this._toggleModal}
          underlayColor='#128040'
        >
          <Text style={styles.buttonBarText}>+</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.favoriteButton}
          onPress={this._toggleFavorite}
          underlayColor='#a3a300'
        >
          <Text style={styles.favoriteButtonText}>{(this.state.favoriteMode) ? ("★") : ("☆")}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.deleteButton}
          onPress={this._toggleDelete}
          underlayColor='#ae0000'
        >
          <Text style={styles.buttonBarText}>{(this.state.deleteMode) ? ("Done") : ("-")}</Text>
        </TouchableHighlight>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6734D1'
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1
  },
  favoriteButton: {
    backgroundColor: '#efef00',
    paddingTop: 10,
    paddingBottom: 10,
    flex:1
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    paddingTop: 10,
    paddingBottom: 10,
    flex:1
  },
  buttonBarText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 35
  },
  favoriteButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Avenir Next'
  },
  buttonBar: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 0,
  }
});

export default App;

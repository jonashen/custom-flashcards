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
    term: "Scope",
    definition: "An awesome CS club at USC"
  },
  {
    term: "JonLuca",
    definition: "Part robot, part human, part deity"
  },
  {
    term: "Willie",
    definition: "Part scrub, part goon, part snake #marshall"
  }
];

class App extends Component {
  state = {
    cards: DEFAULT_CARDS,
    modalVisible: false,
    deleteMode: false
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

  _deleteCard = (_index) => {
    const cards = this.state.cards;

    cards.splice(parseInt(_index), 1);

    this.setState({
      cards: cards
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

  render() {
    // Loop through the cards array in state and create Card component for each card
    const cards = this.state.cards.map((card, index) => {
      // Pass the appropriate data as a prop to the Card component
      return (
        <Card cardData={card}
          key={index}
          deleteMode={this.state.deleteMode}
          deleteCard={this._deleteCard}
        />
      )
    });

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
          <Text style={styles.addButtonText}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.deleteButton}
          onPress={this._toggleDelete}
          underlayColor='#ae0000'
        >
          <Text style={styles.deleteButtonText}>{(this.state.deleteMode) ? ("Done") : ("-")}</Text>
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
  addButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 35
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    paddingTop: 10,
    paddingBottom: 10,
    flex:1
  },
  deleteButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 35
  },
  buttonBar: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 0,
  }
});

export default App;

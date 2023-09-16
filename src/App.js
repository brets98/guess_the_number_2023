import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './App.css';

function App() {
  const [Intro, setIntro] = useState(true);
  const [game, setgame] = useState(false);

  const [guessed, setguessed] = useState([])
  const [guessedRes, setguessedRes] = useState([]);


  const [guess, setGuess] = useState(''); // Initialize guess state with an empty string

  const [toGuess, settoGuess] = useState(0)

  const createNumberToGuess = () => {
    var tot = '';
    for (var i = 0; i < 4; i++) {
      var el = Math.floor(Math.random() * (9 - 0)) + 0;
      tot += el;
    }

    settoGuess(tot)
    console.log("🚀 ~ file: App.js:25 ~ createNumberToGuess ~ tot:", tot)

  }

  function getAllIndices(arr, num) {
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === num) {
        indices.push(i);
      }
    }
    return indices;
  }




  const isCorrect = () => {

    var alreadychecked = [];
    var correctPosition = 0;
    var correctNumber = 0;
    for (var i = 0; i < 4; i++) {
      var indici = getAllIndices(toGuess, guess[i])
      if (toGuess[i] == guess[i]) {
        correctPosition++;
        alreadychecked.push(guess[i]);
      }
      else if (toGuess.includes(guess[i]) && !alreadychecked.includes(guess[i])) {
        correctNumber++;
        alreadychecked.push(guess[i]);

      }

    }

    if (correctPosition == 4) {
      setguessedRes(['you wonn', ...guessedRes]);

    } else
      setguessedRes([correctPosition + ' - ' + correctNumber, ...guessedRes]);



  }




  return (
    <div className="App">


      <div className={`faded-element ${Intro ? 'visible' : ''}`}>


        Welcome to GUESS THE NUMBER

        <br></br>


        The rules are simple:
        In order to win you have to guess the right number that is 4 digit long.



      </div>

      <div className={`faded-element ${game ? 'visible' : ''}`}>
        <input
          name="guess"
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)} // Update guess state as the user types
        />
        <button onClick={() => {
          setguessed([guess, ...guessed]);
          isCorrect();
          setGuess('');

        }}>Guess</button>

        <div>
          <Row>
            <Col>
              {
                guessed.map((el, index) => {
                  return (
                    <div key={index}>
                      {el}
                    </div>
                  )
                })
              }
            </Col>
            <Col>
              {
                guessedRes.map((el, index) => {
                  return (
                    <div key={index}>
                      {el}
                    </div>
                  )
                })
              }
            </Col>
          </Row>

        </div>

      </div>
      <div>
      </div>

      <button
        onClick={() => {
          if (Intro) {
            setIntro(false)
            setgame(true)
            createNumberToGuess()

          } else {
            setIntro(true)
            setgame(false)
            setguessed([])
            setguessedRes([])

          }
        }}>
        {Intro ? 'Start' : 'Go back'}
      </button>
    </div >
  );
}

export default App;

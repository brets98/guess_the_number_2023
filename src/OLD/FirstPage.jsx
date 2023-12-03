import { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import TextTransition, { presets } from 'react-text-transition';
// import './App.css';
import { AiOutlineInfoCircle } from "react-icons/ai";

import Infopopup from '../Components/Infopopup';
function FirstPage() {

    const [isShow, setisShow] = useState(true)
    const [Intro, setIntro] = useState(true);
    const [game, setgame] = useState(false);

    const [guessed, setguessed] = useState([])
    const [guessedRes, setguessedRes] = useState([]);





    const [guess, setGuess] = useState(''); // Initialize guess state with an empty string

    const [toGuess, settoGuess] = useState(0)

    const createNumberToGuess = () => {
        const uniqueDigits = new Set();

        while (uniqueDigits.size < 4) {
            const digit = Math.floor(Math.random() * 10);
            uniqueDigits.add(digit);
        }

        const toGuess = [...uniqueDigits].join('');
        settoGuess(toGuess);
    };

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

    const [showPopup, setshowPopup] = useState(true)


    const HidePopUp = () => { setshowPopup(false) }

    const TEXTS = ['GUESS', 'THE', 'NUMBER'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            600,
        );
        return () => clearTimeout(intervalId);
    }, []);


    const [hoverGuess, sethoverGuess] = useState(false)

    return (
        <div className="App">
            {showPopup && <Infopopup handleClose={HidePopUp}></Infopopup>}

            <div className='contenitore' style={{ width: '100vw' }}>
                <div style={{ paddingTop: '50px' }}>
                    <h1>GUESS THE NUMBER</h1>

                </div>


                <AiOutlineInfoCircle onClick={() => setshowPopup(true)} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '30px' }}></AiOutlineInfoCircle>

                <div style={{ marginTop: '50px' }} className={`faded-element ${game ? 'visible' : ''} `}>
                    <input
                        style={{
                            width: '600px',
                            height: '50px',
                            borderRadius: '10px',
                            border: 'transparent',
                            fontSize: '30px',
                        }}
                        name="guess"
                        type="number"
                        value={guess}
                        onChange={(e) => {
                            const inputGuess = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                            if (inputGuess.length <= 4) {
                                setGuess(inputGuess);
                            }
                        }}
                    />

                    <Button
                        style={{
                            marginLeft: '50px',
                            // backgroundColor:hoverGuess ? 'white' : 'trasparent', 
                            background: 'white',
                            opacity: hoverGuess ? 1 : 0.8,
                            color: hoverGuess ? 'black' : 'black',
                            border: '1px solid transparent'
                        }}
                        onClick={() => {
                            setguessed([guess, ...guessed]);
                            isCorrect();
                            setGuess('');

                        }}
                        onMouseEnter={() => { sethoverGuess(true) }}
                        onMouseLeave={() => { sethoverGuess(false) }}
                    >Guess</Button>

                    <div>
                        <Row>
                            <Col>
                                {
                                    guessed.map((el, index) => (
                                        <div key={index}>{el}</div>
                                    ))
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


                <Button

                    style={{
                        marginLeft: '50px',
                        // backgroundColor:hoverGuess ? 'white' : 'trasparent', 
                        background: 'white',
                        opacity: hoverGuess ? 1 : 0.8,
                        color: hoverGuess ? 'black' : 'black',
                        border: '1px solid transparent'
                    }}



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
                </Button>


            </div>




        </div >
    );
}

export default FirstPage;

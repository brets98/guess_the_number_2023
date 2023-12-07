import { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import TextTransition, { presets } from 'react-text-transition';
// import './App.css';
import { useWindowSize } from "@uidotdev/usehooks";
import React from 'react';
import Confetti from 'react-confetti';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import Infopopup from '../Components/Infopopup';

function FirstPage() {

    const { width, height } = useWindowSize()
    const [YouWon, setYouWon] = useState(false)


    const [isShow, setisShow] = useState(true)
    const [Intro, setIntro] = useState(true);
    const [game, setgame] = useState(false);

    const [guessed, setguessed] = useState([])
    const [guessedRes, setguessedRes] = useState([]);


    const [guesses, setGuesses] = useState(Array(4).fill(''));
    const inputRefs = Array(5).fill(0).map((_, i) => React.createRef());


    const [guess, setGuess] = useState(''); // Initialize guess te with an empty string

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


        setguessed([guesses, ...guessed])

        var alreadychecked = [];
        var correctPosition = 0;
        var correctNumber = 0;
        for (var i = 0; i < 4; i++) {

            if (toGuess[i] == guesses[i]) {
                correctPosition++;
                alreadychecked.push(guesses[i]);
            }
            else if (toGuess.includes(guesses[i]) && !alreadychecked.includes(guesses[i])) {
                correctNumber++;
                alreadychecked.push(guesses[i]);

            }

        }

        if (correctPosition == 4) {
            setguessedRes(['you wonn', ...guessedRes]);
            setYouWon(true)

        } else
            setguessedRes([correctPosition + ' - ' + correctNumber, ...guessedRes]);



        inputRefs[0].current.focus();

        setGuesses(Array(4).fill(''));


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

    useEffect(() => {

        const allFilled = guesses.every(guess => guess !== '');
        if (allFilled) {
            setguessed([guess, ...guessed]);
            isCorrect();
            setGuess('');
        }

    }, [guesses])


    return (
        <div className="App">
            {showPopup && <Infopopup handleClose={HidePopUp}></Infopopup>}

            <div className='contenitore' style={{ width: '100vw' }}>
                <div style={{ paddingTop: '50px' }}>
                    <h1>GUESS THE NUMBER</h1>

                </div>
                {
                    YouWon &&

                    <Confetti

                        width={width}
                        height={height}
                    />
                }
                <AiOutlineInfoCircle onClick={() => setshowPopup(true)} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '30px' }}></AiOutlineInfoCircle>

                <div style={{ marginTop: '50px' }} className={`faded-element ${game ? 'visible' : ''} `}>
                    {Array(4).fill(null).map((_, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}

                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '10px',
                                border: 'transparent',
                                fontSize: '30px',
                                margin: '0 10px',
                                textAlign: 'center',
                                appearance: 'textfield',
                                caretColor: 'transparent' // This will remove the text cursor
                            }}
                            className="focused-input"

                            name={`guess${index}`}
                            type="number"
                            value={guesses[index]}
                            onChange={(e) => {
                                const inputGuess = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                                if (inputGuess.length <= 1) {
                                    const newGuesses = [...guesses];
                                    newGuesses[index] = inputGuess;
                                    console.log("🚀 ~ file: FirstPage.jsx:224 ~ FirstPage ~ newGuesses:", newGuesses)

                                    setGuesses(newGuesses);


                                    if (inputGuess.length === 1 && index < 3) {
                                        inputRefs[index + 1].current.focus();
                                    }


                                }
                            }}
                        />
                    ))}


                    <div>
                        <Row>
                            <Col md={2}></Col>

                            <Col >
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
                                                {Array(parseInt(el.split('-')[0])).fill(null).map((_, i) => (
                                                    <span key={i}>
                                                        <FaRegCircle />
                                                    </span>
                                                ))}


                                                {Array(parseInt(el.split('-')[1])).fill(null).map((_, i) => (
                                                    <span key={i}>
                                                        <FaCircle />

                                                    </span>
                                                ))}
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                            <Col md={2}></Col>
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
                            inputRefs[0].current.focus();


                        } else {
                            setIntro(true)
                            setgame(false)
                            setguessed([])
                            setguessedRes([])
                            inputRefs[0].current.focus();
                            setYouWon(false)


                        }
                    }}>
                    {Intro ? 'Start' : 'Go back'}
                </Button>


            </div>




        </div >
    );
}

export default FirstPage;

import "./Home.css";
import { useState, useEffect, useRef } from "react";

function Home(props) {
    let [question, setQuestion] = useState("");
    let [answer, setAnswer] = useState("");
    let [wpm, setWpm] = useState(0);
    let [accuracy, setAccuracy] = useState(0);
    let [completed, setCompleted] = useState(false);

    // TIMER STATE
    let [timeLeft, setTimeLeft] = useState(30);
    let [timerStarted, setTimerStarted] = useState(false);

    let startTime = useRef(null);

    let questionbox = [
        "I have 2 apples, 2 Mango and 3 oranges, which means I can make a delicious fruit salad.",
        "Today is 12th March, 2025, and the weather forecast says it will rain later.",
        "A rectangle has 4 sides and 4 angles, making it one of the simplest shapes.",
        "The bus arrived at 8:15 AM, just in time for the students to get to school.",
        "There are 24 hours in a day, but sometimes it feels like we need more time.",
    ];

    function reset() {
        setQuestion(
            questionbox[Math.floor(Math.random() * questionbox.length)]
        );

        setAnswer("");
        setWpm(0);
        setAccuracy(0);
        setCompleted(false);

        // RESET TIMER
        setTimeLeft(30);
        setTimerStarted(false);

        startTime.current = null;
    }

    useEffect(() => {
        reset();
    }, []);

    // TIMER
    useEffect(() => {
        let timer;

        if (timerStarted && timeLeft > 0 && !completed) {
            timer = setInterval(() => {
                setTimeLeft((previousTime) => previousTime - 1);
            }, 1000);
        }

        if (timeLeft === 0) {
            setCompleted(true);
            setTimerStarted(false);
        }

        return () => clearInterval(timer);

    }, [timerStarted, timeLeft, completed]);


    let handleChange = (event) => {

        if (startTime.current === null) {
            startTime.current = Date.now();

            // START TIMER
            setTimerStarted(true);
        }

        setAnswer(event.target.value);
        calculateResult(event.target.value);
    };


    let calculateResult = (answer) => {

        if (answer.length === 0) {
            setAccuracy(0);
            setWpm(0);
            return;
        }

        let totalChars = answer.length;

        let correctChars = [...answer].filter(
            (ele, i) => ele === question[i]
        ).length;

        let acc = Math.round(
            (correctChars / totalChars) * 100
        );

        setAccuracy(acc);


        // CALCULATE WPM
        let endTime = Date.now();

        let timeTaken =
            (endTime - startTime.current) / 60000;

        if (timeTaken === 0) {
            return;
        }

        let totalWords = totalChars / 5;

        let currentWpm = Math.round(
            totalWords / timeTaken
        );

        setWpm(currentWpm);


        // IF USER COMPLETES SENTENCE BEFORE TIMER
        if (question.length === answer.length) {

            setCompleted(true);
            setTimerStarted(false);

            if (
                currentWpm > props.best &&
                question === answer
            ) {
                props.setBest(currentWpm);
            }
        }
    };


    // FORMAT TIMER
    let formattedTime =
        `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`;


    return (
        <div className="typing-container">

            <p
                className="question"
                onCopy={(event) => event.preventDefault()}
            >
                {[...question].map((c, i) => {

                    return (
                        <span
                            key={i}
                            className={
                                c === answer[i]
                                    ? "correct"
                                    : answer[i]
                                    ? "wrong"
                                    : ""
                            }
                        >
                            {c}
                        </span>
                    );

                })}
            </p>


            <textarea
                className="answer"
                placeholder="Start typing here..."
                onChange={handleChange}
                value={answer}
                disabled={completed}
                onPaste={(event) => event.preventDefault()}
            />


            {/* TIMER */}

            <div className="timer">
                {formattedTime}
            </div>


            {/* STATS */}

            <div className="stats">

                <p>
                    WPM: {wpm}
                </p>

                <p>
                    Accuracy: {accuracy}%
                </p>

            </div>


            <div className="divider"></div>


            <button
                onClick={reset}
                className="restart-btn"
            >
                Restart
            </button>

        </div>
    );
}

export default Home;
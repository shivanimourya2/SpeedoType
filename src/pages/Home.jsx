import "./Home.css";
import {useState , useEffect , useRef} from "react";

function Home(props)
{
    let [question,setQuestion] = useState("");
    let [answer,setAnswer] = useState("");
    let [wpm,setWpm] = useState(0);
    let [accuracy,setAccuracy] = useState(0);
    let [completed,setCompleted] = useState(false);
    let startTime = useRef(null);

    function reset()
    {
        setQuestion(questionbox[Math.floor(Math.random()*5)]);
        setAnswer("");
        setWpm(0);
        setAccuracy(0);
        setCompleted(false);
        startTime.current=null;
       
    }
    useEffect(()=> reset(), []);

    let handleChange=(event)=>
        {
            if(startTime.current===null)
            {
                startTime.current=Date.now();
            }

        setAnswer(event.target.value);
        calculateResult(event.target.value);
    }
    let calculateResult=(answer)=>
    {
        if(answer.length===0)
        {
            setAccuracy(0);
            return;
        }
        let totalChars = answer.length;
        let correctChars=[...answer].filter((ele,i)=>ele===question[i]).length;

        let acc =Math.round((correctChars/totalChars)*100);
        setAccuracy(acc);

        let endTime = Date.now();
        let timeTaken=(endTime - startTime.current)/60000;
        if(timeTaken===0)
        {
            return;
        }

        totalChars= answer.length;
        let totalWords= totalChars/5;
        let currentWpm = Math.round(totalWords/timeTaken);
        setWpm(currentWpm)


    
        if(question.length===answer.length)
        {
            setCompleted(true);
            if(currentWpm>props.best && question===answer)
            {
                props.setBest(currentWpm);
            }
        }

    }

    let questionbox = [
        "I have 2 apples, 2 Mango and 3 oranges, which means I can make a delicious fruit salad.",
        "Today is 12th March, 2025, and the weather forecast says it will rain later.",
        "A rectangle has 4 sides and 4 angles, making it one of the simplest shapes.",
        "The bus arrived at 8:15 AM, just in time for the students to get to school.",
        "There are 24 hours in a day, but sometimes it feels like we need more time.",
        // "Room temperature is 22 degree Celcius, which is considered comfortable for most people indoors."
      ];
    
  
    return <div className="typing-container">  
            <p className="question"
                onCopy={(event)=>event.preventDefault()}
            >{[...question].map(
                (c,i)=>
                 {
                return <span   className={c===answer[i]? "correct": answer[i]?"wrong":""}>{c}</span>
                 }
                  
            )} 
          
            </p>
    
            <textarea className="answer" placeholder="Start typing here..."
            onChange={handleChange}
            value={answer}
            disabled={completed}
            onPaste = { (event)=> event.preventDefault()}
            
            />

            <div className="stats">
                <p>WPM : {wpm}</p>
                <p>Accuracy: {accuracy}%</p>
            </div>
            <button onClick={reset} className="restart-btn">Restart</button>

    </div>
    
}

export default Home;
import { useReducer } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
//variables
let randomNumber: number = 0;
type FormInputs = {
  Guess:number 
}

//function to generate Random Number
function random() {
  randomNumber = Math.trunc(Math.random() * 100);
  console.log(randomNumber);
  // alert(ran)
}
random();
//end of the function to generete random number

const App = () => {
  const {register, getValues } = useForm<FormInputs>();
  const [results, dispatch] = useReducer(reducerFunction, {
    feedback: "Start Game",
    trial: 10,
  });

  function reducerFunction(
    state: {
      trial: number;
      feedback: string;
    },
    action: { type: string }
  ):any {
    if (action.type === "ChechNumber") {
      if (randomNumber > getValues("Guess")) {
        return {
          ...state,
          feedback: "Your guess is too low",
          trial: state.trial - 1,
        };
      } else if (randomNumber <  getValues("Guess")) {
        return {
          ...state,
          feedback: "Your guess is too high",
          trial: state.trial - 1,
        };
      } else if (randomNumber ==  getValues("Guess")) {
        return { ...state, feedback: "You won the game" };
      }
    }
  }
  

  return (
    <div>
      <h1>Welcome to the Number guessing game</h1>
      <button disabled={results.trial == 0 ? false : true}>
        New Game
      </button>
      <p>Trials: {results.trial}</p>
      <form><input type = "number" {...register("Guess")} /></form>
      
     
      <p> {results.feedback}</p>
      <button
        onClick={() => dispatch({ type: "ChechNumber" })}
        disabled={results.trial == 0 ? true : false}
      >
        Guess Number
      </button>
    </div>
  );
};

export default App;

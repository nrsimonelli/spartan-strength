import './App.css';
import { useEffect, useState } from 'react';



function App() {

  const [displayTime, setDisplayTime] = useState(null); // total time displayed
  const [restTime, setRestTime] = useState(2); // sets the rest interval
  const [workTime, setWorkTime] = useState(4); // sets the work interval
  const [warmUpTime, setWarmUpTime] = useState(5); // sets the warm up time
  const [exerciseDisplay, setExerciseDisplay] = useState(''); // displays exercise on screen
  const [nextExerciseDisplay, setNextExerciseDisplay] = useState(''); // displays next exercise on screen
  const [activity, setActivity] = useState(''); // displays next exercise on screen

  // classic spartacus exercise list
  const spartacusWorkout = [
    'Goblet Squats',
    'Mountain Climbers',
    'Kettle Swings',
    'T Push Ups',
    'Jumping Lunges',
    'Rows',
    'Side Lunges',
    'Renegade Rows',
    'Lunge Twists',
    'Military Press',
  ];
  // console.log('Length:', spartacusWorkout.length);


  // display variables

  // countdown clock
  let intervalTime; // used to set the interval
  let totalTime = warmUpTime; // start of the workout time 
  let exerciseCount = 0; // keeps track of where you are in the workout
  let nextExerciseCount = 0; // counts 1 ahead of where you are in the workout


  // start warm-up time
  const startWarmUp = () => {
    console.log('Starting Timer');
    console.log('NEXT Exercise', spartacusWorkout[nextExerciseCount]);
    // display first exercise and category
    setNextExerciseDisplay(`Up Next: ${spartacusWorkout[nextExerciseCount]}`);
    setActivity(`Warm Up`);

    // run warm up time
    intervalTime = setInterval(() => {
      if (totalTime > 0) {
        console.log('warmUp-total time', totalTime);
        totalTime -= 1;
        setDisplayTime(totalTime);
      }
      else if (totalTime === 0) {
        console.log('WARM UP 0');
        clearInterval(intervalTime); // stop timer
        totalTime = workTime; // reset time for first work interval
        startWorkTime(); // run work time
      }
    }, 1000);
  }

  // start work time
  const startWorkTime = () => {
    console.log('Start WORK');
    setActivity(`Work`); // todo set an activity? toggle boolean?

    // increment/set nextExercise
    nextExerciseCount += 1;
    console.log('nextEXercise Count:', nextExerciseCount);
    if (nextExerciseCount === spartacusWorkout.length) {
      setNextExerciseDisplay(`End of Workout`);
    }
    else {
      setNextExerciseDisplay(`Up Next: ${spartacusWorkout[nextExerciseCount]}`); // set next exercise display
    }
    setExerciseDisplay(spartacusWorkout[exerciseCount]); // exercise display

    // run work time
    intervalTime = setInterval(() => {
      if (totalTime > 0) {
        console.log('work time', totalTime);
        totalTime -= 1;
        setDisplayTime(totalTime);
      }
      else if (totalTime === 0) {
        console.log('WORK 0');
        // stop timer
        clearInterval(intervalTime);
        // reset time for rest
        totalTime = restTime;
        // run rest time
        startRestTime();
      }
    }, 1000);
  }

  // start rest time
  const startRestTime = () => {
    console.log(`start REST`);
    setActivity(`Rest`);

    // run rest time
    intervalTime = setInterval(() => {
      if (totalTime > 0) {
        console.log('rest time', totalTime);
        totalTime -= 1;
        setDisplayTime(totalTime);
      }
      // workout complete
      else if (totalTime === 0 && exerciseCount === (spartacusWorkout.length - 1)) {
        console.log('workout complete');
        setExerciseDisplay('Workout Complete!');
        setNextExerciseDisplay('Workout Next Complete!');
        clearInterval(intervalTime);
      }
      else if (totalTime === 0) {
        console.log('REST 0');
        clearInterval(intervalTime); // stop timer
        totalTime = workTime; // reset time for rest
        exerciseCount += 1; // increment exercises
        startWorkTime(); // run work time
      }
    }, 1000);
  }





  return (
    <div className="spartanStrength">


      <h1>The Classic Spartacus Training</h1>


      <button onClick={startWarmUp}>Start</button>
      {/* <button onClick={pauseTime}>Pause</button> */}

      {/* showing time */}
      {displayTime}
      <br />
      {exerciseDisplay}
      <br />
      {nextExerciseDisplay}
      <br />
      {activity}


    </div>

  );
}

export default App;

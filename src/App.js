import './App.css';
import { useEffect, useState } from 'react';
import InputTime from './components/InputTime/InputTime';



function App() {

  // time variables
  const [displayTime, setDisplayTime] = useState(null); // total time displayed
  const [restTime, setRestTime] = useState(3); // sets the rest interval
  const [workTime, setWorkTime] = useState(5); // sets the work interval
  const [warmUpTime, setWarmUpTime] = useState(7); // sets the warm up time

  // display variables
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
  const customWorkout = [
    'Push Ups',
    'Burpees',
    'Sprints',
    'Pull Ups'
  ];

  // countdown clock logic
  let intervalTime; // used to set the interval
  let totalTime = warmUpTime; // start of the workout time 
  let exerciseCount = 0; // keeps track of where you are in the workout
  let nextExerciseCount = 0; // counts 1 ahead of where you are in the workout

  // start warm-up time
  // you can pass the workout array to the function through variables
  const startWarmUp = (workoutArray) => {
    console.log('Starting Timer', workoutArray);
    console.log('NEXT Exercise', workoutArray[nextExerciseCount]);
    // display first exercise and category
    setNextExerciseDisplay(`Up Next: ${workoutArray[nextExerciseCount]}`);
    setExerciseDisplay(`Warm Up`);

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
        startWorkTime(workoutArray); // run work time
      }
    }, 1000);
  }

  // start work time
  const startWorkTime = (workoutArray) => {
    console.log('Start WORK', workoutArray);
    setActivity(`Work`); // todo set an activity? toggle boolean?

    // increment/set nextExercise
    nextExerciseCount += 1;
    console.log('nextEXercise Count:', nextExerciseCount);
    if (nextExerciseCount === workoutArray.length) {
      setNextExerciseDisplay(`End of Workout`);
    }
    else {
      setNextExerciseDisplay(`Up Next: ${workoutArray[nextExerciseCount]}`); // set next exercise display
    }
    setExerciseDisplay(workoutArray[exerciseCount]); // exercise display

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
        startRestTime(workoutArray);
      }
    }, 1000);
  }

  // start rest time
  const startRestTime = (workoutArray) => {
    console.log(`start REST`, workoutArray);
    setActivity(`Rest`);

    // run rest time
    intervalTime = setInterval(() => {
      if (totalTime > 0) {
        console.log('rest time', totalTime);
        totalTime -= 1;
        setDisplayTime(totalTime);
      }
      // workout complete
      else if (totalTime === 0 && exerciseCount === (workoutArray.length - 1)) {
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
        startWorkTime(workoutArray); // run work time
      }
    }, 1000);
  }



  return (
    <div className="spartanStrength">


      <h1>The Classic Spartacus Training</h1>

      <InputTime placeholder={'work'} changeFunction={setWorkTime} />
      <InputTime placeholder={'rest'} changeFunction={setRestTime} />
      <InputTime placeholder={'warmUp'} changeFunction={setWarmUpTime} />

      <button onClick={() => startWarmUp(spartacusWorkout)}>Start</button>

      <br />
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

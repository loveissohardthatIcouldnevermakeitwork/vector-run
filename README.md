# Vector Run Tracker

A sci-fi training app for building a steady running and strength habit. It runs in the phone's browser and installs to the home screen like an app.

**Open the app:** https://loveissohardthaticouldnevermakeitwork.github.io/vector-run/

## Install on Android
1. Open the link above in Chrome.
2. Tap the ⋮ menu, then **Install app** (or **Add to Home screen**).
3. Open Vector from the home screen and allow location when asked.

New versions arrive on their own: open the app with internet on and it loads the latest one.

## What it does
- **Run:** GPS tracking, a pace dial that recommends a pace from your recent runs and tells you to ease off or pick it up, voice cues, and four run types: free, distance, time, and run/walk intervals.
- **Train:** guided workouts with sets, reps and weights, rest timers, hold timers, timed circuits and a free interval timer. Warm-up and cool-down checklists and healthy training habits.
- **Log:** a month calendar of every active day, plus a list of every run, workout and other activity. Any activity can be added to any day in a few taps: badminton, cycling, a run without GPS, or one you name yourself.
- **Log by chat:** tell Claude what you did and it lands in the app. See below.
- **Debrief:** for running, the weekly goal, distance per week, pace trend and next-run suggestion. For strength, the weekly goal, sets per week, balance between muscle areas and progress on every exercise. Both take your other activities into account when they suggest rest.
- **Finish animation** after every run and workout.

Everything recorded in the app is stored on the phone only. Use **Log → Copy backup** now and then.

## Log by chat
Tell Claude what you did, for example "I played badminton for an hour" or "ran 3 km in 20 minutes on the treadmill". Claude adds the entry to `inbox.json` in this repository. The app reads that file when it opens and copies new entries into the log on the phone, about a minute after Claude confirms.

`inbox.json` is part of this public repository, so anyone who opens it can read the entries added this way. Each one holds the activity, the date, the duration and the effort, and nothing else.

## Workouts
| Workout | Type | What it is |
| --- | --- | --- |
| Full body A | Gym | Back squat, bench press, lat pulldown, dumbbell shoulder press, plank |
| Full body B | Gym | Romanian deadlift, leg press, incline dumbbell press, seated cable row, dumbbell curl, side plank |
| Dumbbell full body | Dumbbells | Goblet squat, floor press, one-arm row, Romanian deadlift, shoulder press, plank |
| Runner's legs and core | Bodyweight | Squats, reverse lunges, calf raises, glute bridges, plank, side plank |
| Bodyweight circuit | Timed | 6 moves, 30 s work and 15 s rest, 3 rounds |
| Core 8 | Timed | 6 core moves, 30 s work and 10 s rest, 2 rounds |
| Interval timer | Timer | Your own work and rest seconds for any exercise |

Weights start light (the empty 20 kg bar for squat and bench). After a session where every set reaches its target reps, the app raises the weight for next time. Otherwise it keeps the same weight.

## Versions
- **v0.3** (Nov 2026): activity calendar, other sports and activities, runs without GPS, log by chat, and rest advice that counts every kind of exercise.
- **v0.2** (Nov 2026): guided workouts, rest and interval timers, workout log, strength debrief, workout finish animation, sound settings. Charts now show a value when tapped.
- **v0.1** (Nov 2026): first prototype with GPS run tracking, pace dial, run log, debrief and training checklists.

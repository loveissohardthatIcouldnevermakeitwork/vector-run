# Vector: notes for Claude

Vector is one person's training app: a single static page (`index.html`) served by GitHub Pages at
https://loveissohardthaticouldnevermakeitwork.github.io/vector-run/ and installed on their Android phone as a home-screen app.
Everything the app records lives in the phone's browser storage. This repository cannot see or change it.

**This repository is public.** Never put the owner's name, email, location, or any other detail about them in it. Demo data uses made-up coordinates near 0, 0.

## Logging what the owner tells you

**Check this first.** Entries logged by chat are stored in `inbox.json`, which is public. Do not add any entry until the owner has agreed to that. They were asked when v0.3 shipped (2026-11-12).

Owner's answer: not given yet. Ask before the first entry, then record the answer on this line.

The owner logs exercise by telling Claude in chat: "I played badminton for an hour", "ran 3 km in 20 minutes on the treadmill", "did bench 3 x 8 at 30 kg". They do not want to fill in forms, so do not send them to the app to type it in. To get an entry into the app:

1. Add one object to `items` in `inbox.json`.
2. Check the file still parses: `python3 -c "import json;json.load(open('inbox.json'))"`.
3. Commit and push to `main`. GitHub Pages redeploys in about a minute.
4. Tell them it is logged and will appear the next time they open the app with internet. The app reads `inbox.json` when it starts, when the Log tab opens, and when they tap Log → Check for new entries.

Log what they said and no more. If a detail is missing (duration, effort), leave it out, say what you left blank, and let them fill it in if they want. One short question is fine. A questionnaire is not.

### Item format

Every item has:

| Field | Meaning |
| --- | --- |
| `id` | Unique string, never reused. Use `c-YYYYMMDD-NN`, for example `c-20261112-01`. |
| `k` | `"a"` other activity, `"r"` run, `"w"` strength workout. |
| `date` | `YYYY-MM-DD`, the owner's local date. "Today" is their today, not UTC. |
| `time` | Optional `HH:MM`, local. Leave out if unknown. |
| `min` | Duration in minutes. A number, or `null` if unknown. Decimals are fine for runs. |
| `feel` | `"easy"`, `"good"`, `"hard"`, or leave out. |
| `note` | Optional, short and neutral. See the rules below. |

Other activity (`k: "a"`):

```json
{ "id": "c-20261112-01", "k": "a", "date": "2026-11-12", "type": "badminton", "name": "Badminton", "min": 60, "feel": "hard" }
```

`type` is one of `badminton`, `taekwondo`, `basketball`, `cycling`, `swimming`, `hiking`, `walk`, `stretch`. For anything else use `"type": "custom"` and put what they called it in `name` (24 characters at most).

Run (`k: "r"`), for runs that were not tracked with the app's GPS:

```json
{ "id": "c-20261113-01", "k": "r", "date": "2026-11-13", "time": "07:10", "km": 3.2, "min": 21.5, "feel": "good" }
```

`km` is required. Without `min` the run counts for distance but not for pace.

Strength workout (`k: "w"`):

```json
{ "id": "c-20261114-01", "k": "w", "date": "2026-11-14", "name": "Full body A", "rid": "gymA", "min": 40, "feel": "good",
  "ex": [
    { "id": "squat", "sets": [[30, 8], [30, 8], [30, 8]] },
    { "n": "Face pull", "sets": [[15, 12], [15, 12]] },
    { "id": "plank", "sets": [[0, 30], [0, 30]] }
  ] }
```

- Each set is `[kg, reps]`. Bodyweight exercises use `[0, reps]`. Timed holds use `[0, seconds]`.
- Use the app's exercise `id` when there is one, so the app carries the weight into its next suggestion: `squat`, `bench`, `latpull`, `dbpress`, `rdl`, `legpress`, `incdb`, `cablerow`, `curl`, `goblet`, `floorpress`, `dbrow`, `dbrdl`, `bwsquat`, `revlunge`, `calf`, `bridge`, `pushup`, `plank`, `sideplank`. For dumbbell exercises the kg is per dumbbell.
- For any other exercise give a name in `n` instead of an `id`.
- `rid` is optional: the routine it matches (`gymA`, `gymB`, `db`, `legs`). It keeps the A/B rotation going.
- `ex` may be empty if they only said they trained.

### Rules

- `inbox.json` is public. An entry holds the activity, the date, the duration and the effort. No places, no other people's names, no health or injury details, even when they mention them in chat.
- Never reuse or renumber an `id`. The app remembers the ids it has seen.
- To correct an entry, edit its object in place and push. The app replaces its copy, including any change they made to it on the phone.
- To delete an entry, take it out of `items` and add its id to `removed`.
- An entry they delete inside the app never comes back, even if it is still in this file.
- This file is not the whole log. Runs and workouts recorded in the app never appear here, so do not treat it as their training history.

## Changing the app

- All code is in `index.html`. Storage keys are `vector.runs`, `vector.workouts`, `vector.acts`, `vector.settings` and `vector.sync`. Never rename them or change the shape of saved records in a way old data cannot survive: the log on the phone would be lost.
- For a new version: bump `VERSION` and the `#ver` text in `index.html`, bump the cache name in `sw.js`, and add a line to Versions in `README.md`.
- Test in a phone-sized headless browser before pushing: a full run in the simulated demo, one workout, the Log calendar, and a chat sync against a local copy of `inbox.json`.
- Push to `main`, wait about a minute, then confirm the live page serves the new `VERSION`.

# GazeCare (EyeLink)

Head-controlled communication app for people with limited movement, built for a hackathon.
A patient turns their head to choose what they need, and their caretaker sees the request instantly.

**Live site:** https://weptcornet.github.io/GazeCare/  
**Code:** https://github.com/Weptcornet/GazeCare

## How it works
1. Log in as **Patient** or **Caretaker**.
2. Patient: allow the camera, then follow 3 short setup steps (face the screen, turn head left, turn head right).
3. Turn your head left or right to move the highlight. Hold your head still for 5 seconds to select.
4. Confirm with **Yes, send** (the screen starts on **No** for safety).
5. The caretaker sees the request, hears an alert, and replies with "Coming now", "Wait 5 minutes" or "Done".

Options: **Toilet, Food, Water, More** (Outside, Sad, Entertainment, Change position).

## No camera?
Use the keyboard or a single switch: **Left/Right arrows or Space** to move, **Enter** to select.

## Tips for the best result
- Use Chrome or Edge on a laptop, with light on your face and the camera at eye level.
- Settings: look time (2, 3 or 5 seconds) and how much head movement is needed (Normal, Easy, Easiest).
- Press **Recalibrate** if the camera or seating position changes.

## Tech
- MediaPipe Face Landmarker (runs in the browser; video never leaves the device)
- Plain HTML, CSS and JavaScript, no build step
- Service worker, so the site also works offline after one successful visit

## Files
| File | Purpose |
| --- | --- |
| `index.html` | The whole app |
| `sw.js` | Offline support |
| `manifest.webmanifest`, `icon.svg` | Install as an app, icon |

## Run locally
```
git clone https://github.com/Weptcornet/GazeCare.git
cd GazeCare
python -m http.server 8000
```
Then open http://localhost:8000 (the camera needs https or localhost).

## Roadmap
- Real login and cross-device messages with Supabase
- Fast emergency option and louder caretaker alerts
- More input modes (blink, single switch scanning) and more languages

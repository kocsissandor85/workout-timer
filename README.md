# workout-timer

Simple workout timer for keeping track of your reps and isometric holds.

### Just another workout timer

I love working out and therefore I was looking for a decent timer app. However I had to realize that none of the
publicly available solutions make up to my expectations. I wanted to

* effortlessly track the length my isometric holds with a ticking timer,
* set only the amount of rest beforehand and work as long as I feel like.

### Live demo?

I do not plan to release it, testing different browsers and devices would take longer than actually writing the app.
Works fine on Chrome for Android, that is the only thing I needed. If you want to deploy it, go ahead. 
It is static, so you do not have to worry about the back-end. Just grab the `dist` folder and put it online.

### How to use it?

It runs in the browser, but gives the best experience if considered a stand-alone app. To do so,
complete the following steps:

1. Deploy the `dist` folder wherever you prefer.
2. Open Chrome on your Android device, visit
`chrome://flags/#disable-gesture-requirement-for-media-playback` and hit disable. If you skip this,
the app will be mute.
3. Navigate to the app.
3. Add the app to your Home screen using the Chrome menu.

### Gulp commands

Run the development server on port 8008:

```sh
$ gulp runserver
```

Watch and compile Javascript, styles, and move everything to distribution folder:

```sh
$ gulp watch
```
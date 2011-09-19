({
    appDir: "./",
    baseUrl: "./",
    dir: "../js-build",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
//    optimize: "none",

    paths: {
        "jquery": "require-jquery"
    },

    modules: [
        //Optimize the require-jquery.js file by applying any minification
        //that is desired via the optimize: setting above.
        {
            name: "require-jquery"
        },

        //Optimize the application files. Exclude jQuery since it is
        //included already in require-jquery.js
        {
            name: "main-default",
            exclude: ["jquery"]
        },
        {
            name: "main-event-view",
            exclude: ["jquery"]
        },
        {
            name: "main-event-view_all",
            exclude: ["jquery"]
        },
        {
          name: "main-event-create",
          exclude: ["jquery"]
        },
        {
          name: "main-event-edit",
          exclude: ["jquery"]
        },
        {
            name: "main-event_sign_ups-view",
            exclude: ["jquery"]
        },
        {
            name: "main-people",
            exclude: ["jquery"]
        }
    ]
})

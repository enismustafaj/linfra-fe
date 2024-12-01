// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseConfig: {
        projectId: "linfra-ai",
        appId: "1:811310475795:web:617d3b1b9e8e806cb9ede6",
        storageBucket: "linfra-ai.firebasestorage.app",
        apiKey: "AIzaSyBgEgNZDi8sQnBxKWICEXLBysflMkF7_vg",
        authDomain: "linfra-ai.firebaseapp.com",
        messagingSenderId: "811310475795",
        measurementId: "G-3Z7RR1EW3N"
    },
    apiHost: 'https://linfra-f48376244a1d.herokuapp.com/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

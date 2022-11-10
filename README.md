# trainer+

### `Introduction`

The idea of this project came to me during my short episode as a gym recepcionist. At this time I spent a lot of time with many personal trainers, i watched them work with their clients and noticed the specifics of their work. I realised it's not only about showing how to lift weight properly, but also includes a lot of data analisys and planning. That's how i came up with an idea of the tool that could make it easier. 

### `General info`

The purpose of this project is to make data storing and analysing by personal trainers easier. 

### `Functionality`
This web application allows to create a list of profiles of mentees and storing data about them. It also allows to monitor body weight progress, body composition and body circumferences changes. Trainer+ also gives an acces to a fully functional Scheduler (which is an external component made by DevExtreme). It provides possibilites like scheduling events for a specific day and hour, determine their repeatability if needed, determine the type of an event, modyfing evets or deleting them. . 
Every mentee and event data, is stored in a firestore cloud where it's fetched from.

The messages, training monitoring and pictures panels are not avalible and are an idea of how fully functional application might look like. It's also included in the website as a mockups for UI appearance purposses

### `Reflection`

In the process of making this project i continued developing my experience as a React developer. I've learned how to work with external components which was a new experience for me. Also designing whole page to fit one grid without scrolling was quite a challange for me.  


### `Used technologies`

├── react@18.2.0,

├── sass@1.54.3,

├── firebase@9.9.3 - firestore database & storage

├── react-router-dom@6.3.0

├── devexpress/dx-react-scheduler@3.0.6

├── devexpress/dx-react-scheduler-material-ui@3.0.6

        
### `Installation and Setup Instructions`

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/ideas`  


If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

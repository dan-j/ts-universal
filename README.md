# ts-universal

Typescript boilerplate with simultaneous Code Splitting + Server Side Rendering utilising the 
family of libraries contributed by [@faceyspacey]:

- [react-universal-component]
- [webpack-flush-chunks]
- [extract-css-chunks-webpack-plugin]

This is still a work in progress, you can run the app in development mode, however production 
builds haven't been completed yet.

## Quickstart

_See "Development build" below_
    
## Development build (with HMR and express route reloading)

    npm run dev
    
## Tests

    npm run test

_or simply,_

    jest

## Notes

There's still work to do and tidy the project up. Dependencies may be listed in the incorrect 
place, there may also be unused dependencies. This will be fixed soon.

TypeScript definitions for react-universal-component, webpack-flush-chunks and 
webpack-hot-server-middleware don't exist so I have written them within this project. The aim is 
to publish these when I next get chance.

Only the `dev` and `test` NPM scripts have been tested, the others likely won't work because I've
 taken them from another one of my starter projects, [ts-react-express-starter]

There's a custom jest-preprocessor to transpile TSC -> Babel -> JS and correctly generating 
source maps to get proper coverage (ts-jest doesn't do this correctly because Babel doesn't 
correctly map when given input source maps from tsc) 

Enjoy.

[@faceyspacey]: https://github.com/faceyspacey/
[react-universal-component]: https://github.com/faceyspacey/react-universal-component
[webpack-flush-chunks]: https://github.com/faceyspacey/webpack-flush-chunks
[extract-css-chunks-webpack-plugin]: https://github.com/faceyspacey/extract-css-chunks-webpack-plugin
[ts-react-express-starter]: https://github.com/dan-j/ts-react-express-starter

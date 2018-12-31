// import React, { Component } from "react";
// import { Elements, StripeProvider } from "react-stripe-elements";
// // import CheckoutForm from "./CheckoutForm";
// import CheckoutForm from "./components/CheckoutForm";

// class App extends Component {
//   render() {
//     return (
//       <StripeProvider apiKey="pk_test_Zd781mNaLE5XM1ReSpgpOhI7">
//         <div className="example">
//           <h1>React Stripe Elements Example</h1>
//           <Elements>
//             <CheckoutForm />
//           </Elements>
//         </div>
//       </StripeProvider>
//     );
//   }
// }

// export default App;

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

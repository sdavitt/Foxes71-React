import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { useEffect, useState } from "react/cjs/react.development";

const Checkout = (props) => {

    /* Stripe setup API key */
    const stripePromise = loadStripe("pk_test_51JIDZiCXwiQzHBRpAVDdnY3jaleulH28kKQrCcSF7FPh99yLLp7q8iXKWyrvUXrnPAteYhizm7TzyfB5Rw5cll5G002rXatnh2");


    // state hook for our clientSecret
    const [clientSecret, setClientSecret] = useState("");

    // make our API call to our flask app to set up paymentIntent
    const payAPI = async () => {
        let request = await axios.post('http://localhost:5000/pay', { amount: props.cart.total })
        return request.data
    }

    const getPaymentIntent = async () => {
        let secret = await payAPI();
        setClientSecret(secret.client_secret);
    }

    useEffect(() => {
        if (!clientSecret){
            getPaymentIntent();
        }
    }, [clientSecret])

    const appearance = {
        theme: 'none',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <React.Fragment>
        { clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        )}
        </React.Fragment>
    )
}

export default Checkout;
import React from "react";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import '../static/customStyling.css';
import { useState } from "react";

const CheckoutForm = (props) => {
    // make sure our checkout page can use our Stripe setup
    const stripe = useStripe();
    const elements = useElements();
    // Pass the appearance object to the Elements instance

    /* Steps that need to happen:
        1. We make call to our flask app to set up a paymentIntent - happens in checkout component
        2. User submits payment info form
        3. We use the form info and the paymentIntent to confirm the payment with stripe
        4. We display the status of our payment
        5. Show confirmation/clear cart/whatever after payment
    */
    // state hooks for display, control flow, etc.
    const [showPay, setShowPay] = useState(true);
    const [showForm, setShowForm] = useState('yes');
    const [confirmNum, setConfirmNum] = useState('');

    // handlePay -> which is going to do the api call and communicate with stripe on form submit
    const handlePay = async (event) => {
        event.preventDefault();
        setShowPay(false);

        const messages = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });
        console.log("[Payment intent received]:", messages);
        if (messages['error'] != null) {
            console.log('Is the issue here? In this if statement?')
            setConfirmNum(messages.error.message);
            setShowForm('error');
            return
        }
        if (messages.paymentIntent.status == 'succeeded') {
            setConfirmNum(messages.paymentIntent.id);
            setShowForm(false);
        }
    }

    return (
        <div className="container">
            {showForm === 'yes' ?
                <form id="payment-form" onSubmit={handlePay}>
                    <PaymentElement id="payment-element" />
                    <button disabled={!showPay || !stripe || !elements} id="submit" className="btn btn-info">
                        <span id="button-text">
                            {showPay ? 'Pay Now' : 'Processing...'}
                        </span>
                    </button>
                </form>
                : showForm === 'error' ?
                <React.Fragment>
                    <h1>There was an issue with your payment, please return to your cart and try again.</h1>
                    <h2>{confirmNum}</h2>
                </React.Fragment>
                :
                <React.Fragment>
                    <h1>Thank you for your payment!</h1>
                    <h2>Your confirmation number is: {confirmNum}</h2>
                </React.Fragment>
            }
        </div>
    )
}

export default CheckoutForm;
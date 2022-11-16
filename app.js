/**
 * Rapyd Integrations: Request Signature.
 *
 * This app implements the Rapyd's API request signature. The crypto-js library
 * is required (https://www.npmjs.com/package/crypto-js). To install it, run:
 *
 * npm install crypto-js
 *
 * @link   https://docs.rapyd.net/
 * @file   This files defines the main node.js application.
 * @author Isaac Benitez.
 * @version 0.0.1
 *
 * @requires express
 * @requires https
 * @requires crypto-js
 */

const express = require("express");

const makeRequest = require("./utilities").makeRequest;

const app = express();

app.set("json spaces", 4);

app.listen(3000);

// Get List of payment method accepted in that country: /v1/payment_methods/country?country={country iso}
app.get("/pay-method", async (req, res) => {
    try {
        const result = await makeRequest(
            "GET",
            "/v1/payment_methods/country?country=gb"
        );

        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

// Get List Of Country Name: /v1/data/countries
app.get("/country", async (req, res) => {
    try {
        const result = await makeRequest("GET", "/v1/data/countries");

        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

// payment requirements
app.get("/payment-requirements", async (req, res) => {
    try {
        const result = await makeRequest(
            "GET",
            "/v1/payment_methods/required_fields/mx_diestel_cash"
        );

        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

// Create Payment
app.get("/payment", async (req, res) => {
    try {
        const body = {
            amount: 230,
            currency: "MXN",
            payment_method: {
                type: "mx_diestel_cash",
            },
        };
        const result = await makeRequest("POST", "/v1/payments", body);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

// Complete Payment
app.get("/complete", async (req, res) => {
    try {
        const body = {
            token: "payment_b3ba3488cb1449aa16223d34e4ce02d4",
        };
        const result = await makeRequest(
            "POST",
            "/v1/payments/completePayment",
            body
        );
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

// Create User wallet
// John Doe
// ewallet: ewallet_5ea972367f80a7e3b9f3d6dc828d124a
// ewallet_reference_id: 2021-10-28d
app.get("/create-wallet", async (req, res) => {
    try {
        const body = {
            first_name: "John",
            last_name: "Doe",
            ewallet_reference_id: "2021-10-28d",
            metadata: {
                merchant_defined: true,
            },
            type: "person",
            contact: {
                phone_number: "+14155551234",
                email: "johndoe@rapyd.net",
                first_name: "John",
                last_name: "Doe",
                mothers_name: "Jane Smith",
                contact_type: "personal",
                address: {
                    name: "John Doe",
                    line_1: "123 Main Street",
                    line_2: "",
                    line_3: "",
                    city: "Anytown",
                    state: "NY",
                    country: "US",
                    zip: "12345",
                    phone_number: "+14155551611",
                    metadata: {},
                    canton: "",
                    district: "",
                },
                identification_type: "DL",
                identification_number: "1234567890",
                date_of_birth: "11/22/2000",
                country: "US",
                nationality: "US",
                metadata: {
                    merchant_defined: true,
                },
            },
        };
        const result = await makeRequest("POST", "/v1/user", body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

// Done Joe
// "ewallet": ewallet_44011ed9a9abfbfb5624b7925a8af71b
// "ewallet_reference_id": custom_by_myself
app.get("/create-wallet2", async (req, res) => {
    try {
        const body = {
            first_name: "Done",
            last_name: "Joe",
            ewallet_reference_id: "custom_by_myself",
            metadata: {
                merchant_defined: true,
            },
            type: "person",
            contact: {
                phone_number: "+14155551234",
                email: "donejoe@rapyd.net",
                first_name: "Done",
                last_name: "Joe",
                mothers_name: "Jane Smith",
                contact_type: "personal",
                address: {
                    name: "Done Joe",
                    line_1: "123 Main Street",
                    line_2: "",
                    line_3: "",
                    city: "Anytown",
                    state: "NY",
                    country: "US",
                    zip: "12345",
                    phone_number: "+14155551611",
                    metadata: {},
                    canton: "",
                    district: "",
                },
                identification_type: "DL",
                identification_number: "1234567890",
                date_of_birth: "11/22/2000",
                country: "US",
                nationality: "US",
                metadata: {
                    merchant_defined: true,
                },
            },
        };
        const result = await makeRequest("POST", "/v1/user", body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});
// Update user wallet
app.get("/update-wallet", async (req, res) => {
    try {
        const body = {
            // Variable of user's wallet
            ewallet: "ewallet_5ea972367f80a7e3b9f3d6dc828d124a",
            ewallet_reference_id: "2021-10-28d",
            // Things that want to be updated
            metadata: {
                currency: "GBP",
            },
        };
        const result = await makeRequest("POST", "/v1/user");
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

// Retrieve user wallet
app.get("/retrieve-wallet", async (req, res) => {
    try {
        const wallet = "ewallet_5ea972367f80a7e3b9f3d6dc828d124a";
        const result = await makeRequest("GET", `/v1/user/${wallet}`);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

// FOR MORE INFO OF ADDING FUNDS AND REMOVING FUNDS SEE TESTING SECTION IN DOCUMENTATION
// Add fund to wallet
app.get("/add-fund", async (req, res) => {
    try {
        const wallet = "ewallet_5ea972367f80a7e3b9f3d6dc828d124a";
        const body = {
            ewallet: wallet,
            amount: 5000,
            currency: "MXN",
        };
        const result = await makeRequest("POST", "/v1/account/deposit", body);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

// Transaction between wallet
// ex: between John Doe -> Done Joe
app.get("/transaction-wallet", async (req, res) => {
    try {
        // John doe
        const wallet1 = "ewallet_5ea972367f80a7e3b9f3d6dc828d124a";
        // Done Joe
        const wallet2 = "ewallet_44011ed9a9abfbfb5624b7925a8af71b";
        const body = {
            source_ewallet: wallet1,
            amount: 100,
            currency: "MXN",
            destination_ewallet: wallet2,
        };
        const result = await makeRequest("POST", "/v1/account/transfer", body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

// Response to transaction
app.get("/response-transaction", async (req, res) => {
    try {
        const body = {
            id: "44a41c55-6597-11ed-bb0e-02d4846f58ef",
            // Respond
            status: "accept",
        };
        const result = await makeRequest(
            "POST",
            "/v1/account/transfer/response",
            body
        );
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

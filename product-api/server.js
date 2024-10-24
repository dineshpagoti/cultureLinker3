const express = require('express');
const app = express();
const port = 3007;


app.use(express.json());


app.post('/api/products/total-value', (req, res) => {
    const products = req.body; 

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Invalid input, expected a non-empty array of products.' });
    }

    let totalValue = 0;
    for (const product of products) {
        const { price, quality } = product;


        if (typeof price !== 'number' || price < 0) {
            return res.status(400).json({ error: 'Invalid product price. Price should be a non-negative number.' });
        }


        let qualityMultiplier = 1; 
        if (quality === 'high') {
            qualityMultiplier = 3;
        } else if (quality === 'medium') {
            qualityMultiplier = 2;
        }

        totalValue += price * qualityMultiplier;
    }

    res.json({ totalValue });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

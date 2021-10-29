document.getElementById('cart-btn').addEventListener('click', addToCart);

const quantity = parseInt(document.getElementById('quantity'));

const book_id = parseInt(document.getElementById('book_id'));

const data = { quantity, book_id };

function addToCart(){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/api/cart', options).then(response => {
        console.log(response.body)
    })
}

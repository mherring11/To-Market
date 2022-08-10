async function addBtnHandler(event) {
    event.preventDefault();

    const product_name = document.querySelector("#product_name").value.trim();
    const category = document.querySelector("#category").value.trim();
    const price = document.querySelector("#price").value.trim();
    const description = document.querySelector("#description").value.trim();
    const image = document.querySelector('input[name="productImage"]').files[0] 

    if (product_name && category && price && description) {
        const response = await fetch('/api/users/inventory', {
            method: 'POST',
            body: JSON.stringify({
                image,
                product_name,
                category,
                description,
                price,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');

            document.location.replace('/dashboard');

        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#addProduct-form').addEventListener('submit', addBtnHandler);
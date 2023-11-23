async function getProducts ()  {
    return await fetch('https://fashionist-shop-default-rtdb.firebaseio.com/products/-NjsKK-faDqTDJ6Ybw2Y.json')
        .then(response => response.json())
        .catch(err => console.error(err))
}

export {getProducts};
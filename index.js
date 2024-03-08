async function fetchData() {
    try{
        let res = await fetch('https://fakestoreapi.com/products');
        let data = await res.json();
        console.log(data);
        appendData(data);
    }
    catch(err){
        console.log(err);
    }
}
fetchData()
let container =document.querySelector('#container');
function appendData(data){
    container.innerHTML = '';
    data.forEach(ele=> {
        let card = document.createElement('div');
        card.className = 'card';

        let cardImg = document.createElement('div');
        cardImg.className = 'card_img';
        let img = document.createElement('img');
        img.src = ele.image;
        cardImg.append(img);

        let cardDetail = document.createElement('div');
        cardDetail.className = 'card_detail';
        let title = document.createElement('h5')
        title.textContent = ele.title;
        let price = document.createElement('h4');
        price.textContent = ele.price;
        let category = document.createElement('p');
        category.textContent = ele.category;
        cardDetail.append(title,price,category)

        card.append(cardImg,cardDetail)        
        container.append(card)
    });
}

let searchBtn = document.querySelector('#searchBtn');
let search = document.getElementById('search');

searchBtn.addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let newData = data.filter((item) => {
            if(search.value === item.category){
                return item.category ;
            }
            // if(item.title.toLowerCase().includes(search.value.toLowerCase())){
            //     return item.title ;
            // }
        })
        console.log(search.value)
        console.log(newData)
        appendData(newData);
    })
    .catch((err) => {
        console.log(err);
    })
})

let sort = document.querySelector('#sort');

sort.addEventListener('change', () => {
    fetch('https://fakestoreapi.com/products')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let sortData = [...data];
            if (sort.value === 'price-asec') {
                sortData.sort((item1, item2) => item1.price - item2.price);
            }
                else if (sort.value === 'price-desc') {
                sortData.sort((item1, item2) =>  item2.price - item1.price);
            }
        console.log(sort.value);
        console.log('Sorted data:', sortData);
        appendData(sortData);
    })
    .catch((err) => {
        console.log(err);
    })
})


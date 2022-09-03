const categoriesData = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await res.json();
        displayCatagories(data.data.news_category);
    }
    catch (e) {
        console.log(e);
    }
}

const displayCatagories = (categories) => {
    const cataDiv = document.getElementById('catagories-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('mx-4', 'fs-4',)
        // div.innerText = `${category.category_name}`;
        div.innerHTML = `<button class ="btn btn-outline-secondary" onclick="clickedCat('${category.category_id}')">${category.category_name}</button>`
        cataDiv.appendChild(div);

    });

}

const clickedCat = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        displayCatagoriesDetails(data.data);

    }
    catch (e) {
        console.log(e);
    }

}

const displayCatagoriesDetails = (catagoriesDetails) => {
    console.log(catagoriesDetails)
    const newsContainer = document.getElementById('news-container')
    newsContainer.textContent = '';
    const searchResult = document.getElementById('search-info');
    const searchNum = document.getElementById('search-num');
    searchNum.innerHTML = `<h3>${catagoriesDetails.length} items found for this category...</h3>`
    if (catagoriesDetails.length == 0) {
        searchResult.classList.remove('d-none');
    }
    else {
        searchResult.classList.add('d-none');
    }
    catagoriesDetails.forEach(detail => {
        const modalTitle = document.getElementById('exampleModalLabel');
        const modalDetail = document.getElementById('modal-detail');
        const newsDiv = document.createElement('div');
        const trimDetails = detail.details.slice(0, 200);
        newsDiv.innerHTML = `
            <div class="card mb-5 mx-3">
        <div class="row g-0">
            <div class="col-md-4 p-2">
                <img src="${detail.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${detail.title}</h5>
                    <p class="card-text">${trimDetails}...</p>
                <div class="row mt-5">
                <div class="d-flex col">
                    <img src="${detail.author.img}" alt="" class="img-fluid" style="width:45px;height:45px; border-radius:50%;">
                    <div class ="mx-1">
                        <strong>${detail.author.name ? detail.author.name : 'Not found'}</strong>
                        <div>${detail.author.published_date}</div>
                    </div>
                </div>
                <div class="col mt-3">
                    <h4><span><i class="fa-solid fa-eye"></i></span> ${detail.total_view ? detail.total_view : 'Missing'}M</h4>
                </div>
                <div class="col mt-3">
                    <button id = "modal-btn" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal">Details></button>
                </div>
            </div>
                </div>
            </div>
        </div>
    </div>`;
        newsContainer.appendChild(newsDiv);
        document.getElementById('modal-btn').addEventListener('click', function () {
            modalTitle.innerText = detail.title;
            modalDetail.innerText = detail.details;
        })

    })
    loader(false);
}


document.getElementById('catagories-container').addEventListener('click', function () {
    loader(true);
})

const loader = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

categoriesData()
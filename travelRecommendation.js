const clearButton = document.getElementById('clear-btn')
const input_search = document.getElementById("input-search")
const search_btn = document.getElementById("search-btn")

clearButton.addEventListener("click", () => {
    input_search.value = '';
});

search_btn.addEventListener("click", search_btn_functions);

function search_btn_functions() {
    fetch('travel_recommendation_api.json').then(function (response) {
        return response.json()
    }).then(function (data) {
        let recommendations = [];
        let input_search_new = input_search.value.toLowerCase()
        if (input_search_new === 'beach') {
            recommendations = data.beaches;
        } else if (input_search_new === 'temple') {
            recommendations = data.temples;
        } else if (input_search_new === 'country') {
            recommendations = data.countries;
        }

        let recommendationHtml = '';

        if (recommendations.length > 0) {
            for (const recommendation of recommendations) {
                recommendationHtml += `
                        <h2>${recommendation.name}</h2>
                        <img src="${recommendation.imageUrl}" alt="Image of ${recommendation.name}">
                        <p>${recommendation.description}</p>
                    `;
            }
        } else {
            recommendationHtml = '<p>No recommendations found.</p>';
        }
        console.log(recommendations.length)
        console.log('recommendationHtml-->', recommendationHtml)
        document.getElementById('recommendation').innerHTML = recommendationHtml;

        console.log(data);


    }).catch(function (error) {
        console.error("Somthis error happend", error)
    })
}

function getRecommendation() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    let recommendations = [];

    if (searchTerm === 'beach') {
        recommendations = data.beaches;
    } else if (searchTerm === 'temple') {
        recommendations = data.temples;
    } else if (searchTerm === 'country') {
        recommendations = data.countries;
    } else {
        recommendations = [];
    }

    let recommendationHtml = '';

    if (recommendations.length > 0) {
        for (const recommendation of recommendations) {
            recommendationHtml += `
                        <h2>${recommendation.name}</h2>
                        <img src="${recommendation.imageUrl}" alt="Image of ${recommendation.name}">
                        <p>${recommendation.description}</p>
                    `;
        }
    } else {
        recommendationHtml = '<p>No recommendations found.</p>';
    }

    document.getElementById('recommendation').innerHTML = recommendationHtml;
}

// function search_btn_functions() {
//
//   fetch('http://127.0.0.1:9876/travel_recommendation_api.json',{
//     mode:'no-cors',
//
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     alert(data)
//     console.log(data)
//   })
//   .catch((error) => console.log(error.message))
// }

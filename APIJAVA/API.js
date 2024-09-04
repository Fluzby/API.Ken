const randonmJokeHTMLElement = document.querySelector('.random-jokes');
const selectHTMLElement = document.querySelector('#categories')
const buttonElement = document.querySelector('.generate-joke-button')

const base_url = "https://api.chucknorris.io/jokes"
let selectedOption = null;

const fetchRandomJokes = async (category = '') => {
    try {
        const response = await fetch(`${base_url}/random?category=${category}`)
        const data = response.json()
        return data 
    } catch (error) {
        throw new Error ('Something went wrong')
    }
}

const fetchCategories = async () => {
    try {
        const response = await fetch(`${base_url}/categories`)
        const data = response.json()
        return data 
    } catch (error) {
        throw new Error ('Something went wrong')
    }
}


const displayRandomJoke = async () => {
    const joke = await fetchRandomJokes()
    console.log(randonmJokeHTMLElement)
    randonmJokeHTMLElement.textContent = joke.value
}

const fillSelectWitchOptions = async () => {
    const categories = await fetchCategories()

    if (!categories) return

    categories.forEach((category) => {
        const option = new Option(category, category)
        selectHTMLElement.append(option)
    })
}

selectHTMLElement.addEventListener('change', async (event) => {
    selectedOption = event.currentTarget.value
    const response = await fetchRandomJokes(selectedOption)
    randonmJokeHTMLElement.textContent = response.value
})

buttonElement.addEventListener('click', async (event) => {
    const response = await fetchRandomJokes(selectedOption)
    randonmJokeHTMLElement.textContent = response.value
})

displayRandomJoke()
fetchCategories()
fillSelectWitchOptions()


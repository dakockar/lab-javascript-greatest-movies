// Iteration 1: All directors? - Get the array of all directors.

function getAllDirectors(arr) {
    return arr.map(elem => elem.director);
}


// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(arr) {
    let stevenArr = arr.filter(elem => elem.director === "Steven Spielberg");

    let dramaStevenArr = stevenArr.filter(elem => elem.genre.includes("Drama"));

    if (stevenArr.length === 0) {
        return 0;
    }
    
    return dramaStevenArr.length;
}


// Iteration 3: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(arr) {
    if (arr.length === 0) {
        return 0;
    }

    let total = arr.reduce((acc, elem) => {
        if (elem.rate === undefined) {
            return acc;
        }
        else {
            return acc + elem.rate;
        }
    }, 0);

    return +(total/arr.length).toFixed(2);
}


// Iteration 4: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(arr) {
    let dramaArr = arr.filter(elem => elem.genre.includes("Drama"));

    return ratesAverage(dramaArr);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(arr) {
    let clonedArr =  JSON.parse(JSON.stringify(arr));

    return clonedArr.sort((a, b) => {
        if (a.year < b.year) {
            return -1;
        }
        else if (a.year > b.year) {
            return 1;
        }
        else {        
            if (a.title < b.title) {
                return -1;
            }
            else if (a.title > b.title) {
                return 1;
            }
            else {
                return 0;
            }
        }
    });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(arr) {
    let clonedArr = JSON.parse(JSON.stringify(arr));

    clonedArr.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        else if (a.title > b.title) {
            return 1;
        }
        else {
            return 0;
        }
    })
    clonedArr =  clonedArr.slice(0, 20);
    return clonedArr.map(elem => elem.title);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes


// Well I tried but I don't even know where to start...
function turnHoursToMinutes(arr) {
    let clonedArr = JSON.parse(JSON.stringify(arr));

}




// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average


// OK, I managed to do this one too but I'm not sure if this is the best way. I would be really glad if you could check and give me feedback :)

function bestYearAvg(arr) {
    // empty array check
    if (!arr.length) return null;

    // get a mapped array that only includes the years
    let yearsArr = arr.map(elem => elem.year);

    // uniquify function to get rid of the duplicates. I could also define this outside of this function, but no need i guess... :D
    function uniquifyArray(arr) {
        let uniqueArr = [];
        
        for (let i = 0; i < arr.length; i++) {
            if (uniqueArr.includes(arr[i])) {
                continue;
            }
            else {
                uniqueArr.push(arr[i]);
            }
        }
        return uniqueArr;
    }

    yearsArr = uniquifyArray(yearsArr);     // unique years array

    // find the avg rate for each year in the yearsArr
    let yearAvgRateArr = [];
    
    for (let year of yearsArr) {
        let yearGroup = arr.filter(elem => elem.year === year);         // yearGroup is the array of movies for current year

        yearAvgRateArr.push({year: year, rate: ratesAverage(yearGroup)});   // yearAvgRateArr is an array of objects that includes years and respective avg rates
    }

    // find the best year according to the rate, and get the oldest one if there is a tie 
    let best = {year: 0, rate: 0};

    for (let elem of yearAvgRateArr) {
        if (best.rate < elem.rate) {
            best = elem;
        }
        else if (best.rate === elem.rate) {
            if (best.year > elem.year) {
                best = elem;
            }
        }
    }

    return `The best year was ${best.year} with an average rate of ${best.rate}`;
}

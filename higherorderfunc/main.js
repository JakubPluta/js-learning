const companies = [
    {name: "Company One", category: "Finance", start: 1981, end: 2003},
    {name: "Company Two", category: "Retail", start: 1992, end: 2008},
    {name: "Company Three", category: "Auto", start: 1999, end: 2007},
    {name: "Company Four", category: "Retail", start: 1989, end: 2010},
    {name: "Company Five", category: "Technology", start: 2009, end: 2014},
    {name: "Company Six", category: "Finance", start: 1987, end: 2010},
    {name: "Company Seven", category: "Auto", start: 1986, end: 1996},
    {name: "Company Eight", category: "Technology", start: 2011, end: 2016},
    {name: "Company Nine", category: "Retail", start: 1981, end: 1989}
  ];
  
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];



//   forEach vs for loop

// for(let i = 0; i < companies.length; i++){
//     console.log(companies[i])
// }

companies.forEach((company, index) => {
    console.log(index, company.name, company.category, company.start, company.end);
})

// filter vs for

// let canDrink = [];
// for (i of ages){
//     if(i>=21){
//         console.log(i);
//         canDrink.push(i);
//     }
// }
// console.log(canDrink.sort())


// const canDrink = ages.filter((age) => {
//     if(age >= 21){
//         return true;
//     }
// })

//  oneliner
const canDrink = ages.filter((age => age >= 21))

console.log(canDrink)

// filter companies

// const retail = companies.filter(
//   function(company){
//   if(company.category === 'Retail'){
//     return true;
//   }
// });
// console.log(retail)

const retail = companies.filter((company => company.category === 'Retail'));
console.log(retail)

// Get 80s

const companiesEighties = companies.filter(company => company.start >= 1980 && company.start < 1990);
console.log(companiesEighties)

// last more then 10 years

function calculateYearsDiff(start, end){
  return end - start;
}

const min10years = companies.filter(company => calculateYearsDiff(company.start, company.end) >= 10);
console.log(min10years.sort().reverse());


// map names

const companyNames = companies.map(company => company.name);
console.log(companyNames)

const companyCategory = companies.map(company => company.category);
console.log(companyCategory)

const otherMap = companies.map(function(company){
  return `${company.name} [${company.start}-${company.end}]`
})

console.log(otherMap)

console.log(new Set(companyCategory))

const agesSquare = ages
  .map(age=> Math.sqrt(age))
  .map(age=> age*2);
console.log(agesSquare)


// sort

const sortedCompanies  = companies.sort(function(company1,company2){
  if(company1.start > company2.start){
    return 1
  } else {return -1};
})

console.log(sortedCompanies)

const sortedCompanies2  = companies.sort((a,b) => (a.start >b.start ? 1 : -1))

console.log(sortedCompanies2)

// ascending
const sortedAges = ages.sort((a,b) => a-b)
// descending
const sortedAgesDesc = ages.sort((a,b) => b-a)

// reduce

// let agesSum = 0
// for (let i = 0; i<ages.length; i++ ){
//   agesSum += ages[i];
// }

// console.log(agesSum)

const agesSum = ages.reduce(function(total, age) {
  return total += age;
}, 0);

console.log(agesSum)

const agesSumArrow = ages.reduce((total, age) => total+=age, 0)
console.log(agesSumArrow)

const totalCompanyYers = companies.reduce((total, company) => total+=(company.end-company.start),0)
console.log(totalCompanyYers)

const combined = ages
  .map(age => age*2)
  .filter(age => age > 40)
  .sort((a,b)=> b-a);

console.log(combined);
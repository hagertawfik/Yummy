
//navbar
$(".searchInputs").css("display","none")
$("#startMals").css("display","flex")
$("#Searchlink").click(function(){
    $("#rowForRecipes").css("display","none")
    $(".searchInputs").css("display","block")
    $("#startMals").css("display","none")
})
$(".sidNavMenuLinks li a").click(function(){
    $(".sidNavMenu").animate({"width":"0px"},100)
    $(".sidNavopen").animate({"left":"0px"},100)
    $(".xmark i").removeClass("fa-xmark")
    $(".xmark i").addClass("fa-align-justify")
})
$(".xmark i").click(function(){
    if( $(".sidNavMenu").width() == "240"){
        $(".sidNavMenu").css("width","0px")
        $(".sidNavopen").css({"left":"0px"})
        $(".xmark i").removeClass("fa-xmark")
        $(".xmark i").addClass("fa-align-justify")
    
    }else{
        $(".sidNavMenu").width("240px")
        $(".sidNavopen").css({"left":"240px"})
        $(".xmark i").removeClass("fa-align-justify")
        $(".xmark i").addClass("fa-xmark")
    }
})
//displayMales and its details

async function getMalsForSearch(category="potato"){
    let myresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`)
    let myData  = await myresponse.json()
    // console.log(myData.meals);
    searchDisplay(myData.meals)
}

$("#SearchByName").keyup(function(){
    $("#startMals").css("display","flex")
getMalsForSearch($("#SearchByName").val())
  
})
getMalsForSearch()

$("#SearchByFirstLetter").keyup(function(){
    $("#startMals").css("display","flex")
    getMalsForSearchFirstletter($("#SearchByFirstLetter").val().slice(0, 1))
})
async function getMalsForSearchFirstletter(firstletter){
    let myresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstletter}`)
    let myData  = await myresponse.json()
    searchDisplay(myData.meals) 
}

function searchDisplay(list){
    // console.log(list)
    let temp =""
    for (let index = 0; index < list.length; index++) {
        let maleid = list[index].idMeal
        temp+=`<div class="col-md-3  ">
        <div class="item position-relative bg-danger rounded-3" onclick="getRecipesDetails('${maleid}')">
            <img src="${list[index].strMealThumb}" class="img-fluid" alt="">
            <div class="itemLayer d-flex align-items-center ps-3 ">
                <div class="layContent">
                    <h2>${list[index].strMeal}</h2>
                </div>
            </div>
        </div>
    </div> `
}
    $("#startMals").html(temp);
    $("#rowForRecipes").html(temp);
        let myitems = document.querySelectorAll(".item")
        myitems.forEach(ele=>{
           $(ele).click(function(){
            $("#startMals").css("display","none")
            $("#rowForRecipes").css("display","flex")
         
           })
        })
    
   
}

async function getRecipesDetails(rid){
    // console.log(rid);
    let myresonse =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${rid}`)
    let mydate = await myresonse.json()
    displayRecipesDetails(mydate.meals)
}

function displayRecipesDetails(recipesDetails){
    let temp = ""
    // console.log(recipesDetails);
    for (let index = 0; index < recipesDetails.length; index++) {
        temp+=`  <div class="col-md-4">
        <div class="datailsMaleImage text-white">
            <img src="${recipesDetails[index].strMealThumb}" class="img-fluid" alt="">
            <h2 class="mt-3">${recipesDetails[index].strMeal}</h2>
        </div>
    </div>
    <div class="col-md-8">
        <div class="datailsMalecontent text-white text-start py-3">
            <h3>Instructions</h3>
            <p>${recipesDetails[index].strInstructions}</p>
            <p><span style="font-size: 1.2rem;font-weight: 600;">Area : </span><span>${recipesDetails[index].strArea}</span></p>
            <p><span style="font-size: 1.2rem;font-weight: 600;">Category : </span><span>${recipesDetails[index].strCategory}</span></p>
            <p class="par">Recipes : </p>
            <ul class="recipesList list-unstyled">
                <li class="p-2 my-3 rounded  d-inline-block mx-1">300ml Sushi Rice</li>
                <li class="p-2 rounded  d-inline-block mx-1">300ml Sushi Rice</li>
                <li class="p-2 rounded  d-inline-block mx-1">300ml Sushi Rice</li>
                <li class="p-2 rounded  d-inline-block mx-1">300ml Sushi Rice</li>
                <li class="p-2 rounded  d-inline-block mx-1">300ml Sushi Rice</li>
                <li class="p-2 rounded  d-inline-block mx-1">300ml Sushi Rice</li>
                <li class="p-2 rounded  d-inline-block mx-1">300ml Sushi Rice</li>
            </ul>
            <h3>Tags :</h3>
            <a href="${recipesDetails[index].strSource}" target="_blank" class="btn btn-success text-center my-2 me-2">Source</a>
            <a href="${recipesDetails[index].strYoutube}" target="_blank" class="btn btn-danger text-center my-2">Youtube</a>
   
        </div>
    </div>`
        
    }
     
        $("#rowForRecipes").html(temp)
    }

///Categories
    $("#rowForRecipes").css("display","none")
    $("#Categories").click(function(){
        getCategory() 
        $("#startMals").css("display","none")
        $(".searchInputs").css("display","none")
        $("#rowForRecipes").css("display","flex")
    
    })

async function filterbyCategory(cate){
    let caterores = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`)
    let mymaleCate = await caterores.json();
    searchDisplay(mymaleCate.meals)
    // console.log(mymaleCate.meals);
    
}

async function getCategory(){
    let caterores = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let mymaleCate = await caterores.json();
    displayCategory(mymaleCate.categories)
    // console.log(mymaleCate.categories);
    
}

function displayCategory(arr){
    let temp = ""
    for (let index = 0; index < arr.length; index++) {
        temp+=`<div class="col-md-3 shadow">
        <div onclick=" filterbyCategory('${arr[index].strCategory}')" class="item position-relative bg-black rounded-3 overflow-hidden shadow mb-4">
            <img src="${arr[index].strCategoryThumb}" class="img-fluid" alt="">
            <div class="itemLayer d-flex align-items-center ps-3 ">
                <div class="layContent">
                    <h2>${arr[index].strCategory}</h2>
                    <p>${arr[index].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
        </div>
    </div>`
}
$("#rowForRecipes").html(temp)
    let myitems = document.querySelectorAll(".item")
    myitems.forEach(ele=>{
       $(ele).click(function(){
// console.log("he");
        $("#rowForRecipes").css("display","flex")
       
       })
    })
    }
  


//Area
$("#rowForRecipes").css("display","none")
$("#Area").click(function(){
    getArea() 
    $("#startMals").css("display","none")
    $(".searchInputs").css("display","none")
    $("#rowForRecipes").css("display","flex")

})

async function getArea(){
    let Areas = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let myArea = await Areas.json();
    dispalyArea(myArea.meals.slice(0,20))
    // console.log(myArea.meals.slice(0,20));
    
}
async function  filterbyArea(area){
    let areas = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let myarea = await areas.json();
    searchDisplay(myarea.meals.slice(0,20))
    // console.log(myarea.meals);
}
function dispalyArea(arry){
let temp =""
for (let i = 0; i < arry.length ; i++) {
   temp+=`<div class="col-md-3 shadow ">
   <div class="item  bg-black shadow " onclick="filterbyArea('${arry[i].strArea}')">
   <i class="fa-solid fa-city fa-3x mb-3"></i>
               <h2 class="text-white">${arry[i].strArea}</h2> 
           </div>
       </div>`
}

        $("#rowForRecipes").html(temp)

        let myitems = document.querySelectorAll(".item")
        myitems.forEach(ele=>{
           $(ele).click(function(){
            // console.log("hi");
            $("#rowForRecipes").css("display","flex")
           })
        }) 
}


//Ingredients

$("#rowForRecipes").css("display","none")
$("#Ingredients").click(function(){
    getIngredients() 
    $("#startMals").css("display","none")
    $(".searchInputs").css("display","none")
    $("#rowForRecipes").css("display","flex")

})

async function getIngredients(){
    let Ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let myIngredients = await Ingredients.json();
    dispalyIngredients(myIngredients.meals.slice(0,20))
    // console.log(myIngredients.meals.slice(0,20));
    
}
async function  filterbyIngredients(Ingredient){
    let ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
    let myingredients = await ingredients.json();
    searchDisplay(myingredients.meals.slice(0,20))
    // console.log(myingredients.meals);
}
function dispalyIngredients(arry){
let temp =""
for (let i = 0; i < arry.length ; i++) {
   temp+=`<div class="col-md-3 shadow ">
   <div class="item  bg-black shadow " onclick="filterbyIngredients('${arry[i].strIngredient}')">
   <i class="fa-solid fa-bowl-food fa-3x"></i>
               <h2 class="text-white">${arry[i].strIngredient}</h2> 
               <p class="text-white">${arry[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
           </div>
       </div>`
}

        $("#rowForRecipes").html(temp)

        let myitems = document.querySelectorAll(".item")
        myitems.forEach(ele=>{
           $(ele).click(function(){
            // console.log("hi");
            $("#rowForRecipes").css("display","flex")
           })
        }) 
}

//Contact us
$("#rowForRecipes").css("display","none")
$("#Contact").click(function(){
    temp =` <section class="contactform">
    <div  class="container text-center">
    <h2 class="my-5 text-white">ContacUs...</h2>
        <div  class="row g-5 mb-5" id="rowForRecipes">
                <div class="col-md-6">
                    <div class="forminputs">
                    <input type="text" id="yourname" class="w-100" placeholder="Enter your Name" >
                     </div>
                     <div class="alert mt-1 alert-danger d-none" id="namealert">
							Special Characters and Numbers not allowed
						</div>
                </div>
                <div class="col-md-6">
                    <div class="forminputs">
                    <input type="email" id="yourEmail"  class="w-100" placeholder="Enter Email">
                    </div>
                    <div class="alert mt-1 alert-danger d-none" id="emailalert" >
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
                </div>
                <div class="col-md-6">
                    <div class="forminputs">
                    <input type="text" id="Phone"  class="w-100" placeholder="Enter Phone">
                    </div>
                    <div class="alert mt-1 alert-danger  d-none" id="phonealert">
							Enter valid Phone Number
						</div>
                </div>
                <div class="col-md-6">
                    <div class="forminputs">
                    <input type="text" id="Age"  class="w-100" placeholder="Enter Age">
                    </div>
                    <div class="alert mt-1 alert-danger  d-none" id="agealert">
                    Enter valid Age
                </div>
                </div>
                <div class="col-md-6">
                    <div class="forminputs">
                    <input type="password" id="password"  class="w-100" placeholder="Enter Password">
                    </div>
                    <div class="alert mt-1 alert-danger  d-none" id="passwordalert" >
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
                </div>
                <div class="col-md-6">
                    <div class="forminputs">
                    <input type="password" id="repassword"  class="w-100" placeholder="Enter Repassword">
                    </div>
                    <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" >
                    Enter valid Repassword
                </div>
                </div>
            
            </div>
            <button type="submit" id="btnSubmit" class="btn btn-outline-danger" disabled >Submit</button>
        </div>
 </section>`
 $("#rowForRecipes").html(temp)
    $("#startMals").css("display","none")
    $(".searchInputs").css("display","none")
    $("#rowForRecipes").css("display","flex")


let Inputname = document.getElementById("yourname")
let namealert = document.getElementById("namealert")
let InputEmail = document.getElementById("yourEmail")
let emailalert = document.getElementById("emailalert")
let InputPhone = document.getElementById("Phone")
let phonealert = document.getElementById("phonealert")
let InputAge = document.getElementById("Age")
let agealert = document.getElementById("agealert")
let Inputpassword = document.getElementById("password")
let passwordalert = document.getElementById("passwordalert")
let Inputrepassword = document.getElementById("repassword")
let repasswordalert = document.getElementById("repasswordalert")
 
Inputname.addEventListener("keyup",validationName)
InputEmail.addEventListener("keyup",validationemail)
InputPhone.addEventListener("keyup",validationphon)
InputAge.addEventListener("keyup",validationage)
Inputpassword.addEventListener("keyup",validationNpass)
Inputrepassword.addEventListener("keyup",validationrepass)

function VaildName(){
    let regex =/^[a-zA-Z]{1,30}$/
 return regex.test($("#yourname").val());
   
  }
function VaildEmail(){
    let regex =/^[A-Za-z]{1,15}@[A-Za-z]{2,7}\.[a-zA-Z]{3,7}$/
    return regex.test($("#yourEmail").val());
   
  }
function VaildPhone(){
    let regex =/^[0-9]{11,13}$/
    return regex.test($("#Phone").val());
   
  }
function VaildAge(){
    let regex =/^[1-9]{1,2}$|^100$/
    return regex.test($("#Age").val());
   
  }
function VaildPass(){
    let regex =/^[A-Za-z]{8,}[!@#$&_]{1}[0-9]{1}$/
    return regex.test($("#password").val()); 
  }

  function ValidRePassword() {
    return $("#repassword").val() == $("#password").val()
}
function validationName(){
    if(VaildName() == true){
        console.log("yes");
        Inputname.classList.remove("is-invalid")
        Inputname.classList.add("is-valid")
        namealert.classList.replace("d-block", "d-none")
        namealert.classList.replace("d-block", "d-none")
    
    }else{
        console.log("no");
        Inputname.classList.replace("is-valid", "is-invalid")
        namealert.classList.replace("d-none", "d-block")
    }

}

function validationemail(){
    if(VaildEmail() == true){
   
        InputEmail.classList.remove("is-invalid")
        InputEmail.classList.add("is-valid")
        emailalert.classList.replace("d-block", "d-none")
        emailalert.classList.replace("d-block", "d-none")
    
    }else{
     
        InputEmail.classList.replace("is-valid", "is-invalid")
        emailalert.classList.replace("d-none", "d-block")
    }

}
function validationphon(){
    if(VaildPhone() == true){
    
        InputPhone.classList.remove("is-invalid")
        InputPhone.classList.add("is-valid")
        phonealert.classList.replace("d-block", "d-none")
        phonealert.classList.replace("d-block", "d-none")
    
    }else{
       
        InputPhone.classList.replace("is-valid", "is-invalid")
        phonealert.classList.replace("d-none", "d-block")
    }

}
function validationage(){
    if(VaildAge() == true){
     
        InputAge.classList.remove("is-invalid")
        InputAge.classList.add("is-valid")
        agealert.classList.replace("d-block", "d-none")
        agealert.classList.replace("d-block", "d-none")
    
    }else{
       
        InputAge.classList.replace("is-valid", "is-invalid")
        agealert.classList.replace("d-none", "d-block")
    }

}
function validationNpass(){
    if(VaildPass() == true){
       
        Inputpassword.classList.remove("is-invalid")
        Inputpassword.classList.add("is-valid")
        passwordalert.classList.replace("d-block", "d-none")
        passwordalert.classList.replace("d-block", "d-none")
    
    }else{
      
        Inputpassword.classList.replace("is-valid", "is-invalid")
        passwordalert.classList.replace("d-none", "d-block")
    }

}
function validationrepass(){
    if(ValidRePassword() == true){
     
        Inputrepassword.classList.remove("is-invalid")
        Inputrepassword.classList.add("is-valid")
        repasswordalert.classList.replace("d-block", "d-none")
        repasswordalert.classList.replace("d-block", "d-none")
    
    }else{
       
        Inputrepassword.classList.replace("is-valid", "is-invalid")
        repasswordalert.classList.replace("d-none", "d-block")
    }

}

})


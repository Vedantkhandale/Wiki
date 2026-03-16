document.getElementById("searchInput").addEventListener("keyup", function(){

let keyword = this.value;

if(keyword.length > 2){
searchWiki(keyword);
}

});

function searchWiki(keyword){

document.getElementById("loader").style.display="block";

let url="https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="
+ keyword +
"&gsrlimit=12&prop=pageimages|extracts&exintro&explaintext&piprop=thumbnail&pithumbsize=300&format=json&origin=*";

let xhr=new XMLHttpRequest();

xhr.open("GET",url,true);

xhr.onload=function(){

document.getElementById("loader").style.display="none";

let data=JSON.parse(xhr.responseText);

let pages=data.query.pages;

let output="";

for(let key in pages){

let page=pages[key];

let title=page.title;

let desc=page.extract.substring(0,120)+"...";

let img = page.thumbnail ? page.thumbnail.source :
"https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png";

let link="https://en.wikipedia.org/wiki/"+title;

output+=`

<div class="card">

<img src="${img}" class="card-img">

<h3>${title}</h3>

<p>${desc}</p>

<a href="${link}" target="_blank" class="read-btn">Read Article</a>

</div>

`;

}

document.getElementById("results").innerHTML=output;

}

xhr.send();

}
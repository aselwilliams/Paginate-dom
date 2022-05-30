const prevBtn=document.querySelector('.prev')
const nextBtn=document.querySelector('.next')
const firstBtn=document.querySelector('.first')
const lastBtn=document.querySelector('.last')
const tBody=document.querySelector('tbody')
const uList=document.querySelector('ul')
let user=[]
let pagesArr=[]
let currentPage=0
let limit=2;

const url = 'https://jsonplaceholder.typicode.com/users';

function fetchData(){
    fetch(url).then((res)=>res.json()).then((data)=>{
        users=data
        console.log(users)
        for(let i=0; i<Math.ceil(users.length/limit); i++){
            pagesArr.push(i)
        }
        console.log(pagesArr)
        paintUI();
        paginate();
    })
}
fetchData();

function paintUI(){
if(prevBtn===0){
    prevBtn.disabled=true;
}else{
    prevBtn.disabled=false;
}
let lastPage=Math.ceil(users.length/limit)
if(currentPage===lastPage){
    nextBtn.disabled=true
} else {
    nextBtn.disabled=false
}

    tBody.innerHTML='';
    start=currentPage*limit;
    end=(currentPage+1)*limit;
    currentUsers= users.slice(start,end)
    for ( let user of currentUsers){
        tBody.innerHTML+=`
        <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.company.name}</td>
    </tr>`
    }
}

function paginate(e){
uList.innerHTML='';

pagesArr.map((page)=>{

    const listItem=document.createElement('li')
    listItem.setAttribute('id',page)
    listItem.addEventListener('click',function(e){
        console.log(currentPage,'inner btns')
        currentPage=Number(e.target.id);
        paintUI();
    })
    listItem.innerHTML=`${page+1}`
    uList.appendChild(listItem)
})
}


prevBtn.addEventListener('click', function(){
    tBody.innerHTML='';
    if(currentPage>0){
        currentPage--;}
    paintUI()
    paginate()
} )

nextBtn.addEventListener('click', function(){
    tBody.innerHTML='';
    if(currentPage<pagesArr.length-1){
        currentPage++;}
        console.log(pagesArr.length)
    paintUI()
    paginate()
} )

firstBtn.addEventListener('click',function(){
    tBody.innerHTML='';
    currentPage=0;
    paintUI()
    paginate()
})

lastBtn.addEventListener('click', function(){
    tBody.innerHTML=''
    currentPage=pagesArr.length-1;
    paintUI()
    paginate()
})
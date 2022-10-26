window.addEventListener('load', init);

var tajmer = 0;
var interval;
var filmovi_niz
var div_za_filmove;
var rez;
var greska_u_rezultatu = document.getElementById('greska_u_rezultatu');
var za_racunanje = document.getElementById('za_racunanje')
var a = Math.floor(Math.random() * 11)
var b = Math.floor(Math.random() * 11)

var forma = document.getElementById('forma')
var zadatak_tajmer = document.getElementById('zadatak_tajmer')



var niz_filmova = [
    {
        'id':1,
        'naziv':'Spider-Man: No Way Home',
        'zanr':'akcija',
        'reziser':'Jon Watts',
        'glavna_uloga':'Tom Holland',
        'imdb':8.7,
        'godina':2021
    },
    {
        'id':2,
        'naziv':'Joker',
        'zanr':'triler',
        'reziser':'Todd Phillips',
        'glavna_uloga':'Joaquin Phoenix',
        'imdb':8.4,
        'godina':2019
    },
    {
        'id':3,
        'naziv':'Parasite',
        'zanr':'triler',
        'reziser':'Bong Joon Ho',
        'glavna_uloga':'Kang-ho Song',
        'imdb':8.6,
        'godina':2019   
    }
]

function init()
{
    console.log('Skripta je ucitana');

    filmovi_niz = JSON.parse(localStorage.getItem('filmovi'));

    if(filmovi_niz == null)
    {
        filmovi_niz=niz_filmova;
    }

    localStorage.setItem('filmovi', JSON.stringify(filmovi_niz));
    div_za_filmove = document.getElementById('filmovi');
    div_za_filmove.innerHTML="";
    napravi_tabelu(filmovi_niz);
    forma = document.getElementById('forma');
    forma.addEventListener('submit', proveri_film);
    za_racunanje.addEventListener('submit', za_proveru);
    zadatak_tajmer.className = "hide";

}

function za_proveru_filmova()
{
    var id = document.getElementById('id').value;    
    var naziv = document.getElementById('naziv').value;
    var zanr = document.getElementById('zanr').value;
    var reziser = document.getElementById('reziser').value;
    var glavna_uloga = document.getElementById('glavna_uloga').value;
    var imdb = document.getElementById('imdb').value;
    var godina = document.getElementById('godina').value;
    console.log(id, naziv, zanr, reziser, glavna_uloga, imdb, godina);

    niz_filmova = JSON.parse(localStorage.getItem('filmovi'));

    for(var i = 0; i<niz_filmova.length; i++)
    {
        if(niz_filmova[i].id==id)
        {
            var id_error = document.getElementById('id_error');
            id_error.innerText="ID vec postoji";
            return false;
        }
    }
    
    if(naziv.length<3)
    {
        var naziv_error = document.getElementById('naziv_error');
        naziv_error.innerText = "Naziv filma mora imati vise od tri karaktera!";
        return false;
    }

    var tipovi_zanrova = ['akcija','drama','triler','komedija'];

    zanr = zanr.toLowerCase()
    var zanr_error = document.getElementById('zanr_error')
    if(zanr != tipovi_zanrova[0] && zanr != tipovi_zanrova[1] && zanr != tipovi_zanrova[2] && zanr != tipovi_zanrova[3])
    {
        zanr_error.innerText = "Mora biti akcija drama triler ili komedija";
        return false;
    }

    if(reziser.indexOf(' ')<=0 || glavna_uloga.indexOf(' ')<= 0)
    {
        var space_error = document.getElementById('space_error_reziser');
        var space_error_glavna = document.getElementById('space_error_glavna');
        space_error.innerText = "Mora sadrzati razmak!";
        space_error_glavna.innerText = "Mora sadrzati razmak!";
        return false;
    }

    if(imdb<1 && imdb>10)
    {
        var imdb_error = document.getElementById('imdb_error');
        imdb_error.innerText= "Nepravilno unesena ocena sa IMDB-a";
        return false;
    }

    if(godina>2022)
    {
        var godina_error = document.getElementById('godina_greska');
        godina_error.innerText="Unos godine nije ispravan";
        return false;
    }
    return true;
}

function proveri_film(e)
{
    e.preventDefault();
    console.log('Iz proveri film');

    var x = za_proveru_filmova()
    console.log("ovde pise nesto", x);
    if (x==false)
    {
        zadatak_tajmer.className = "hide";
        console.log("Desila se greska");
        return false;
    }
    za_proveru_filmova();
    zadatak_tajmer.className="prikazi"
    console.log("Vrednost za proveru", za_proveru_filmova());

    var za_a = document.getElementById('za_a');
    var za_b = document.getElementById('za_b');

    var znak = ["+","-","*","/"];
    var za_znak = document.getElementById('znak');

    var random_znak = Math.floor(Math.random() * znak.length);

    var znak_operacije
    if (random_znak == 0)
    {
        rez = sabiranje(a,b);
        znak_operacije = "+";
    }
    else if (random_znak == 1)
    {
        rez = oduzimanje(a,b);
        znak_operacije = "-";
    }
    else if (random_znak == 2)
    {
        rez = mnozenje(a,b);
        znak_operacije = "*";
    }
    else
    {
        rez = deljenje(a,b);
        znak_operacije = "/";
    }

    za_a.innerText = a;
    za_znak.innerText = znak_operacije;
    za_b.innerText = b;

    console.log(korsnikov_rezultat);
    console.log(rez);

    greska_u_rezultatu.innerText = "";

    console.log("Korsnikov rezultat", korsnikov_rezultat);
    console.log("rezultat", rez);


    interval = setInterval(otkucaj,1000);
    console.log();
}

function ugasi_vreme()
{
    clearInterval(interval);
}

function za_proveru(e)
{
    e.preventDefault();
    var korsnikov_rezultat = document.getElementById('korsnikov_rezultat').value;
    if(korsnikov_rezultat!=rez)
    {
        greska_u_rezultatu.innerText="Rezultat koji ste uneli nije tacan!";
    }
    else if(za_proveru_filmova()==false)
    {
        console.log("Desila se greska!");
    }
    else
    {
        napravi_film();
    }
}

function napravi_film()
{
    var id = document.getElementById('id').value;    
    var naziv = document.getElementById('naziv').value;
    var zanr = document.getElementById('zanr').value;
    var reziser = document.getElementById('reziser').value;
    var glavna_uloga = document.getElementById('glavna_uloga').value;
    var imdb = document.getElementById('imdb').value;
    var godina = document.getElementById('godina').value;

    var novi_film = {
        'id':id,
        'naziv':naziv,
        'zanr':zanr,
        'reziser':reziser,
        'glavna_uloga':glavna_uloga,
        'imdb':imdb,
        'godina':godina
    }
    console.log("Film koji smo napravili:", novi_film);

    niz_filmova.push(novi_film);
    console.log('svi filmovi:', niz_filmova);

    var tabela_za_upis = document.getElementById('tabela');
    console.log(tabela_za_upis);

    var dodaj_red=document.createElement('tr');

    var dodaj_vrenosti = [id, naziv, zanr, reziser, glavna_uloga, imdb, godina];
    for(var i = 0; i<dodaj_vrenosti.length; i++)
    {
        var td_za_upis = document.createElement('td');
        td_za_upis.innerText=dodaj_vrenosti[i];
        td_za_upis.className = "napravi_border";
        dodaj_red.appendChild(td_za_upis);
    }

    tabela_za_upis.append(dodaj_red);
    localStorage.setItem('filmovi', JSON.stringify(niz_filmova));
    ugasi_vreme();
    tajmer=0;
}

function sabiranje(a,b)
{
    return a+b
}
function oduzimanje(a,b)
{
    return a-b
}
function mnozenje(a,b)
{
    return a * b
}
function deljenje(a,b)
{
    return parseInt(a/b);
}

function napravi_tabelu(filmovi_niz)
{
    console.log('Test');
    var tabela = document.createElement('table');
    tabela.id="tabela";
    var nazivi_kolona = ["ID", "Naziv", "Zanr", "Reziser", "Glavna uloga", " IMDB", "godina"];
    var napravi_tr = document.createElement('tr');
    for (const kolone of nazivi_kolona){
        var napravi_th = document.createElement('th');
        napravi_th.innerText = kolone;
        napravi_th.className = "napravi_border";
        napravi_tr.appendChild(napravi_th);
    }

    tabela.appendChild(napravi_tr);
    console.log('uspesno napravljen prvi red');

    for (var i=0; i<filmovi_niz.length; i++)
    {
        var novi_red = document.createElement('tr');
        novi_red.id = "novi_red";
        var vrednosti_za_td = [filmovi_niz[i].id, filmovi_niz[i].naziv, filmovi_niz[i].zanr, filmovi_niz[i].reziser, filmovi_niz[i].glavna_uloga, filmovi_niz[i].imdb, filmovi_niz[i].godina]

        for (var j=0; j<vrednosti_za_td.length;j++)
        {
            var novi_td = document.createElement('td');
            novi_td.id = ' novi_td';
            novi_td.innerText = vrednosti_za_td[j];
            novi_td.className = "novi_td";
            novi_red.appendChild(novi_td); 
        }
        novi_red.addEventListener('click', oboji_red);
        tabela.appendChild(novi_red);
    }
    var tab = document.getElementById('filmovi');
    tab.appendChild(tabela);
}

function otkucaj()
{
    var brojac = document.getElementById('tajmer')
    brojac.innerText = tajmer;
    tajmer++;
    prikazi_vreme(tajmer);
    if(tajmer >= 11)
    {
        alert("Niste uneli rezultat na vreme!")
        ugasi_vreme();
        location.reload()
    }
    return tajmer;
}

function prikazi_vreme(tajmer)
{
    var sekunde = parseInt(tajmer % 3600 / 60)
    console.log(sekunde)
}



function oboji_red(e){
    var meta = e.target;
    za_oboji_red++;
    if(za_oboji_red % 2 == 0)
    {
        meta.style.backgroundColor = "white"
    }
    else
    {
        meta.style.backgroundColor = "gray";
    }
}
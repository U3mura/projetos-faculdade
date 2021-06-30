var divMapa = document.getElementById('mapa');

var zoom = 11;
var spCoord = [-23.691776, -46.651517];
var tile = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
var copyright = 'OpenStreetMap, https://wiki.openstreetmap.org';

var map = L.map('mapa').setView(spCoord,zoom);
L.tileLayer(tile, {attribution: copyright}).addTo(map);

//L.marker(spCoord).bindPopup('Informações sobre o marcadores').addTo(map);




//personalizando icones no mapa


var lojas = L.icon({
	iconUrl: 'Imagens/defaultMarker.png',
	iconSize: [38,43],
	iconAnchor: [20,30],
	popupAnchor: [45,0]
});

var parques = L.icon({
	iconUrl: 'Imagens/parques.png',
	iconSize: [38,43],
	iconAnchor: [20,30],
	popupAnchor: [45,0]
});

var evento = L.icon({
	iconUrl: 'Imagens/event-accepted.png',
	iconSize: [38,43],
	iconAnchor: [20,30],
	popupAnchor: [45,0]
});

var encontro = L.icon({
	iconUrl: 'Imagens/encontro.png',
	iconSize: [38,43],
	iconAnchor: [20,30],
	popupAnchor: [45,0]
});

var festa = L.icon({
	iconUrl: 'Imagens/evento.png',
	iconSize: [38,43],
	iconAnchor: [20,30],
	popupAnchor: [45,0]
});


//carregango JSON dos pontos do banco de dados no mapa

var estacoesURL = 'pontos';
var xhr = new XMLHttpRequest();


xhr.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		let listaDePontos = JSON.parse(this.response);
		colocarNoMapa(listaDePontos);
	}
}

function carregarPontos(){
	xhr.open('GET',estacoesURL,true);
	xhr.send();
}

function colocarNoMapa(listaPont){
	for(let i= 0; i < listaPont.length; i++){
		if (listaPont[i].tipo == "Loja") {
			L.marker([listaPont[i].latitude,listaPont[i].longitude],{icon: lojas}).bindTooltip('<center>'+listaPont[i].nome+'</center><br>'+listaPont[i].descricao).addTo(map);
		}

		else if (listaPont[i].tipo == "Parque") {
			L.marker([listaPont[i].latitude,listaPont[i].longitude],{icon: parques}).bindTooltip('<center>'+listaPont[i].nome+'</center><br>'+listaPont[i].descricao).addTo(map);
		}

		else if (listaPont[i].tipo == "Evento") {
			L.marker([listaPont[i].latitude,listaPont[i].longitude],{icon: evento}).bindTooltip('<center>'+listaPont[i].nome+'</center><br>'+listaPont[i].descricao).addTo(map);
		}

		else if (listaPont[i].tipo == "Encontro") {
			L.marker([listaPont[i].latitude,listaPont[i].longitude],{icon: encontro}).bindTooltip('<center>'+listaPont[i].nome+'</center><br>'+listaPont[i].descricao).addTo(map);
		}

		else if (listaPont[i].tipo == "Festa") {
			L.marker([listaPont[i].latitude,listaPont[i].longitude],{icon: festa}).bindTooltip('<center>'+listaPont[i].nome+'</center><br>'+listaPont[i].descricao).addTo(map);
		}
		else if (listaPont[i].tipo == "Outro") {
			L.marker([listaPont[i].latitude,listaPont[i].longitude]).bindTooltip('<center>'+listaPont[i].nome+'</center><br>'+listaPont[i].descricao).addTo(map);
		}
		
	}
}

//////////////////////////////////////////////////////////////////////////25/05/21

///colocando os dados de latitude e longitude no formulário

var campoLat = document.getElementById('lat');
var campoLon = document.getElementById('lon');
var popup = L.popup();

//clique no mapa
function cliqueNoMapa(evento){
	campoLat.value = evento.latlng.lat;
	campoLon.value = evento.latlng.lng;
	popup.setLatLng(evento.latlng).setContent('Clique em :' + evento.latlng.toString()).openOn(map);
}

map.on('click',cliqueNoMapa);


////////Geocoding
const chaveMapQuest = 'uX9JFjBHwVW7LcATnsSmnOkMdGFBe468';//coloque sua chave aqui
const urlMapQuestApi = 'https://www.mapquestapi.com/geocoding/v1/address?key='+chaveMapQuest+'&location=';
var mapQuestJson; //variavel para armazenar o objeto json retornado da API

var listaEnderecos = document.getElementById('opcoes');
var campoEnderecos = document.getElementById('endereco');
var campoSelecaoEnderecos = document.getElementById('opcoesEnd');

campoSelecaoEnderecos.addEventListener('select',preencheCoord);

function preencheCoord()
{
	if(listaEnderecos.options.length > 0){
		escolheCoordenadas(this.value);
	}
}

function iniciarBusca(){
	let pais = 'Brazil';
	listaEnderecos.innerHTML = '';
	campoLat.value = '';
	campoLon.value = '';
	campoSelecaoEnderecos.value = '';

	if(campoEnderecos.value != ''){
		let local = encodeURI(campoEnderecos.value) + '+' + encodeURI(pais);
		buscarCoordenadas(urlMapQuestApi+local, extrairResultado); //precisa de http
	}
  //extrairResultado(responseEx2);//teste passando um json de resposta direto. Para testar sem http.
}

function buscarCoordenadas(url, extrairResultado){
  var requisicao = new XMLHttpRequest();
  requisicao.onreadystatechange = function() {
    if(requisicao.readyState == 4 && requisicao.status == 200){
      extrairResultado(requisicao.responseText);
    }
  }
  requisicao.open('GET', url, true); //true para chamadas assincronas
  requisicao.send(null);
}

function extrairResultado(response){
  mapQuestJson = JSON.parse(response);
  
  if(mapQuestJson.results.length > 0){
  	for(let i = 0; i < mapQuestJson.results[0].locations.length; i++){
  		let tempEndereco = decodeURI(mapQuestJson.results[0].locations[i].street);
  		let tempCidade = decodeURI(mapQuestJson.results[0].locations[i].adminArea5);
  		let tempPais = decodeURI(mapQuestJson.results[0].locations[i].adminArea1);
  		let tempCep = decodeURI(mapQuestJson.results[0].locations[i].postalCode);

  		incluirOpcaoEndereco(i, tempEndereco, tempCidade, tempPais, tempCep);
  	}
  }
}

function incluirOpcaoEndereco(indice,tEnd,tCid,tPais,tCep){
	let itemEnd = tEnd + ', ' + tCid + ', ' + tPais + ', ' + tCep;
	let option = document.createElement('option');
	option.value = itemEnd;
	option.label = itemEnd;
	listaEnderecos.appendChild(option);
}

function escolheCoordenadas(enderecoSelecionado){
	campoLat.value = '';
	campoLon.value = '';
	if(mapQuestJson !== undefined){
		if(mapQuestJson.results.length > 0){
		  	for(let i = 0; i < mapQuestJson.results[0].locations.length; i++){
		  		let tempEndereco = decodeURI(mapQuestJson.results[0].locations[i].street);
		  		let tempCidade = decodeURI(mapQuestJson.results[0].locations[i].adminArea5);
		  		let tempPais = decodeURI(mapQuestJson.results[0].locations[i].adminArea1);
		  		let tempCep = decodeURI(mapQuestJson.results[0].locations[i].postalCode);

		  		let enderecoJson = tempEndereco + ', ' + tempCidade + ', ' + tempPais + ', ' + tempCep;

		 		if(enderecoJson == enderecoSelecionado){
		 			campoLat.value = mapQuestJson.results[0].locations[i].latLng.lat;
		 			campoLon.value = mapQuestJson.results[0].locations[i].latLng.lng;
		  		}
			}
		}
	}
}


//////testes

///URL da API MapQuest
///https://developer.mapquest.com/documentation/geocoding-api/address/get/

//var geocoding = 'https://www.mapquestapi.com/geocoding/v1/address?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&location=Rua+Alberto+Willo%2C+596%2C+S%C3%A3o+Paulo%2C+Brazil&thumbMaps=false';
var responseEx = '{"info":{"statuscode":0,"copyright":{"text":"\u00A9 2021 MapQuest, Inc.","imageUrl":"http://api.mqcdn.com/res/mqlogo.gif","imageAltText":"\u00A9 2021 MapQuest, Inc."},"messages":[]},"options":{"maxResults":-1,"thumbMaps":true,"ignoreLatLngInput":false},"results":[{"providedLocation":{"location":"Rua Alberto Willo, 596, S\u00E3o Paulo, Brazil"},"locations":[{"street":"Rua Alberto Willo 596","adminArea6":"","adminArea6Type":"Neighborhood","adminArea5":"S\u00E3o Paulo","adminArea5Type":"City","adminArea4":"","adminArea4Type":"County","adminArea3":"S\u00E3o Paulo","adminArea3Type":"State","adminArea1":"BR","adminArea1Type":"Country","postalCode":"04067","geocodeQualityCode":"P1CAA","geocodeQuality":"POINT","dragPoint":false,"sideOfStreet":"N","linkId":"BR/PAD/p0/14413658","unknownInput":"","type":"s","latLng":{"lat":-23.61933,"lng":-46.65602},"displayLatLng":{"lat":-23.61933,"lng":-46.65602},"mapUrl":"http://www.mapquestapi.com/staticmap/v5/map?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&type=map&size=225,160&locations=-23.61933,-46.65602|marker-sm-50318A-1&scalebar=true&zoom=15&rand=393645863"}]}]}';

//curl "https://www.mapquestapi.com/geocoding/v1/address?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&location=Avenida+Brasil%2C+596%2C+S%C3%A3o+Paulo%2C+Brazil"
var responseEx2 = '{"info":{"statuscode":0,"copyright":{"text":"\u00A9 2021 MapQuest, Inc.","imageUrl":"http://api.mqcdn.com/res/mqlogo.gif","imageAltText":"\u00A9 2021 MapQuest, Inc."},"messages":[]},"options":{"maxResults":-1,"thumbMaps":true,"ignoreLatLngInput":false},"results":[{"providedLocation":{"location":"Avenida Brasil, 596, S\u00E3o Paulo, Brazil"},"locations":[{"street":"Avenida Brasil 596","adminArea6":"","adminArea6Type":"Neighborhood","adminArea5":"S\u00E3o Paulo","adminArea5Type":"City","adminArea4":"","adminArea4Type":"County","adminArea3":"S\u00E3o Paulo","adminArea3Type":"State","adminArea1":"BR","adminArea1Type":"Country","postalCode":"01433","geocodeQualityCode":"L1CAA","geocodeQuality":"ADDRESS","dragPoint":false,"sideOfStreet":"N","linkId":"BR/ADDR/p0/953964","unknownInput":"","type":"s","latLng":{"lat":-23.57509,"lng":-46.66577},"displayLatLng":{"lat":-23.57509,"lng":-46.66577},"mapUrl":"http://www.mapquestapi.com/staticmap/v5/map?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&type=map&size=225,160&locations=-23.57509,-46.66577|marker-sm-50318A-1&scalebar=true&zoom=15&rand=-1757646600"},{"street":"Avenida Brasil 596","adminArea6":"","adminArea6Type":"Neighborhood","adminArea5":"Jacare\u00ED","adminArea5Type":"City","adminArea4":"","adminArea4Type":"County","adminArea3":"S\u00E3o Paulo","adminArea3Type":"State","adminArea1":"BR","adminArea1Type":"Country","postalCode":"12321","geocodeQualityCode":"P1CCA","geocodeQuality":"POINT","dragPoint":false,"sideOfStreet":"N","linkId":"BR/PAD/p0/389300","unknownInput":"","type":"s","latLng":{"lat":-23.30329,"lng":-45.98595},"displayLatLng":{"lat":-23.30329,"lng":-45.98595},"mapUrl":"http://www.mapquestapi.com/staticmap/v5/map?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&type=map&size=225,160&locations=-23.30329,-45.98595|marker-sm-50318A-2&scalebar=true&zoom=15&rand=-473109193"},{"street":"Rua Brasil 596","adminArea6":"","adminArea6Type":"Neighborhood","adminArea5":"Assis","adminArea5Type":"City","adminArea4":"","adminArea4Type":"County","adminArea3":"S\u00E3o Paulo","adminArea3Type":"State","adminArea1":"BR","adminArea1Type":"Country","postalCode":"19800","geocodeQualityCode":"P1CCA","geocodeQuality":"POINT","dragPoint":false,"sideOfStreet":"N","linkId":"BR/PAD/p0/961209","unknownInput":"","type":"s","latLng":{"lat":-22.66784,"lng":-50.42005},"displayLatLng":{"lat":-22.66784,"lng":-50.42005},"mapUrl":"http://www.mapquestapi.com/staticmap/v5/map?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&type=map&size=225,160&locations=-22.66784,-50.42005|marker-sm-50318A-3&scalebar=true&zoom=15&rand=-520774786"},{"street":"Rua Brasil 596","adminArea6":"","adminArea6Type":"Neighborhood","adminArea5":"Lins","adminArea5Type":"City","adminArea4":"","adminArea4Type":"County","adminArea3":"S\u00E3o Paulo","adminArea3Type":"State","adminArea1":"BR","adminArea1Type":"Country","postalCode":"16403","geocodeQualityCode":"P1CCA","geocodeQuality":"POINT","dragPoint":false,"sideOfStreet":"N","linkId":"BR/PAD/p0/7500972","unknownInput":"","type":"s","latLng":{"lat":-21.68089,"lng":-49.74329},"displayLatLng":{"lat":-21.68089,"lng":-49.74329},"mapUrl":"http://www.mapquestapi.com/staticmap/v5/map?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&type=map&size=225,160&locations=-21.68089,-49.74329|marker-sm-50318A-4&scalebar=true&zoom=15&rand=778056667"},{"street":"Rua Brasil 596","adminArea6":"","adminArea6Type":"Neighborhood","adminArea5":"Embu das Artes","adminArea5Type":"City","adminArea4":"","adminArea4Type":"County","adminArea3":"S\u00E3o Paulo","adminArea3Type":"State","adminArea1":"BR","adminArea1Type":"Country","postalCode":"06813","geocodeQualityCode":"P1CCA","geocodeQuality":"POINT","dragPoint":false,"sideOfStreet":"N","linkId":"BR/PAD/p0/8408251","unknownInput":"","type":"s","latLng":{"lat":-23.65461,"lng":-46.80269},"displayLatLng":{"lat":-23.65461,"lng":-46.80269},"mapUrl":"http://www.mapquestapi.com/staticmap/v5/map?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&type=map&size=225,160&locations=-23.65461,-46.80269|marker-sm-50318A-5&scalebar=true&zoom=15&rand=-866181798"},{"street":"Avenida Brasil 596","adminArea6":"","adminArea6Type":"Neighborhood","adminArea5":"Santana de Parna\u00EDba","adminArea5Type":"City","adminArea4":"","adminArea4Type":"County","adminArea3":"S\u00E3o Paulo","adminArea3Type":"State","adminArea1":"BR","adminArea1Type":"Country","postalCode":"06502","geocodeQualityCode":"P1CCA","geocodeQuality":"POINT","dragPoint":false,"sideOfStreet":"N","linkId":"BR/PAD/p0/12298360","unknownInput":"","type":"s","latLng":{"lat":-23.4434,"lng":-46.92824},"displayLatLng":{"lat":-23.4434,"lng":-46.92824},"mapUrl":"http://www.mapquestapi.com/staticmap/v5/map?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&type=map&size=225,160&locations=-23.4434,-46.92824|marker-sm-50318A-6&scalebar=true&zoom=15&rand=1872734348"},{"street":"Rua Brasil 596","adminArea6":"","adminArea6Type":"Neighborhood","adminArea5":"Atibaia","adminArea5Type":"City","adminArea4":"","adminArea4Type":"County","adminArea3":"S\u00E3o Paulo","adminArea3Type":"State","adminArea1":"BR","adminArea1Type":"Country","postalCode":"12951","geocodeQualityCode":"P1CCA","geocodeQuality":"POINT","dragPoint":false,"sideOfStreet":"N","linkId":"BR/PAD/p0/16148471","unknownInput":"","type":"s","latLng":{"lat":-23.1409,"lng":-46.58792},"displayLatLng":{"lat":-23.1409,"lng":-46.58792},"mapUrl":"http://www.mapquestapi.com/staticmap/v5/map?key=uX9JFjBHwVW7LcATnsSmnOkMdGFBe468&type=map&size=225,160&locations=-23.1409,-46.58792|marker-sm-50318A-7&scalebar=true&zoom=15&rand=45915497"}]}]}';




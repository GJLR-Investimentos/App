let xmlHttp = new XMLHttpRequest();
xmlHttp.open('GET','js/tiposAtivos.json')
xmlHttp.onreadystatechange = ()=>{
  if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
    let JSONPerguntas = xmlHttp.responseText
    objJSONPerguntas = JSON.parse(JSONPerguntas)
    //console.log(objJSONPerguntas)
    //console.log(tipo)
  }
  else if(xmlHttp.readyState == 4 && xmlHttp.status == 404){
    //
  }
  if(xmlHttp.readyState === XMLHttpRequest.DONE){
    var status = xmlHttp.status 
    if(status == 0 || (status >= 200 && status < 400)){
      localStorage.setItem("tiposAtivos", JSON.stringify(objJSONPerguntas))
      setCookie("tiposAtivos", JSON.stringify(objJSONPerguntas), 1)
      setCookie("esc", JSON.stringify("Oleo e Gas"), 1)
      setCookie("escAtivo", JSON.stringify("ini"))
      let tipos = getCookie("tiposAtivos");
      let tiposJson = JSON.parse(tipos)

      let xmlHttpIni = new XMLHttpRequest();
      xmlHttpIni.open('GET',`js/Ativos/ini.json`)
      xmlHttpIni.onreadystatechange = ()=>{
        if(xmlHttpIni.readyState == 4 && xmlHttpIni.status == 200){
          let JSONPerguntas = xmlHttpIni.responseText
          objJSONPerguntas = JSON.parse(JSONPerguntas)
          //console.log(objJSONPerguntas)
        }
        else if(xmlHttpIni.readyState == 4 && xmlHttpIni.status == 404){
          //
        }
        if(xmlHttpIni.readyState === XMLHttpRequest.DONE){
          var status = xmlHttpIni.status 
          if(status == 0 || (status >= 200 && status < 400)){
            localStorage.setItem("ini", JSON.stringify(objJSONPerguntas))
          }
        }
      }
      xmlHttpIni.send()
      for(var key in tiposJson){
        for(var key2 in tiposJson[key]){
          //console.log(tiposJson[key][key2]["nome"])
          let nome = tiposJson[key][key2]["nome"]
          let xmlHttp = new XMLHttpRequest();
          //xmlHttp.open('GET',`../App/Views/app/Ativos/${key}/${nome}.json`)
          xmlHttp.open('GET',`js/Ativos/${key}/${nome}.json`)
          xmlHttp.onreadystatechange = ()=>{
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
              let JSONPerguntas = xmlHttp.responseText
              objJSONPerguntas = JSON.parse(JSONPerguntas)
              //console.log(objJSONPerguntas)
            }
            else if(xmlHttp.readyState == 4 && xmlHttp.status == 404){
              //
            }
            if(xmlHttp.readyState === XMLHttpRequest.DONE){
              var status = xmlHttp.status 
              if(status == 0 || (status >= 200 && status < 400)){
                localStorage.setItem(nome, JSON.stringify(objJSONPerguntas))
              }
            }
          }
          xmlHttp.send()
        }
      }                    
    }
  }
}
xmlHttp.send()
let myChart;             
let paginacao = document.getElementById('paginacao');
const itensPorPagina = 6;
let paginaAtual = 1;
let bool = false
let nome = "ini"
let xmlHttp2 = new XMLHttpRequest();
xmlHttp2.open('GET',`js/investidor.json`)
xmlHttp2.onreadystatechange = ()=>{
  if(xmlHttp2.readyState == 4 && xmlHttp2.status == 200){
    let JSONPerguntas = xmlHttp2.responseText
    //objJSONPerguntas = JSON.parse(JSONPerguntas)
    localStorage.setItem("tipoAcoes", JSONPerguntas)
  }
  else if(xmlHttp2.readyState == 4 && xmlHttp2.status == 404){
    //
  }              
}
xmlHttp2.send()
window.addEventListener('load', function() {
  var infoTipo = document.getElementById("tipoInvestidor").innerHTML
  boolNome = false
  tabela = document.getElementById('tabatv');
  nome = "ini";
  if((localStorage.getItem(nome) != null) && (localStorage.getItem("UGPA3") != null)){
    let tipos = getCookie("tiposAtivos");
    let tiposJson = JSON.parse(tipos)
    let tiposAtivos = tiposJson
    $('#tabelaAtivos').html(()=>{
      tipo = "Oleo e Gas"
      let total = document.createElement('table')
      total.id = "tabatv"

      let tr = document.createElement('tr')

      let th = document.createElement('th')
      th.innerHTML = "Papel"
      tr.append(th)
      th = document.createElement('th')
      th.innerHTML = "Abertura"
      tr.append(th)
      th = document.createElement('th')
      th.innerHTML = "Mínimo"
      tr.append(th)
      th = document.createElement('th')
      th.innerHTML = "Máximo"
      tr.append(th)
      th = document.createElement('th')
      th.innerHTML = "Médio"
      tr.append(th)
      th = document.createElement('th')
      th.innerHTML = "Volume"
      tr.append(th)
      th = document.createElement('th')
      tr.append(th)

      total.appendChild(tr)

      for (var key in tiposAtivos[tipo]){                
        let curr = localStorage.getItem(tiposAtivos[tipo][key]["nome"])
        let tp = localStorage.getItem("tipoAcoes")
        tp = JSON.parse(tp)
        //console.log(tp[tipo][key][tiposAtivos[tipo][key]["nome"]])
        if(tp[tipo][key][tiposAtivos[tipo][key]["nome"]] != infoTipo){                                         
          continue
        }
        if(boolNome == false){
          nome = tiposAtivos[tipo][key]["nome"]
          setCookie("escAtivo", JSON.stringify(nome))
          boolNome = true
        }  
        curr = JSON.parse(curr)
        let selectTr = document.createElement('tr')
        selectTr.id = tiposAtivos[tipo][key]["nome"]

        let selectTd = document.createElement('td')
        selectTd.innerHTML = tiposAtivos[tipo][key]["nome"]
        selectTr.appendChild(selectTd)

        let open = curr[Object.keys(curr)[0]]["1. open"]
        let low = curr[Object.keys(curr)[0]]["3. low"]
        let high = curr[Object.keys(curr)[0]]["2. high"]
        let closed = curr[Object.keys(curr)[0]]["4. close"]

        //console.log(curr[Object.keys(curr)[0]]["1. open"])
        selectTd = document.createElement('td')
        selectTd.innerHTML = open
        selectTr.appendChild(selectTd)

        selectTd = document.createElement('td')
        selectTd.innerHTML = low
        selectTr.appendChild(selectTd)

        selectTd = document.createElement('td')
        selectTd.innerHTML = high
        selectTr.appendChild(selectTd)

        let medio = (parseFloat(open) + parseFloat(low) + parseFloat(high) + parseFloat(closed)) / 4

        selectTd = document.createElement('td')
        selectTd.innerHTML = medio.toFixed(4)
        selectTr.appendChild(selectTd)

        selectTd = document.createElement('td')
        selectTd.innerHTML = curr[Object.keys(curr)[0]]["6. volume"]
        selectTr.appendChild(selectTd)

        selectTd = document.createElement('td')
        let button = document.createElement('button')
        button.style = 'width:100%; height:100%; border: 0;'
        let icon = document.createElement('i')
        icon.className = "fas fa-eye"
        button.appendChild(icon)
        button.value = tiposAtivos[tipo][key]["nome"]
        button.onclick = function () {
          updateChart(JSON.stringify(button.value));
          setCookie("escAtivo", JSON.stringify(button.value));
        };
        selectTd.appendChild(button)
        selectTr.appendChild(selectTd)
        total.appendChild(selectTr)
      }
      return total
    })
    //console.log(nome)
    plotGraphic(nome);
    mostrarItens()
  }
  else{
    location.reload()
  }
  function plotGraphic(nome){
    if(localStorage.getItem(nome) != null){
      var dataLocal = localStorage.getItem(nome)
      var dataLocalJson = JSON.parse(dataLocal)
      //console.log(dataLocalJson)
      var dataLocal = dataLocalJson
      var arr = []
      var arr2 = []
      for(var key in dataLocal){
        //arr.push({"x": new Date(key),"y": parseFloat(dataLocal[key]["5. adjusted close"])})
        arr.push(key)
        arr2.push(parseFloat(dataLocal[key]["5. adjusted close"]))
      }
      arr.reverse()
      arr2.reverse()
      const data = {
        labels: arr,
        datasets: [{
          label: nome,
          data: arr2,
          borderWidth: 1
        }]
      };
      const config = {
        type: 'line',
        data,
        options: {
          plugins: {
            subtitle: {
                display: true,
                text: 'Data / Valor de fechamento'
            }
        },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
      var options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      };
      myChart = new Chart(
        document.getElementById('myChart'),
        config
      );              
    }
  }
  function mostrarItens() {
    let tabela = document.getElementById('tabatv');
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const linhas = tabela.rows;
    //console.log(tabela.rows)
    
    for (let i = 1; i < linhas.length; i++) {
      if (i < inicio || i >= fim) {
        linhas[i].style.display = 'none';
      } else {
        linhas[i].style.display = '';
      }
    }
    //console.log(linhas.length)
    if(paginaAtual == 1){
      document.getElementById('anterior').disabled = true;
    }
    else{
      document.getElementById('anterior').disabled = false;
    }
    if(fim >= linhas.length-1){
      document.getElementById('proximo').disabled = true;
    }
    else{
      document.getElementById('proximo').disabled = false;
    }
  }

  document.getElementById('anterior').addEventListener('click', function() {
    if (paginaAtual > 1) {
      paginaAtual--;
      //console.log(paginaAtual)
      let numpag = document.getElementById('numpagina');
      numpag.innerHTML = paginaAtual
      mostrarItens();
    }
  });

  document.getElementById('proximo').addEventListener('click', function() {
    tabela = document.getElementById('tabatv');
    if (paginaAtual < Math.ceil(tabela.rows.length / itensPorPagina)) {
      paginaAtual++;
      //console.log(paginaAtual)
      let numpag = document.getElementById('numpagina');
      numpag.innerHTML = paginaAtual
      mostrarItens();
    }
  });
  $('#tipo').change((e)=>{
    if($('#tipo').val() != "" || $('#tipo').val() != undefined){
      paginaAtual = 1
      let numpag = document.getElementById('numpagina');
      numpag.innerHTML = paginaAtual
      tipo = $('#tipo').val()
      setCookie("esc", JSON.stringify(tipo), 1)
      boolNome = false
      let tiposAtivos = JSON.parse(getCookie("tiposAtivos"))
      let nome = ""
      //console.log(nome)
      $('#tabelaAtivos').html(()=>{
        let total = document.createElement('table')
        total.id = "tabatv"

        let tr = document.createElement('tr')

        let th = document.createElement('th')
        th.innerHTML = "Papel"
        tr.append(th)
        th = document.createElement('th')
        th.innerHTML = "Abertura"
        tr.append(th)
        th = document.createElement('th')
        th.innerHTML = "Mínimo"
        tr.append(th)
        th = document.createElement('th')
        th.innerHTML = "Máximo"
        tr.append(th)
        th = document.createElement('th')
        th.innerHTML = "Médio"
        tr.append(th)
        th = document.createElement('th')
        th.innerHTML = "Volume"
        tr.append(th)
        th = document.createElement('th')
        tr.append(th)

        total.appendChild(tr)

        for (var key in tiposAtivos[tipo]){                
          let curr = localStorage.getItem(tiposAtivos[tipo][key]["nome"])
          let tp = localStorage.getItem("tipoAcoes")
          tp = JSON.parse(tp)
          //console.log(tp[tipo][key])
          //console.log(tp[tipo][key][tiposAtivos[tipo][key]["nome"]])
          if(tp[tipo][key][tiposAtivos[tipo][key]["nome"]] != infoTipo){                                         
            continue
          }
          if(boolNome == false){
            nome = JSON.stringify(tiposAtivos[tipo][key]["nome"])
            setCookie("escAtivo", nome, 1)
            boolNome = true                          
          }  
          curr = JSON.parse(curr)
          let selectTr = document.createElement('tr')
          selectTr.id = tiposAtivos[tipo][key]["nome"]

          let selectTd = document.createElement('td')
          selectTd.innerHTML = tiposAtivos[tipo][key]["nome"]
          selectTr.appendChild(selectTd)

          let open = curr[Object.keys(curr)[0]]["1. open"]
          let low = curr[Object.keys(curr)[0]]["3. low"]
          let high = curr[Object.keys(curr)[0]]["2. high"]
          let closed = curr[Object.keys(curr)[0]]["4. close"]

          //console.log(curr[Object.keys(curr)[0]]["1. open"])
          selectTd = document.createElement('td')
          selectTd.innerHTML = open
          selectTr.appendChild(selectTd)

          selectTd = document.createElement('td')
          selectTd.innerHTML = low
          selectTr.appendChild(selectTd)

          selectTd = document.createElement('td')
          selectTd.innerHTML = high
          selectTr.appendChild(selectTd)

          let medio = (parseFloat(open) + parseFloat(low) + parseFloat(high) + parseFloat(closed)) / 4

          selectTd = document.createElement('td')
          selectTd.innerHTML = medio.toFixed(4)
          selectTr.appendChild(selectTd)

          selectTd = document.createElement('td')
          selectTd.innerHTML = curr[Object.keys(curr)[0]]["6. volume"]
          selectTr.appendChild(selectTd)
  
          selectTd = document.createElement('td')
          let button = document.createElement('button')
          button.style = 'width:100%; height:100%; border: 0;'
          let icon = document.createElement('i')
          icon.className = "fas fa-eye"
          button.appendChild(icon)
          button.value = tiposAtivos[tipo][key]["nome"]
          button.onclick = function () {
            updateChart(JSON.stringify(button.value));
            setCookie("escAtivo", JSON.stringify(button.value));
          };
          selectTd.appendChild(button)
          selectTr.appendChild(selectTd)
          total.appendChild(selectTr)
        }
        return total
      })
      if(nome != ""){
        updateChart(nome)
      }                
      mostrarItens()
    }
  })
});
function updateChart(nome){
  nome = JSON.parse(nome)
  if(localStorage.getItem(nome) != null){
    //console.log(nome)
    var dataLocal = localStorage.getItem(nome)
    var dataLocalJson = JSON.parse(dataLocal)
    var dataLocal = dataLocalJson
    var arr = []
    var arr2 = []
    for(var key in dataLocal){
      //arr.push({"x": new Date(key),"y": parseFloat(dataLocal[key]["5. adjusted close"])})
      arr.push(key)
      arr2.push(parseFloat(dataLocal[key]["5. adjusted close"]))
    }
    arr.reverse()
    arr2.reverse()
    myChart.data = {
      labels: arr,
      datasets: [{
        label: nome,
        data: arr2,
        borderWidth: 1
      }]
    }
    myChart.update();
  }
}
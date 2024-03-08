let TestPage = function(){
  this.qq = 1;
  this.vetorP;
}
TestPage.prototype.retornaPagina = function(){
  return this.qq;
}
TestPage.prototype.addPagina = function(q){
  this.qq += q;
}
TestPage.prototype.atualizaPergunta = function(q){
  let perguntas = new Array(5)
  let tipo = 0
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET','js/perguntas.json')
  xmlHttp.onreadystatechange = ()=>{
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
      let JSONPerguntas = xmlHttp.responseText
      objJSONPerguntas = JSON.parse(JSONPerguntas)
      //console.log(objJSONPerguntas)
      let tam = Object.keys(objJSONPerguntas.perguntas).length
      let item = objJSONPerguntas.perguntas[q-1]
      if(q == 1){
        this.vetorP = new Array(tam)
      }
      //console.log(item)
      //console.log(Object.keys(item.respostas).length)
      perguntas[0] = item.pergunta
      tipo = item.tipo
      for(let k = 1; k < Object.keys(item.respostas).length + 1;k++){
        perguntas[k] = item.respostas[k-1].resposta
      }
      if(tipo == 1)
      {
          $('#pergunta').html(perguntas[0])
          $('#perguntaForm').html(()=>{
              let selectRow = document.createElement('select')
              selectRow.className = "form-control"
              selectRow.id = "resposta"
              let optRow = document.createElement('option')
              optRow.value = ""
              optRow.innerHTML = "-- Selecione --"
              selectRow.appendChild(optRow)
              for(let i = 0;i < Object.keys(item.respostas).length;i++){
                let optRow = document.createElement('option')
                optRow.value = item.pesos[i].peso
                optRow.innerHTML = perguntas[i+1]
                selectRow.appendChild(optRow)
              }
              return selectRow
          })
      }
      else
      {
          $('#pergunta').html(perguntas[0])
          $('#perguntaForm').html(()=>{
            let divRow = document.createElement('div')
            divRow.className = "row"
            let divRow2 = document.createElement('div')
            divRow2.className = "form-check"
            for(let i = 0;i < Object.keys(item.respostas).length;i++){
              let labelRow = document.createElement('label')
              labelRow.className = "form-check-label"
              let inputRow  = document.createElement('input')
              inputRow.type = "radio"
              inputRow.className = "form-check-input resposta"
              inputRow.name = "opt1"
              inputRow.value = item.pesos[i].peso
              let spanRow = document.createElement('span')
              spanRow.innerHTML = perguntas[i+1]
              labelRow.appendChild(inputRow)
              labelRow.appendChild(spanRow)
              divRow2.appendChild(labelRow)
            }
            divRow.appendChild(divRow2)
            return divRow
          })
      }
      if(q === 1){
          $('#resgistroBtns').html(()=>{
            let divRow = document.createElement('div')
            divRow.className = "col-md-12"
            let buttonRow = document.createElement('button')
            buttonRow.type = "button"
            buttonRow.className = "btn btn-custom teste_btn"
            buttonRow.id = "proximo"
            buttonRow.innerHTML = "Próximo"
            divRow.appendChild(buttonRow)
            return divRow
          })
      }
      else if(q === tam){
          $('#resgistroBtns').html(()=>{
            let divRow2 = document.createElement('div')
            divRow2.className = "col-md-2"

            let divRow3 = document.createElement('div')
            divRow3.className = "col-md-4"
            let buttonRow = document.createElement('button')
            buttonRow.type = "button"
            buttonRow.className = "btn btn-custom teste_btn"
            buttonRow.id = "antes"
            buttonRow.innerHTML = "Voltar"

            let divRow4 = document.createElement('div')
            divRow4.className = "col-md-4"
            let buttonRow2 = document.createElement('button')
            buttonRow2.type = "button"
            buttonRow2.className = "btn btn-custom teste_btn"
            buttonRow2.id = "finalizar"
            buttonRow2.innerHTML = "Finalizar"

            divRow4.appendChild(buttonRow2)
            divRow3.appendChild(buttonRow)          
            
            return divRow2.innerHTML + divRow3.innerHTML + divRow4.innerHTML + divRow2.innerHTML
          })
      }
      else{
        $('#resgistroBtns').html(()=>{
          let divRow2 = document.createElement('div')
          divRow2.className = "col-md-2"

          let divRow3 = document.createElement('div')
          divRow3.className = "col-md-4"
          let buttonRow = document.createElement('button')
          buttonRow.type = "button"
          buttonRow.className = "btn btn-custom teste_btn"
          buttonRow.id = "antes"
          buttonRow.innerHTML = "Voltar"

          let divRow4 = document.createElement('div')
          divRow4.className = "col-md-4"
          let buttonRow2 = document.createElement('button')
          buttonRow2.type = "button"
          buttonRow2.className = "btn btn-custom teste_btn"
          buttonRow2.id = "proximo"
          buttonRow2.innerHTML = "Proximo"

          divRow4.appendChild(buttonRow2)
          divRow3.appendChild(buttonRow)
          return divRow2.innerHTML + divRow3.innerHTML + divRow4.innerHTML + divRow2.innerHTML
        })
      }
      $('.progressoBarra').css("width",(q/tam)*100 + "%")
      $('.progressoBarra').html((q/tam)*100 + '%')
      $('#proximo').click((e)=>{
        this.proximo()
      })
      $('#antes').click((e)=>{
        this.antes()
      })
      $('#finalizar').click((e)=>{
        if($('#resposta').val() != ''){
          if($('.resposta:checked').val() != '' && $('.resposta:checked').val() != undefined)
          {
            this.vetorP[tam] = $('.resposta:checked').val()
          }
          else if($('#resposta').val() != undefined)
          {
            this.vetorP[tam] = $('#resposta').val()
          }
          else return
          let soma = 0
          for(let i = 1;i < this.vetorP.length ;i++) soma += parseInt(this.vetorP[i])
          let e1 = document.getElementById('somaTotal')
          e1.value = soma
          let e2 = document.getElementById('formTeste')
          e2.action = '/registrar'
          e2.submit();
        }
      })
    }
    else if(xmlHttp.readyState == 4 && xmlHttp.status == 404){
      //
    }
  }
  xmlHttp.send()
}
TestPage.prototype.proximo = function(){
  if($('#resposta').val() != '')
  {
      if($('.resposta:checked').val() != '' && $('.resposta:checked').val() != undefined)
      {
          this.vetorP[this.retornaPagina()] = $('.resposta:checked').val()
      }
      else if($('#resposta').val() != undefined)
      {
          this.vetorP[this.retornaPagina()] = $('#resposta').val()
      }
      else return
      this.addPagina(1)
      this.atualizaPergunta(this.retornaPagina()) 
  }
}
TestPage.prototype.antes = function(){
  this.addPagina(-1)
  this.atualizaPergunta(this.retornaPagina())
}
let qst = new TestPage();
qst.atualizaPergunta(qst.retornaPagina());